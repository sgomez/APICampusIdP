const _ = require('lodash');
const jsonld = require('jsonld');
const jsonldPromises = jsonld.promises;

const vocab = require('./apiVocab').context;
const schema = require('./apiVocab').schema;
const konsole = require('./konsole');
const context = vocab;
const myVocab = context['@vocab'];
const certGen = require('./certsGen');
const eol = require('eol');

const genKeyWithPref = function (key) {
    return myVocab + key;
};


const genSso = function (params) {
    let res = {};
    let attrs = [
        {
            name: 'commonName',
            value: params.hostname
        }
    ];
    res.signing = certGen.generatex509(attrs);
    res.encryption = certGen.generatex509(attrs);

    return res;
};



const genEntityID = function (hostname) {
    return 'https://' + hostname + '/idp';
};


// function which fill (autogenerate) input with missing values
const configGen = function (req, res, next) {

    let options = [{
        name: 'commonName',
        value: 'example.org'
    }, {
        name: 'countryName',
        value: 'US'
    }, {
        shortName: 'ST',
        value: 'Virginia'
    }, {
        name: 'localityName',
        value: 'Blacksburg'
    }, {
        name: 'organizationName',
        value: 'Test'
    }, {
        shortName: 'OU',
        value: 'Test'
    }];

    let jsonflatten = res.locals.srvConfFlat;
    let pl = jsonflatten.filter(element => {
        return element['@type'] == genKeyWithPref('autoGenerated');
    });

    konsole('>>>>>>');
    konsole(JSON.stringify(pl, undefined, 4));
    for (let i = 0; i < pl.length; i++) {
        konsole(` Element ${i} is ${JSON.stringify(pl[i])}`);

        konsole(`index in flatten for ${JSON.stringify(pl[i])}`);
    }
    konsole('<<<<<<');

    konsole(jsonflatten);


    // let result = certGen.generatex509(options);
    // console.log(result)
    next();
};

module.exports.configGen = configGen;
module.exports.genEntityID = genEntityID;
module.exports.genSso = genSso;
