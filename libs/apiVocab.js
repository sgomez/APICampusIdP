'use strict'
const vocab = "http://geant.org/schema/campusidp/";
const errPrefix= "314";
const context = {
    "@vocab": vocab,
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
};

const schema = {
    "@context": {
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "@graph" : [
        {
            "@id" : vocab+"autoGenerated",
            "@type": "rdfs:Class",
            "rdfs:comment": "If any property points to a node of this class then api server is signaled to generate value for the property.",
            "rdfs:label": "autoGenerated"
        },
        {
            "@id" : vocab+"hidden",
            "@type": "rdfs:Class",
            "rdfs:comment": "hidden : Usually used in output to hide sensitive value to a requesting client",
            "rdfs:label": "hidden"
        },
        {
            "@id" : vocab+"ServiceDescription",
            "@type": "rdfs:Class",
            "rdfs:comment": "The main node Service configuration.",
            "rdfs:label": "ServiceDescription"
        },
        {
            "@id" : vocab+"Collection",
            "@type": "rdfs:Class",
            "rdfs:comment": "Collection of nodes.",
            "rdfs:label": "Collection"
        },
        {
            "@id" : vocab+"WebServer",
            "@type": "rdfs:Class",
            "rdfs:comment": "WebServer frontend configuration.",
            "rdfs:label": "WebServer"
        },
        {
            "@id": vocab+"Organization",
            "@type": "rdfs:Class",
            "rdfs:comment": "Information about Organization",
            "rdfs:label": "Organization"
        },
        {
            "@id": vocab+"Contact",
            "@type": "rdfs:Class",
            "rdfs:comment": "Information about contact",
            "rdfs:label": "Contact"
        },
        {
            "@id" : vocab+"IdPConf",
            "@type": "rdfs:Class",
            "rdfs:comment": "Identity Provider configuration.",
            "rdfs:label": "Identity Provider configuration"
        },
        {
            "@id" : vocab+"AttributeDefinition",
            "@type": "rdfs:Class",
            "rdfs:comment": "Definition of an attribute ex. attribute-resolver.",
            "rdfs:label": "Definition of an attribute"
        },
        {
            "@id" : vocab+"DataSource",
            "@type": "rdfs:Class",
            "rdfs:comment": "Definition of data source (Ldap, Database etc)",
            "rdfs:label": "Definition of data source"
        },
        {
            "@id" : vocab+"MetadataProvider",
            "@type": "rdfs:Class",
            "rdfs:comment": "MetadataProvider definition",
            "rdfs:label": "MetadataProvider definition"
        },
        {
            "@id" : vocab+"KeyDescriptor",
            "@type": "rdfs:Class",
            "rdfs:comment": "KeyDescriptor",
            "rdfs:label": "KeyDescriptor"
        },
        {
            "@id" : vocab+"X509Certificate",
            "@type": "rdfs:Class",
            "rdfs:comment": "X509Certificate",
            "rdfs:label": "X509Certificate"
        },
        {
            "@id" : vocab+"hostname",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"WebServer"
                }
            ],
            "rdfs:comment": "Hostname.",
            "rdfs:label": "hostname"
        },
        {
            "@id" : vocab+"http",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"WebServer"
                }
            ],
            "rdfs:comment": "http",
            "rdfs:label": "http"
        },
        {
            "@id" : vocab+"attrID",
            "@type": "rdf:Property",
            "rdfs:comment": "attrID",
            "rdfs:label": "attrID"
        },
        {
            "@id" : vocab+"attrType",
            "@type": "rdf:Property",
            "rdfs:comment": "attrType",
            "rdfs:label": "attrType"
        },
        {
            "@id" : vocab+"https",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"WebServer"
                }
            ],
            "rdfs:comment": "https",
            "rdfs:label": "https"
        },
        {
            "@id" : vocab+"port",
            "@type": "rdf:Property",
            "rdfs:comment": "http(s) port",
            "rdfs:label": "http(s) port"
        },
        {
            "@id" : vocab+"privateKey",
            "@type": "rdf:Property",
            "rdfs:comment": "private Key",
            "rdfs:label": "private Key"
        },
        {
            "@id" : vocab+"privateKeyPassword",
            "@type": "rdf:Property",
            "rdfs:comment": "private Key Password",
            "rdfs:label": "private Key Password"
        },
        {
            "@id" : vocab+"publicKey",
            "@type": "rdf:Property",
            "rdfs:comment": "public Certificate",
            "rdfs:label": "public Certificate"
        },
        {
            "@id" : vocab+"software",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"IdPConf"
                },
                {
                    "@id" : vocab+"WebServer"
                },
                {
                    "@id" : vocab+"MetadataProvider"
                }
            ],
            "rdfs:comment": "information about software used by component",
            "rdfs:label": "information about software used by component"
        },
        {
            "@id" : vocab+"name",
            "@type": "rdf:Property",
            "rdfs:comment": "Name property. Can be used by any node",
            "rdfs:label": "name"
        },
        {
            "@id" : vocab+"contacts",
            "@type": "rdf:Property",
            "rdfs:comment": "Collection of contacts",
            "rdfs:label": "contacts"
        },
        {
            "@id" : vocab+"email",
            "@type": "rdf:Property",
            "rdfs:comment": "Email address",
            "rdfs:label": "email"
        },
        {
            "@id": vocab+"contactType",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"Contact"
                },
            ],
            "rdfs:comment": "",
            "rdfs:label": "contactType"
        },
        {
            "@id" : vocab+"version",
            "@type": "rdf:Property",
            "rdfs:comment": "version",
            "rdfs:label": "version"
        },
        {
            "@id" : vocab+"organization",
            "@type": "rdf:Property",
            "rdfs:comment": "organization",
            "rdfs:label": "organization"
        },
        {
            "@id" : vocab+"entityID",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"IdPConf"
                }
            ],
            "rdfs:comment": "entityID of Identity/Service Provider",
            "rdfs:label": "entityID of Identity/Service Provider"
        },
        {
            "@id" : vocab+"metadataProviders",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"IdPConf"
                }
            ],
            "rdfs:comment": "collection of metadataProviders",
            "rdfs:label": "collection of metadataProviders"
        },
        {
            "@id" : vocab+"sso",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"IdPConf"
                }
            ],
            "rdfs:comment": "sso",
            "rdfs:label": "sso"
        },
        {
            "@id" : vocab+"aa",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"IdPConf"
                }
            ],
            "rdfs:comment": "aa",
            "rdfs:label": "aa"
        },
        {
            "@id" : vocab+"url",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"MetadataProvider"
                }
            ],
            "rdfs:comment": "URL ",
            "rdfs:label": "URL"
        },
        {
            "@id" : vocab+"ref",
            "@type": "rdf:Property",
            "rdfs:comment": "reference to other node",
            "rdfs:label": "ref"
        },
        {
            "@id" : vocab+"dependency",
            "@type": "rdf:Property",
            "rdfs:comment": "dependecy on other node(s)",
            "rdfs:label": "dependency"
        },
        {
            "@id" : vocab+"certificates",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"sso"
                },
                {
                    "@id" : vocab+"aa"
                }
            ],
            "rdfs:comment": "certificate collection",
            "rdfs:label": "certificates"
        },
        {
            "@id" : vocab+"use",
            "@type": "rdf:Property",
            "rdfs:comment": "use",
            "rdfs:label": "use"
        },
        {
            "@id" : vocab+"components",
            "@type": "rdf:Property",
            "rdfs:comment": "components : usually collection of config elements",
            "rdfs:label": "components"
        },
        {
            "@id" : vocab+"definitions",
            "@type": "rdf:Property",
            "rdfs:comment": "collection (array) of nodes",
            "rdfs:label": "definitions"
        },
        {
            "@id" : vocab+"baseDN",
            "@type": "rdf:Property",
            "rdfs:comment": "base DN LDAP",
            "rdfs:label": "baseDN"
        },
        {
            "@id" : vocab+"authnUser",
            "@type": "rdf:Property",
            "rdfs:comment": "username used for authentication to resources",
            "rdfs:label": "authnUser"
        },
        {
            "@id" : vocab+"password",
            "@type": "rdf:Property",
            "rdfs:comment": "password used for authentication to resources",
            "rdfs:label": "password"
        },
        {
            "@id" : vocab+"web",
            "@type": "rdf:Property",
            "rdfs:comment": "web",
            "rdfs:label": "web"
        },
        {
            "@id": vocab + "idp",
            "@type": "rdf:Property",
            "rdfs:comment": "idp",
            "rdfs:label": "idp"

        },
        {
            "@id" : vocab+"attributes",
            "@type": "rdf:Property",
            "rdfs:comment": "attributes : collection of attributes",
            "rdfs:label": "attributes"
        },
        {
            "@id" : vocab+"sourceAttributeId",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"AttributeDefinition"
                }
            ],
            "rdfs:comment": "sourceAttributeId: ",
            "rdfs:label": "sourceAttributeId"
        },
        {
            "@id" : vocab+"exposed",
            "@type": "rdf:Property",
            "http://schema.org/domainIncludes" : [
                {
                    "@id" : vocab+"AttributeDefinition"
                }
            ],
            "rdfs:comment": "exposed: defined wether attribute may be released",
            "rdfs:label": "exposed"
        },
        {
            "@id" : vocab+"type",
            "@type": "rdf:Property",
            "rdfs:comment": "type",
            "rdfs:label": "type"
        }
    ]
};


module.exports.context = context;
module.exports.schema = schema;