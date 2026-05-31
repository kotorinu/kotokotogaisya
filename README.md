# ことこと株式会社 HP

静的公開サイトと、とくとくBB標準HP向けの簡易車両管理画面です。

## 構成

- `index.html`: 公開サイト入口
- `data/cars.json`: 車両データ
- `assets/images/`: トップ・DXなどの固定画像
- `assets/cars/`: 管理画面から登録される実車写真
- `admin/`: 車両管理画面
- `cgi/admin.cgi`: 保存・写真アップロード用CGI
- `vendor/`: React/Babelの同梱ライブラリ

## 管理画面

ローカルでは `admin/index.html` を開いて画面確認できます。ただし、保存と写真アップロードはCGIが動くサーバー上で動作します。

本番では以下のようにアクセスします。

```text
https://example.com/admin/
```

初期管理キーは `cgi/admin.cgi` の `$ADMIN_KEY` にあります。公開前に必ず変更してください。

## とくとくBBへの配置

1. `index.html`, `*.jsx`, `data/`, `assets/`, `admin/` を公開ディレクトリへアップロードします。
2. `cgi/admin.cgi` をCGI実行可能なディレクトリへアップロードします。
3. `admin/admin.js` の `CGI_URL` が実際のCGIパスと合っているか確認します。
4. `cgi/admin.cgi` のパーミッションをサーバー指定値に合わせます。
5. `data/cars.json` と `assets/cars/` はCGIから書き込み可能にします。

## GitHub運用

GitHubはコード管理用です。管理画面から本番サーバー上で追加された車両写真や `data/cars.json` は運用データなので、必要に応じてFTPでバックアップしてください。
