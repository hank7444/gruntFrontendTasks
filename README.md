frontendGruntTasks
===================

# Description

利用grunt來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤.

總共有以下執行模式: 

* normal: 會對js/, css/, html/ 資料夾底下的檔案監聽，每次儲存會對該儲存的檔案進行格式美化與驗證
* sass: 會對js/, sass/, css/, html/ 資料夾底下的檔案監聽, sass儲存會轉成css, 其他同normal模式

===


## How to use it ##

### step1: download node modules
```
npm install
```

### step2: execute grunt

```
grunt normal   // or grunt sass

```

### step3: use & enjoy it! :)
預設的網址為: 0.0.0.0:8000, <br>
瀏覽器會在你儲存後及時更新這個domain的檔案，因此可以及時預覽剛剛修改的變化:)