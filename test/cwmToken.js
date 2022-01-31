const { expect } = require("chai");

describe("Token contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let ADMIN_ROLE = ethers.utils.id("DEFAULT_ADMIN_ROLE");
    let MINTER_ROLE = ethers.utils.id("MINTER_ROLE");


    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        vault = addrs[9]

        // Get the ContractFactory and Signers here.
        MockUSDCToken = await ethers.getContractFactory("MockUSDCToken");
        Token = await ethers.getContractFactory("CwmTokenV2");
        OldToken = await ethers.getContractFactory("CwmTokenV1");
        Broker = await ethers.getContractFactory("CwmBroker");

        hardhatToken = await Token.deploy();
        oldToken = await OldToken.deploy();
        mockUSDCToken= await MockUSDCToken.deploy();
        broker = await Broker.deploy(mockUSDCToken.address, hardhatToken.address, oldToken.address, vault.address);

        await hardhatToken.grantRole(ADMIN_ROLE, owner.address);
        await hardhatToken.grantRole(MINTER_ROLE, broker.address);
        await mockUSDCToken.mint(addr1.address, 100000);
    });


    it("Token can be transfered", async function () {
        // Transfer 50 tokens from addr1 to addr2
        await hardhatToken.mint(addr1.address, 50.0);
        await hardhatToken.connect(addr1).transfer(addr2.address, 50.0);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50.0);
        });
    });

describe("Broker contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let vault;
    let ADMIN_ROLE = ethers.utils.id("DEFAULT_ADMIN_ROLE");
    let MINTER_ROLE = ethers.utils.id("MINTER_ROLE");


    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        vault = addrs[9]

        // Get the ContractFactory and Signers here.
        MockUSDCToken = await ethers.getContractFactory("MockUSDCToken");
        Token = await ethers.getContractFactory("CwmTokenV2");
        OldToken = await ethers.getContractFactory("CwmTokenV1");
        Broker = await ethers.getContractFactory("CwmBroker");

        hardhatToken = await Token.deploy();
        oldToken = await OldToken.deploy();
        mockUSDCToken= await MockUSDCToken.deploy();
        broker = await Broker.deploy(mockUSDCToken.address, hardhatToken.address, oldToken.address, vault.address);

        await hardhatToken.grantRole(ADMIN_ROLE, owner.address);
        await hardhatToken.grantRole(MINTER_ROLE, broker.address);
        await mockUSDCToken.mint(addr1.address, 100000);
    });

    it("Token cannot be minted if not Broker or owner", async function () {
        await expect(
            hardhatToken.connect(addr1).mint(addr1.address, 50)
        ).to.be.reverted;

    });

    it("Should set the right owner for minter", async function () {
        expect(await broker.owner()).to.equal(owner.address);
    });

    it("Token can be minted by Broker", async function () {
        //mint 50 tokens to addr1
        await broker.connect(owner).mint(addr1.address, 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    });

    it("User can deposit USDC and recieve CWM", async function () {
        initial_balance = await mockUSDCToken.balanceOf(addr1.address);

        //allow spending of users USDC
        await mockUSDCToken.connect(addr1).approve(broker.address, 50);
        //deposit 50 USD and recieve 500 CWM
        await broker.connect(addr1).deposit(50);
        expect(await mockUSDCToken.balanceOf(addr1.address)).to.equal(initial_balance - 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(500);
    });

});
