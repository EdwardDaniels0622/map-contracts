const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const {ethers} = require("hardhat");

describe("LightNode contract start test", function () {

    async function deployLightNodeFixture() {
        // Get the ContractFactory and Signers here.
        const [owner, addr1, addr2] = await ethers.getSigners();
        const LightNode = await ethers.getContractFactory("LightNode");

        const lightNode = await LightNode.deploy();

        await lightNode.connect(owner).deployed();

        const LightNodeProxy = await ethers.getContractFactory("LightNodeProxy");

        const genesisHeader =
            '0x00000020626148e2b1dcddb0c1627b80828ad15b82938fa75c685b98c7499880000000009299e7d2ad1c49f128157f547a67bb77a62c98be495be5e6cd987437c4b721df83cf0a5f107e0e193122a605';
        const genesisHeight = 1780500;

        let initData = LightNode.interface.encodeFunctionData("initialize", [
            genesisHeader,
            genesisHeight
        ]);

        const lightNodeProxy = await LightNodeProxy.deploy(
            lightNode.address,
            initData
        );
        await lightNodeProxy.connect(owner).deployed();
        let proxy = LightNode.attach(lightNodeProxy.address);

        return { proxy, owner, addr1, addr2 };
    }

    describe("LightNode updateBlockHeader test start", function () {

        it("updateBlockHeader test", async function () {

            const { owner,proxy } = await loadFixture(deployLightNodeFixture)

            expect(await proxy.owner()).to.equal(owner.address);

            await proxy.updateBlockHeader("0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000050000000202853c5b4973950d61ce2f48285a6c29334d9e1925a18fc310200000000000000d7d2a2e673b2f50a711224802c590e48c0b7e44489339a14fbb121b8b70e998635d40a5fffff001d0e4a958c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020d359a65227e5a2026ed62bb8b64b9c3d0dda958bbe4f32860a3b65f800000000709524e20ca410fa467cd9f2a02bee6ae408d49d8b1e2e2364034687b1f47ca8d7d40a5f107e0e1996a3fdee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050000000202f32b9c714efda810046a166b0311f75668a5010547d9f1f0100000000000000a7825bb600834a1e3f2aaf1594ab30d6455b435dad7774c9400acd6b89bfdc9989d90a5fffff001d2d3b289f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020a302f19330cd52a2320f24b5e53e47a66191b6927f38e9f44b2f549600000000995c648f45f1a3f529612813324bbde342898e3819e773b2b4351e37d54a04183ade0a5fffff001d0b481eda00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020beb737685f6da4b10e88683557dc54af2855a9607643cf41cd552dc50000000033d847a094897a48c9200cf13c10d7e8ac28ce93887429987943f3ecd66343b7ebe20a5fffff001d0e9ec4e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020b1dfe807731a83f8b0f39b262648be8e20a194ee4e1297b2f00a7d7800000000d0dcdbb1a447538146ee68dd9111c295ab887e308e2735217a7f511c60e245909ee70a5fffff001d87f0f86b00000000000000000000000000000000");

            expect(await proxy.headerHeight()).to.equal(1780501);
            let rangeHeght = await proxy.verifiableHeaderRange();

            expect(rangeHeght[0]).to.equal(1780500);
            expect(rangeHeght[1]).to.equal(1780501);
        });

        it(' updateBlockHeader error test ', async function () {
            const { owner,proxy } = await loadFixture(deployLightNodeFixture);

            let headerErrorData = "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000050000000202853c5b4973950d61ce2f48285a6c29334d9e1925a18fc310200000000000000d7d2a2e673b2f50a711224802c590e48c0b7e44489339a14fbb121b8b70e998635d40a5fffff001d0e4a958c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020d359a65227e5a2026ed62bb8b64b9c3d0dda958bbe4f32860a3b65f800000000709524e20ca410fa467cd9f2a02bee6ae408d49d8b1e2e2364034687b1f47ca8d7d40a5f107e0e1996a3fdee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050000000202f32b9c714efda810046a166b0311f75668a5010547d9f1f0100000000000000a7825bb600834a1e3f2aaf1594ab30d6455b435dad7774c9400acd6b89bfdc9989d90a5fffff001d2d3b289f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020a302f19330cd52a2320f24b5e53e47a66191b6927f38e9f44b2f549600000000995c648f45f1a3f529612813324bbde342898e3819e773b2b4351e37d54a04183ade0a5fffff001d0b481eda00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020beb737685f6da4b10e88683557dc54af2855a9607643cf41cd552dc50000000033d847a094897a48c9200cf13c10d7e8ac28ce93887429987943f3ecd66343b7ebe20a5fffff001d0e9ec4e000000000000000000000000000000000"

            await expect(proxy.updateBlockHeader(headerErrorData)).to.be.revertedWith("The block is not final confirmed");

            let hashPrevErrorData = "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002c00000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000005000000020d359a65227e5a2026ed62bb8b64b9c3d0dda958bbe4f32860a3b65f800000000709524e20ca410fa467cd9f2a02bee6ae408d49d8b1e2e2364034687b1f47ca8d7d40a5f107e0e1996a3fdee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000050000000202f32b9c714efda810046a166b0311f75668a5010547d9f1f0100000000000000a7825bb600834a1e3f2aaf1594ab30d6455b435dad7774c9400acd6b89bfdc9989d90a5fffff001d2d3b289f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020a302f19330cd52a2320f24b5e53e47a66191b6927f38e9f44b2f549600000000995c648f45f1a3f529612813324bbde342898e3819e773b2b4351e37d54a04183ade0a5fffff001d0b481eda00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020beb737685f6da4b10e88683557dc54af2855a9607643cf41cd552dc50000000033d847a094897a48c9200cf13c10d7e8ac28ce93887429987943f3ecd66343b7ebe20a5fffff001d0e9ec4e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020b1dfe807731a83f8b0f39b262648be8e20a194ee4e1297b2f00a7d7800000000d0dcdbb1a447538146ee68dd9111c295ab887e308e2735217a7f511c60e245909ee70a5fffff001d87f0f86b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000020b4181ecfa8c88fee87d6f2823cb3a04bb225900c8a31f3cbfc70840e000000009e6c71eb18ab0b39eabe5290c1d278025e83ffb9676ed531a6414af10807ad8750ec0a5fffff001d0a27426200000000000000000000000000000000"

            await expect(proxy.updateBlockHeader(hashPrevErrorData)).to.be.revertedWith("Previous block hash not found");
        });


    });

    describe("LightNode verifyProofData test start", function () {
        it("verifyProofData test", async function () {
            const mainnet1 = {
                txId: '9f0370848f7bbf67908808997661a320af4f0075dce313e2934a576ed8204059',
                index: 104,
                intermediateNodes: [
                    '590c8ceb56383e61c7002d18e35c7ea0f6e6d8cc05221c791eaa90bc50e172af',
                    '21bc92abd2b0d97bbe3b65a76d420209277d0e2bd3a9974ca7680bcbee115752',
                    '6babdaf89052998ab048bc12db408bc3e2e30f70add044ed9a032a60db27ad98',
                    'c9be68e2dd903e2de000b9b2ca2c02544fbaf0c71c14da82f13aaf7fa1d2d8e8',
                    'a0ed0aa4629a69dc2c764e1395bdd7c6688336fccf8643a07b36be60dfd7a340',
                    '46e621f7fa78f6d54123b3ef91b520fda523d35533b760990f178f1fd0fb00d6',
                    '5660db59d56bbb416773d474bdd472ddea40c96b09a9e32b24017e59ab50e4f0',
                    'f8d7a8087256bae032c4576046b13af00033c2f335a55619e4b4e27a17cd8472'
                ],
                header:
                    '00000020a1d2b3b757ad55fa1c670f9f59372a2a26f1a85197711e00000000000000000070be58da7ef0a754ef5947910fa1bb0c19160d641cf212ae46ba53e0327233bc2367905b2dd729174c3ae2db',
                headerHash:
                    '00000000000000000021868c2cefc52a480d173c849412fe81c4e5ab806f94ab',
                height: 540107
            };


            // const proof = mainnet1.intermediateNodes
            //     .map((value) => Buffer.from(value, 'hex').reverse().toString('hex'))
            //     .join('');

            //console.log(proof)

            //const txid = Buffer.from(mainnet1.txId, 'hex').reverse().toString('hex');

           // console.log(txid)

            const {owner} = await loadFixture(deployLightNodeFixture)

            const LightNode = await ethers.getContractFactory("LightNode");

            const lightNode = await LightNode.deploy();

            await lightNode.connect(owner).deployed();

            await  lightNode.initialize("0x"+mainnet1.header,mainnet1.height)

            // console.log(await lightNode.getProofDataBytes(
            //     mainnet1.height,
            //     mainnet1.index,
            //     "0x594020d86e574a93e213e3dc75004faf20a361769908889067bf7b8f8470039f",
            //     "0x"+mainnet1.header,
            //     "0xaf72e150bc90aa1e791c2205ccd8e6f6a07e5ce3182d00c7613e3856eb8c0c59525711eecb0b68a74c97a9d32b0e7d270902426da7653bbe7bd9b0d2ab92bc2198ad27db602a039aed44d0ad700fe3e2c38b40db12bc48b08a995290f8daab6be8d8d2a17faf3af182da141cc7f0ba4f54022ccab2b900e02d3e90dde268bec940a3d7df60be367ba04386cffc368368c6d7bd95134e762cdc699a62a40aeda0d600fbd01f8f170f9960b73355d323a5fd20b591efb32341d5f678faf721e646f0e450ab597e01242be3a9096bc940eadd72d4bd74d4736741bb6bd559db60567284cd177ae2b4e41956a535f3c23300f03ab1466057c432e0ba567208a8d7f8"
            // ))

            let verifyTrueData = "0x0000000000000000000000000000000000000000000000000000000000083dcb0000000000000000000000000000000000000000000000000000000000000068594020d86e574a93e213e3dc75004faf20a361769908889067bf7b8f8470039f00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000005000000020a1d2b3b757ad55fa1c670f9f59372a2a26f1a85197711e00000000000000000070be58da7ef0a754ef5947910fa1bb0c19160d641cf212ae46ba53e0327233bc2367905b2dd729174c3ae2db000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100af72e150bc90aa1e791c2205ccd8e6f6a07e5ce3182d00c7613e3856eb8c0c59525711eecb0b68a74c97a9d32b0e7d270902426da7653bbe7bd9b0d2ab92bc2198ad27db602a039aed44d0ad700fe3e2c38b40db12bc48b08a995290f8daab6be8d8d2a17faf3af182da141cc7f0ba4f54022ccab2b900e02d3e90dde268bec940a3d7df60be367ba04386cffc368368c6d7bd95134e762cdc699a62a40aeda0d600fbd01f8f170f9960b73355d323a5fd20b591efb32341d5f678faf721e646f0e450ab597e01242be3a9096bc940eadd72d4bd74d4736741bb6bd559db60567284cd177ae2b4e41956a535f3c23300f03ab1466057c432e0ba567208a8d7f8"

            let success = await lightNode.verifyProofData(verifyTrueData)

            expect(success).to.equal(true)

        });
    });
});

npx hardhat lightFactoryDeploy --height 1780500 --header 0x00000020626148e2b1dcddb0c1627b80828ad15b82938fa75c685b98c7499880000000009299e7d2ad1c49f128157f547a67bb77a62c98be495be5e6cd987437c4b721df83cf0a5f107e0e193122a605 --network Makalu