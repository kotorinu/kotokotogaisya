// data.jsx — mock content for the Kotokoto integrated corporate site.
// Replace CARS with a real Carsensor / Goo-net feed later; photos are placeholders.

const CARS = [
  {
    id: "nx300h",
    maker: "レクサス", name: "NX300h", grade: "バージョンL",
    year: 2019, mileage: 2.7, price: 448,
    mission: "AT", fuel: "ハイブリッド", color: "ソニッククォーツ",
    displacement: "2500cc", inspection: "2027年11月", body: "SUV", seats: 5,
    tags: ["SUV", "ハイブリッド", "禁煙車"],
    features: ["純正ナビ", "フルセグTV", "バックモニター", "パワーバックドア", "ブラインドスポット", "プリクラッシュ", "レーダークルーズ", "パドルシフト", "ビルトインETC", "ドライブレコーダー", "ヘッドアップディスプレイ", "シートヒーター"],
    note: "後期モデル・ワンオーナー。記録簿完備で内外装ともに良好なコンディションです。",
  },
  {
    id: "alphard",
    maker: "トヨタ", name: "アルファード", grade: "2.5 S Cパッケージ",
    year: 2021, mileage: 3.4, price: 528,
    mission: "AT", fuel: "ガソリン", color: "ブラック",
    displacement: "2500cc", inspection: "2026年8月", body: "ミニバン", seats: 7,
    tags: ["ミニバン", "両側電動", "サンルーフ"],
    features: ["サンルーフ", "両側電動スライド", "デジタルインナーミラー", "10型ナビ", "後席モニター", "三眼LED", "パワーシート", "レーダークルーズ"],
    note: "人気のCパッケージ。家族での長距離移動も快適な一台です。",
  },
  {
    id: "cclass",
    maker: "メルセデス・ベンツ", name: "C200", grade: "アバンギャルド AMGライン",
    year: 2020, mileage: 4.1, price: 398,
    mission: "AT", fuel: "ガソリン", color: "ポーラーホワイト",
    displacement: "1500cc", inspection: "2026年4月", body: "セダン", seats: 5,
    tags: ["セダン", "AMGライン", "禁煙車"],
    features: ["レザーシート", "純正ナビ", "360°カメラ", "ヘッドアップディスプレイ", "アダプティブクルーズ", "パワーシート", "シートヒーター", "LEDヘッド"],
    note: "上質なインテリアと走り。日常から週末まで幅広く活躍します。",
  },
  {
    id: "aqua",
    maker: "トヨタ", name: "アクア", grade: "Z",
    year: 2022, mileage: 1.2, price: 198,
    mission: "AT", fuel: "ハイブリッド", color: "シアンメタリック",
    displacement: "1500cc", inspection: "2028年2月", body: "コンパクト", seats: 5,
    tags: ["コンパクト", "低燃費", "禁煙車"],
    features: ["ディスプレイオーディオ", "バックカメラ", "セーフティセンス", "LEDヘッド", "スマートキー", "ETC"],
    note: "低走行・低燃費。通勤やセカンドカーに最適なコンパクトハイブリッド。",
  },
  {
    id: "nbox",
    maker: "ホンダ", name: "N-BOX", grade: "カスタムL",
    year: 2021, mileage: 2.0, price: 168,
    mission: "AT", fuel: "ガソリン", color: "プレミアムサンライトホワイト",
    displacement: "660cc", inspection: "2027年6月", body: "軽自動車", seats: 4,
    tags: ["軽自動車", "両側電動", "禁煙車"],
    features: ["片側電動スライド", "ホンダセンシング", "純正ナビ", "バックカメラ", "LEDヘッド", "アダプティブクルーズ"],
    note: "視界も広く扱いやすい人気の軽。はじめの一台にもおすすめです。",
  },
  {
    id: "note",
    maker: "日産", name: "ノート", grade: "e-POWER X",
    year: 2021, mileage: 2.9, price: 184,
    mission: "AT", fuel: "ハイブリッド", color: "ガーネットレッド",
    displacement: "1200cc", inspection: "2026年12月", body: "コンパクト", seats: 5,
    tags: ["コンパクト", "e-POWER", "禁煙車"],
    features: ["プロパイロット", "アラウンドビューモニター", "純正ナビ", "ETC", "LEDヘッド", "インテリジェントキー"],
    note: "モーター駆動の静かで力強い走り。街乗りで扱いやすい一台。",
  },
  {
    id: "hiace",
    maker: "トヨタ", name: "ハイエースバン", grade: "スーパーGL",
    year: 2020, mileage: 6.8, price: 318,
    mission: "AT", fuel: "ディーゼル", color: "パールホワイト",
    displacement: "2800cc", inspection: "2026年9月", body: "商用バン", seats: 5,
    tags: ["商用", "ディーゼル", "事業用"],
    features: ["純正ナビ", "バックカメラ", "ETC", "両側スライド", "セーフティセンス", "ベッドキット"],
    note: "事業の相棒に。積載性と耐久性に優れた定番の商用バン。",
  },
  {
    id: "prius",
    maker: "トヨタ", name: "プリウス", grade: "A ツーリングセレクション",
    year: 2022, mileage: 1.6, price: 268,
    mission: "AT", fuel: "ハイブリッド", color: "アティチュードブラック",
    displacement: "1800cc", inspection: "2028年1月", body: "セダン", seats: 5,
    tags: ["低燃費", "ハイブリッド", "禁煙車"],
    features: ["純正ナビ", "ブラインドスポット", "パーキングアシスト", "LEDヘッド", "ETC2.0", "本革巻ステアリング"],
    note: "燃費・装備ともに充実したツーリングセレクション。長距離も安心。",
  },
];

