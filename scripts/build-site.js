const fs = require("fs");
const path = require("path");
const Babel = require("../vendor/babel.min.js");

const root = path.resolve(__dirname, "..");
const files = [
  "tweaks-panel.jsx",
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

const output = Babel.transform(source, {
  presets: ["react"],
  sourceType: "script",
  comments: false,
}).code;

fs.writeFileSync(path.join(root, "site.js"), output, "utf8");
console.log("built site.js");
