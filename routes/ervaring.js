var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');
var Bedrijf = require('../models/bedrijf');
var Auth = require('../models/auth');
var Ervaring = require('../models/ervaring');

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

router.post('/:id', function (req, res, next) {
    Auth.findById(req.params.id, function (err, user) {
        console.log(user);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No user found',
                error: err
            });
        }
        let ervaring = new Ervaring({
            student: req.params.id,
            description: req.body.description,
            rating: req.body.rating
        });
        ervaring.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            Bedrijf.findById(user.bedrijf, function (err, bedrijf) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                if (!bedrijf) {
                    return res.status(500).json({
                        title: 'No bedrijf found',
                        error: err
                    });
                }
                bedrijf.ervaringen.push(ervaring)
                bedrijf.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    user.ervaringen = ervaring;
                    user.save(function (err, result) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        res.status(201).json({
                            message: 'Ervaring opgeslagen',
                            obj: result
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;