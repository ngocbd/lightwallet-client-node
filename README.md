# lightwallet-client-node
Lightwallet client for nodejs. A multi chain wallet by lightwallet.

LightWallet is an e-wallet service, allowing users to perform the functions of creating accounts, creating e-wallets, managing wallets, as well as performing the functions of transferring and receiving cryptocurrencies. Currently, LightWallet is supporting many of the most popular coins such as Bitcoin (BTC), Ethereum (ETH), LiteCoin (LTC), Stellar (XLM), Ripple (XRP), Tron (TRX), ... and the above tokens. respective coins. It can be simply understood as “Coinbase.com clone” but supports more chains and works at the API level, specialized for programmers who are not specialized in Blockchain, saving the cost of deploying products on blockchain.

### Installation: **`npm install -s lightwallet`**



### Getting started

#### Register user
```js
let user = await lightwallet.register("admin.someproject@gmail.com","passwordonlyfortest","https://somewhere.com/");
```

#### Update user
```js
let result = await lightwallet.update("admin.someproject@gmail.com","passwordonlyfortest","https://somewhere.com/",true);
expect(result.data).equal("change notification url success!")
```

#### Login
```js
let result = await lightwallet.login("admin.someproject@gmail.com","passwordonlyfortest");
expect(result.data).have.property("token")
```

#### createAccount
one account mean subaccount of current user it have new address

```js
let result = await lightwallet.createAccount("user"+new Date().getTime(),"TRX");
expect(result.data).have.property("id")		
```

#### List AllAccount
one account mean subaccount of current user it have new address

```js
let result = await lightwallet.accounts();
expect(result.data).to.be.an('array');		
```


#### List AllAddress


```js
let result = await lightwallet.getAddress();
expect(result.data).to.be.an('array');
		
```
#### Get Account detail


```js
let result = await lightwallet.getAccount("admin.someproject@gmail.com|user.someproject@gmail.com");
expect(result.data).have.property("email")
		
```


#### Send coin/token


```js
let result = await lightwallet.send("admin.someproject@gmail.com","user.someproject@gmail.com","TWCAqe8QtcmaRLvBSfF3YQSFCmq5wusNYU",1,"TRX","{gasValue:3}","0.00063","no description");		
```








