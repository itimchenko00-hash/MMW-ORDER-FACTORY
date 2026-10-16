import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const SUPABASE_URL = "https://rgmdylzevxadiotmoglz.supabase.co";
const SUPABASE_KEY = "sb_publishable_N-nzdeAx-eDfICfYJ90rmw_1beyl6MY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const $ = id => document.getElementById(id);
let mode = "login";
let routingPromise = null;
let recoveryFlow =
  location.hash.includes("type=recovery") ||
  new URLSearchParams(location.search).get("type") === "recovery";

function message(text) {
  $("notice").textContent = text || "";
}

function setMode(next) {
  mode = next;
  document.querySelectorAll("[data-mode]").forEach(button =>
    button.setAttribute("aria-selected", String(button.dataset.mode === mode))
  );
  $("profile-fields").classList.toggle("hidden", mode !== "signup");
  $("password-label").classList.toggle("hidden", mode === "recover");
  $("email-label").classList.toggle("hidden", mode === "reset");
  $("email").required = mode !== "reset";
  $("password").required = mode !== "recover";
  $("password").autocomplete =
    mode === "signup" || mode === "reset" ? "new-password" : "current-password";
  $("submit").textContent = ({
    login: "Войти",
    signup: "Отправить заявку",
    recover: "Отправить инструкции",
    reset: "Сохранить новый пароль"
  })[mode];
  message("");
}

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

async function routeSession() {
  if (recoveryFlow) return;
  if (routingPromise) return routingPromise;

  routingPromise = (async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!session) return false;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    const user = userData?.user;
    if (!user) {
      message("Вход выполнен, но сессию не удалось подтвердить. Обновите страницу и попробуйте ещё раз.");
      return false;
    }

    if (user.app_metadata?.unity_role === "admin") {
      message("Вход выполнен. Открываем панель администратора…");
      location.replace("./admin.html");
      return true;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("account_status,display_name,handle")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      message("Вход выполнен, но профиль не удалось загрузить. Обновите страницу позже.");
      return false;
    }
    if (profile?.account_status === "active") {
      message("Вы вошли. Социальные разделы будут подключены следующим этапом.");
      return true;
    }
    if (profile?.account_status === "rejected") {
      message("Заявка отклонена. Если считаете это ошибкой, обратитесь к администрации.");
    } else if (profile?.account_status === "suspended") {
      message("Доступ к аккаунту временно ограничен.");
    } else {
      message("Почта подтверждена, заявка ожидает одобрения администратора. До одобрения функции социальной сети закрыты.");
    }
    return true;
  })();

  try {
    return await routingPromise;
  } finally {
    routingPromise = null;
  }
}

$("auth-form").addEventListener("submit", async event => {
  event.preventDefault();
  message("");
  const submit = $("submit");
  submit.disabled = true;

  try {
    const email = $("email").value.trim().toLowerCase();

    if (mode === "recover") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: location.origin + location.pathname
      });
      if (error) throw error;
      message("Если адрес зарегистрирован, инструкции по восстановлению будут отправлены.");
      return;
    }

    if (mode === "reset") {
      const { error } = await supabase.auth.updateUser({ password: $("password").value });
      if (error) throw error;
      recoveryFlow = false;
      history.replaceState(null, "", location.pathname);
      await supabase.auth.signOut();
      setMode("login");
      message("Пароль обновлён. Теперь войдите с новым паролем.");
      return;
    }

    if (mode === "signup") {
      const display_name = $("display-name").value.trim();
      const handle = $("handle").value.trim().toLowerCase();
      if (!display_name || display_name.length > 80) {
        throw new Error("Укажите отображаемое имя (до 80 символов).");
      }
      if (!/^[a-z0-9_]{3,24}$/.test(handle)) {
        throw new Error("Никнейм должен содержать 3–24 символа: a-z, цифры или _.");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password: $("password").value,
        options: {
          emailRedirectTo: location.origin + location.pathname,
          data: {
            display_name,
            handle,
            bio: $("bio").value.trim(),
            visibility: $("visibility").value
          }
        }
      });
      if (error) throw error;
      if (data.session) {
        message("Аккаунт создан. Проверяем профиль…");
        await routeSession();
      } else {
        message("Если адрес можно зарегистрировать, письмо подтверждения отправлено. После подтверждения заявка будет ожидать одобрения администратора.");
      }
      return;
    }

    message("Проверяем почту и пароль…");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: $("password").value
    });
    if (error) throw error;

    if (!data.session) {
      message("Сервер не вернул активную сессию. Обновите страницу и попробуйте войти ещё раз.");
      return;
    }

    message("Вход выполнен. Проверяем доступ…");
    const routed = await routeSession();
    if (!routed && !recoveryFlow && !$("notice").textContent) {
      message("Вход выполнен, но дальнейший переход не завершился. Обновите страницу.");
    }
  } catch (error) {
    const text = String(error?.message || "Не удалось выполнить запрос.");
    if (/already registered|user already registered/i.test(text)) {
      message("Не удалось завершить регистрацию. Попробуйте войти или восстановить доступ.");
    } else if (/duplicate key|profiles_handle_key|unique/i.test(text)) {
      message("Этот никнейм уже занят. Выберите другой.");
    } else if (/invalid login credentials/i.test(text)) {
      message("Не удалось войти. Проверьте почту и пароль.");
    } else {
      message("Ошибка: " + text);
    }
  } finally {
    submit.disabled = false;
  }
});

supabase.auth.onAuthStateChange(event => {
  if (event === "PASSWORD_RECOVERY") {
    recoveryFlow = true;
    setMode("reset");
    message("Введите новый пароль для своей учётной записи.");
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    if (!recoveryFlow) {
      // Do not let an auth-state callback create an unhandled rejection.
      queueMicrotask(() => routeSession().catch(error => {
        message("Сессия получена, но не удалось открыть пространство: " +
          String(error?.message || "неизвестная ошибка"));
      }));
    }
  }
});

setMode(recoveryFlow ? "reset" : "login");
if (recoveryFlow) {
  message("Введите новый пароль для своей учётной записи.");
} else {
  routeSession().catch(error => {
    message("Не удалось проверить текущую сессию: " +
      String(error?.message || "ошибка подключения"));
  });
}
