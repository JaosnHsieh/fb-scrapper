這是模擬 facebook 使用者登入後，抓取 facebook 朋友列表並存入資料庫的小爬蟲程式。

## 需求

* Node.js >= 6.13.0
  * npm
* MySQL

## 設定環境

修改 `config.js` ，包括 facebook 登入帳號密碼和 MySQL 連線資料。

## 啟動伺服器

`npm run dev`

## 快速開始

1.  獲取 id 為 123 的 使用者資料及朋友清單(必須有設定公開朋友清單)
    `curl http://localhost:8080/async/api/user/123`
2.  獲取 id 為 456 的 使用者資料及朋友清單(必須有設定公開朋友清單)
    `curl http://localhost:8080/async/api/user/456`
3.  取得 id 為 123 和 id 為 456 的共同好友
    `curl http://localhost:8080/async/api/mutualfriends/123/456`

## API 使用說明

https://documenter.getpostman.com/view/652718/fb-scrapper/RVuABmwg

或者使用 `fb-scrapper.postman_collection.json` 匯入 POSTMAN
