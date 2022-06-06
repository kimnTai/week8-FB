# 第八週：期末考：實作一個 FB、IG 牆吧！

## 主線任務

-   請設計 17 隻 API，請使用 POSTMAN collecion 透過資料夾來分類。
-   若有額外新增 API，請於任務內容分享，並告知想看哪 5 支 API。

## 會員功能

-   [POST] 註冊會員：`{url}/user/sign_up`
-   [POST] 登入會員：`{url}/users/sign_in`
-   [PATCH] 重設密碼：`{url}/users/updatePassword`
-   [GET] 取得個人資料：`{url}/users/profile`
-   [PATCH] 更新個人資料：`{url}/users/profile`

## 會員按讚追蹤動態

-   [POST] 追蹤朋友：`{url}/users/{userID}/follow`
-   [DELETE] 取消追蹤朋友：`{url}/users/{userID}/unfollow`
-   [GET] 取得個人按讚列表：`{url}/users/getLikeList`
-   [GET] 取得個人追蹤名單：`{url}/users/following`

## 動態貼文

-   [GET] 取得所有貼文：`{url}/posts`
-   [GET] 取得單一貼文：`{url}/posts/{postID}`
-   [POST] 新增貼文：`{url}/posts`
-   [POST] 新增一則貼文的讚：`{url}/posts/{postID}/like`
-   [DELETE] 取消一則貼文的讚：`{url}/posts/{postID}/unlike`
-   [POST] 新增一則貼文的留言：`{url}/posts/{postID}/comment`
-   [GET] 取得個人所有貼文列表：`{url}/post/user/{userID}`

## 其他

-   [POST]上傳圖片：`{url}/upload`

## 繳交等級

-   LV1：只做後端 API
-   LV2：前端有做，後端也有做，助教也會協助檢視前端環境。

# 參考資料
