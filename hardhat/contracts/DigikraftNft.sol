// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './lib/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract DigikraftNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(address adminListAddress_) ERC721('Digikraft NFT', 'DGK', adminListAddress_) {}

    function mint(address buyer, string memory tokenUri) public {
        require(isOwnerOrAdmin(msg.sender), 'Caller is not contract owner nor admin');

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(buyer, newItemId, '0x');
        _setTokenURI(newItemId, tokenUri);
    }

    function burn(uint256 tokenId) external {
        require(isOwnerOrAdmin(msg.sender), 'Caller is not contract owner nor admin');

        _burn(tokenId);
    }

    function transfer(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(isOwnerOrAdmin(msg.sender), 'Caller is not contract owner nor admin');

        safeTransferFrom(from, to, tokenId);
    }

    function currentId() external view returns (uint256) {
        return _tokenIds.current();
    }
}
