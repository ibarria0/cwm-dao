// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "contracts/cwmToken.sol";

/// @custom:security-contact ibarria0@gmail.com
contract CwmBroker is Ownable{
    using SafeERC20 for ERC20;
    ERC20 public stableCoin;
    ERC20 public oldToken;
    CwmTokenV2 public cwmToken;
    address private vault; 
    uint8 private cwmUSDCPriceCents; 

    constructor(ERC20 _stableCoin, CwmTokenV2 _cwmToken, ERC20 _oldToken, address _vault) {
        stableCoin = _stableCoin;
        cwmToken = _cwmToken;
        oldToken = _oldToken;
        vault = _vault;
        cwmUSDCPriceCents = 10;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        cwmToken.mint(to, amount);
    }

    function setPriceCents(uint8 price) public onlyOwner {
        cwmUSDCPriceCents = price;
    }

    function getPriceCents() external view returns (uint8) {
        return cwmUSDCPriceCents;
    }

    function deposit(uint256 _amount) public {
        require(_amount > 0, "You need to send some USDC");
        require(_amount <= stableCoin.balanceOf(msg.sender), "balance is low");
        require(_amount <= stableCoin.allowance(msg.sender, address(this)), "allowance is low");
        uint256 stableAmount = _amount * 10 ** stableCoin.decimals();
        uint256 cwmAmount = ((_amount * 100)/cwmUSDCPriceCents) * 10 ** cwmToken.decimals();
        stableCoin.safeTransferFrom(msg.sender, vault, stableAmount);
        cwmToken.mint(msg.sender, cwmAmount);
    }

    function swap_old(uint256 _amount) external {
        uint256 amount = _amount;
        require(amount > 0, "You need to send some CWM");
        oldToken.safeTransferFrom(msg.sender, vault, amount);
        cwmToken.mint(msg.sender, amount);
    }

    function withdrawlLimit() public view returns (uint256 wlimit) {
        uint256 stableBalance = stableCoin.balanceOf(address(this));
        require(stableBalance > 0, "Contract has no funds available to withdrawl");
        require(cwmToken.totalSupply() > 0, "No CWM in circulation");
        wlimit = (stableBalance * ((cwmToken.balanceOf(address(msg.sender))* 10 ** 25) / cwmToken.totalSupply()))/(10 ** 25);
    }

    function withdrawl(uint256 _amount) public {
        uint256 wlimit = this.withdrawlLimit();
        uint256 stableBalance = stableCoin.balanceOf(address(this));
        require(stableBalance > 0, "Contract has no funds available to withdrawl");
        require(_amount <= wlimit, "You can only withdrawl up to limit");
        require(_amount <= stableBalance, "You can only withdrawl up to limit");
        stableCoin.safeTransfer(address(msg.sender), _amount);
    }

}
