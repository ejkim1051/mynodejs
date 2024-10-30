const fs = require('fs');

const dirname = "naver/daum/google"
fs.mkdirSync(dirname, {recursive:true});

const content = "안녕하세요 네이버 구글 다음 중 하나에 입사하고 싶어요.";

fs.writeFileSync(`${dirname}/out2.txt`, content, 'utf-8');

