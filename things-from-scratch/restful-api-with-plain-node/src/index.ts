import http, { ServerResponse } from 'http';

const server = http.createServer((_, res: ServerResponse) => {
  res.end('Hello World');
});

server.listen('3000', () =>
  console.log('✅ server is running and listening to port :3000')
);
