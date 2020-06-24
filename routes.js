
let express = require('express'),
    router = express.Router();

let report = require('./report-schema');

router.route('/create').post((req, res, next) => {
    report.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    report.find((error, data) => {
        if (error) {
            return (error)
        } else {
            res.json(data)
        }
    })
})

router.route('/edit/:id').get((req, res) => {
    report.findById(req.params.id, (error, data) => {
        if (error) {
            return (error)
        } else {
            res.json(data)
        }
    })
})

router.route('/reports', function(req, res){
    router.use(cors());
    router.find(function(err, foundReports){
        if(!err){
            return res.send(foundReports)
        }else{
            res.send(err)
        }
    });
});

router.route('/update/:id').put((req, res, next) => {
    report.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    report.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;