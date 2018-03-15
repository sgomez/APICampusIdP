const _ = require('lodash');
const jsonld = require('jsonld');


const konsole = require('./konsole');
const vocab = require('./apiVocab').context;
const schema = require('./apiVocab').schema;

const context = vocab;
const myVocab = context['@vocab'];



const sample =   [
    {
        "flatcompact": {
            "@context": {
                "@vocab": "http://geant.org/schema/campusidp/",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "ref": {
                    "@type": "@id"
                },
                "confRef": {
                    "@type": "@id"
                },
                "dependency": {
                    "@type": "@id"
                },
                "exposed": {
                    "@type": "xsd:boolean"
                },
                "apiVersion": "xsd:string"
            },
            "@graph": [
                {
                    "@id": "_:b0",
                    "@type": "ServiceDescription",
                    "components": {
                        "@id": "_:b1"
                    }
                },
                {
                    "@id": "_:b1",
                    "@type": "Collection",
                    "idp": {
                        "@id": "_:b2"
                    },
                    "web": {
                        "@id": "_:b7"
                    }
                },
                {
                    "@id": "_:b10",
                    "@type": "autoGenerated"
                },
                {
                    "@id": "_:b2",
                    "@type": "IdPConf",
                    "aa": {
                        "@id": "_:b3"
                    },
                    "entityID": "https://idp.example.com/idp",
                    "metadataProviders": {
                        "@id": "_:b4"
                    },
                    "software": {
                        "@id": "_:b5"
                    },
                    "sso": {
                        "@id": "_:b6"
                    }
                },
                {
                    "@id": "_:b3",
                    "certificates": []
                },
                {
                    "@id": "_:b4",
                    "@type": "MetadataProvider",
                    "attrID": "edugate",
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "XYZ"
                    },
                    "url": "https://edugate.heanet.ie/example-signed-meta.xml"
                },
                {
                    "@id": "_:b5",
                    "name": "shibboleth-idp",
                    "version": "3.1.3"
                },
                {
                    "@id": "_:b6",
                    "certificates": []
                },
                {
                    "@id": "_:b7",
                    "@type": "WebServer",
                    "hostname": "idp.example.com",
                    "http": {
                        "@id": "_:b8"
                    },
                    "https": {
                        "@id": "_:b9"
                    },
                    "software": {
                        "@id": "_:b11"
                    }
                },
                {
                    "@id": "_:b8",
                    "port": 80
                },
                {
                    "@id": "_:b9",
                    "port": 443,
                    "privateKey": {
                        "@id": "_:b10"
                    },
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "xxxxxxx"
                    }
                }
            ]
        },
        "ver": "3bcfc8f0-0763-11e8-be7a-f3a02163c88d",
        "_id": "5a732fe67851ed112fcca5b7",
        "approved": false,
        "status": "pending"
    }
];


const generateYamlVer1 = function (inputConf) {

    return JSON.stringify(sample);
};

const generateYaml = function(inputConf,version = 1){
    console.log('generateYaml triggered');
    let result;
    if(version === 1){
        console.log('generateYaml condition passed');
        result = generateYamlVer1(inputConf);
    }

    console.log('generateYaml: '+JSON.stringify(result));
    //result = {"@id": "zupa"};
    //console.log('generateYaml: '+JSON.stringify(result));
    return result;

};


module.exports.generateYaml = generateYaml;