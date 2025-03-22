//get = 서버에서 정보를 가져오는
//post = 서버에 정보를 보내는

import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import path from 'path'
import fs from 'fs'
import { stringify } from 'querystring';
import mongoose from 'mongoose';


const app = express();

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'data', 'writing.json')

// body parser set
app.use(bodyParser.urlencoded({ extended: false })); // express 기본 모듈 사용
app.use(bodyParser.json());

// view engine set
app.set('view engine', 'html'); // main.html -> main(.html)

// nunjucks
nunjucks.configure('views', {
    watch: true, // html 파일이 수정될 경우, 다시 반영 후 렌더링
    express: app
})

const {Schema} = mongoose

// mongoose connect
mongoose
    .connect('mongodb+srv://mjh0317:mjhjunho0317mmm7@cluster0.zuq3l.mongodb.net/') // /<> 해당 데이터베이스에 연결됨
    .then(() => console.log('DB interface'))
    .catch(e => console.error(e))



//mongose set
const WritingSchema = new Schema({
    title: String,
    contents: String,
    date: {
        type: Date,
        default: Date.now,
    }
})

const passwordSchema = new Schema({
    password: String,
})

const Writing = mongoose.model('Writing', WritingSchema)
const Password = mongoose.model('Password', passwordSchema)
// middleware
// main page GET
app.get('/', async (req, res) => {
    // const fileData = fs.readFileSync(filePath)
    // const writings = JSON.parse(fileData)

    //find에 인수가 없으면 Writing으로 이루어진 모든 객체를 가져옴 Writing = DB?
    // let writings = await Writing.find({})
    
    res.render('main');//, {list: writings}
});

app.get('/write',async (req, res) => { //async
    res.render('write');
});

app.post('/write', async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    
    //mongodb에 저장
    const writing = new Writing({
        title: title,
        contents: contents,
    })

    const result = await writing.save().then(() => {
        // res.render('detail', {'detail': result });
        res.render('main');
        
    }).catch(e => {
        console.error(e)
        res.render('write')
    })
    
});

app.get('/login',async (req, res) => { //async
    res.render('login');
});

app.post('/login', async (req, res) => {
    const passwordInput = req.body.password;

    const password = await Password.findOne({});
    if(passwordInput == password.password)
    {
        let writings = await Writing.find({})
        res.render('main', {list: writings})
    }
    else{
        res.render('login')
    }
})
// mongodb에서 모든 document는 ObjectId라는 객체로 고유의 id값읋 _id (key)에 담고 있음
app.get('/detail/:id', async (req, res) => {
    const id = req.params.id;

    const detail = await Writing.findOne({_id : id}).then((result) => {
        res.render('detail', {'detail': result})
    }).catch((err) => {
        console.error(err)
    })
    // res.render('detail');
})

app.listen(3000, () => {
    console.log('Server is running');
});