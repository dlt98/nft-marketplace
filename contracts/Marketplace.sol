// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
  //State variables
  address payable public immutable feeAccount;
  uint256 public immutable feePercent;

  uint256 public itemCount;

  struct Item {
    uint256 itemId;
    IERC721 nft;
    uint256 tokenId;
    uint256 price;
    address holder;
    address payable seller;
    bool sold;
  }

  event Offered(
    uint256 itemId,
    address indexed nft,
    uint256 tokenId,
    uint256 price,
    address indexed seller
  );

  event Bought(
    uint256 itemId,
    address indexed nft,
    uint256 tokenId,
    uint256 price,
    address indexed seller,
    address indexed buyer
  );

  // itemId -> Item
  mapping(uint256 => Item) public items;

  constructor(uint256 _feePercent) {
    feeAccount = payable(msg.sender);
    feePercent = _feePercent;
  }

  //Creating item to be placed in marketplace
  function makeItem(
    IERC721 _nft,
    uint256 _tokenId,
    uint256 _price
  ) external nonReentrant {
    require(_price > 0, "Price must be greater than zero");

    itemCount++;

    //Transfer the NFT to the marketplace
    _nft.transferFrom(msg.sender, address(this), _tokenId);

    //Add new item to items mapping
    items[itemCount] = Item(
      itemCount,
      _nft,
      _tokenId,
      _price,
      address(this),
      payable(msg.sender),
      false
    );

    emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
  }

  function purchaseItem(uint256 _itemId) external payable nonReentrant {
    uint256 _totalPrice = getTotalPrice(_itemId);
    Item storage item = items[_itemId];
    require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
    require(
      msg.value >= _totalPrice,
      "not enough ether to cover item price and market fee"
    );
    require(!item.sold, "item already sold");

    //pay seller and feeAccount
    item.seller.transfer(item.price);
    feeAccount.transfer(_totalPrice - item.price);

    //update item sold
    item.sold = true;

    item.holder = msg.sender;

    //transfer nft to buyer
    item.nft.transferFrom(address(this), msg.sender, item.tokenId);

    items[_itemId] = item;

    //emit Bought event
    emit Bought(
      _itemId,
      address(item.nft),
      item.tokenId,
      item.price,
      item.seller,
      msg.sender
    );
  }

  function sellItem(uint256 _itemId, uint256 _price) external nonReentrant {
    require(_price > 0, "Price must be greater than zero");

    Item storage item = items[_itemId];

    //update item sold
    item.sold = false;
    //set price of item
    item.price = _price;
    //set address of new seller
    item.seller = payable(msg.sender);

    item.holder = address(this);

    //transfer nft to marketplace
    item.nft.transferFrom(msg.sender, address(this), item.tokenId);

    //set new item to mapping
    items[_itemId] = item;

    emit Offered(itemCount, address(item.nft), _itemId, _price, msg.sender);
  }

  function fetchMyNfts() public view returns (Item[] memory) {
    uint256 totalItemCount = itemCount;
    uint256 myNftCount = 0;
    uint256 currentIndex = 0;

    //Getting the length of the array
    for (uint256 i = 1; i <= totalItemCount; i++) {
      if (items[i].holder == msg.sender) {
        myNftCount++;
      }
    }

    Item[] memory myNfts = new Item[](myNftCount);

    for (uint256 i = 1; i <= totalItemCount; i++) {
      if (items[i].holder == msg.sender) {
        uint256 currentId = items[i].itemId;
        Item memory currentItem = items[currentId];
        myNfts[currentIndex] = currentItem;
        currentIndex++;
      }
    }

    return myNfts;
  }

  function getTotalPrice(uint256 _itemId) public view returns (uint256) {
    return ((items[_itemId].price * (100 + feePercent)) / 100);
  }
}
