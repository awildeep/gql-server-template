# Playground for making GQL APIs

I wanted to play around with:

- typegraphql (https://typegraphql.ml)
- typeorm (https://typeorm.io)
- jwt

This is purely a toy, and not intended to be production code.

## requirements

- PostgreSQL (tested version 11.5)
- node (tested version v11.14.0)
- yarn (tested version v1.19.1)
- openssl  (tested with LibreSSL 2.6.5)

## install deps

    yarn install

## generate a JWT signing key pair

JWT requires a secret key for signing, and a public key for verification

### Generate private key: 

    ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
 
__NOTE__: Don't add passphrase


### Generate public key: 

    openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

## setup db

Edit `ormconfig.json` to your specs, see orm `ormconfig.json.sample` for an outline.

Create tables:

    yarn run typeorm migration:run
    
Run fixtures (optional):

    yarn run fixtures

## start in dev mode /w watcher

    yarn start