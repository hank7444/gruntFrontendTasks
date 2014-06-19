frontendGruntTasks
===================

# Description

利用grunt來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤,

總共有以下執行模式: 

* normal: 會對js/, css/, html/ 資料夾底下的檔案監聽，每次儲存會對該儲存的檔案進行格式美化與驗證
* sass(未實作): 會對js/, sass/, html/ 資料夾底下的檔案監聽, sass儲存會轉成css, js, html同normal模式

<br>
it's a grunt script which can prettify, validate your html, css, js files after you saved the specific file.

it have several watch mode as follows:

* normal: prettify, validate your files which is in html/, css/, js/ folders
* sass(not ready): convert your sass/.sass to css/.css, and html/, js/ are same as normal mode.

===


## How to use it ##

### step1: download node modules
```
// please check your computer have already installed nodejs & grunt
// in ther project dir
npm install
```

### step2: execute grunt

```
grunt watch:normal   // or watch:sass

```

### step3: use & enjoy it! :)
