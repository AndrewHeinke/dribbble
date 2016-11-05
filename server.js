var express = require('express');
var app = express();

var sassMiddleware = require('node-sass-middleware');
var serveStatic = require('serve-static');
var srcPath = __dirname + '/public/sass';
var destPath = __dirname + '/public/css';

var PORT = process.env.PORT || 3000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

// log requests to the console
app.use(morgan('dev'));

//Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// set up ejs for templating
app.set('view engine', 'ejs');

// auto compile sass to css
app.use('/css', sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'compressed',
}));

app.use('/',
serveStatic('./public', {})
);

require('./app/routes.js')(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
