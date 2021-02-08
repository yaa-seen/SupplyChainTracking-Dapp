# About : 
An Ethereum Dapp that support transferring of ownership, product auditing, and supply chain management.\
Project built using Truffle and solidity. 

# Used Libraries

| Library       | Version       |
| ------------- | ------------- |
| truffle-assertions  | 0.9.2 |
| truffle-hdwallet-provider | 1.0.17 |

# Installation 
* Initialize node : 
```bash
npm init
```
* Install truffle : 
```bash
npm install truffle
```

* Initialize truffle : 
```bash
truffle init
```

* Install hd-wallet-provider package : 
```bash
npm install --save @truffle/hdwallet-provider
```

* Install truffle assertion for testing 
```bash 
npm install truffle-assertions
```

* Compile contracts 
```bash 
truffle compile
```

* Use truffle console to test Assertions within mocha & chai framework 
```bash 
truffle develop
test
```

* Deploy contracts to rinkeby test net after editing truffle-config file to meet the specific requests for rinkeby 
```bash 
truffle migrate --reset --network rinkeby
```


# Usage Instruction 
* Farmer:

  * Harvest an Item:
    * Enter a new unique UPC into the form and press "Fetch Data 1".
    * If Current owner shows as "0x00 . . ." then this UPC is new and unique.
    * Continue to enter farm information into the "Farm Details" section.
    * Add "Product Notes" into "Product Details" section".
    * Press "Harvest" button and verify transaction in Metamask.
  * Process an item:
    * Enter the UPC you wish to modify into the "UPC" field on the form and press "Fetch Data 1".
    * If this is the correct item, press "Process" and verify transaction in Metamask.
  * Pack an item:
    * Enter the UPC you wish to modify into the "UPC" field on the form and press "Fetch Data 1".
    * If this is the correct item, press "Pack" and verify transaction in Metamask.
  * Place an item up for sale:
    * Enter the UPC you wish to modify into the "UPC" field on the form and press "Fetch Data 1" and "Fetch Data 2".
    * If this is the correct item, enter your desired price into the "Product Price" field.
    * Press the "ForSale" button and verify transaction in Metamask, your item is now up for sale.
    
* Distributor:

  * Buy an item:
    * Enter the UPC of the item you wish to buy into the "UPC" field on the form and press "Fetch Data 1" and "Fetch Data 2".
    * Verifiy this is the item you wish to purchase for distribution.
    * Press "Buy" button and verify transaction in Metamask.
  * Ship an item:
    * Enter the UPC you wish to modify into the "UPC" field on the form and press "Fetch Data 1" and "Fetch Data 2".
    * Press the "Ship" button and verify the tranasaction in Metamask.
    
* Retailer:

  * Receive an item:
    * Enter the UPC you wish to receive into the "UPC" field on the form and press "Fetch Data 1" and "Fetch Data 2".
    * Press the "Receive" button and verify the transaction in Metamask.

* Consumer:

  * Purchase an item:
    * Enter the UPC you wish to receive into the "UPC" field on the form and press "Fetch Data 1" and "Fetch Data 2".
    * Press the "Purchase" button and verify the transaction in Metamask.


# Token Address deployed to rinkeby on etherscan :
https://rinkeby.etherscan.io/address/0xDC10588923036DD8043607813f86431D9606F13B
