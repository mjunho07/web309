//Mongo DB 구조
//Mongo DB > Database > Collection > Document(key : value)

// collection = 수집
//insert = 삽입하다



import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//SQL = 관계형 DB 
// 사용하지 않으면 비관계형 DB

//buffer data type = 바이트 단위의 데이터 형식

//fs = 파일 입출력 
import fs from 'fs';
import { stringify } from 'querystring';

//esm 스타일의 경우
const __dirname = path.resolve();

const app = express();





// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

//mongoose set
//mongoose = 포트가 다른 서버와 mongoDB를 이어주기 위해 사용
const { Schema } = mongoose

const WritingSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now,
    }
})


//mongoose connect
mongoose
    //서버와 DB 연결
    .connect('mongodb://127.0.0.1:27017')
    .then(() => console.log('db 연결 성공'))
    .catch(e => console.error(e))


const Writing = mongoose.model('Writing', WritingSchema)

// middleware
// main page GET
app.get('/', async (req, res) => {
    //res.render 2번째 인자는 필수는 아니고 변수를 넘겨줄때 사용
    res.render('main',{list:writings});
});

app.get('/write', (req, res) => {
    res.render('write');
});


app.post('/write', async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    // mongodb에 저장

    res.render('detail', {title:title, contents:contents, date:date })
    const writing = new writing({
        title:title,
        contents:contents
    })
    //save() = 해당 writing 모델을 저장해주는 명령
    const result = await writing.save().then(() => {
        console.log('Success')
        res.render('detail', { 'detail': { title: title, contents: contents} });
    }).catch(err => {
        console.error(err)
        res.render('write')
    })
    
});

app.get('/detail', async (req, res) => {
    res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});
















/*



show dbs = 현재 db list
use <> = 데이터베이스중 사용할 DB를 지정하는 역할, 해당 DB가 없을경우 새로운 DB <> 생성

db.createCollection(<1>,<2>) = <1>이라는 이름의 collection 생성하는 기능, <2>는 옵션 설정으로 동작하는데 필수는 아님

show collections = 현재 collections list를 출력

db.<1>.insert(<2>) = <1>은 document를 추가할 collection의 이름, <2>는 해당 collection에 추가할
document의 내용을 중괄호 안에 "key" : "value" 형태와 쉼표를 활용하여 작성, 2개 이상의 객체를 추가할 경우 리스트 형식 안에 작성

db.<>.find() = <> collection 안에 요소를 출력

db.<>.find().pretty() = collection 안에 요소를 보기 쉬운 형태로 출력
 


*/