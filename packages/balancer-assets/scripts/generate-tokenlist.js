const axios = require("axios");
const { ethers } = require("ethers");

const fs = require("fs");

const multicall = require("../abi/Multicall.json");
const erc20 = require("../abi/ERC20.json");

async function run() {
  try {
    const listedFile = await fs.readFileSync("lists/listed.json");
    const listed = JSON.parse(listedFile);
    const data = await getData();
    const metadata = await getMetadata(listed, data.metadataOverwrite);
    const tokens = getTokens(data, metadata);
    await generate("listed", tokens);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function generate(name, tokens) {
  const date = new Date();
  const timestamp = date.toISOString();
  const list = {
    name: "Balancer",
    timestamp,
    logoURI:
      "https://raw.githubusercontent.com/balancer-labs/pebbles/master/images/pebbles-pad.256w.png",
    keywords: ["balancer", "default"],
    version: {
      major: 1,
      minor: 0,
      patch: 0
    },
    tokens
  };
  const listFileName = `generated/${name}.tokenlist.json`;
  await fs.writeFileSync(listFileName, JSON.stringify(list, null, 4));
}

async function getData() {
  const metadataOverwriteFile = await fs.readFileSync(
    "data/metadataOverwrite.json"
  );
  const metadataOverwrite = JSON.parse(metadataOverwriteFile);

  const localAssetDirFiles = await fs.readdirSync("assets");
  const localAssets = localAssetDirFiles
    .filter(assetFile => assetFile !== "index.json")
    .map(assetFile => assetFile.split(".png")[0]);

  const trustwalletListUrl =
    "https://raw.githubusercontent.com/trustwallet/assets/4ff402ed99d9028fb58ab3594b196e177390773b/blockchains/ethereum/allowlist.json";
  const trustwalletListResponse = await axios.get(trustwalletListUrl);
  const trustwalletList = trustwalletListResponse.data;

  const assets = {
    local: localAssets,
    trustwallet: trustwalletList
  };

  return {
    metadataOverwrite,
    assets
  };
}

async function getMetadata(tokens, overwrite) {
  const kovan = await getNetworkMetadata(
    "kovan",
    tokens.kovan,
    overwrite.kovan
  );
  const homestead = await getNetworkMetadata(
    "homestead",
    tokens.homestead,
    overwrite.homestead
  );

  return {
    kovan,
    homestead
  };
}

async function getNetworkMetadata(network, tokens, overwrite) {
  console.log("tokenlist :: getNetworkMetadata");
  const infuraKey = "93e3393c76ed4e1f940d0266e2fdbda2";

  const providers = {
    kovan: new ethers.providers.InfuraProvider("kovan", infuraKey),
    homestead: new ethers.providers.InfuraProvider("homestead", infuraKey)
  };

  const multicallContract = {
    kovan: "0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A",
    homestead: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
  };

  const provider = providers[network];
  const multicallAddress = "0x06B049da8E6E744cE4A3Ff58C5f69209A6b6dcb5";

  const multi = new ethers.Contract(multicallAddress, multicall.abi, provider);
  const calls = [];
  const erc20Contract = new ethers.utils.Interface(erc20.abi);
  tokens.forEach(token => {
    calls.push([token, erc20Contract.encodeFunctionData("decimals", [])]);
    calls.push([token, erc20Contract.encodeFunctionData("symbol", [])]);
    calls.push([token, erc20Contract.encodeFunctionData("name", [])]);
  });
  const tokenMetadata = {};
  const [, response] = await multi.aggregate(calls);

  let testTokens = [
    "0xC46fF5607982F297c53d456cf152BA9b56D7eE96",
    "0x4E798a4F2c92D63337611170fe0b6F19097bf062",
    "0x1f63AB307e2D74875A94f0c49CcEa73CCB34A574"
  ];

  for (let i = 0; i < testTokens.length; i++) {
    const address = testTokens[i];
    if (address in overwrite) {
      tokenMetadata[address] = overwrite[address];
      continue;
    }
    const [decimals] = erc20Contract.decodeFunctionResult(
      "decimals",
      response[3 * i]
    );
    const [symbol] = erc20Contract.decodeFunctionResult(
      "symbol",
      response[3 * i + 1]
    );
    const [name] = erc20Contract.decodeFunctionResult(
      "name",
      response[3 * i + 2]
    );
    tokenMetadata[testTokens[i]] = {
      decimals,
      symbol,
      name
    };
  }
  return tokenMetadata;
}

function getTokens(data, metadata) {
  const tokens = [];
  for (const address in metadata.homestead) {
    const chainId = 1;
    const token = metadata.homestead[address];
    const { decimals, symbol, name } = token;
    tokens.push({
      address,
      chainId,
      name,
      symbol,
      decimals,
      logoURI: getLogoURI(data.assets, address)
    });
  }
  for (const address in metadata.kovan) {
    const chainId = 42;
    const token = metadata.kovan[address];
    const { decimals, symbol, name } = token;
    tokens.push({
      address,
      chainId,
      name,
      symbol,
      decimals,
      logoURI: getLogoURI(data.assets, address)
    });
  }
  return tokens;
}

function getLogoURI(assets, address) {
  address = getMainnetAddress(address);
  if (address === "ether") {
    return "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png";
  }
  if (assets.local.includes(address.toLowerCase())) {
    return `https://raw.githubusercontent.com/balancer-labs/assets/master/assets/${address.toLowerCase()}.png`;
  }
  if (assets.trustwallet.includes(address)) {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
  }
  return undefined;
}

function getMainnetAddress(address) {
  const map = {
    "0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1":
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x41286Bb1D3E870f3F750eB7E1C25d7E48c8A1Ac7":
      "0xba100000625a3754423978a60c9317c58a424e3D",
    "0xc2569dd7d0fd715B054fBf16E75B001E5c0C1115":
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0xAf9ac3235be96eD496db7969f60D354fe5e426B0":
      "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    "0x04DF6e4121c27713ED22341E7c7Df330F56f289B":
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x8F4beBF498cc624a0797Fe64114A6Ff169EEe078":
      "0xbC396689893D065F41bc2C6EcbeE5e0085233447",
    "0x1C8E3Bcb3378a443CC591f154c5CE0EBb4dA9648":
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  };
  return map[address] || address;
}

run();
