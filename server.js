
var http = require('http');
const fs = require('fs');
const https = require('https');
var socketClusterServer = require('socketcluster-server');
var serveStatic = require('serve-static');
var path = require('path');
const bodyparser = require('body-parser');
const app = require('express')();

app.use(serveStatic(path.resolve(__dirname, 'public')));

const PORT = process.env.PORT || 8000;

// ? ====== FOR HTTP CONFIG =========

// var server = http.createServer();
// server.on('request', app);
// server.listen(8000);

// ? ================================

// ? ##################################
// ? ##################################
// ? ##################################
// ? ##################################

// ? ====  FOR HTTPS CONFIG ==================

const server = https.createServer(
  {
    key: fs.readFileSync('/etc/letsencrypt/live/ulsorb.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/ulsorb.com/fullchain.pem'),
  },
  app
)
  .listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
  });

// app.enable('trust proxy');

// server.on('request', app);

// ? =========================================
// ? ##################################
// ? ##################################
// ? ##################################


app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json());


// Attach socketcluster-server to our httpServer
var scServer = socketClusterServer.attach(server, {
  protocolVersion: 1,
  path: '/socketcluster/'
});


scServer.on('connection', function (socket) {
  // console.log('was connected', socket.id)

  socket.on('message', (data) => {
    try {
      // console.log('yellow', data)
      const yellow = JSON.parse(data)
      const message = yellow.data;

      console.log('message.channel', message.channel)
      console.log('message.data', message.data)

      scServer.exchange.publish(message.channel, JSON.stringify(message.data));
    } catch (error) {
      console.log('json parse error --->', error)
    }
  })
});


app.post('/socketserver/publish', (req, res) => {

  const { channelName, data } = req.body;

  scServer.exchange.publish(channelName, JSON.stringify(data));

  res.status(200).json({ message: 'Sent' })
})






