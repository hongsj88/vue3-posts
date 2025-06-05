// server.js

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// CORS 헤더 추가
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

server.get('/posts-count', (req, res) => {
  const posts = router.db.get('posts').value();
  res.json({ count: Array.isArray(posts) ? posts.length : 0 });
});

// 👉 HEAD 요청에 대한 응답도 명시적으로 추가
server.head('/posts-count', (req, res) => {
  res.sendStatus(200); // 또는 간단하게 200만 응답
});
// 라우터 연결
server.use(router);

// 서버 시작
server.listen(3002, () => {
  console.log('JSON Server is running on port 3002');
});
