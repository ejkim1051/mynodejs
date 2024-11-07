const express = require('express');
const fs = require('fs');
const path = require('path');

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const authRoute = require('./routes/authRoute');

const models = require('./models');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/auth', authRoute);

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`); //모델을 테이블로 생성
    models.sequelize.sync({force:false})
    .then(()=>{ //모델생성 성공
        console.log(`db connected`);
    }).catch((err)=>{ //모델생성 실패
        console.error(`db connected error : ${err}`);
        process.exit();
    })
    
});