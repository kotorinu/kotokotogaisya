/**
 * ことこと株式会社 お問い合わせフォーム → スプレッドシート書き込みスクリプト
 *
 * 【設置手順】
 * 1. スプレッドシートを開く
 * 2. メニュー「拡張機能」→「Apps Script」
 * 3. このファイルの中身を全部貼り付けて保存（Ctrl+S）
 * 4. 「デプロイ」→「新しいデプロイ」
 * 5. 種類: ウェブアプリ
 *    説明: コンタクトフォーム
 *    次のユーザーとして実行: 自分
 *    アクセスできるユーザー: 全員
 * 6. 「デプロイ」→ アクセスを承認 → URLをコピーして Claude に渡す
 */

const SHEET_ID = '1HBdd76fN24Mru47nlDXDuXmsiOhxW9BYS26uoKTimLc';
const SHEET_NAME = 'シート1'; // シート名が違う場合は変更

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME)
      || SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

    // ヘッダー行がなければ追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['受信日時', '種別', 'お名前', '会社名', 'メールアドレス', '電話番号', 'お問い合わせ内容', '対応状況']);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#2b3f5c').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);
    const now = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');

    sheet.appendRow([
      now,
      data.type    || '',
      data.name    || '',
      data.company || '',
      data.email   || '',
      data.phone   || '',
      data.message || '',
      '未対応',
    ]);

    // 未対応セルを赤くする
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 8).setBackground('#fce8e6').setFontColor('#b3261e');

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用（ブラウザから直接アクセスしたとき）
function doGet() {
  return ContentService.createTextOutput('ことこと株式会社 フォーム受信エンドポイント: OK');
}
