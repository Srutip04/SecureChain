# Certichain
Store the IPFS hash[for certificates] securely in blockchain


## How to use
```
git clone git@github.com:Srutip04/SecureChain.git

```
Note : Do not collapse any terminal

##### terminal1
```
    1.  npm install
    2.  truffle develop
```
##### terminal2
```terminal2
    1. truffle migrate --reset --network ropsten
```
#### Go to Metamask
##### switch to custom network and place the config you got from truffle develop command (most probably will run on 8545 or 7545)
##### import some accounts with their private key mentioned in truffle develop . To make it work remember to import the first account.

##### terminal3
```terminal3
    cd client 
    cd src
    npm start
```

