import { Provider, Contract } from "balancer-ethcall";
// import { Contract } from '@ethersproject/contracts';

import dsProxyRegistryAbi from "../abi/DSProxyRegistry.json";
import erc20Abi from "../abi/ERC20.json";

import config, { AssetMetadata } from "@/config";
import { ETH_KEY, getAssetLogo } from "@/utils/helpers";
import provider from "@/utils/provider";

export type Allowances = Record<string, Record<string, string>>;

export type Balances = Record<string, string>;

export interface AccountState {
    allowances: Allowances;
    balances: Balances;
    proxy: string;
}

export default class Ethereum {
    static async fetchAccountState(address: string, assets: string[]): Promise<AccountState> {
        assets = assets.filter(asset => asset !== ETH_KEY);
        const ethcallProvider = new Provider();
        await ethcallProvider.init(provider);
        const calls = [];
        // Fetch balances and allowances
        const exchangeProxyAddress = config.addresses.exchangeProxy;
        for (const assetAddress of assets) {
            const assetContract = new Contract(assetAddress, erc20Abi);
            const balanceCall = assetContract.balanceOf(address);
            const allowanceCall = assetContract.allowance(address, exchangeProxyAddress);
            calls.push(balanceCall);
            calls.push(allowanceCall);
        }
        // Fetch ether balance
        const ethBalanceCall = ethcallProvider.getEthBalance(address);
        calls.push(ethBalanceCall);
        // Fetch proxy
        const dsProxyRegistryAddress = config.addresses.dsProxyRegistry;
        const dsProxyRegistryContract = new Contract(dsProxyRegistryAddress, dsProxyRegistryAbi);
        const proxyCall = dsProxyRegistryContract.proxies(address);
        // calls.push(proxyCall);
        // Fetch data
        const data = await ethcallProvider.all(calls);
        const assetCount = assets.length;
        const allowances = {};
        allowances[exchangeProxyAddress] = {};
        const balances: Record<string, string> = {};
        let i = 0;
        for (const assetAddress of assets) {
            balances[assetAddress] = data[2 * i].toString();
            allowances[exchangeProxyAddress][assetAddress] = data[2 * i + 1].toString();
            i++;
        }
        balances.ether = data[2 * assetCount].toString();
        const proxy = exchangeProxyAddress;
        console.log(balances);
        return { allowances, balances, proxy };
    }

    static async fetchAssetMetadata(assets: string[]): Promise<Record<string, AssetMetadata>> {
        console.log("this is it2!");
        // const ethcallProvider = new Provider();
        // await ethcallProvider.init(provider);
        // const calls = [];
        // // Fetch asset metadata
        // for (const assetAddress of assets) {
        //     const assetContract = new Contract(assetAddress, erc20Abi);
        //     const nameCall = assetContract.name();
        //     const symbolCall = assetContract.symbol();
        //     const decimalCall = assetContract.decimals();
        //     calls.push(nameCall);
        //     calls.push(symbolCall);
        //     calls.push(decimalCall);
        // }
        // Fetch data
        //const data = await ethcallProvider.all(calls);
        let addresses: string[] = [
            "0x1A30eE1295e0f10d3D9bDDc763510b3baFD1be98",
            "0x6925EA17e5BcCb23CB271530cad999B992D50799",
            "0x00B205bB15729dc21BBEf9b422498cFebE4CC4F0"
        ];
        const metadata: Record<string, AssetMetadata> = {};
        for (let i = 0; i < addresses.length; i++) {
            const assetAddress = addresses[i];
            const name = "TOKEN" + (i + 1);
            const symbol = "TOK" + (i + 1);
            const decimals = 18;
            metadata[assetAddress] = {
                address: addresses[i],
                name,
                symbol,
                decimals,
                logoURI: undefined
            };
        }
        return metadata;
    }
}
