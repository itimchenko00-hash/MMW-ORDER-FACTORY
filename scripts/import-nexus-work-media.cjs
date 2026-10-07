const fs = require("fs");
const path = require("path");
const https = require("https");

const targetDir = path.join(__dirname, "..", "public", "ASSETS", "NEXUS-WORK", "photos", "web-selected");

const assets = [
  {
    file: "01-hero-coworking.jpg",
    url: "https://images.pexels.com/photos/8606292/pexels-photo-8606292.jpeg?cs=srgb&dl=pexels-ryanpilat1-8606292.jpg&fm=jpg"
  },
  {
    file: "02-workspace.jpg",
    url: "https://images.pexels.com/photos/26966417/pexels-photo-26966417.jpeg?cs=srgb&dl=pexels-nicolas-rueda-175965148-26966417.jpg&fm=jpg"
  },
  {
    file: "03-team-collaboration.jpg",
    url: "https://images.pexels.com/photos/12903182/pexels-photo-12903182.jpeg?cs=srgb&dl=pexels-mizunokozuki-12903182.jpg&fm=jpg"
  },
  {
    file: "04-meeting.jpg",
    url: "https://images.pexels.com/photos/31709064/pexels-photo-31709064.jpeg?cs=srgb&dl=pexels-misbaa-eri-426041722-31709064.jpg&fm=jpg"
  },
  {
    file: "05-training.jpg",
    url: "https://images.pexels.com/photos/18999475/pexels-photo-18999475.jpeg?cs=srgb&dl=pexels-bertellifotografia-18999475.jpg&fm=jpg"
  },
  {
    file: "06-office-exterior.jpg",
    url: "https://images.pexels.com/photos/4889301/pexels-photo-4889301.jpeg?cs=srgb&dl=pexels-introspectivedsgn-4889301.jpg&fm=jpg"
  },
  {
    file: "07-networking.jpg",
    url: "https://images.pexels.com/photos/8761555/pexels-photo-8761555.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8761555.jpg&fm=jpg"
  },
  {
    file: "08-presentation.jpg",
    url: "https://images.pexels.com/photos/30319116/pexels-photo-30319116.jpeg?cs=srgb&dl=pexels-mehmet-balci-166052147-30319116.jpg&fm=jpg"
  },
  {
    file: "09-project-team.jpg",
    url: "https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?cs=srgb&dl=pexels-shkrabaanthony-5466236.jpg&fm=jpg"
  }
];

function download(url, destination, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    https.get(url, { headers: { "User-Agent": "MMW-COMPANY/2 media importer" } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        return download(new URL(response.headers.location, url).href, destination, redirects + 1).then(resolve, reject);
      }
      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error("HTTP " + response.statusCode + " for " + url));
      }
      const type = String(response.headers["content-type"] || "");
      if (!type.startsWith("image/")) {
        response.resume();
        return reject(new Error("Unexpected content type " + type + " for " + url));
      }
      const out = fs.createWriteStream(destination);
      let bytes = 0;
      response.on("data", chunk => { bytes += chunk.length; });
      response.on("error", reject);
      out.on("error", reject);
      out.on("finish", () => {
        if (bytes < 20000) return reject(new Error("Downloaded asset is unexpectedly small: " + bytes + " bytes"));
        resolve(bytes);
      });
      response.pipe(out);
    }).on("error", reject);
  });
}

(async () => {
  fs.mkdirSync(targetDir, { recursive: true });

  const complete = assets.every(asset => {
    const p = path.join(targetDir, asset.file);
    try { return fs.statSync(p).size >= 20000; } catch { return false; }
  });
  if (complete) {
    console.log("NEXUS WORK media: controlled local asset set already present.");
    process.exit(0);
  }

  const staging = path.join(targetDir, ".import-staging-" + process.pid);
  fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });

  try {
    for (const asset of assets) {
      const destination = path.join(staging, asset.file);
      const bytes = await download(asset.url, destination);
      console.log("Imported", asset.file, bytes, "bytes");
    }

    for (const entry of fs.readdirSync(targetDir)) {
      if (/\.(jpe?g|png|webp)$/i.test(entry)) fs.rmSync(path.join(targetDir, entry), { force: true });
    }
    for (const asset of assets) {
      fs.renameSync(path.join(staging, asset.file), path.join(targetDir, asset.file));
    }
    fs.rmSync(staging, { recursive: true, force: true });
    console.log("NEXUS WORK media: clean local asset layer installed.");
  } catch (error) {
    fs.rmSync(staging, { recursive: true, force: true });
    console.error("NEXUS WORK media import failed:", error.message);
    process.exit(1);
  }
})();
