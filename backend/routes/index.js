var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;

const path = require('path');
//const express = require('express');
const webPush = require('web-push');

// Push 通知に使用する鍵ペアを読み込んでおく
const applicationServerKeys = require('../application-server-keys.json');
webPush.setVapidDetails('mailto:example@example.com', applicationServerKeys.publicKey, applicationServerKeys.privateKey);

// サーバ準備
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname ,'../kc3hack_h')));  // 静的ファイル

/** @type {Array<PushSubscription>} 通知の送信先情報を控えておく */
/* DB使って制御 */
const pushSubscriptions = [];

// Subscribe : 通知の送信先情報を控える
app.post('/subscribe', (req, res) => {
  /** @type {PushSubscription} `webPush.PushSubscription` インターフェースとも同型 */
  const pushSubscription = req.body;
  pushSubscriptions.push(pushSubscription);
  
  res.json({ result: '登録しました！' });
});

// Push : 控えておいた通知先に一斉送信する
app.get('/push', async (_req, res) => {
  // Payload はテキトーに用意しておく
  const payload = JSON.stringify({
    title: 'Message From Server',
    body: 'サーバからの通知メッセージです。Service Worker が受け取ってくれるはず'
  });
  
  /** @type {Array<webPush.SendResult>} Push 送信の結果 */
  const sendResults = await Promise.all(pushSubscriptions.map((pushSubscription) => webPush.sendNotification(pushSubscription, payload)));
  
  res.json({ result: '一斉通知しました！', sendResults });
});
