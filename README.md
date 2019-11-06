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

Edit ormconfig.json to your specs

Create tables:

    yarn run typeorm migration:run
    
Run fixtures (optional):

    yarn run fixtures

## start in dev mode /w watcher

    yarn start