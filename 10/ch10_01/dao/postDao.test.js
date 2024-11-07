const postDao = require('./postDao');

describe("Test post DAO", ()=>{
    test("should", async ()=>{
        const data = {
            title:"Jest Test",
            content:"Jest Test",
            UserId:1
        }
        const result = await postDao.createPost(data);
        expect(result.title).toBe(data.title);
    });

});