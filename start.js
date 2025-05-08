const puppeteer = require("puppeteer");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./auth.json");
const config = require("./config");

(async () => {
  const doc = new GoogleSpreadsheet(config.spreadsheetId);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[config.sheetIndex];
  const rows = await sheet.getRows();

  for (let row of rows) {
    const { username, password, email, email_pass, imap_host, imap_port } = row;
    if (row.status === "成功") continue;

    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.threads.net/");

      // 必要に応じて手動コード入力待ちロジックをここに追加

      row.status = "成功";
      row.access_token = "ここにトークン（仮）";
      row["取得日"] = new Date().toLocaleDateString();
      await row.save();
      await browser.close();
    } catch (e) {
      row.status = "失敗";
      row["メモ"] = e.message;
      await row.save();
    }
  }
})();