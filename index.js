const line = require('@line/bot-sdk');
const express = require('express');
const https = require('https');
const fs = require('fs');

// LINE Bot 設定
const lineConfig = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};

const lineClient = new line.Client(lineConfig);

// HTTPS 憑證設定
const options = {
  key: fs.readFileSync('privkey.pem','utf8'),
  cert: fs.readFileSync('cert.pem','utf8'),
  ca : fs.readFileSync('chain.pem','utf8')
};

// 建立 Express 伺服器
const app = express();
const port = 8888;

// LINE Bot 路由處理
app.post('/webhook', line.middleware(lineConfig), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// LINE Bot 事件處理
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
const res = await api.sendMessage('Hello World!')
  console.log(res.text)
  const replyMessage = {
    type: 'text',
    text: event.message.text
  };

  return lineClient.replyMessage(event.replyToken, replyMessage);
}

// 啟動伺服器
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});