// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "./ILightNodePoint.sol";

interface ILightNode is ILightNodePoint {
    event UpdateBlockHeader(address indexed account, uint256 indexed blockHeight);

    //Verify the validity of the transaction according to the header, receipt, and aggPk
    //The interface will be updated later to return logs
    function verifyProofData(
        bytes memory _receiptProof
    ) external returns (bool success, string memory message, bytes memory logsHash);

    //Validate headers and update validation members
    function updateBlockHeader(
        bytes memory cur_validitors,
        blockHeader memory bh,
        istanbulExtra memory ist,
        uint256[8] memory zkProofs
    ) external;

    //Initialize the first validator
    function initialize(
        //committee members
        //address[] memory validatorsAddress,
        // {pubkey_i.x.ci, pubkey_i.x.cr, pubkey_i.y.ci, pubkey_i.y.cr, weight_i}
        bytes memory validators,
        uint _validatorsCount,
        //number of committees
        uint epoch,
        //The number of blocks corresponding to each committee
        uint epochSize,
        address verifyTool,
        address zkVerifier
    ) external;

    function verifiableHeaderRange() external view returns (uint256, uint256);
}