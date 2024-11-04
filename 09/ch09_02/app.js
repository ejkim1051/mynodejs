const mongoose = require("mongoose");

(async()=>{
    await mongoose.connect("mongodb://localhost:27017");
    console.log(`connected to mongodb`);

    const {Schema} = mongoose;
    const userSchema = new Schema({
        name:{type:String, required:true},
        age:{type:Number, min:0, max:120},
        city:{type:String, required:false}
    });

    const User = mongoose.model('User', userSchema);
    //생성, 저장
    const user1 = new User({name:'Alice',age:55,city:'Busan'});
    const result1 = await user1.save();
    console.log(`user1 : ${JSON.stringify(result1)}`);

    //검색
    const users = await User.find({});
    console.log(`users list : ${JSON.stringify(users)}`);

    //수정
    const updatedUser1 = await User.updateMany({name: 'Alice'}, {$set:{age:15}});
    console.log(`Alice age is : ${JSON.stringify(updatedUser1)}`);

    //삭제
    const deletedUser1 = await User.deleteOne({name:'Alice'});
    console.log(`Alice is deleted : ${JSON.stringify(deletedUser1)}`);
    
})();