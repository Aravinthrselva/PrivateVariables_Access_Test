// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Login {

 //variables in Solidity are stored in 32 byte (256 bit) storage slots,   
 // data is stored sequentially in these storage slots based on the order in which these variables are declared.

 //Storage is also optimized such that if a bunch of variables can fit in one slot, they are put in the same slot.   

    // Each bytes32 variable would occupy one slot
    // because bytes32 variable has 256 bits(32*8)
    // which is the size of one slot

    // Slot 0
    bytes32 private username;

    // Slot 1
    bytes32 private password;

    constructor(bytes32 _username, bytes32 _password) {
        username = _username;
        password = _password;
    }
}


// Therefore, instead of attempting to read these variable values by calling the contract, which is not possible, 
// we can just access the storage slots directly. 
// Since Ethereum is a public blockchain, all nodes have access to all the state.
