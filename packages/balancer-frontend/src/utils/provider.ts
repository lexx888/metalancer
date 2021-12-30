import { AlchemyProvider, InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

const provider = new JsonRpcProvider("https://stardust.metis.io/?owner=588");
 
//new InfuraProvider(config.network, config.infuraKey);

export default provider;

const debugProvider = new JsonRpcProvider("https://stardust.metis.io/?owner=588");

export { debugProvider };
