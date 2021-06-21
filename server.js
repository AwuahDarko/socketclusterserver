

// var http = require('http');
// var socketClusterServer = require('socketcluster-server');

// var httpServer = http.createServer();
// var scServer = socketClusterServer.attach(httpServer, {
//     protocolVersion: 1,
//     path: '/socketcluster/'
// });

// const connections = []

// scServer.on('connection', function (socket) {
//     // ... Handle new socket connections here
//     connections.push(socket)

//     console.log('was connected', connections.length)
//     console.log('was connected', socket.id)

//     // setTimeout(() => {
//     //     console.log('sending....')
//     //     scServer.exchange.publish('RETAILER_1', "Hello world");
//     // }, 5000)
//     // socket.on('RETAILER_1', function (data) {
//     //     // count++;
//     //     console.log('PING', data);
//     //     scServer.exchange.publish('RETAILER_1', data);
//     //   });
//     // scServer.on('RETAILER_', (data, res) => {
//     //     console.log('on subscribe', data)
//     //     console.log('on res', res)
//     //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
//     // })

//     // scServer.on('#publish', (sub) => {
//     //     console.log('on #publish', sub)
//     //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
//     // })

//     // scServer.on('publish', (sub) => {
//     //     console.log('on publish1', sub)
//     //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
//     // })


//     socket.on('RETAILER_', (sub) => {
//         console.log('on publish', sub)
//         scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
//     })

//     socket.on('amen', (sub) => {
//         console.log('on amen', sub)
//         // scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
//     })
// });


// scServer.on('amen', (sub) => {
//     console.log('on publish', sub)
//     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// })

// // scServer.on('#publish', (sub) => {
// //     console.log('on publish', sub)
// //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// // })

// // scServer.on('message', (sub) => {
// //     console.log('on publish', sub)
// //     // scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// // })

// // scServer.on('ping', (sub) => {
// //     console.log('on publish', sub)
// //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// // })
// // scServer.on('publish', (sub) => {
// //     console.log('on message in', sub)
// //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// // })

// // scServer.on('message', (sub) => {
// //     console.log('on message out', sub)
// //     scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
// // })

// httpServer.listen(8000);


var http = require('http');
var socketClusterServer = require('socketcluster-server');
var serveStatic = require('serve-static');
var path = require('path');
var app = require('express')();

app.use(serveStatic(path.resolve(__dirname, 'public')));

var httpServer = http.createServer();

// Attach express to our httpServer
httpServer.on('request', app);

// Attach socketcluster-server to our httpServer
var scServer = socketClusterServer.attach(httpServer, {
      protocolVersion: 1,
    path: '/socketcluster/'
});

scServer.on('connection', function (socket) {
  // ... Handle new socket connections here

    //   console.log('was connected', connections.length)
    console.log('was connected', socket.id)

        socket.on('RETAILER_1', (sub) => {
        console.log('on amen', sub)
        // scServer.exchange.publish('RETAILER_1', "Hello world ooooooooo");
    })

    socket.on('message', (yellow) =>{
        console.log('yellow', yellow)
    })
});

scServer.on('message', function (socket) {
    // ... Handle new socket connections here
  
      //   console.log('was connected', connections.length)
      console.log('was connected', socket)

  });

// console.log(scServer)

httpServer.listen(8000);