const { LIGHTNODE_SALT, VERIFYTOOL_SALT, DEPLOY_FACTORY } = process.env;

task("initializeData", "Write initialization data required by LightNode", require("./initializeData")).addParam(
    "epoch",
    "The epoch number"
);

task("lightNodeDeploy", "Write initialization data required by LightNode", require("./lightNodeDeploy"))
    .addParam("verifytool", "The VerifyTool contract address")
    .addParam("verifier", "The Verifier contract address")
    .addOptionalParam("chain", "deploy contract in network", "test", types.string)
    .addOptionalParam("salt", "deploy contract salt", LIGHTNODE_SALT, types.string)
    .addOptionalParam("factory", "mos contract address", DEPLOY_FACTORY, types.string);

task("verifyToolDeploy", "Write initialization data required by LightNode", require("./verifyToolDeploy"))
    .addOptionalParam("toolsalt", "deploy contract salt", VERIFYTOOL_SALT, types.string)
    .addOptionalParam("factory", "mos contract address", DEPLOY_FACTORY, types.string);

task("tronDeploy", "Write initialization data required by LightNode", require("./tronDeploy")).addParam(
    "chain",
    "Tron is the mainnet or TronTest is testnet"
);

task("tronUp", "Write initialization data required by LightNode", require("./tronUp")).addParam(
    "chain",
    "Tron is the mainnet or TronTest is testnet"
);