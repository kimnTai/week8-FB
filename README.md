# 第六週：JWT 身份驗證機制

## LV1：設計五個 API

-   POST：`{url}/users/sign_up` ：註冊
-   POST：`{url}/users/sign_in` ：登入
-   POST：`{url}/users/updatePassword` : 重設密碼
-   GET：`{url}/users/profile` : 取得個人資料，需設計 isAuth middleware。
-   PATCH：`{url}/users/profile`: 更新個人資料，需設計 isAuth middleware

## LV2：調整第四週 API，都加上登入驗證的 middleware

-   POST：`{url}/posts/`：張貼個人動態
-   GET：`{url}/posts/`：觀看所有動態

# 第七週：Imgur 第三方圖床服務 API 介接

## 主線任務

-   介接 Imgur 第三方圖床服務
-   設計一個 /upload 路由，來設計上傳圖片功能，後端得驗證是否符合 2mb 限制、格式支援 jpg、png
-   需通過 isAuth 登入驗證 middleware 才可上傳

# 參考資料
