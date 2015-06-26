// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3002;
var five = require("johnny-five");
var board = new five.Board();

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  var myBoard = board.on("ready", function() {

    // Johnny-Five provides pre-packages shield configurations!
    // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
    this.motors = new five.Motors([
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
    ]);

    io.emit('board ready');
  });

  // socket.on('click', function(msg){
  //   console.log('msg', msg);

  //   // Johnny-Five provides pre-packages shield configurations!
  //   // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  //   var motors = new five.Motors([
  //     five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
  //     five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
  //   ]);

  //   board.repl.inject({
  //       motors: motors
  //     });
    
  //   motors.speed(225);

  //   if (msg === "Backward") {
  //      motors.reverse(225);
  //   }

  //   if (msg === "Right") {
  //      motors[0].speed(20);
  //      motors[0].speed(50);
  //   }

  //   if (msg === "Left") {
  //      motors[1].speed(20);
  //      motors[1].speed(50);
  //   }

  //   // demonstrate stopping after 5 seconds
  //   board.wait(500, function() {
  //     motors.stop();
  //   });   

  // });

  socket.on('mousedown', function(msg){
    console.log('mousedown',msg);

    var motors = myBoard.motors;
    console.log('msg mousedown', msg);

    board.repl.inject({
        motors: motors
    });
    
    if (msg === "Forward") {
      motors.forward(225);

    }

    if (msg === "Backward") {
       motors.reverse(225);
    }

    if (msg === "Right") {
       motors[0].speed(70);
       motors[0].speed(225);
    }

    if (msg === "Left") {
       motors[1].speed(70);
       motors[1].speed(225);
    }

  });

  socket.on('mouseup', function(msg){
    console.log('mouseup',msg);

    var motors = myBoard.motors;
    console.log('msg mousedown', msg);


    board.repl.inject({
        motors: motors
    });
    
    //Not sure how to set back to default value
    if (msg === "Backward") {
       motors.reverse(225);
    }

    motors.stop();

  });  



});
