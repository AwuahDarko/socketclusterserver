
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
    key: fs.readFileSync('/etc/letsencrypt/live/?/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/?/fullchain.pem'),
  },
  app
)
  .listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
  });

// app.enable('trust proxy');

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

  socket.on('message', (data) => {
    try {

      const yellow = JSON.parse(data)
      const message = yellow.data;

      scServer.exchange.publish(message.channel, JSON.stringify(message.data));
    } catch (error) {

    }
  })
});


app.post('/socketserver/publish', (req, res) => {

  const { channelName, data } = req.body;

  try {
    scServer.exchange.publish(channelName, JSON.stringify(data));
    res.status(200).json({ message: 'Sent' })
  } catch (error) {

  }
})






