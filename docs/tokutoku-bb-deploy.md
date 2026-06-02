# とくとくBB標準HP 配置メモ

## 事前確認

- CGIが実行できるディレクトリ名
- CGIの推奨パーミッション
- `data/cars.json` をCGIから書き込めるか
- `assets/cars/` にCGIから画像保存できるか

## アップロードするもの

ブラウザが読み込むのは `index.html` / `site.js` / `vendor/`（本番版React）/ `data/` / `assets/` だけです。`*.jsx` はソースで、`site.js` にビルド済みなので**アップロード不要**です（手元で `node scripts/build-site.js` を実行して `site.js` を更新してからアップロードします）。

公開ディレクトリ:

```text
index.html
site.js
favicon.svg
robots.txt
sitemap.xml
data/
assets/
admin/
vendor/            # react.production.min.js / react-dom.production.min.js のみ
```

CGIディレクトリ:

```text
cgi/admin.cgi
```

## 公開前に変更するもの

1. `cgi/admin.cgi` の管理キー:

```perl
my $ADMIN_KEY = 'change-this-admin-key';
```

この値を推測されにくい文字列へ変更してください。

2. **ドメインの置き換え**: `index.html` のSEOタグ（canonical / og:url / og:image）、`robots.txt`、`sitemap.xml` 内の `https://www.example.com/` を、実際の公開ドメインに置き換えてください。

## ビルド（公開前に毎回）

```bash
npm install            # 初回のみ
node scripts/build-site.js   # *.jsx → site.js（圧縮済み）を生成
```

`vendor/` には本番版の React（`react.production.min.js` / `react-dom.production.min.js`）のみを置きます。開発用の `*.development.js` や `babel.min.js` は不要です（ビルドは esbuild が行います）。

## 管理画面の使い方

1. `/admin/` を開きます。
2. 管理キーを入力します。
3. 車両を追加または選択します。
4. 車両概要、価格、装備、実車写真を登録します。
5. `保存して公開反映` を押します。
6. 公開サイトの車両一覧・車両詳細に反映されます。

## 注意

- 車両写真は実車写真だけを登録してください。
- 画像は1枚6MBまでです。
- 管理画面から保存したデータは本番サーバー上の運用データです。GitHubのコードとは別にバックアップしてください。
