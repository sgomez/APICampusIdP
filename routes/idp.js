'use strict';
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const konsole = require('../libs/konsole');
const base64url = require('base64url');
const Provider = require('../models/Provider');
const User = require('../models/User');
const verifyToken = require('../libs/verifyToken');
const vocab = require('../libs/apiVocab').context;
const jsonld = require('jsonld');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');

const actionsIdP = require('../libs/actionsIdp');
const validateIDPConf = require('../libs/Idpconfigurator').validateIDPConf;
const serviceValidatorRequest = require('../libs/validators').serviceValidatorRequest;
const filterOutput = require('../libs/filterOutput').hideSensitive;
const convertToAnsible = require('../libs/convertToAnsible').translateToYaml;
const yaml = require('write-yaml');
const configGenHelper = require('../libs/configGenHelper');
const generateYaml = require('../libs/idpConfYamlGen').generateYaml;
const yamljs = require('yamljs');
const url = require('url');
const eol = require('eol');

const genAnsiblePlaybook = require('../libs/ansiblePlaybook').genPlaybook;
const verifyAStoken = require('../libs/verifyAStoken');
const errorPrefix = "251";

const generatesYamlFiles = function (cnf) {

    // generate attribute resolver part
    // go through objects and check '@type' === 'AttributeDefinition'

};


/**
 * create new service
 */
router.post('/', verifyToken, serviceValidatorRequest, configGenHelper.configGen, function (req, res) {
    if (typeof req.inputhostname === 'undefined') {
        return res.status(400).json({"error": true, "message": "Missing hostname", "id": errorPrefix+"001"});
    }
    if (typeof res.locals.entityID === 'undefined') {
        return res.status(400).json({"error": true, "message": "Missing entityid","id": errorPrefix+"002"});
    }
    if (req.inputhostname !== url.parse(res.locals.entityID).hostname) {
        return res.status(400).json({"error": true, "message": "entityID does not match hostname","id": errorPrefix+"003"});
    }
    let username = res.locals.tokenDecoded.sub;
    let pQuery = Provider.findOne({name: req.inputhostname});
    let pPromise = pQuery.exec();
    let uQuery = User.findOne({username: username});
    let uPromise = uQuery.exec();
    Promise.all([pPromise, uPromise]).then(results => {
        let doc = results[0];
        let user = results[1];
        if (doc !== null) {
            return res.status(409).json({"error": true, "message": "host already exist","id": errorPrefix+"004"});
        }
        let confVersion = uuidv1();
        let newProvider = new Provider({
            name: req.inputhostname,
            status: 'pending',
            configs: [{
                format: "flatcompact",
                flatcompact: res.locals.srvConfFlatCompact,
                ver: confVersion
            }]
        });
        if (user !== null) {
            newProvider.creator = user;
        }
        let sPromise = newProvider.save();
        sPromise.then((doc) => {
            res.status(202).json({
                'error': false,
                'message': 'request received'
            });
        }, (err) => {
            res.status(500).json({
                'error': true,
                'message': err,
                'id': errorPrefix+'005'
            });
        });


    }).catch(error => {
        return res.status(500).json({"error": true, "message": "" + error + ""});
    });
    konsole('>>>DONE<<<');

});
router.post('/:name', verifyToken, serviceValidatorRequest,
    (req, res, next) => {
        let name = req.params.name;
        if (typeof req.inputhostname === 'undefined') {
            return res.status(400).json({"error": true, "message": "Missing hostname","id": errorPrefix+"006"});
        }


        let pPromise = Provider.findOne({name: name});
        pPromise.then(
            (result) => {
                if (result !== null) {
                    res.json(result.data);
                }
                else {
                    res.status(404).json({"error": true, "message": "Not found","id": errorPrefix+"007"});
                }
            }
        ).catch(err => {
            res.send(err);
        });

    }
);


