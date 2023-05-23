const line = require('@line/bot-sdk');
const express = require('express');
const https = require('https');
const fs = require('fs');

// LINE Bot 設定
const lineConfig = {
  channelAccessToken: 'nDj2Mt6GRKy5Y7SKWA9YPaI2aPnDCCM7Qot9ML3pTgCHiNju32N4CPFScWIaX/5+g4/LfX5gkRKo0WqsSKQBave2s8faPtnvAP3Pty7KRuOFyvlwGthhnOv0K2Dx2kovxp4LNffVM4vF7Jg4X20nXAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '4184dd532d4b3c8fd971445161d4c27e',
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