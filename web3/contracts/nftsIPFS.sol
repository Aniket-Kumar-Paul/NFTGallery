// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    // DATA
    address payable contractOwner =
        payable(0x78e577De85cd66Df4822fFE7Abc9Ac4Da0474d8F);
    uint256 public listingPrice = 0.025 ether;

    struct NFTs {
        string title;
        string description;
        string email;
        string category;
        uint256 fundraised;
        address creator;
        string image;
        uint256 timestamp;
        uint256 id;
    }

    mapping(uint256 => NFTs) public nftImages; // ID : NFTs
    uint256 public nftCount = 0;

    // FUNCTIONS
    function uploadIPFS(
        address _creator,
        string memory _image,
        string memory _title,
        string memory _description,
        string memory _email,
        string memory _category
    )
        public
        payable
        returns (
            string memory,
            string memory,
            string memory,
            address,
            string memory
        )
    {
        nftCount++;
        NFTs storage nft = nftImages[nftCount];
        nft.creator = _creator;
        nft.image = _image;
        nft.title = _title;
        nft.description = _description;
        nft.email = _email;
        nft.category = _category;

        return (_title, _description, _category, _creator, _image);
    }

    function getAllNFTs() public view returns (NFTs[] memory) {
        uint256 itemCount = nftCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex++;
        }

        return items;
    }

    function getNFT(
        uint256 _id
    )
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            string memory,
            uint256,
            uint256
        )
    {
        NFTs memory nft = nftImages[_id];

        return (
            nft.title,
            nft.description,
            nft.email,
            nft.category,
            nft.fundraised,
            nft.creator,
            nft.image,
            nft.timestamp,
            nft.id
        );
    }

    function updateListingPrice(
        uint256 _listingPrice,
        address owner
    ) public payable {
        require(
            contractOwner == owner,
            "Only the contract owner can update the listing price"
        );
        listingPrice = _listingPrice;
    }

    function donateToNFT(uint256 _id) public payable {
        uint256 amount = msg.value;
        NFTs storage nft = nftImages[_id];
        (bool sent, ) = payable(nft.creator).call{value: amount}("");
        if (sent) {
            nft.fundraised += amount;
        }
    }

    function withdraw(address _owner) external {
        require(_owner == contractOwner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");
        contractOwner.transfer(balance);
    }
}
