const date = new Date();
const hour = date.getHours();

if(hour < 11){
    console.log(`아침`);
}else{
    if(hour < 15){
        console.log(`점심`);
    }else{
        console.log(`저녁`);
    }
}