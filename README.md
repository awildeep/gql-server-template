##install deps

    yarn install
    
##Configure ormconfig

adjust to use the proper DB settings

##generate a JWT signing key pair

    ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
 
NOTE: Don't add passphrase

    openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub


## start in dev mode /w watcher

    yarn start