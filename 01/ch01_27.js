const posts = {
    data: [
        {
            title: 'Test Title',
            content:'Test Content',
            author:{
                name:'lee',
                id:1,
                age:15
            }
        },
        {
            title: 'Test Title2',
            content:'Test Content2',
            author:{
                name:'hong'
            }
        },
        {
            title: 'Test Title3',
            content:'Test Content3'
        }
    ]
}

posts['data'].forEach((item=>{
   /* if('author' in item){
        console.log(item['author']['name']);
    }*/
        try{
            console.log(item['author']['name']);
        }catch(error){
            console.log(`error: ${error}`);
        }finally{
            console.log('finally');
        }
    console.log('---------------');
}));

