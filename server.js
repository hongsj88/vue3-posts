const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // db.json 경로 확인
const middlewares = jsonServer.defaults();

// 기본 미들웨어 사용 (CORS, 로깅 등)
server.use(middlewares);

// CORS 헤더 추가 (X-Total-Count 노출용)
server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// 라우터 연결
server.use(router);

// 3002 포트에서 서버 실행
server.listen(3002, () => {
  console.log('JSON Server is running on port 3002');
});