router.get('/ansible/:name', verifyAStoken, (req, res) => {


    let name = req.params.name;
    let provider = Provider.findOne({name: name});
    provider.then(
        (result) => {
            if (result === null) {
                res.status(404).json({"error": true, "message": "Not found","id": errorPrefix+"008"});
            }
            else {

                let config = result.configs[0].flatcompact;

                let playbook = genAnsiblePlaybook(config);

                playbook.then((result) => {

                    res.setHeader('Content-type', 'text/yaml');

                    res.send(result);
                }).catch(err => {
                    console.log(err);
                     res.json({error: true, message: err, id: errorPrefix+"009"});

                });


                //res.json({ error: false, message: "OK Ansible: "+name+"", data: config});

            }
        }
    ).catch(err => {
        res.json({error: true, message: err,id: errorPrefix+"009"});
    });


});

router.get('/:name', verifyToken, (req, res) => {
    let name = req.params.name;


    let provider = Provider.findOne({name: name});
    provider.then(
        (result) => {
            if (result === null) {
                res.status(404).json({"error": true, "message": "Not found","id": errorPrefix+"010"});
            }
            else {
                let filteredRes = filterOutput(result);
                res.json(result);
            }
        }
    ).catch(err => {
        res.json({error: true, message: err, id: errorPrefix+"011"});
    });
});


router.get('/:name/:filter/:nodeid?', verifyToken, (req, res) => {
    let name = req.params.name;
    let detail = req.params.filter;
    let nodeid = req.params.nodeid;
    console.log(nodeid);
    let pProvider = Provider.findOne({name: name});
    pProvider.then(
        result => {
            if (result) {
                let filteredRes = filterOutput(result);
                if (detail === 'configuration') {
                    // @todo TEST to store ansible playbook

                    if (typeof nodeid !== 'undefined') {
                        let result2 = _.find(filteredRes.configs[0].flatcompact['@graph'], {'@id': nodeid});
                        res.json(result2);
                    }
                    else {

                        res.json(filteredRes.configs);
                    }
                }
                else if (detail === 'yamlconf') {
                    //console.log('yamlconf: '+JSON.stringify(filteredRes));
                    let yamlconf = yamljs.stringify(JSON.parse(generateYaml(filteredRes, 1)), 10);
                    //res.json({ res: 'yaml'});
                    res.send(yamlconf);

                }
                else {
                    res.json(filteredRes);
                }

            }
            else {
                res.status(404).json({"error": true, "message": 'Not found',"id": errorPrefix+"012"});

            }
        }
    ).catch(
        err => {
            res.send(err);
        });


});

router.get('/', verifyToken, (req, res) => {

    //res.json({xvxcv: "f"});

    let username = res.locals.tokenDecoded.sub;
    let uPromise = User.findOne({username: username});
    let pProviders = Provider.find();
    Promise.all([uPromise, pProviders]).then(
        (result) => {
            let providers = result[1];
            let user = result[0];

            let output = {
                '@context': vocab,
                '@type': "Collection",
                'members': []
            };
            for(let i = 0; i < providers.length; i++ ){

                if(providers[i].name && providers[i].creator._id.equals(user._id)){
                    output.members.push(
                        {
                            "@id": providers[i].url,
                            "@type": "ServiceDescription",
                            "name": providers[i].name,
                            "status": providers[i].status
                        }
                    );
                }
                else {
                    console.log('no name for i: '+i);
                }


            }
            if (providers === null) {
                res.status(404).json({"error": true, "message": "Not found","id": errorPrefix+"013"});
            }
            else {
                let filteredRes = filterOutput(providers);
                res.json(output);
            }
        }
    ).catch(err => {
        res.json(err);
    });
});

router.delete('/:name', verifyToken, actionsIdP.valDelIdPReq, actionsIdP.isAllowedToDelIdP, actionsIdP.processToDelIdP, (req, res) => {
    res.json({"error": false, "message": "OK"});
});

module.exports = router;

