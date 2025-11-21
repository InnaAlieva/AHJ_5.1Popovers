const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const url = require('url');

const PORT = 8888;


const server = http.createServer(async (req, res) => {
  try {
   
    if (req.url === '/' || req.url === '/index.html') {
      const filePath = path.join(__dirname, 'src', 'index.html');
      const content = await fs.readFile(filePath);
      
      res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      });
      res.end(content);
    } 

    else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    console.error('Ошибка сервера:', err);
    res.writeHead(500);
    res.end('Внутренняя ошибка сервера');
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  
 
  if (process.send) {
    process.send('server-ready');
  }
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
});
