// lib/app.ts
import express = require('express');
const bodyParser = require('body-parser');

//import routes
const movie = require('./routes/movie.route');

// Create a new express application instance
const app: express.Application = express(); 



//connect to mongo w/ mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

//Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/movies', movie);

app.get('/', function (req, res) {
  res.send('Brought to you by PipisCrew');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

/*
apps:
https://robomongo.org/download
https://github.com/portapps

refs:
https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
https://codeforgeek.com/server-side-pagination-using-node-and-mongo/
https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb

https://flaviocopes.com/node-mongodb/
https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

libs:
https://www.npmjs.com/package/mongoose
https://www.npmjs.com/package/body-parser

refs2:
https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
http://mfikri.com/en/blog/nodejs-mysql-crud
https://www.eelsgo.com/en-IN/article/node%20js%20typescript%20best%20practices
*/