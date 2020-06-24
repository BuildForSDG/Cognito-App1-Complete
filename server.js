const express = require('express');
// const favicon = require('express-favicon');
// const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// let database = require('./db');
// require('dotenv').config();


// app.use(cors());
// app.use(favicon(__dirname + '/build/favicon.ico'));
const userRoute = require('./routes')

// mongoose.Promise = global.Promise;
// mongoose.connect(database.db, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Database connected sucessfully !')
// },
//     error => {
//         console.log('Database could not be connected : ' + error)
//     }
// )


// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });

app.use(cors())
mongoose.connect('mongodb://localhost:27017/reactaxios', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database Connected..')
}).catch(err => console.log(err)) ;

const reportSchema = {
    city: String,
    location: String,
    details: String
}

const Report = mongoose.model('Report', reportSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors());
app.use('/users', userRoute)

app.get('/reports', function(req, res){
    Report.find(function(err, foundReports){
        if(!err){
            return res.send(foundReports)
        }else{
            res.send(err)
        }
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


app.listen(port)

console.log('Server running on port ' + port)