const BODY_TYPES = ["すべて", "SUV", "ミニバン", "セダン", "コンパクト", "軽自動車", "商用バン"];

const SERVICES = [
  {
    id: "chatbot", no: "01", title: "AIチャットボット導入", en: "AI CHATBOT",
    lead: "問い合わせ対応を、24時間そのままに。",
    desc: "よくある質問への一次対応をAIが担い、人手をかけずに取りこぼしを減らします。自社の資料やFAQを学習させ、御社らしい受け答えに育てられます。",
    points: ["FAQ・社内資料の学習", "Web・LINE への設置", "有人対応への引き継ぎ"],
  },
  {
    id: "automation", no: "02", title: "業務自動化", en: "AUTOMATION",
    lead: "繰り返しの作業を、仕組みに任せる。",
    desc: "転記・集計・通知といった毎日の手作業を自動化し、本来の業務に時間を取り戻します。まず小さく始め、効果を見ながら広げていきます。",
    points: ["スプレッドシート連携", "定型メール・通知の自動化", "データ集計・レポート化"],
  },
  {
    id: "web", no: "03", title: "Webサイト・EC制作", en: "WEB & EC",
    lead: "売れる・伝わる、Webの入り口を。",
    desc: "コーポレートサイトからネットショップまで、目的に合わせて設計・制作します。公開後の更新・改善まで継続して伴走します。",
    points: ["要件整理・設計", "デザイン・実装", "公開後の運用・改善"],
  },
  {
    id: "lp", no: "04", title: "LP制作", en: "LANDING PAGE",
    lead: "ひとつの行動に、まっすぐ導く。",
    desc: "キャンペーンや商品訴求のための1枚ページを制作。訴求の優先順位を整理し、問い合わせ・購入につながる構成に仕上げます。",
    points: ["訴求設計・構成案", "デザイン・実装", "計測タグの設置"],
  },
  {
    id: "hp", no: "05", title: "ホームページ制作", en: "HOMEPAGE",
    lead: "小さく始めて、ていねいに育てる。",
    desc: "これから初めてサイトを持つ事業者の方へ。必要十分な構成で無理なく公開し、運用しながら少しずつ整えていきます。",
    points: ["スマホ対応デザイン", "お問い合わせフォーム", "更新しやすい構成"],
  },
];

const STEPS = [
  { no: "01", title: "ご相談・ヒアリング", desc: "現状の困りごとと目標をうかがい、対象範囲を一緒に決めます。" },
  { no: "02", title: "ご提案・お見積り", desc: "小さく始められる形で、優先順位と費用感をご提示します。" },
  { no: "03", title: "制作・導入", desc: "短いサイクルで形にし、確認をいただきながら進めます。" },
  { no: "04", title: "運用・改善", desc: "公開・導入後も数字を見ながら継続的に改善します。" },
];

const WORKS = [
  { tag: "ホームページ制作", title: "自社コーポレートサイト", desc: "車両販売とDX支援を統括するサイトを内製で構築。" },
  { tag: "業務自動化", title: "在庫情報の自動更新", desc: "車両フィードを取り込み、在庫ページを自動更新する仕組み。" },
  { tag: "AIチャットボット", title: "問い合わせ一次対応", desc: "FAQを学習したチャットで、夜間・休業日もカバー。" },
];

const SITE_ASSETS = {
  hero: "assets/images/hero-office-dx-subtle-car.png",
  businessVehicles: "assets/images/business-vehicles.png",
  businessDx: "assets/images/business-dx.png",
  dxHero: "assets/images/business-dx.png",
  workAutomation: "assets/images/work-automation.png",
  workHomepage: "assets/images/work-homepage.png",
  workInventory: "assets/images/work-inventory.png",
  workChatbot: "assets/images/work-chatbot.png",
  company: "assets/images/business-vehicles.png",
};

Object.assign(window, { CARS, BODY_TYPES, SERVICES, STEPS, WORKS, SITE_ASSETS });
