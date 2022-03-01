const { expect } = require("chai");
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
        [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
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

        mockUSDCDecimals = ethers.BigNumber.from(10).pow(await mockUSDCToken.decimals());
        hardhatTokenDecimals = ethers.BigNumber.from(10).pow(await hardhatToken.decimals());

        await hardhatToken.grantRole(ADMIN_ROLE, owner.address);
        await hardhatToken.grantRole(MINTER_ROLE, broker.address);
        await mockUSDCToken.mint(addr1.address, ethers.BigNumber.from(500).mul(mockUSDCDecimals));
        await oldToken.mint(addr1.address, 10000000);
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

    it("Should set price in cents by owner" , async function () {
        await broker.connect(owner).setPriceCents(12);
        expect(await broker.getPriceCents()).to.equal(12);
    });

    it("Should NOT set price in cents by some other wallet" , async function () {
        await expect(
            broker.connect(addr1).setPriceCents(12)
        ).to.be.reverted;
    });

    it("Should calculate withdrawal limit depending on share of token" , async function () {
        total_booty = ethers.BigNumber.from(500).mul(mockUSDCDecimals);
        await mockUSDCToken.mint(broker.address, total_booty);
        await broker.connect(owner).mint(owner.address, 2000);
        await broker.connect(owner).mint(addr1.address, 2000);
        await broker.connect(owner).mint(addr2.address, 2000);
        await broker.connect(owner).mint(addr3.address, 2000);
        expect(
            await broker.connect(addr1).withdrawalLimit()
        ).to.equal(total_booty.div(4));
    });

    it("Should calculate withdrawal limit depending on share of token even for repeating decimals" , async function () {
        total_booty = ethers.BigNumber.from(500).mul(mockUSDCDecimals);
        await mockUSDCToken.mint(broker.address, total_booty);
        await broker.connect(owner).mint(owner.address, 2000);
        await broker.connect(owner).mint(addr1.address, 2000);
        await broker.connect(owner).mint(addr2.address, 2000);
        expect(
            await broker.connect(addr1).withdrawalLimit()
        ).to.equal(total_booty.div(3));
    });

    it("User can deposit USDC and recieve CWM depending on price" , async function () {
        amount = 1;
        usdc_with_decimals = ethers.BigNumber.from(amount).mul(mockUSDCDecimals);
        hh_price_cents = await broker.getPriceCents();
        hardhatToken_expected_with_decimals = ethers.BigNumber.from(((amount * 100)/hh_price_cents)).mul(hardhatTokenDecimals);

        //allow spending of users USDC
        await mockUSDCToken.connect(addr1).approve(broker.address, usdc_with_decimals);
        //deposit USDC and recieve CWM
        await broker.connect(addr1).deposit(amount);
        expect(String(await mockUSDCToken.balanceOf(vault.address))).to.equal(String(usdc_with_decimals));
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(hardhatToken_expected_with_decimals);
    });

    it("User can swap cwmV1 and recieve cwmV2", async function () {
        initial_balance = await oldToken.balanceOf(addr1.address);

        //allow spending of users CWMV1
        await oldToken.connect(addr1).approve(broker.address, 50);
        //deposit 50 USD and recieve 500 CWM
        await broker.connect(addr1).swap_old(50);
        expect(await oldToken.balanceOf(addr1.address)).to.equal(initial_balance - 50);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    });

});
