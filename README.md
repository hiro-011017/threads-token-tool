# Threads Token Tool

## セットアップ手順

1. Node.js をインストール（Macなら `brew install node` でもOK）
2. Google Cloudから `auth.json` を取得して、このフォルダに配置
3. `config.js` にスプレッドシートIDを記入
4. 以下のコマンドで実行
## 必要な環境

- Node.js
- puppeteer
- google-spreadsheet
- dotenv

## 注意事項

- 手動で認証コードを入力する仕様です（Threadsログイン時）
- スプレッドシートと連携するには、auth.json をサービスアカウントから取得してください