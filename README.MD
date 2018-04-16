這是模擬 facebook 使用者登入後，抓取 facebook 朋友列表並存入資料庫的小爬蟲程式。

## 需求

* Node.js >= 6.13.0
  * npm
* MySQL

## 設定環境

修改 `config.js` ，包括 facebook 登入帳號密碼和 MySQL 連線資料。

## 啟動伺服器

`npm run dev`

## API 使用說明

https://documenter.getpostman.com/view/652718/fb-scrapper/RVuABmwg#623cc559-06d9-5ac9-046f-51c188e4e61a

或者使用 `fb-scrapper.postman_collection.json` 匯入 POSTMAN
