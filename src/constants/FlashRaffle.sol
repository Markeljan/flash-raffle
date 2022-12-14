// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FlashRaffle is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public mintPrice = .001 ether;
    uint256 public jackpotValue;

    enum Status {
        active,
        ended,
        jackpot
    }
    //mark

    struct Envelope {
        uint256 envelopeId;
        uint256 value;
        Status status;
        address claimer;
    }

    mapping(uint256 => Envelope) private envelopeIdToEnvelope;
    mapping(address => uint256) public addressToBurnedTIX;

    Envelope[] private envelopesArray;
    Envelope[] public openedEnvelopes;

    string[] tixUris = [
        "https://bafybeicuf2uiuqiy7jgvlgofozgaqm7fnm7mva3i3bcnrymdmrp6yyvthm.ipfs.nftstorage.link/1.json",
        "https://bafybeicuf2uiuqiy7jgvlgofozgaqm7fnm7mva3i3bcnrymdmrp6yyvthm.ipfs.nftstorage.link/2.json",
        "https://bafybeicuf2uiuqiy7jgvlgofozgaqm7fnm7mva3i3bcnrymdmrp6yyvthm.ipfs.nftstorage.link/3.json",
        "https://bafybeicuf2uiuqiy7jgvlgofozgaqm7fnm7mva3i3bcnrymdmrp6yyvthm.ipfs.nftstorage.link/4.json"
    ];

    constructor() ERC721("FlashTIX", "TIX") {}

    function safeMint(address to) public payable {
        require(msg.value == mintPrice, "Not enough ALT sent");

        //mint 5x TIX nfts
        for (uint256 i = 0; i < 5; i++) {
            _tokenIdCounter.increment();
            uint256 tokenId = _tokenIdCounter.current();
            _safeMint(to, tokenId);

            //random number from 0 to 3
            uint256 randomIndex = uint256(
                keccak256(abi.encodePacked(block.timestamp, tokenId))
            ) % tixUris.length;

            _setTokenURI(tokenId, tixUris[randomIndex]);
        }

        createEnvelopes((msg.value * 90) / 100);
        jackpotValue += (msg.value * 10) / 100;
        mintPrice = (mintPrice * 110) / 100;
    }

    function totalValueInEnvelopes() public view returns (uint256) {
        uint256 totalValues;

        for (uint256 i = 0; i < envelopesArray.length; i++) {
            totalValues += envelopesArray[i].value;
        }

        return totalValues;
    }

    function getOpenedEnvelopes() public view returns (Envelope[] memory) {
        return openedEnvelopes;
    }

    //get all tokens owned by an address
    function getTokensByAddress(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function createEnvelopes(uint256 _totalValue) private {
        //create 5 envelopes with random values totaling mintPrice.
        uint256 remainingValue = _totalValue;

        // generate 5 random values with a max of 10% of the total value each
        uint256[] memory envelopeValues = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            uint256 randomValue = uint256(
                keccak256(abi.encodePacked(block.timestamp, _totalValue, i))
            ) % (_totalValue / 10);
            envelopeValues[i] = randomValue;
            remainingValue -= randomValue;
        }

        // create envelopes with the random values
        for (uint256 i = 0; i < 5; i++) {
            Envelope memory envelope = Envelope(
                envelopesArray.length + 1,
                envelopeValues[i],
                Status.active,
                address(this)
            );
            envelopesArray.push(envelope);
            envelopeIdToEnvelope[envelopesArray.length] = envelope;
        }

        // allocate the remaining value to a random envelope with status active
        uint256 randomIndex = uint256(
            keccak256(abi.encodePacked(block.timestamp, _totalValue))
        ) % envelopesArray.length;
        while (envelopesArray[randomIndex].status == Status.ended) {
            randomIndex =
                uint256(
                    keccak256(abi.encodePacked(block.timestamp, _totalValue))
                ) %
                envelopesArray.length;
        }
        envelopesArray[randomIndex].value += remainingValue;
        envelopeIdToEnvelope[randomIndex + 1].value += remainingValue;
    }

    function claimTIX(uint256 _tokenId) public returns (Envelope memory) {
        require(msg.sender == ownerOf(_tokenId), "You do not own this TIX");

        //burn the TIX token
        _burn(_tokenId);
        addressToBurnedTIX[msg.sender] += 1;

        //get a random envelope from the active envelopes
        uint256 randomEnvelopeId = (uint256(
            keccak256(abi.encodePacked(block.timestamp, _tokenId, jackpotValue))
        ) % envelopesArray.length) + 1;

        while (envelopeIdToEnvelope[randomEnvelopeId].status != Status.active) {
            randomEnvelopeId =
                (uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            _tokenId,
                            jackpotValue
                        )
                    )
                ) % envelopesArray.length) +
                1;
        }

        //random chance one in 10 to win the jackpot
        if (
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        randomEnvelopeId
                    )
                )
            ) %
                10 ==
            0
        ) {
            //set the status of the envelope to jackpot
            envelopeIdToEnvelope[randomEnvelopeId].status = Status.jackpot;
            envelopesArray[randomEnvelopeId - 1].status = Status.jackpot;
            envelopeIdToEnvelope[randomEnvelopeId].value += jackpotValue;
            envelopesArray[randomEnvelopeId - 1].value += jackpotValue;
            jackpotValue = 0;
        }

        //set the status of the envelope to ended
        envelopeIdToEnvelope[randomEnvelopeId].status = Status.ended;
        envelopesArray[randomEnvelopeId - 1].status = Status.ended;

        //set claimer
        envelopeIdToEnvelope[randomEnvelopeId].claimer = msg.sender;
        envelopesArray[randomEnvelopeId - 1].claimer = msg.sender;

        //send the value of the envelope to the sender
        payable(msg.sender).transfer(
            envelopeIdToEnvelope[randomEnvelopeId].value
        );

        openedEnvelopes.push(envelopeIdToEnvelope[randomEnvelopeId]);
        return (envelopeIdToEnvelope[randomEnvelopeId]);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
