# カーセンサー在庫 自動同期

カーセンサーの自社店舗在庫一覧（「Ｊｕｐｉｔｅｒ Ｃｏｒｉｎｇ 大阪支店」）を読み取り、
HPの `data/cars.json` を**1日1回・自動**で同期します。

- 新しく載った車 … 追加し、約14日間 **「NEW」バッジ**を表示
- 売れて掲載が消えた車 … 削除せず **「SOLD OUT」表示**で一覧の末尾に残す
- 価格・走行距離などの変更 … 自動で追従
- 写真 … カーセンサー掲載写真（メイン1枚）を取り込み、本番サーバーへ再ホスト
- 手動で入れた `note`・写真・公開/非公開は保持（上書きしない）
- 取り込み上限 … 20台

## 仕組み

`scripts/sync-carsensor.js` が同期本体です。実行の流れ:

1. 在庫一覧ページを取得・解析（諸元・価格・物件ID・画像URL）
2. 各車の詳細ページから 燃料・乗車定員・装備・色・写真 を取得
3. 本番の `data/cars.json` を取得し、物件ID(`csId`)で突き合わせて 追加 / SOLD / 更新 を判定
4. 新規車の画像をダウンロードし、既存の `cgi/admin.cgi?action=upload` で本番へ再ホスト
5. マージ後の `cars.json` を `cgi/admin.cgi?action=save` で本番へ保存（FTP不要）
6. リポジトリの `data/cars.json` も更新（GitHub Actionsがコミット＝バックアップ）

実行場所はクラウド（GitHub Actions）。配信先のとくとくBB標準HPは静的＋CGIのみのため、
同期処理はGitHub Actions側で動かし、結果だけをCGI経由で本番へ書き込みます。

## セットアップ（初回のみ）

1. このリポジトリをGitHubへpush
2. リポジトリの **Settings → Secrets and variables → Actions** で以下を登録
   - Secrets:
     - `KOTOKOTO_CGI_URL` … 例) `https://example.com/cgi/admin.cgi`
     - `KOTOKOTO_DATA_URL` … 例) `https://example.com/data/cars.json`
     - `KOTOKOTO_ADMIN_KEY` … 本番 `cgi/admin.cgi` の管理キー
   - Variables（任意）:
     - `CARSENSOR_SHOP_URL` … 既定は大阪支店。変更時のみ設定
3. 本番 `cgi/admin.cgi` の `$ADMIN_KEY` を推測されにくい値へ変更（未変更なら必須）

これで毎日 UTC 0:00（日本時間 朝9時頃）に自動同期されます。
手動で動かしたいときは Actions タブ →「カーセンサー在庫同期」→ Run workflow。

## ローカルでの確認（保存せず差分だけ見る）

```bash
npm install
npm run sync:dry      # 本番に保存せず tmp_cars_preview.json と差分を出力
```

- `WRITE_LOCAL=1 npm run sync:dry` … 確認結果をローカル `data/cars.json` にも反映
- `npm run dev` … `http://127.0.0.1:4173/` でNEW/SOLD表示を目視確認

## 環境変数まとめ

| 変数 | 役割 | 既定 |
|---|---|---|
| `CARSENSOR_SHOP_URL` | 在庫一覧URL | 大阪支店 |
| `KOTOKOTO_CGI_URL` | 本番 admin.cgi のURL | （必須） |
| `KOTOKOTO_DATA_URL` | 本番 cars.json のURL | 任意（無ければローカル参照） |
| `KOTOKOTO_ADMIN_KEY` | 管理キー | （必須） |
| `MAX_CARS` | 取り込み上限 | 20 |
| `NEW_DAYS` | NEWバッジの表示日数 | 14 |
| `DRY_RUN` / `--dry` | 保存せず確認 | OFF（鍵未設定なら自動でON） |
| `REPLACE_SAMPLE` | 物件IDの無い旧サンプル車を除外 | OFF |

## データ項目（`data/cars.json`）

同期で付与される主なフィールド:

- `csId` … カーセンサー物件ID（突き合わせキー）
- `listedAt` … HPに初掲載した日時（NEW判定）
- `sold` / `soldAt` … 売却済みフラグと検知日時
- `syncedAt` … 最終同期日時
- `manual` … `true` にすると、その車は同期対象外＝完全手動管理

## 注意

- カーセンサー（リクルート）の規約は自動取得を原則禁止しています。本同期は
  **自社掲載ページを1日1回だけ**控えめに読み取る運用に限定しています。可能であれば
  カーセンサー担当へ「自社掲載の自動取得可否／公式データ提供(API/フィード)の有無」を
  確認してください。公式フィードがあれば将来そちらへ移行できます。
- ページ構造が変わると解析(セレクタ)の修正が必要になることがあります
  （解析は `scripts/sync-carsensor.js` の `parseList` / `parseDetail` に集約）。
