// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "contracts/cwmToken.sol";

/// @custom:security-contact ibarria0@gmail.com
contract CwmBroker is Ownable{
    using SafeERC20 for IERC20;
    IERC20 public stableCoin;
    IERC20 public oldToken;
    CwmTokenV2 public cwmToken;
    address private vault; 

    constructor(IERC20 _stableCoin, CwmTokenV2 _cwmToken, IERC20 _oldToken, address _vault) {
        stableCoin = _stableCoin;
        cwmToken = _cwmToken;
        oldToken = _oldToken;
        vault = _vault;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        cwmToken.mint(to, amount);
    }

    function deposit(uint256 _amount) public {
        require(_amount > 0, "You need to send some USDC");
        require(_amount <= stableCoin.balanceOf(msg.sender), "balance is low");
        require(_amount <= stableCoin.allowance(msg.sender, address(this)), "allowance is low");
        stableCoin.safeTransferFrom(msg.sender, vault, _amount);
        cwmToken.mint(msg.sender, _amount * 10);
    }

    function swap_old(uint256 _amount) external {
        uint256 amount = _amount;
        require(amount > 0, "You need to send some CWM");
        oldToken.safeTransferFrom(msg.sender, vault, amount);
        cwmToken.mint(msg.sender, amount);
    }

}
