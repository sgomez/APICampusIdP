'use strict';


const fakeUserInput = {
    name: 'fakuser',
    password: 'fakepasss'
};



const sampleUserDisabled = {
    username: 'disuser',
    email: 'some@example.com',
    password: 'somepass'
};

const sampleUser = {
    username: 'properuser',
    email: 'sampleuser@example.com',
    password: 'properpassword',
    enabled: true
};
const validUserInput = {
    name: 'properuser',
    password: 'properpassword'
};

const sampleUser2 = {
    username: 'anotherproperuser',
    email: 'anothersampleuser@example.com',
    password: 'properpassword',
    enabled: true
};
const validUserInput2 = {
    name: 'anotherproperuser',
    password: 'properpassword'
};


const newIDPConfInput = {
    "@context": "http://geant.org/capusidp/context",
    "@type": "ServiceDescription",
    "components": {
        "@type": "Collection",
        "web": {
            "@type": "WebServer",
            "software": {},
            "hostname": "idp.example.com",
            "http": {
                "port": 80
            },
            "https": {
                "port": 443,
                "publicKey": {
                    "@type": "X509Certificate",
                    "@value": "xxxxxxx"
                },
                "privateKey": {
                    "@type": "autoGenerated"
                }
            }
        },
        "idp": {
            "@type": "IdPConf",
            "entityID": {
                "@type": "autoGenerated"
            },
            "software": {
                "name": "shibboleth-idp",
                "version": "3.1.3"
            },
            "metadataProviders": [
                {
                    "@type": "MetadataProvider",
                    "attrID": "edugate",
                    "url": "https://edugate.heanet.ie/example-signed-meta.xml",
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "-----BEGIN CERTIFICATE-----" +
                        "MIICrDCCAZSgAwIBAgIAMA0GCSqGSIb3DQEBCwUAMBoxGDAWBgNVBAMTD2lkcC5l\n" +
                        "eGFtcGxlLmNvbTAeFw0xODA0MDQwOTUwMTlaFw0yMzA0MDQwOTUwMTlaMBoxGDAW\n" +
                        "BgNVBAMTD2lkcC5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC\n" +
                        "AQoCggEBAI0AQ7Ov1VSFs8nupHltCQwVxXNJPfzDyCnPUO6yBiXtu+1mPcJT76hi\n" +
                        "Tvefe4ilm7t+RFpAjWhUS4gdsK9qfwUXanAQu4znixM6peBxCvgjUaxJGHjX1VuY\n" +
                        "3mnM48R/yv6v9rt9cAf5PFsb13/09pHqDerGp9EDVEAUpERA2n4UEBzFXwrnNtyY\n" +
                        "DYGTftopQCsk4374za6c20GyuyIxra27IdmONpxlUIYqkcDoWY/puhyrmaFj7eXm\n" +
                        "kgwfeH0JwT/S1qd49P989D8ZHA36rSUw23M0QfcXKnRFFH3Os2mu/a/9NxYheYhl\n" +
                        "N85BclnkqWB0tTnXCJoBNbIRg/R4WOECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA\n" +
                        "cU3T2fHYG+dGmMmmpXoa1jkQzFkoMDy81tUpS3U/JxXmMs6KYr1VL0O0Sp3uk5zU\n" +
                        "E+wvN+Ooo9ELF7aNMc7renfJ1mjrziJ5w+Z8K/Bo8kne3uQf0OnixawvszfdJp4N\n" +
                        "n7XXzCjYPikUuJnJi5NHuVc1fNl+rg8r1B37V779nPa/d5x9tmpa8KqKZ5VhBx2a\n" +
                        "W3snuvVY5QO60CHtZ5sywDqtdFvE/7zqNXJib3KWUzlymeb6yk562hLgH8g3IDsQ\n" +
                        "sxngv+n/nABa1DYTvFgqMT5H8QplUo4LqsrqDk1BEWDa3mqUYyovFoVn5Lysq/5f\n" +
                        "72K6XvtsS+7abF2FLlpNwA==\n" +
                        "-----END CERTIFICATE-----"
                    }
                }
            ],
            "sso": {
              "@type" : "autoGenerated"
            },

        }
    }
};
const newIDPConfInput2 = {
    "@context": "http://geant.org/capusidp/context",
    "@type": "ServiceDescription",
    "components": {
        "@type": "Collection",
        "web": {
            "@type": "WebServer",
            "software": {},
            "hostname": "idp2.example.com",
            "http": {
                "port": 80
            },
            "https": {
                "port": 443,
                "publicKey": {
                    "@type": "X509Certificate",
                    "@value": "xxxxxxx"
                },
                "privateKey": {
                    "@type": "autoGenerated"
                }
            }
        },
        "idp": {
            "@type": "IdPConf",
            "entityID": {
                "@type" : "autoGenerated"
            },
            "software": {
                "name": "shibboleth-idp",
                "version": "3.1.3"
            },
            "metadataProviders": [
                {
                    "@type": "MetadataProvider",
                    "attrID": "edugate",
                    "url": "https://edugate.heanet.ie/example-signed-meta.xml",
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "XYZ"
                    }
                }
            ],
            "sso": {
                "certificates": []
            },
            "aa": {
                "certificates": []
            }
        }
    }


};



