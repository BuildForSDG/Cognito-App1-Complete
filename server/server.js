let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
// const ejs = require("ejs");


const userRoute = require('../server/routes/routes')



mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();

app.set('view engine', 'ejs');


app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/reactaxios', {useNewUrlParser: true});

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

app.listen(3100, function() {
    console.log("Server started on port 3100");
  });

// // Error Handling
// app.use((req, res, next) => {
//     next(createError(404));
// });



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


//  API = http://localhost:3100/reports