// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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

    uint256 public currentRaffleId;
    uint256 public jackpotValue;

    enum Status {
        idle,
        active,
        ended
    }

    struct Raffle {
        uint256 raffleId;
        uint256 totalValue;
        uint256[] envelopeIds;
        Status status;
    }

    struct Envelope {
        uint256 envelopeId;
        uint256 value;
        Status status;
    }

    mapping(uint256 => Raffle) public raffleIdToRaffle;
    mapping(uint256 => Envelope) public envelopeIdToEnvelope;

    Raffle[] public rafflesArray;
    Envelope[] public envelopesArray;

    constructor() ERC721("FlashTIX", "TIX") {}

    function safeMint(address to, string memory uri) public payable onlyOwner {
        require(msg.value >= 0.0001 ether, "Not enough ALT sent");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        createEnvelopes((msg.value * 90) / 100);
        jackpotValue += (msg.value * 10) / 100;
    }

    function createRaffle() public {
        // require that the current raffle is not active.
        require(
            raffleIdToRaffle[currentRaffleId].status != Status.active,
            "Current raffle is not ended"
        );

        //get 5 random envelopes from the envelopes array with status idle and add them to a new raffle
        uint256[] memory envelopeIds = new uint256[](5);
        uint256 counter = 0;
        for (uint256 i = 0; i < envelopesArray.length; i++) {
            if (
                envelopeIdToEnvelope[envelopesArray[i].envelopeId].status ==
                Status.idle
            ) {
                envelopeIds[counter] = envelopesArray[i].envelopeId;
                counter++;
            }
            if (counter == 5) {
                break;
            }
        }

        currentRaffleId++;
        //create a new raffle
        raffleIdToRaffle[currentRaffleId] = Raffle(
            currentRaffleId,
            0,
            envelopeIds,
            Status.active
        );
        //add the raffle to the raffles array
        rafflesArray.push(raffleIdToRaffle[currentRaffleId]);

        //set the status of the envelopes to active
        for (uint256 i = 0; i < envelopeIds.length; i++) {
            envelopeIdToEnvelope[envelopeIds[i]].status = Status.active;
        }

        //set the total value of the raffle to the sum of the values of the envelopes
        for (uint256 i = 0; i < envelopeIds.length; i++) {
            raffleIdToRaffle[currentRaffleId]
                .totalValue += envelopeIdToEnvelope[envelopeIds[i]].value;
        }

        //set the status of the raffle to active
        raffleIdToRaffle[currentRaffleId].status = Status.active;
    }

    function createEnvelopes(uint256 _totalValue) public {
        //create 5 envelopes with random values totaling mintPrice.

        uint256 remainingValue = _totalValue;

        // generate 5 random values
        uint256[] memory envelopeValues = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            if (i == 4) {
                envelopeValues[i] = remainingValue;
            } else {
                envelopeValues[i] =
                    (uint256(
                        keccak256(
                            abi.encodePacked(
                                block.timestamp,
                                block.difficulty,
                                i,
                                _totalValue,
                                remainingValue
                            )
                        )
                    ) % remainingValue) +
                    1;
                remainingValue -= envelopeValues[i];
            }
        }
        //add envelopes to mapping and array
        for (uint256 i = 0; i < 5; i++) {
            Envelope memory newEnvelope = Envelope(
                envelopesArray.length + 1,
                envelopeValues[i],
                Status.idle
            );
            envelopeIdToEnvelope[envelopesArray.length + 1] = newEnvelope;
            envelopesArray.push(newEnvelope);
        }
    }

    function burnTIX() public {
        //require that the current raffle is active
        require(
            raffleIdToRaffle[currentRaffleId].status == Status.active,
            "Current raffle is not active"
        );

        //require that the sender owns a TIX token
        require(balanceOf(msg.sender) > 0, "You do not own a TIX token");

        //burn the TIX token
        _burn(tokenOfOwnerByIndex(msg.sender, 0));

        //set the status of a random envelope in the current raffle to ended
        uint256 randomEnvelopeId = raffleIdToRaffle[currentRaffleId]
            .envelopeIds[
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.difficulty,
                            currentRaffleId
                        )
                    )
                ) % 5
            ];
        envelopeIdToEnvelope[randomEnvelopeId].status = Status.ended;

        //set the status of the current raffle to ended if all envelopes are ended
        bool allEnded = true;
        for (
            uint256 i = 0;
            i < raffleIdToRaffle[currentRaffleId].envelopeIds.length;
            i++
        ) {
            if (
                envelopeIdToEnvelope[
                    raffleIdToRaffle[currentRaffleId].envelopeIds[i]
                ].status != Status.ended
            ) {
                allEnded = false;
                break;
            }
        }
        if (allEnded) {
            raffleIdToRaffle[currentRaffleId].status = Status.ended;
        }

        //send the value of the envelope to the sender
        payable(msg.sender).transfer(
            envelopeIdToEnvelope[randomEnvelopeId].value
        );

        //random chance one in 1000 to win the jackpot
        if (
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        currentRaffleId
                    )
                )
            ) %
                1000 ==
            0
        ) {
            payable(msg.sender).transfer(jackpotValue);
            jackpotValue = 0;
        }
    }

    function getAvailableBalance() public view returns (uint256) {
        //avaialbleBalance minus the total value of the envelopes in the current raffle. And minus 90% for jackpot growth
        return
            ((address(this).balance -
                raffleIdToRaffle[currentRaffleId].totalValue) * 90) / 100;
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

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
