const express = require('express');
const moment = require('moment');
const path = require('path');
const Database = require('better-sqlite3');

const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(255),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
    create table if not exists comments(
        id integer primary key autoincrement,
        content text not null,
        postId integer,
        foreign key(postId) references posts(id)
    );
`;

db.exec(create_sql);

const app = express();
const PORT = 3000;
app.use(express.json());

//게시판 생성
app.get("/posts", (req, res) =>{
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    let sql = `select id, title, author, createdAt, count from posts
                order by createdAt desc limit ? offset ? `;
    const stmt = db.prepare(sql);
    const rows = stmt.all(limit, offset);

    const total_sql = `select count(*) as count from posts`;
    const row = db.prepare(total_sql).get();
    const totalPages = Math.ceil(row.count / limit);

    res.json({items:rows, currentPage:page, totalPages:totalPages});
});

//게시판 ID찾기
/*app.get("/posts/:id", (req, res) =>{
    const id = req.params.id;

    let sql = `select * from posts where id = ?`;
    let count_sql = `update posts set count = count + 1 where id = ?`;
    db.prepare(count_sql).run(id);
    const post = db.prepare(sql).get(id);
    res.status(200).json({item:post});
});*/

//게시판 id상세 댓글포함
app.get("/posts/:id", (req, res) =>{
    const id = req.params.id;

    const sql = `
select p.*,'[' || group_concat('{"id":'||c.id||',"content":"'||c.content ||'"}')||']'as comments From posts p left join comments c on p.id = c.postId
where p.id = ?
group by p.id`;
    const count_sql = `update posts set count = count + 1 where id = ?`;
    db.prepare(count_sql).run(id);
    const post = db.prepare(sql).get(id);
    post.comments = JSON.parse(post.comments); 
    res.status(200).json({item:post});
});

//게시판 게시글 쓰기
app.post("/posts", (req,res)=>{
    const {title, content, author}  = req.body;
    const sql = `insert into posts(title, content, author) values(?, ?, ?)`;
    const result = db.prepare(sql).run(title, content, author);
    console.log(`result is : ${JSON.stringify(result)}`);
    res.status(201).json({id:result.lastInserRowid, title:title, content:content});
});

//게시판 수정 및 업데이트
app.put("/posts/:id", (req, res) =>{
    const id = req.params.id;
    const {title, content } = req.body;
    let sql = `update posts set title = ?, content = ? where id = ?`;

    try{
        const result = db.prepare(sql).run(title, content, id);
        //console.log(`update result : ${JOSN.stringify(result)}`);
        if(result.changes){
            res.status(200).json({result:'success'});
        }else{
            res.status(404).json({error:'post not found'});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

//게시판 삭제
app.delete("/posts/:id", (req, res) =>{
    const id = req.params.id;
    const sql = `delete from posts where id = ?`;

    try{
        const result = db.prepare(sql).run(id);
        if(result.changes){
            res.status(200).json({result:'success'});
        }else{
            res.status(404).json({error:'post not found'});
        }
    }catch(e){
        res.status(500).json({error:e});
    }
});

//댓글달기
app.post("/posts/:id/comments", (req,res)=>{
    const postId = req.params.id;
    const {content} = req.body;
    const result = db.prepare(`insert into comments(postId, content) values(?, ?)`).run(postId, content);
    res.status(200).json({id:result.lastInserRowid, postId:postId, content:content});
});

//댓글
app.get("/posts/:id/comments", (req,res)=>{
    const postId = req.params.id;
    const comments = db.prepare(`select * from comments where postId = ?`).all(postId);
    res.json({comments:comments});
});

app.put("/posts/:postId/comments/:id", (req, res) =>{
    const {content} = req.body;
    const id = req.params.id;
    let result = db.prepare(`update comments set content = ? where id = ?`).run(content, id);

    if(result.changes){
        res.status(200).json({result:'ok', message:'success', error:''});
    }else{
        res.status(404).json({result:'ok', message:'post not found'});
    }
});

app.delete("/posts/:postId/comments/:id", (req, res) =>{
    const id = req.params.id;
    const result  = db.prepare(`delete from comments where id = ?`).run(id);

    if(result.changes){
        res.status(200).json({result:'ok', message:'success', error:''});
    }else{
        res.status(404).json({result:'ok', message:'post not found'});
    }
});





app.listen(PORT);