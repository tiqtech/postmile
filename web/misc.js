/*
* Copyright (c) 2011 Yahoo! Inc. All rights reserved. Copyrights licensed under the New BSD License.
* See LICENSE file included with this code project for license terms.
*/

// Load modules

var Email = require('./email');
var Config = require('./config');


// Welcome page

exports.welcome = function (req, res, next) {

    res.api.redirect = req.api.profile.view;
    next();
};


// About page

exports.about = function (req, res, next) {

    res.api.view = { template: 'about' };
    next();
};


// Developer page

exports.developer = function (req, res, next) {

    res.api.view = { template: 'developer', locals: { theme: 'developer' } };
    next();
};


// Developer Console

exports.console = function (req, res, next) {

    res.api.view = { template: 'console' };
    next();
};


// Set I'm with stupid cookie

exports.stupid = function (req, res, next) {

    res.api.cookie = {

        values: ['imwithstupid=true'],
        attributes: ['Path=/']
    };

    res.api.redirect = '/';
    next();
};


// Feedback page

exports.feedback = function (req, res, next) {

    if (req.method === 'GET') {

        res.api.view = { template: 'feedback' };
        next();
    }
    else {

        var feedback = 'From: ' + (req.body.username ? req.body.username : req.body.name + ' <' + req.body.email + '>') + '\n\n' + req.body.message;
        Email.send(Config.email.feedback, 'Posmile site feedback', feedback);

        res.api.view = { template: 'feedback', locals: { env: { message: 'Your feedback has been received!'}} };
        next();
    }
};


// Client configuration script

exports.config = function (req, res, next) {

    res.api.result = 'var postmile = { domain: \'' + Config.host.web.domain + '\', scheme: \'' + Config.host.web.scheme + '\' };';
    res.api.isAPI = true;
    next();
};