const chai = require('chai')
const expect = chai.expect
const lightwallet = require('../')("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaWdodHdhbGxldCIsImp0aSI6ImFkbWluLnNvbWVwcm9qZWN0QGdtYWlsLmNvbSJ9.kGVJqoUQzXJSm2FypkSr6on8547bQ68I-Lu4N16ZlKk");

describe("Lightwallet", () => {

	//test a function for a specific case
	it("should return client version", ()=> {
		expect(lightwallet.version()).equals("1.0.3");
	})


	it("should return new user or return error Conflict 409", async ()=> {
		try {
			let user = await lightwallet.register("admin.someproject@gmail.com","passwordonlyfortest","https://somewhere.com/");
			
		} catch (error) {
			
			expect(error.response.status).equals(409);
		}

	})

	it("should return updated user or return error Conflict 409", async ()=> {
		
			let result = await lightwallet.update("admin.someproject@gmail.com","passwordonlyfortest","https://somewhere.com/",true);
			
			expect(result.data).equal("change notification url success!")
		

	})
	it("should return access token", async ()=> {
		
			let result = await lightwallet.login("admin.someproject@gmail.com","passwordonlyfortest");
			expect(result.data).have.property("token")
		

	})
	it("should return created account", async ()=> {
		
		let result = await lightwallet.createAccount("user"+new Date().getTime(),"TRX");
		
		expect(result.data).have.property("id")
		
	

	})
	
	it("should return account list", async ()=> {
		let result = await lightwallet.accounts();
		expect(result.data).to.be.an('array');
	})

	it("should return address list", async ()=> {
		let result = await lightwallet.getAddress();
		expect(result.data).to.be.an('array');
	})

	it("should return account detail", async ()=> {
		let result = await lightwallet.getAccount("admin.someproject@gmail.com|user.someproject@gmail.com");
		expect(result.data).have.property("email")
	})
	it("should return transaction detail or 500 error Your balance is not enough to send.", async ()=> {
		try {
			
		let result = await lightwallet.send("admin.someproject@gmail.com","user.someproject@gmail.com","TWCAqe8QtcmaRLvBSfF3YQSFCmq5wusNYU",1,"TRX","{gasValue:3}","0.00063","no description");
		
		expect(result.data).have.property("email")	
		} catch (error) {
			
			expect(error.response.data.message).equal("Your balance is not enough to send.");
			
		}
	})


	it("should return check hash result 200", async ()=> {
		let result = await lightwallet.checkHash("0xf7c3d342381cad5286659752e63673fbab104634f620a2aa37bae189074ebd78","ETH");
		expect(result.data.status).equal(200);
	})
	



	
	
})