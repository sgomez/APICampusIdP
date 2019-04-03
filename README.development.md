# How to deploy a development environment

## Requirements

- Docker
- Docker Compose
- Node 8 (optional)

## Steps

1.  **Install node dependencies**.

    - With node 8 installed:

      Run the next command inside the project folder:

            npm install

    - Without node 8 installed:

      Run the next command inside the project folder:

            docker run --rm -v ${PWD}:/opt/idpapi -w /opt/idpapi  node:8 npm install

1.  **Configure the services**.

    Copy the `.env-sample` file to `.env` and change the node passwords.

    You will need to configure the rabbitmq password and cookie, and the mongo administrator password configured in the `docker-compose.yaml` file. You can edit this file or you can create a `docker-compose.override.yaml` file instead modify the original file directly. Read more about [how to extend the composer configuration](https://docs.docker.com/compose/extends/) in the official documentation site.

    Vg.:

        # docker-compose.override.yaml
        version: "3.6"

        services:
            rabbitmq:
                environment:
                - RABBITMQ_DEFAULT_PASS=NewRabbitPassword
                - RABBITMQ_ERLANG_COOKIE=NewRabbitCookie

            mongodb:
                environment:
                - MONGO_INITDB_ROOT_PASSWORD=NewAdminPassword

1)  **Create the development configuration file**.

    Copy the `etc/default.json` to `etc/development.json`. This file will override any option configured in the default file. You don't need to configure all options, just the ones you want to change.

    You must configure the _database_ section with the same parameters you wrote in the `.env` file. Vg.:

        {
            "database": {
                "host": "mongodb",
                "port": "27017",
                "user": "idpapi",
                "pass": "!ChangeMe!",
                "dbname": "idpapi"
            }
        }

    You also need to the configure the `hostname` option with the server full qualified domain name (FQDN).

1)  **Configure nginx web server**.

    The node server is configurated with _https_ disabled. If you want to enable it, configure the `default.json` or `development.json` file and enable the `forcehttps` option. You need to save the server certificates inside the `etc` folder. If you have a certificate chain, you can add a `https.ca` option.

    Vg.:

        {
            "https": {
                "port": "4000",
                "cert": "certs/server.crt",
                "key": "certs/server.key",
                "ca": "certs/DigiCertCA.crt"
            },
            "forcehttps": true,
        }

1)  **Create the JWT certificates**.

    You will need to create the certificates to the JWT tokens:

        openssl genrsa -passout pass:_passphrase_ -out etc/certs/jwt.key 1024
        openssl rsa -in etc/certs/jwt.key -passin pass:_passphrase_ -pubout -out etc/certs/jwt.crt

    The `_passphrase_` and filenames must be the same have been configurated in the `default.json` or `development.json` file. Certificates must be inside `etc/certs` directory.

    Change the `jwt.iss` option with your server address. If you have enabled secure connections in the previous step, you must write `https` as the URI scheme. You need to specify the port number if you do not use the defaults (80 or 443).

    Vg.:

        {
            "hostname": "my.full.server",
            "https": {
                "port": 4000
            },
            "forcehttps": true,
            "jwt": {
                "iss": "https://my.full.server:4000"
            }
        }

1)  **Start docker services**.

    Run _docker compose_ file:

        docker-compose up -d

1)  **Create the admin user**.

    We need to register in mongo a user to manipulate the schema. Modify the next command with the mongo administrator password (`MONGO_INITDB_ROOT_PASSWORD` variable in `.env` file) and the schema administrator password (`DB_PASSWORD` variable).

        docker-compose exec mongodb mongo --username admin --password !ChangeMe! --eval 'db.getSiblingDB("idpapi").runCommand({ createUser: "idpapi", pwd: "!ChangeMe!", roles: [ "readWrite" ] })'

    After than you must be required to restart the node server:

        docker-compose restart api

1)  **Test the backend**

    You can connect to the default ports (2456 in plain http and 4000 in secure http).
