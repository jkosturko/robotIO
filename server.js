// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
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



  board.on("ready", function() {

    console.log('board ready');
    io.emit('board ready');
  });


  // socket.on('click', function(msg){
  //   io.emit('click', msg);
  //   console.log (msg);
  // });



    socket.on('click', function(msg){
      console.log('msg', msg);


          // Johnny-Five provides pre-packages shield configurations!
    // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
    var motors = new five.Motors([
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
    ]);

    board.repl.inject({
        motors: motors
      });
    
    motors.speed(180);

    if (msg === "Backward") {
       motors.reverse(180);
    }

    if (msg === "Right") {
       motors[0].speed(20);
       motors[0].speed(50);
    }

    if (msg === "Left") {
       motors[1].speed(20);
       motors[1].speed(50);
    }

       // demonstrate stopping after 5 seconds
      board.wait(500, function() {
        motors.stop();
      });   



  // io.emit('click', msg);
    console.log ('secondthing to do');
    });


});





    // // Johnny-Five provides pre-packages shield configurations!
    // // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
    // var motors = new five.Motors([
    //   five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    //   five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
    // ]);

    // this.repl.inject({
    //   motors: motors
    // });

    // motors.speed(80);

    // // board.wait(500, function() {
    // //   motors.reverse(90);
    // // });

    // // board.wait(500, function() {
    // //   motors.forward(90);
    // // });

    //    // demonstrate stopping after 5 seconds
    //   board.wait(500, function() {
    //     motors.stop();
    //   });   


