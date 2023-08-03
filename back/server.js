const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const indexRouter = require('./routes');
const userRouter = require('./routes/user')
const cors = require('cors')


app.use(express.json()) // json 변환에 필요한것
app.use(cors()) // cors 때문에 필요한것

// 1. port 번호 설정
app.set('port',process.env.PORT||3333);

// 2. 동적인 페이지 설정 - nunjucks
app.set('view engine','html');
nunjucks.configure('views',{
    express : app,
    watch : true
})

// 3. post 방식으로 데이터를 넘겨줄 떄 필요함
app.use(bodyParser.urlencoded({extended : true}));

// 4. 정적인 파일들 public에 접근
app.use(express.static(__dirname+'/public'));

// 5. 세션 저장소 관리
app.use(session({
    httpOnly : true,
    resave : false,
    secret : 'secret',
    store : new fileStore()
}))

// 6. 라우팅 처리
app.use('/',indexRouter);
app.use('/user',userRouter);

app.listen(app.get('port'),()=>{
    console.log(app.get('port')+'번 포트에서 대기 중..')
});