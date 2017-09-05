const express = require('express');
const router = express.Router();
const _ = require('lodash');

var context = require('../libs/apiVocab').context;

router.get('/', function(req,res){
    var reqAccepts = req.accepts();
    var responseType = 'application/json';
    if(_.indexOf(reqAccepts, 'application/ld+json') >= 0){
        responseType = 'application/ld+json';
    }
    res.contentType(responseType).json(

        context

    );

});
module.exports = router;