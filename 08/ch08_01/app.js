const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'post.db'
});


const User = sequelize.define("User", {
    username:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:true
    }
});

//즉시 실행 비동기 함수
(async ()=> {
    //awit를 사용하기 위해서 즉시 실행 함수를 정의 합니다.
    //실제 모델을 생성, 데이터를 가져오는 연습은 여기에서 합니다.
    await sequelize.sync({force:false});

    //모델 생성
    // const user1 = await User.create({
    //     username:'user02',
    //     email:'user02@naver.com'
    // });
    // console.log(`user created => ${JSON.stringify(user1)}`);
    
    //모델 생성 벌크 여러개
    // const users = await User.bulkCreate([
    //     {
    //     username:'user03',email:'user03@naver.com'
    //     },
    //     {
    //     username:'user04',email:'user04@naver.com'
    //     },
    //     {
    //     username:'user05',email:'user05@naver.com'
    //     }
    // ]);

    //모델 검색
    // const users = await User.findAll();
    // users.forEach((user) =>{
    //     console.log(`username : ${user.username}, email : ${user.email}`);
    // });

    //수정
    await User.update({
        email:'user02@gmail.com'
    },{
        where:{
            username:'user02'
        }
    })
    //하나만 검색
    const user = await User.findOne({
        where:{
            username:'user02'
        }
    });
    console.log(`username : => ${JSON.stringify(user)}`);

    //삭제
    await User.destroy({
        where:{
            username:'user01'
        }
    });

})();