const invalidIDPConfInput_1 = {
    "@context": "http://geant.org/capusidp/context",
    "@type": "InvalidDescription",
    "components": {
        "@type": "Collection",
        "web": {
            "@type": "WebServer",
            "software": {},
            "hostname": "idp.example.com",
            "http": {
                "port": 80
            },
            "https": {
                "port": 443,
                "publicKey": {
                    "@type": "X509Certificate",
                    "@value": "xxxxxxx"
                },
                "privateKey": {
                    "@type": "autoGenerated"
                }
            }
        },
        "idp": {
            "@type": "IdPConf",
            "entityID": "https://idp.example.com/idp",
            "software": {
                "name": "shibboleth-idp",
                "version": "3.1.3"
            },
            "metadataProviders": [
                {
                    "@type": "MetadataProvider",
                    "attrID": "edugate",
                    "url": "https://edugate.heanet.ie/example-signed-meta.xml",
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "XYZ"
                    }
                }
            ],
            "sso": {
                "@type" : "autoGenerated"
            },
            "aa": {
                "@type" : "autoGenerated"
            }
        }
    }


};
// missing hostname
const invalidIDPConfInput_2 = {
    "@context": "http://geant.org/capusidp/context",
    "@type": "ServiceDescription",
    "components": {
        "@type": "Collection",
        "web": {
            "@type": "WebServer",
            "software": {},
            "http": {
                "port": 80
            },
            "https": {
                "port": 443,
                "publicKey": {
                    "@type": "X509Certificate",
                    "@value": "xxxxxxx"
                },
                "privateKey": {
                    "@type": "autoGenerated"
                }
            }
        },
        "idp": {
            "@type": "IdPConf",
            "entityID": "https://idp.example.com/idp",
            "software": {
                "name": "shibboleth-idp",
                "version": "3.1.3"
            },
            "metadataProviders": [
                {
                    "@type": "MetadataProvider",
                    "attrID": "edugate",
                    "url": "https://edugate.heanet.ie/example-signed-meta.xml",
                    "publicKey": {
                        "@type": "X509Certificate",
                        "@value": "XYZ"
                    }
                }
            ],
            "sso": {
                "certificates": []
            },
            "aa": {
                "certificates": []
            }
        }
    }


};
module.exports.invalidIDPConfInput_1 = invalidIDPConfInput_1;
module.exports.invalidIDPConfInput_2 = invalidIDPConfInput_2;
module.exports.fakeUserInput = fakeUserInput;
module.exports.sampleUser = sampleUser;
module.exports.sampleUser2 = sampleUser2;
module.exports.sampleDisabledUser = sampleUserDisabled;
module.exports.validUserInput = validUserInput;
module.exports.validUserInput2 = validUserInput2;
module.exports.newIDPConfInput = newIDPConfInput;
module.exports.newIDPConfInput2 = newIDPConfInput2;