//esm 스타일
import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
const app = express();

//viw engine set
app.set('view engine','html');
//nybjucks
//views를 탬플릿 엔진 위치로 지정
nunjucks.configure('views',{
    watch:true,
    express:app
})

//dirname = 현재 위치
//<미들웨어>(middlewere)
//main page get
const __dirname = path.resolve();
app.get('/',(req,res) => {
    // res.send('Main page get reuest')
    // res.send('<h1>Hello main page</h1>')
    // res.send(`
    //     <h1>Hello main page</h1>
    //     <h1>Hello main page</h1>
    //     <h1>Hello main page</h1>
    //     <h1>Hello main page</h1>
        
    //     `)
    res.sendFile(__dirname + '/public/main.html')

})
app.get('/write',(req,res) => {
    res.render('write.html')
})
app.listen(3000,() => {
    console.log('server is rurning')
});

//CRUD?
//소프트웨어의 기본적인 Create(생성), Read(읽기), Update(갱신), Delete(삭제) 기능

//json
//devdependencies = -D로 생성, 개발에 사용 할 수 있는 필수적이지 않은 요소,배포시 빠짐
//scripts = 터미널 명령어,npm run + <scripts 요소>

//nodemon 모듈을 사용할 경우 서버를 재실행할 필요 없이 새로고침만으로 변경 내용이 적용됨

//템플릿 엔진 파일의 공통적인 부분을 탬플릿으로 만듬