const DATA_URL = "../data/cars.json";
const CGI_URL = "../cgi/admin.cgi";
const STORAGE_KEY = "kotokotoAdminKey";

let cars = [];
let selectedId = "";
let adminKey = localStorage.getItem(STORAGE_KEY) || "";

const $ = (id) => document.getElementById(id);
const fields = [
  "id", "maker", "name", "grade", "year", "mileage", "price", "inspection",
  "mission", "fuel", "color", "displacement", "body", "seats", "tags", "features", "note",
];

function toList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function showNotice(message, error = false) {
  const box = $("notice");
  box.textContent = message;
  box.className = error ? "notice error" : "notice";
  box.hidden = false;
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => { box.hidden = true; }, 5000);
}

function blankCar() {
  const id = "car-" + Date.now();
  return {
    id,
    published: true,
    maker: "",
    name: "新規車両",
    grade: "",
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    mission: "AT",
    fuel: "",
    color: "",
    displacement: "",
    inspection: "",
    body: "",
    seats: 5,
    tags: [],
    features: [],
    note: "",
    images: [],
  };
}

function normalizeCar(form = {}) {
  return {
    id: String(form.id || "").trim(),
    published: $("published").checked,
    maker: $("maker").value.trim(),
    name: $("name").value.trim(),
    grade: $("grade").value.trim(),
    year: Number($("year").value || 0),
    mileage: Number($("mileage").value || 0),
    price: Number($("price").value || 0),
    mission: $("mission").value.trim(),
    fuel: $("fuel").value.trim(),
    color: $("color").value.trim(),
    displacement: $("displacement").value.trim(),
    inspection: $("inspection").value.trim(),
    body: $("body").value.trim(),
    seats: Number($("seats").value || 0),
    tags: toList($("tags").value),
    features: toList($("features").value),
    note: $("note").value.trim(),
    images: getSelected()?.images || [],
  };
}

function getSelected() {
  return cars.find((car) => car.id === selectedId);
}

function updateCurrentFromForm() {
  const index = cars.findIndex((car) => car.id === selectedId);
  if (index < 0) return;
  const next = normalizeCar();
  if (!next.id) {
    showNotice("IDは必須です。英数字、ハイフン、アンダーバーで入力してください。", true);
    return;
  }
  if (cars.some((car, i) => i !== index && car.id === next.id)) {
    showNotice("同じIDの車両がすでにあります。", true);
    return;
  }
  cars[index] = next;
  selectedId = next.id;
}

function renderList() {
  const list = $("carList");
  list.innerHTML = "";
  cars.forEach((car) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "car-row" + (car.id === selectedId ? " active" : "");
    btn.innerHTML = `<strong>${car.maker || "未設定"} ${car.name || "名称未設定"}</strong><span>${car.price || 0}万円 / ${car.published === false ? "非公開" : "公開"}</span>`;
    btn.addEventListener("click", () => {
      updateCurrentFromForm();
      selectedId = car.id;
      render();
    });
    list.appendChild(btn);
  });
}

function renderPhotos(car) {
  const box = $("photos");
  box.innerHTML = "";
  (car.images || []).forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "photo";
    item.innerHTML = `<img src="../${src}" alt="車両写真 ${index + 1}" /><button type="button">削除</button>`;
    item.querySelector("button").addEventListener("click", () => {
      car.images.splice(index, 1);
      renderPhotos(car);
    });
    box.appendChild(item);
  });
  if (!car.images || !car.images.length) {
    box.innerHTML = "<p>まだ写真がありません。実車写真を選択してアップロードしてください。</p>";
  }
}

function renderEditor() {
  const car = getSelected();
  $("editor").hidden = !car;
  if (!car) return;
  $("editorTitle").textContent = `${car.maker || ""} ${car.name || "新規車両"}`.trim();
  $("published").checked = car.published !== false;
  fields.forEach((field) => {
    if (!$(`${field}`)) return;
    const value = car[field];
    $(`${field}`).value = Array.isArray(value) ? value.join(", ") : value ?? "";
  });
  renderPhotos(car);
}

function render() {
  renderList();
  renderEditor();
}

async function loadCars() {
  const res = await fetch(DATA_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("cars.jsonを読み込めませんでした。");
  cars = await res.json();
  if (!Array.isArray(cars)) cars = [];
  selectedId = cars[0]?.id || "";
  render();
}

async function saveCars() {
  updateCurrentFromForm();
  const res = await fetch(`${CGI_URL}?action=save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Kotokoto-Admin-Key": adminKey,
    },
    body: JSON.stringify(cars, null, 2),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "保存に失敗しました。");
  showNotice("保存しました。公開ページに反映されています。");
  render();
}

async function uploadPhotos(files) {
  updateCurrentFromForm();
  const car = getSelected();
  if (!car) return;
  if (!car.id) {
    showNotice("写真をアップロードする前に車両IDを入力してください。", true);
    return;
  }
  const form = new FormData();
  form.append("carId", car.id);
  Array.from(files).forEach((file) => form.append("photos", file));
  const res = await fetch(`${CGI_URL}?action=upload`, {
    method: "POST",
    headers: { "X-Kotokoto-Admin-Key": adminKey },
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "アップロードに失敗しました。");
  car.images = [...(car.images || []), ...data.paths];
  renderPhotos(car);
  showNotice("写真をアップロードしました。最後に保存して公開反映してください。");
}

$("login").querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  adminKey = $("adminKey").value.trim();
  localStorage.setItem(STORAGE_KEY, adminKey);
  $("login").hidden = true;
  $("app").hidden = false;
  try {
    await loadCars();
  } catch (error) {
    showNotice(error.message, true);
  }
});

$("adminKey").value = adminKey;
$("newBtn").addEventListener("click", () => {
  updateCurrentFromForm();
  const car = blankCar();
  cars.unshift(car);
  selectedId = car.id;
  render();
});
$("reloadBtn").addEventListener("click", () => loadCars().catch((error) => showNotice(error.message, true)));
$("saveBtn").addEventListener("click", () => saveCars().catch((error) => showNotice(error.message, true)));
$("deleteBtn").addEventListener("click", () => {
  const car = getSelected();
  if (!car || !confirm(`${car.maker} ${car.name} を削除しますか？`)) return;
  cars = cars.filter((row) => row.id !== car.id);
  selectedId = cars[0]?.id || "";
  render();
});
$("photoInput").addEventListener("change", (event) => {
  uploadPhotos(event.target.files).catch((error) => showNotice(error.message, true));
  event.target.value = "";
});
fields.forEach((field) => {
  const node = $(field);
  if (node) node.addEventListener("input", () => {
    const current = getSelected();
    if (current) $("editorTitle").textContent = `${$("maker").value} ${$("name").value}`.trim() || "車両を編集中";
  });
});
