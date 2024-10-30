const fs = require('fs');

const content = '안녕하세요. 오늘은 날씨가 좋아용. 맛있는 점심을 먹고 오늘도 화이팅 하세용';

/*fs.writeFile('out.txt', content, 'utf-8', (err) => {
    console.error(err);
});*/

fs.writeFileSync('out.txt2', content, 'utf-8');