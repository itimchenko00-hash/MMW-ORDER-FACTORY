import { createClient } from "npm:@supabase/supabase-js@2.56.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const PUBLISHABLE_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? readPublishableKey();
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? readSecretKey();

const allowedOrigins = new Set(["https://edinstvo-social.onrender.com", "http://localhost:4173", "http://localhost:5173"]);

function readPublishableKey(): string {
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}"); return keys.default ?? Object.values(keys)[0] ?? ""; }
  catch { return ""; }
}
function readSecretKey(): string {
  try { const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}"); return keys.default ?? Object.values(keys)[0] ?? ""; }
  catch { return ""; }
}
function json(body: unknown, status = 200, origin: string | null = null) {
  const headers = new Headers({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff", "vary": "Origin" });
  if (origin) {
    headers.set("access-control-allow-origin", origin);
    headers.set("access-control-allow-headers", "authorization, apikey, content-type, x-client-info");
    headers.set("access-control-allow-methods", "POST, OPTIONS");
  }
  return new Response(JSON.stringify(body), { status, headers });
}
function fail(message: string, status = 400, origin: string | null = null) { return json({ error: message }, status, origin); }
function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (origin && !allowedOrigins.has(origin)) return fail("Origin not allowed", 403);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: {
    "access-control-allow-origin": origin ?? "",
    "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
    "access-control-allow-methods": "POST, OPTIONS", "vary": "Origin",
  }});
  if (req.method !== "POST") return fail("Method not allowed", 405, origin);
  if (!SUPABASE_URL || !PUBLISHABLE_KEY || !SERVICE_KEY) return fail("Server configuration incomplete", 500, origin);

  const token = (req.headers.get("authorization") ?? "").match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return fail("Authentication required", 401, origin);
  const userClient = createClient(SUPABASE_URL, PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userResult, error: userError } = await userClient.auth.getUser(token);
  if (userError || !userResult.user) return fail("Invalid session", 401, origin);
  if (userResult.user.app_metadata?.unity_role !== "admin") return fail("Administrator access required", 403, origin);

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("JSON object required", 400, origin);
    body = parsed as Record<string, unknown>;
  } catch { return fail("Valid JSON required", 400, origin); }

  const action = body.action;
  const actorId = userResult.user.id;
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";
  const targetId = body.target_id;

  if (action === "list_pending") {
    const { data, error } = await admin.from("profiles").select("id, handle, display_name, bio, visibility, account_status, created_at").eq("account_status", "pending").order("created_at", { ascending: true }).limit(100);
    if (error) return fail("Unable to load registration queue", 500, origin);
    return json({ requests: data ?? [] }, 200, origin);
  }
  if (action === "list_reports") {
    const { data, error } = await admin.from("reports").select("id, reporter_id, target_type, target_id, category, details, status, created_at").in("status", ["open", "reviewing"]).order("created_at", { ascending: true }).limit(100);
    if (error) return fail("Unable to load reports", 500, origin);
    return json({ reports: data ?? [] }, 200, origin);
  }
  if (["approve_account", "reject_account", "suspend_account", "restore_account"].includes(String(action))) {
    if (!isUuid(targetId)) return fail("Valid target_id is required", 400, origin);
    if (reason.length < 3 || reason.length > 1000) return fail("A reason of 3–1000 characters is required", 400, origin);
    const nextStatus: Record<string, string> = { approve_account: "active", reject_account: "rejected", suspend_account: "suspended", restore_account: "active" };
    const allowedCurrent: Record<string, string[]> = { approve_account: ["pending"], reject_account: ["pending"], suspend_account: ["active"], restore_account: ["suspended"] };
    const { data: current, error: readError } = await admin.from("profiles").select("id, account_status").eq("id", targetId).maybeSingle();
    if (readError) return fail("Unable to read account", 500, origin);
    if (!current) return fail("Account not found", 404, origin);
    if (!allowedCurrent[String(action)].includes(current.account_status)) return fail("Account status does not allow this action", 409, origin);
    const { data: updated, error: updateError } = await admin.from("profiles").update({ account_status: nextStatus[String(action)] }).eq("id", targetId).eq("account_status", current.account_status).select("id, handle, display_name, account_status").maybeSingle();
    if (updateError) return fail("Unable to update account", 500, origin);
    if (!updated) return fail("Account changed concurrently; refresh and retry", 409, origin);
    const { error: logError } = await admin.from("moderation_actions").insert({ moderator_id: actorId, target_type: "profile", target_id: targetId, action: String(action), reason });
    await admin.from("audit_events").insert({ actor_id: actorId, event_type: String(action), target_type: "profile", target_id: targetId, metadata: { previous_status: current.account_status, new_status: updated.account_status } });
    if (logError) return fail("Account updated but moderation log failed; investigate audit integrity", 500, origin);
    return json({ account: updated }, 200, origin);
  }
  if (action === "moderate_content") {
    if (!isUuid(targetId)) return fail("Valid target_id is required", 400, origin);
    if (!["posts", "comments", "communities"].includes(String(body.target_type))) return fail("target_type must be posts, comments, or communities", 400, origin);
    if (!["hide_content", "remove_content", "publish_content"].includes(String(body.decision))) return fail("decision must be hide_content, remove_content, or publish_content", 400, origin);
    if (reason.length < 3 || reason.length > 1000) return fail("A reason of 3–1000 characters is required", 400, origin);
    const table = String(body.target_type);
    const nextStatus = body.decision === "hide_content" ? "hidden" : body.decision === "remove_content" ? "removed" : "published";
    const { data: current, error: readError } = await admin.from(table).select("id, status").eq("id", targetId).maybeSingle();
    if (readError) return fail("Unable to read content", 500, origin);
    if (!current) return fail("Content not found", 404, origin);
    if (body.decision === "publish_content" && current.status !== "pending_review") return fail("Only content pending review can be published", 409, origin);
    const { data: updated, error: updateError } = await admin.from(table).update({ status: nextStatus }).eq("id", targetId).select("id, status").maybeSingle();
    if (updateError || !updated) return fail("Unable to update content", 500, origin);
    if (body.decision !== "publish_content") {
      const { error } = await admin.from("moderation_actions").insert({ moderator_id: actorId, target_type: table, target_id: targetId, action: String(body.decision), reason });
      if (error) return fail("Content changed but moderation log failed; investigate audit integrity", 500, origin);
    }
    await admin.from("audit_events").insert({ actor_id: actorId, event_type: String(body.decision), target_type: table, target_id: targetId, metadata: { previous_status: current.status, new_status: nextStatus, reason } });
    return json({ content: updated }, 200, origin);
  }
  if (action === "resolve_report") {
    if (!isUuid(targetId)) return fail("Valid target_id is required", 400, origin);
    if (!["resolved", "dismissed"].includes(String(body.status))) return fail("status must be resolved or dismissed", 400, origin);
    if (reason.length < 3 || reason.length > 1000) return fail("A reason of 3–1000 characters is required", 400, origin);
    const { data: updated, error } = await admin.from("reports").update({ status: body.status, resolved_at: new Date().toISOString() }).eq("id", targetId).in("status", ["open", "reviewing"]).select("id, status, resolved_at").maybeSingle();
    if (error) return fail("Unable to resolve report", 500, origin);
    if (!updated) return fail("Report not found or already closed", 409, origin);
    await admin.from("moderation_actions").insert({ moderator_id: actorId, target_type: "report", target_id: targetId, action: "resolve_report", reason });
    await admin.from("audit_events").insert({ actor_id: actorId, event_type: "resolve_report", target_type: "report", target_id: targetId, metadata: { status: body.status, reason } });
    return json({ report: updated }, 200, origin);
  }
  return fail("Unsupported action", 400, origin);
});
