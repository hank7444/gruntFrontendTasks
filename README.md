gruntFrontendTasks
===================


利用grunt來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤.

總共有以下執行模式: 

* default: 會對js/, css/, html/, sass/資料夾底下的檔案監聽，驗證與美化排版，sass/會轉成.css檔案放置在css/下
* livereload: 同default, 但多了browser-sync模組, 在每次儲存js, css, html, sass時, 會自動重新整理瀏覽器中，網址為:localhost:port/html.*.html的頁面



##Usage

### step1: download node modules
```
npm install
```

### step2: execute grunt

```
grunt // or grunt livereload

```

### step3: use & enjoy it! :)
如果為livereload模式, <br>
預設的網址為: localhost:3002, <br> (port不一定為3002, 看設定與執行電腦狀況)
瀏覽器會自動重新整理瀏覽器中，網址為:localhost:port/html.*.html的頁面

##note1: grunt-html-validation修改說明:
該模組作者的實作方式，會導致一旦有一個html驗證成功後，接下來驗證都不會執行的bug

#####修正方法
1. 請直接使用所附node_module/grunt-html-validation  
2. 或是在npm install後, 直接改`node_module/grunt-html-validation/tasks/html_validation.js`的118行之前, 加`counter = 0;` 即可

##note2: browser-sync livereload機制說明
1. .css: 只有在瀏覽器上, 用到該css的html頁面會自動重新整理(自動注入)
2. .js: 所有瀏覽器上的html頁面都會自動重新整理(全部重新整理)
3. .html: 同js(全部重新整理)

##note3: browser-sync directory屬性設定已知問題
如果directory屬性設為`true`, 在網址列輸入次目錄位置會拋出錯誤訊息, 但在網址列上輸入檔案位置仍可正常顯示.

```
options: {
	server: {
	baseDir: "./",
	directory: true
}

// localhost/html  // 出現錯誤訊息
// localhost/html/test.html // 正常顯示
```
 
##License
Licensed under the MIT License
 
##Authors
Copyright(c) 2014 Hank Kuo <<hank7444@gmail.com>>
