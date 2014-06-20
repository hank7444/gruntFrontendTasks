frontendGruntTasks
===================


利用grunt來做到html, css, js檔案每次在儲存時，會自動格式美化與驗證是否有錯誤.

總共有以下執行模式: 

* normal: 會對js/, css/, html/ 資料夾底下的檔案監聽，每次儲存會對該儲存的檔案進行格式美化與驗證
* sass: 會對js/, sass/, html/ 資料夾底下的檔案監聽, sass儲存會轉成css, js, html同normal模式



##Usage

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


##note1: grunt-html-validation修改說明:
該模組作者的實作方式，會導致一旦有一個html驗證成功後，接下來驗證都不會執行的bug

#####修正方法
1. 請直接使用所附node_module/grunt-html-validation  
2. 或是在npm install後, 直接改`node_module/grunt-html-validation/tasks/html_validation.js`的118行之前, 加`counter = 0;` 即可
 
 
##License
Licensed under the MIT License
 
##Authors
Copyright(c) 2014 Hank Kuo <<hank7444@gmail.com>>
