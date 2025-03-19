//esm 스타일
import { createServer } from 'http';
const server = createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write('hello node.js');
    res.end();
})
//nodejs 는 3000번 포트
//localhost:3000
server.listen(3000,() => {
    console.log('server is listening on port 3000')
});

//프로젝트 요약본
//express 프레임워크 사용
//= 미들웨어 연결
//요청과 응답 사이에서 목적을 위해 작동하는 함수