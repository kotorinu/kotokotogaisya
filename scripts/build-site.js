const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const root = path.resolve(__dirname, "..");

// 本番バンドルに含めるソース（設計用の tweaks-panel.jsx は除外＝デッドコード）
const files = [
  "data.jsx",
  "ui.jsx",
  "pages-home.jsx",
  "pages-cars.jsx",
  "pages-dx.jsx",
  "pages-misc.jsx",
  "app.jsx",
];

const source = files
  .map((file) => `\n/* ${file} */\n` + fs.readFileSync(path.join(root, file), "utf8"))
  .join("\n");

// esbuild で JSX 変換＋圧縮を一括（Babel 不要、出力を最小化）
const result = esbuild.transformSync(source, {
  loader: "jsx",
  jsx: "transform",
  minify: true,
  legalComments: "none",
  charset: "utf8",
});

fs.writeFileSync(path.join(root, "site.js"), result.code, "utf8");
const kb = (fs.statSync(path.join(root, "site.js")).size / 1024).toFixed(1);
console.log(`built site.js (${kb} KB, minified)`);
