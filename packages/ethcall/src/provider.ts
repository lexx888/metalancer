import { BaseProvider } from '@ethersproject/providers';

import { Call, all as callAll } from './call';
import { getEthBalance } from './calls';
import Contract from './contract';

export default class Provider {
	provider?: BaseProvider;
	multicallAddress: string;

	constructor() {
		this.multicallAddress = getAddress(1);
	}

	async init(provider: BaseProvider) {
		this.provider = provider;
		const network = await provider.getNetwork();
		this.multicallAddress = getAddress(network.chainId);
	}

	getEthBalance(address: string) {
		if (!this.provider) {
			console.error('Provider should be initialized before use.');
		}
		return getEthBalance(address, this.multicallAddress);
	}

	async all(calls: Call[]) {
		if (!this.provider) {
			console.error('Provider should be initialized before use.');
		}
		const provider = this.provider as BaseProvider;
		return await callAll(calls, this.multicallAddress, provider);
	}
}

function getAddress(chainId: number): string {
	console.log("getting address for " + chainId)
	const addressMap: Record<number, string> = {
		1: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		4: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		42: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		100: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		1337: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		9000: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
		588: '0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d',
	};
	const address = addressMap[chainId];
	console.log("multicall address for " + chainId + " is " + address)
	return address;
}
