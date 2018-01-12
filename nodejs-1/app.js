// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./package.json');
var globalx = require('./globals/globals.js');
var ports = config.port;
var apiPort = ports.api;
var url = config.env.urls[config.env.current] + ":" + apiPort;
var request = require('request');
var session = require('express-session');
var uuidv1 = require('uuid/v1');
var cors = require('cors');

var sess = {
    genid: function () {
        return "xx" + uuidv1(); // use UUIDs for session IDs 
    },
    secret: uuidv1(),
    cookie: {},
    resave: true,
    saveUninitialized: true
} 

if(app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy 
    sess.cookie.secure = true; // serve secure cookies 
}

app.use(session(sess));
app.use(cors());
app.set('etag', false);
app.set('x-powered-by', false);
//app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'cshtml');
 

var isEmpty = function (o) {
    return o === null || o === undefined;
}

// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || apiPort; // set our port





// ROUTES FOR OUR API
// =============================================================================

// create our router
var apiRouter = express.Router();
// var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function (req, res, next) {
    // do logging
    //console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/', function (req, res) {
    res.send('Hello from API!');
});


// on routes defined dynamically.

// each api/x goes through specific x.js file.
var defineCommonRoutes = function (isApi, arrays, xRouter, global) {
   
    for (let i = 0; i < arrays.length; i++) {
        var item = arrays[i];

        xRouter
            .route(item)
            .post(function (req, res) {
                callfunction(isApi, req, res, 'Post', global);
            })
            .get(function (req, res) {
                callfunction(isApi, req, res, 'Get', global);
            }).put(function (req, res) {
                callfunction(isApi, req, res, 'Put', global);
            }).delete (function (req, res) {
                callfunction(isApi, req, res, 'Delete', global);
            });
    }
}

var possibleRoutes = [
    "/:name",
    "/:name/:specificFunction",
    "/:name/:id",
    "/:name/:specificFunction/:id",
    "/:name/:specificFunction/:id/:id2"
];


defineCommonRoutes(true, possibleRoutes, apiRouter, globalx); // api folder
// defineCommonRoutes(false, possibleRoutes); // controllers folder

var getResponseFromFile = function (isApi, name) {
	var folderName = "api";
	
	if(!isApi){
		folderName = "controllers";
	}
	
    if (name) {
        return require("./" + folderName +  "/" + name + ".js");
    }
}

var callfunction = function (isApi, req, res, type) {
    console.log(req.params);

    var params = req.params,
        name = params.name,
        functionName,
        runningFunction;

    var possibleFunctionsNames = createPossibleFunctionNames(req, res, type);

    if (name) {
        var fileJs = getResponseFromFile(isApi, name);

        for (var i = 0; i < possibleFunctionsNames.length; i++) {
            functionName = possibleFunctionsNames[i];
            if (!isEmpty(fileJs[functionName])) {
                runningFunction = fileJs[functionName];
                break;
            } else {
                if ((possibleFunctionsNames.length - 1) === i) {
                    res.send("Sorry file [" + name + ".js] doesn't have any of these [" + possibleFunctionsNames.join(",") + "] functions.");
                    return;
                }
            }
        }

        console.log(runningFunction);
		
		if(isApi){
			// Api
			res.json(runningFunction.apply(this, [req, req.params, req.body, app, config]));
		} else {
			// controllers
			res.send(runningFunction.apply(this, [req, req.params, req.body, app, config]));
		}
        
    }
} 

var createPossibleFunctionNames = function (req, res, type) {
    var possibilities = [];

    var params = req.params,
        name = params.name,
        functionName;

   
    if (params.specificFunction) {
        functionName = params.specificFunction;
    } else {
        functionName = params.name;
    }

    possibilities.push(functionName + type);
    possibilities.push(name + type);
    possibilities.push(functionName);
    possibilities.push(name);

    // console.log(possibilities);

    return possibilities;
}

// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);
app.use('/', apiRouter);


// START THE SERVER
// =============================================================================



app.listen(port);

console.log('Running at :' + port);
