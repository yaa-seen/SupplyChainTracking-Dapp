// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

const trfAssert = require('truffle-assertions');

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'
    let supplychain;

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplychain = await SupplyChain.deployed();

        // Mark an item as Harvested by calling function harvestItem()
        let tx = await supplychain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes);
        trfAssert.eventEmitted(tx, 'Harvested');
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplychain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplychain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
        // assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplychain = await SupplyChain.deployed();

        let tx = await supplychain.processItem(upc, { from: originFarmerID } );
        trfAssert.eventEmitted(tx, 'Processed');

        const itemInfo = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo[5], '1', 'Error: Incorrect item state');   
    })    

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplychain = await SupplyChain.deployed();
        
        let tx = await supplychain.packItem(upc, { from: originFarmerID } );
        trfAssert.eventEmitted(tx, 'Packed');

        const itemInfo = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo[5], '2', 'Error: Incorrect item state'); 
  
    })    

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplychain = await SupplyChain.deployed();
        
        let tx = await supplychain.sellItem(upc, productPrice, { from: originFarmerID } );
        trfAssert.eventEmitted(tx, 'ForSale');

        const itemInfo = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo[5], '3', 'Error: Incorrect item state');
        assert.equal(itemInfo[4], productPrice, 'Error: Product price incorrect');
  
    })    

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplychain = await SupplyChain.deployed();
        let one_eth = web3.utils.toWei("1", "ether");

        let tx = await supplychain.buyItem(upc, { from: distributorID, value: one_eth } );
        trfAssert.eventEmitted(tx, 'Sold');

        const itemInfo = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo[5], '4', 'Error: Incorrect item state');
        assert.equal(itemInfo[6], distributorID, 'Error: DistributorID incorrect');
  
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplychain = await SupplyChain.deployed();
        
        let tx = await supplychain.shipItem(upc, { from: distributorID } );
        trfAssert.eventEmitted(tx, 'Shipped');
        
        const itemInfo = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo[5], '5', 'Error: Incorrect item state');              
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplychain = await SupplyChain.deployed();
        
        let tx = await supplychain.receiveItem(upc, { from: retailerID } );
        trfAssert.eventEmitted(tx, 'Received');

        const itemInfo1 = await supplychain.fetchItemBufferOne.call(upc);
        const itemInfo2 = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo1[2], retailerID, 'Error: Retailer not owner after receipt');
        assert.equal(itemInfo2[5], '6', 'Error: Incorrect item state');
        assert.equal(itemInfo2[7], retailerID, 'Error: Incorrect retailerID');
             
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplychain = await SupplyChain.deployed();
        
        let tx = await supplychain.purchaseItem(upc, { from: consumerID });
        trfAssert.eventEmitted(tx, 'Purchased');

        const itemInfo1 = await supplychain.fetchItemBufferOne.call(upc);
        const itemInfo2 = await supplychain.fetchItemBufferTwo.call(upc);

        assert.equal(itemInfo1[2], consumerID, 'Error: Consumer not owner after purchase');
        assert.equal(itemInfo2[5], '7', 'Error: Incorrect item state');
        assert.equal(itemInfo2[8], consumerID, 'Error: Incorrect consumerID');
        
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplychain = await SupplyChain.deployed();

        
        let itemInfo1 = await supplychain.fetchItemBufferOne.call(upc);
        
        expect(itemInfo1[0]).to.deep.equal(web3.utils.toBN(sku));
        expect(itemInfo1[1]).to.deep.equal(web3.utils.toBN(upc));
        expect(itemInfo1[2]).to.deep.equal(accounts[4]);
        expect(itemInfo1[3]).to.deep.equal(accounts[1]);
        expect(itemInfo1[4]).to.deep.equal(originFarmName);
        expect(itemInfo1[5]).to.deep.equal(originFarmInformation);
        expect(itemInfo1[6]).to.deep.equal(originFarmLatitude);
        expect(itemInfo1[7]).to.deep.equal(originFarmLongitude);
        
    })
    
    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplychain = await SupplyChain.deployed();
        const BN = web3.utils.toBN;
        
        let itemInfo2 = await supplychain.fetchItemBufferTwo.call(upc);

        expect(itemInfo2[0]).to.deep.equal(BN(sku));
        expect(itemInfo2[1]).to.deep.equal(BN(upc));
        expect(itemInfo2[2]).to.deep.equal(BN(sku+upc));
        expect(itemInfo2[3]).to.deep.equal(productNotes);
        expect(itemInfo2[4]).to.deep.equal(BN(productPrice));
        expect(itemInfo2[5]).to.deep.equal(BN('7'));
        expect(itemInfo2[6]).to.deep.equal(distributorID);
        expect(itemInfo2[7]).to.deep.equal(retailerID);
        expect(itemInfo2[8]).to.deep.equal(consumerID);
        // sku, upc, sku+upc, productNotes, productPrice, '7', distributorID, retailerID, consumerID];
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    })

});