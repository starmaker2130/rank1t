// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
/*if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
    }
else {*/
  // author(s):  Patrice-Morgan Ongoly
    // version: 0.1.0.10
    // last modified: MONDAY, JUNE 29, 2020 23:04 EDT
    // description:

    // required modules
    /*
    var keypress = require('keypress');
    var maiden = false;
    var menuFocus = 1;

    var droneIsFlying = false;
    var commandQueueIsEmpty = true;
    var commandQueue = [];
    var commandHistory = [];
   // var name = "";
    var bebop = require('node-bebop');
    var droneMovingSpeed = 5;
    var droneTurningSpeed = function(){
        return Math.min(droneMovingSpeed*2, 100);
    };

    */
    var bodyParser = require('body-parser');
    var express = require('express');
    var WhichBrowser = require('which-browser');
    // main application instance
    // var keypress = require('keypress');

    var app = express();

    // main application settings

    var config = {
        PORT: process.env.PORT || 3000,
        DIRECTORY: [
            "./",           /* 0 */
            "./css",        /* 1 */
            "./js",         /* 2 */
            "./media/texture",  /* 3 */
            "./media/gifs", /* 4 */
            "./media/pattern", /* 5 */
            "./media/img",  /* 6 */
            "./media/audio",   /* 7 */
            "./media/model",    /* 8 */
            "./media/upload",       /* 9 */
            "./media/fonts",     /* 10 */
            "./media/ico",  /* 11 */
            "./media/vid",  /* 12 */
            "./media/tf-models",  /* 13 */
        ]
    };

    var deviceType = 'unknown';
    let dir = config.DIRECTORY;

    app.engine('html', require('ejs').renderFile);

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    app.use(express.static('/'));

    app.get('/', function(req, res){
        var result = new WhichBrowser(req.headers);
        console.log(result.toString());
        if(result.isType('desktop')){
            console.log('This is a desktop computer.');
            deviceType = 'desktop';
        }
        else{
            console.log('This is a mobile device.');
            deviceType = 'mobile';
        }

        res.render('index.html',{root: dir[0]});
    });
    
    app.get('/css/:stylesheet_id', function(req, res){
        let stylesheet_id = req.params.stylesheet_id;
        res.sendFile(stylesheet_id, {root: dir[1]});
    });

    app.get('/js/:script_id', function(req, res){
        var script_id = req.params.script_id;
        res.sendFile(script_id, {root: dir[2]});
    });

    app.get('/media/texture/:texture_id', function(req, res){
        var texture_id = req.params.texture_id;
        res.sendFile(texture_id, {root: dir[3]});
    });

    app.get('/media/gifs/:gif_id', function(req, res){
        var gif_id = req.params.gif_id;
        res.sendFile(gif_id, {root: dir[4]});
    });

    app.get('/media/pattern/:pattern_id', function(req, res){
        var pattern_id = req.params.pattern_id;
        res.sendFile(pattern_id, {root: dir[5]});
    });

    app.get('/media/img/:img_id', function(req, res){
        var img_id = req.params.img_id;
        res.sendFile(img_id, {root: dir[6]});
    });

    app.get('/media/icon/:icon_id', function(req, res){
        var icon_id = req.params.icon_id;
        res.sendFile(icon_id, {root: dir[11]});
    });

    app.get('/media/audio/:audio_id', function(req, res){
        var audio_id = req.params.audio_id;
        res.sendFile(audio_id, {root: dir[7]});
    });

    app.get('/media/model/:model_id', function(req, res){
        var model_id = req.params.model_id;
        res.sendFile(model_id, {root: dir[8]});
    });
   
    app.get('/media/uploads/:upload_id', function(req, res){
        var upload_id = req.params.upload_id;
        res.sendFile(upload_id, {root: dir[9]});
    });

    app.get('/media/fonts/:font_id', function(req, res){
        var font_id = req.params.font_id;
        res.sendFile(font_id, {root: dir[10]});
    });

    app.get('/media/vid/:vid_id', function(req, res){
        var vid_id = req.params.vid_id;
        res.sendFile(vid_id, {root: dir[12]});
    });

    var io = require('socket.io').listen(app.listen(config.PORT, function(){
        console.log(`booting up your ARrow...\n\n\n--------------------------------------------------`);
        console.log(`--------------------------------------------------`);
        console.log(`--      HOUSE OF VENUS BENEFIT CORPORATION      --`);
        console.log(`--------------------------------------------------`);
        console.log(`--                    BANTXR                    --`);
        console.log(`--                  V. 0.1.0.10                 --`);
        console.log(`--------------------------------------------------`);
        console.log(`--------------------------------------------------`);
        console.log(`--------------------------------------------------`);
        console.log(`--     listening on port ${config.PORT}                   --`);
        console.log(`--------------------------------------------------`);
    }));

    io.sockets.on('connection', function(socket){
        var conn = socket;

        socket.on("CLIENTconnectToSERVER", function(data){
            console.log("CLIENT connected to SERVER...");
            let message = data;
            if(message.targetDIA=="Foodid"){
                socket.emit("SERVERloadRestaurantMetaDataAtNodesOnCLIENT", {status: true, locations: Restaurants});
            }
            else if(message.targetDIA=="New York Times"){
                socket.emit("SERVERloadImmersiveNewspaperOnCLIENT", {status: true, paper: DecentralizedImmersiveApplications["New York Times"].object.dataSource});
                
                ActiveDias.push({id: socket, name: "NYT", ver: "0.0.24", aut: "@pamo"});
                console.log("active dia registered");
            }
            else{
                console.log("no associated dia found in registry.")
            }
             
        });
       
        socket.on('disconnect', function(){
            console.log(`socket ${socket.id} disconnected.`);
        });
    });
//}//