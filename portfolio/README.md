# Kotone Ogata Portfolio

小規模事業者向けの業務効率化＆書類自動生成サービスを伝えるための営業用ポートフォリオサイト。

> 🧭 サイト全体の軸：
> **「小規模事業者の事務や集客の詰まりを、AIと仕組みで小さく整える」**

---

## 起動方法（WSL推奨）

このプロジェクトはWSL（Ubuntu）配下にあります。symlinkの都合で **WSL内のNodeで動かすのが一番確実**です。

### 1回目：WSLにNodeを入れる（まだの場合）

```bash
# WSLターミナルで
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm alias default 20
```

### 起動

```bash
# WSLターミナルで
cd ~/workspace/portfolio
npm install   # 初回のみ
npm run dev
```

ブラウザで <http://localhost:3000> を開く。

> Windowsから起動したい場合は、`\\wsl.localhost\...` のUNCパス越しだとNext.jsのビルドでsymlink関連エラーが出ます。WSL内から動かしてください。

---

## ディレクトリ構成

```
portfolio/
├── app/
│   ├── globals.css       # トンマナ・共通スタイル
│   ├── layout.tsx        # ルートレイアウト（フォント・メタ）
│   └── page.tsx          # トップページ（全セクションを束ねる）
├── components/
│   ├── Header.tsx        # 固定ヘッダー（スクロール時に背景）
│   ├── Footer.tsx
│   ├── Reveal.tsx        # スクロール連動フェードイン
│   ├── Hero.tsx          # ファーストビュー
│   ├── Services.tsx      # 主役 / 関連 / 相談ベース の3階層
│   ├── Stats.tsx         # 数字で見る実績
│   ├── CaseStudies.tsx   # 主役の事例（書類自動生成パック）
│   ├── Works.tsx         # 制作実績ギャラリー
│   ├── Testimonials.tsx  # お客様の声
│   ├── Process.tsx       # 導入の流れ
│   ├── Faq.tsx           # よくある質問
│   ├── Profile.tsx       # プロフィール
│   └── Contact.tsx       # 問い合わせフォーム + SNS
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 文言を差し替える場所（“売れる順番に削る”ポイント）

| 編集したい内容 | ファイル |
| --- | --- |
| メインコピー・サブコピー | `components/Hero.tsx` |
| サービス3階層（主役 / 関連 / 相談） | `components/Services.tsx` |
| 数字の実績 | `components/Stats.tsx` |
| メイン事例（書類自動生成パックのストーリー） | `components/CaseStudies.tsx` (`MAIN_CASE`) |
| サブ事例 | `components/CaseStudies.tsx` (`SUB_CASES`) |
| 制作実績ギャラリー | `components/Works.tsx` |
| お客様の声 | `components/Testimonials.tsx` |
| 導入の流れ | `components/Process.tsx` |
| FAQ | `components/Faq.tsx` |
| プロフィール・スキル・想い | `components/Profile.tsx` |
| メール・SNS | `components/Contact.tsx` |

---

## サービスの階層（コードと対応）

### 主役 / Main
- 小規模事業者向け 書類自動生成・業務整理パック

### 関連 / Related（`components/Services.tsx` の `SECONDARY`）
- Webサイト制作
- LP制作
- チャットボット付きHP
- LINE導線整備
- 業務効率化支援

### 相談ベース / On Request（`components/Services.tsx` の `CONSULT`）
- AIエージェント構築
- 営業用ポートフォリオサイト制作
- AIを使った社内業務の整理・半自動化

> ⚠️ 公開ポートフォリオには規約的にグレーな自動化（例：メルカリ自動化など）は載せない方針。`SECONDARY` / `CONSULT` に追加する時は「公開に出して安全か」を確認すること。

---

## デザインの考え方

- **ダーク基調（`ink-950`〜`ink-700`）× アクセントは青緑（`accent-500`）**
- 「クール × プロフェッショナル」：誠実・実務感・押し売り感ゼロ
- 余白広め（`section` クラスで上下 `py-20 md:py-28`）
- スクロール連動のフェードインは `<Reveal>` で包むだけ（`components/Reveal.tsx`）

---

## お問い合わせフォームの本番化

`components/Contact.tsx` の `onSubmit` を、以下のいずれかに差し替え：

- **Formspree**（一番手軽。3分で動く）
- **Resend**（メール送信API、無料枠あり）
- **EmailJS**（クライアント側だけで動く）
- **Google Formsの埋め込み**（最速）

---

## 一番大事な営業メッセージ（ブレ防止）

> **このサイトは「小規模事業者の事務と集客の詰まりを、小さく整える仕事」を売っている。**
> 主役は書類自動生成パック。そこを起点に、Web / LINE / AIまで広げて相談できる。
