# とくとくBB標準HP 配置メモ

## 事前確認

- CGIが実行できるディレクトリ名
- CGIの推奨パーミッション
- `data/cars.json` をCGIから書き込めるか
- `assets/cars/` にCGIから画像保存できるか

## アップロードするもの

公開ディレクトリ:

```text
index.html
app.jsx
data.jsx
ui.jsx
pages-home.jsx
pages-cars.jsx
pages-dx.jsx
pages-misc.jsx
tweaks-panel.jsx
data/
assets/
admin/
vendor/
```

CGIディレクトリ:

```text
cgi/admin.cgi
```

## 公開前に変更するもの

`cgi/admin.cgi`:

```perl
my $ADMIN_KEY = 'change-this-admin-key';
```

この値を推測されにくい文字列へ変更してください。

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
