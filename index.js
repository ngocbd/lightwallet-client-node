const axios = require('axios');
//

class Lightwallet{
  constructor (key)
  {
    this.request = axios.create({
      baseURL: 'https://lightwallet.appspot.com/',
      timeout: 10000,
      headers: {'CB-ACCESS-KEY': key,'Content-Type': 'application/json'}
    });
  }
  
  version() {
    return "1.0.4";
  }

  accounts()
  {
    return this.request.get("accounts/?page=1&row=1000");
  }
  register(email,password,urlWebhook)
  {
    var data = JSON.stringify({
      "email": email,
      "password": password,
      "urlWebhook": urlWebhook,
      "showPrivateKey": false
    });
    return this.request.post("user/register",data);
  }
  login(email,password){
    var data = JSON.stringify({
      "email": email,
      "password": password     
    });
    return this.request.post("user/login",data);
  }

  update(email,password,urlWebhook,showPrivateKey)
  {
    var data = JSON.stringify({
      "email": email,
      "password": password,
      "urlWebhook": urlWebhook,
      "showPrivateKey": showPrivateKey
    });
    return this.request.post("user/update",data);
  }

  createAccount(name,currency)
  {
    var data = JSON.stringify({
      "name": name,
      "primary": true,
      "currency": currency
    });
    return this.request.post("accounts",data);
  }
  getAddress(page=1,row=1000)
  {
    return this.request.get("accounts/?page="+page+"&row="+row);
  }
  getAccount(id)
  {
    return this.request.get("accounts/"+id);
  }
  send(fromUser,fromAccount,to,amount,currency,data,fee,description)
  {
    var data = JSON.stringify({
      "to": to,
      "amount": amount,
      "data": data,
      "currency": currency,
      "fee": fee,
      "description": description
    });

    return this.request.post("accounts/"+fromUser+"|"+fromAccount+"/transactions",data);
  }
  checkHash(hash,currency)
  {
    var data = JSON.stringify({
      "currency": currency,
      "hash": hash
    });
    return this.request.post("hash/check-hash",data);

  }
}

exports = module.exports = (key) =>{ return new Lightwallet(key)};
exports.version = () =>{ return "1.0.4"};
  
