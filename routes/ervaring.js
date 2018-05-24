var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');
var Auth = require('../models/auth');
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

router.get('/', function(req, res, next){
    Identifier.find()
        .exec(function(err, identifier){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Success',
                obj: identifier
            });
        });
});

router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Identifier.findById(req.params.id, function(err, identifier){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!identifier){
            return res.status(500).json({
                title: 'No identifier found!',
                error: {message: 'Identifier not found'}
            });
        }

        identifier.nfcId = req.body.nfcId;
        identifier.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title:'Kaart geupdatet',
                obj: result
            });
        });
    });
});



router.post('/:id', function (req, res, next) {
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
    Identifier.findById(req.params.id, function (err,identifier) {
        console.log(identifier);
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!identifier) {
            return res.status(500).json({
                title: 'No identifier found!',
                error: {identifier: 'Identifier not found!'}
            });
        }
        identifier.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title:'Kaart succesvol verwijderd',
                obj: result
            });
        });
    });
});

module.exports = router;