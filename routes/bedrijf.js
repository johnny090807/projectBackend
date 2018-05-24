var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');
var Auth = require('../models/auth');
var Identifier = require('../models/identifier');
var Bedrijf = require('../models/bedrijf');
var identifiersIds = [];


router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});
router.get('/:id', function(req, res, next){
    var authId = req.params.id;
    Bedrijf.findById({_id: authId}, function(err, result){
        if (!result){
            return res.status(200).json({
                title: 'Geen bedrijf gevonden',
                obj: {naam: "Geen"}
            })
        }
        if(err){
            return res.status(500).json({
                title: 'Er is iets mis gegaan',
                error: {message: "Er is iets mis gegaan"}
            })
        }
        res.status(200).json({
            title: "succes",
            obj: result
        })
    })

});

router.get('/', function(req, res, next){
    Bedrijf.find()
        .exec(function(err, bedrijf){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Success',
                obj: bedrijf
            });
        });
});

// router.get('/:id', function(req, res, next){
//     const { id } = req.params;
//     Auth.findOne({_id: id})
//         .select('bedrijfs')
//         .populate({
//             'path': 'bedrijfs'
//         })
//         .then((auth)=> {
//             if (!auth) throw new Error('gebruiker niet gevonden');
//             return res.status(200).json(auth.bedrijf);
//         })
//         .catch((error) => {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: error
//             });
//         });
//
// });
// router.patch('/:id', function(req, res, next){
//     var decoded = jwt.decode(req.query.token);
//     Bedrijf.findById(req.params.id, function(err, identifier){
//         if(err){
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         if(!identifier){
//             return res.status(500).json({
//                 title: 'No identifier found!',
//                 error: {message: 'Identifier not found'}
//             });
//         }
//
//         identifier.nfcId = req.body.nfcId;
//         identifier.save(function(err, result){
//             if (err){
//                 return res.status(500).json({
//                     title: 'An error occurred',
//                     error: err
//                 });
//             }
//             res.status(201).json({
//                 title:'Kaart geupdatet',
//                 obj: result
//             });
//         });
//     });
// });
router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Bedrijf.findById(req.params.id, function(err, bedrijf){
        console.log(bedrijf)
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!bedrijf){
            return res.status(500).json({
                title: 'Bedrijf niet gevonden!',
                error: {message: 'Bedrijf niet gevonden!'}
            });
        }


        bedrijf.naam = req.body.naam;
        bedrijf.locatie = req.body.locatie;
        bedrijf.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title:'Bedrijf geupdatet',
                obj: result
            });
        });
    });
});

router.post('/:id', function(req, res, next){
        console.log(req.params.id, req.body.bedrijfId)
    Auth.findById(req.params.id, function(err, auth) {
        console.log("auth", auth);
        if (err) {
            return res.status(500).json({
                title: 'er is iets mis gegaan',
                error: err
            })
        }
        if (!auth) {
            return res.status(500).json({
                title: 'geen gebruiker gevonden',
                error: {message: 'geen gebruiker gevonden'}
            })
        }
        // let bedrijf = new Bedrijf({
        //     naam: req.body.naam,
        //     locatie: req.body.locatie,
        //     ervaringen: undefined,
        //     _id: req.body._id
        // });
        auth.bedrijf = req.body.bedrijfId;
        auth.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Er is iets misgegaan',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Bedrijf toegevoegd',
                obj: result
            });
        });
    });
});

router.post('/', function (req, res, next) {
        let bedrijf = new Bedrijf({
            naam: req.body.naam,
            locatie: req.body.locatie
        });

        bedrijf.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Er is iets misgegaan',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Bedrijf opgeslagen',
                obj: result
            });
        });
    });

router.delete('/:id', function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
    Bedrijf.findById(req.params.id, function (err,bedrijf) {
        console.log(bedrijf);
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!bedrijf) {
            return res.status(500).json({
                title: 'No Bedrijf found!',
                error: {message: 'Bedrijf not found!'}
            });
        }
        bedrijf.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title:'Bedrijf succesvol verwijderd',
                obj: result
            });
        });
    });
});


module.exports = router;