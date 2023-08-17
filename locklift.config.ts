import { LockliftConfig, lockliftChai } from 'locklift';
import { FactorySource } from './build/factorySource';
import '@broxus/locklift-verifier';
import { Deployments } from '@broxus/locklift-deploy';
import * as dotenv from 'dotenv';

dotenv.config();

import chai from 'chai';
chai.use(lockliftChai);

dotenv.config();
chai.use(lockliftChai);

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";

const TESTNET_GQL_ENDPOINT = process.env.TESTNET_GQL_ENDPOINT || "https://devnet-sandbox.evercloud.dev/graphql";
const TESTNET_GIVER_ADDRESS = process.env.TESTNET_GIVER_ADDRESS || "0:0000000000000000000000000000000000000000000000000000000000000000";
const TESTNET_GIVER_SEED = process.env.TESTNET_GIVER_SEED || "secret key";
const TESTNET_SEED_PHRASE = process.env.TESTNET_SEED_PHRASE || "action inject penalty envelope rabbit element slim tornado dinner pizza off blood";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-devnet.venom.foundation/";
const VENOM_TESTNET_TRACE_ENDPOINT =
  process.env.VENOM_TESTNET_TRACE_ENDPOINT || "https://gql-devnet.venom.network/graphql";
const VENOM_TESTNET_GIVER_ADDRESS = process.env.VENOM_TESTNET_GIVER_ADDRESS || "0:0000000000000000000000000000000000000000000000000000000000000000";
const VENOM_TESTNET_GIVER_SEED = process.env.VENOM_TESTNET_GIVER_SEED || "secret key";
const VENOM_TESTNET_SEED_PHRASE = process.env.VENOM_TESTNET_SEED_PHRASE || "action inject penalty envelope rabbit element slim tornado dinner pizza off blood";

const MAIN_NET_NETWORK_ENDPOINT = process.env.MAIN_NET_NETWORK_ENDPOINT || "https://mainnet.evercloud.dev/XXX/graphql";
const MAIN_NET_GIVER_ADDRESS = process.env.MAIN_NET_GIVER_ADDRESS || "0:0000000000000000000000000000000000000000000000000000000000000000";
const MAIN_NET_GIVER_SEED = process.env.MAIN_NET_GIVER_SEED || "secret key";
const MAIN_NET_SEED_PHRASE = process.env.MAIN_NET_SEED_PHRASE || "action inject penalty envelope rabbit element slim tornado dinner pizza off blood";

const config: LockliftConfig = {
  compiler: {
    version: "0.64.0",

    externalContracts: {
      precompiled: ['OrderRootPlatform, OrderPlatform'],
      'node_modules/dex/build': [
        'TokenFactory',
        'DexTokenVault',
        'DexVault',
        'DexRoot',
        'DexPlatform',
        'DexPair',
        'DexAccount',
        'LpTokenPending'
      ],
      'node_modules/tip3/build': [
        'TokenRootUpgradeable',
        'TokenWalletUpgradeable',
        'TokenWalletPlatform',
      ],
      'node_modules/ever-wever/everscale/build': [],
    }
  },
  linker: { version: "0.16.5" },
  verifier: {
    verifierVersion: 'latest', // contract verifier binary, see https://github.com/broxus/everscan-verify/releases
    apiKey: process.env.EVERSCAN_API_KEY ?? '',
    secretKey: process.env.EVERSCAN_SECRET_KEY ?? '',
    // license: "AGPL-3.0-or-later", <- this is default value and can be overrided
  },
  networks: {
    local: {
      connection: {
        id: 1337,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [LOCAL_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      giver: {
        address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
        key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
      },
      tracing: { endpoint: LOCAL_NETWORK_ENDPOINT },
      keys: {
        phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    test: {
      connection: {
        id: 0,
        type: "graphql",
        group: "testnet",
        data: {
          endpoints: [TESTNET_GQL_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: false,
        },
      },
      giver: {
        address: TESTNET_GIVER_ADDRESS,
        key: TESTNET_GIVER_SEED,
      },
      tracing: {
        endpoint: TESTNET_GQL_ENDPOINT,
      },
      keys: {
        phrase: TESTNET_SEED_PHRASE,
        amount: 20,
      },
    },
    venom_testnet: {
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: VENOM_TESTNET_ENDPOINT,
        },
      },
      giver: {
        address: VENOM_TESTNET_GIVER_ADDRESS,
        phrase: VENOM_TESTNET_GIVER_SEED,
        accountId: 0,
      },
      tracing: {
        endpoint: VENOM_TESTNET_TRACE_ENDPOINT,
      },
      keys: {
        phrase: VENOM_TESTNET_SEED_PHRASE,
        amount: 20,
      },
    },
    main: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        type: "graphql",
        group: "main",
        data: {
          endpoints: [MAIN_NET_NETWORK_ENDPOINT],
          latencyDetectionInterval: 1000,
          local: false,
        },
      },
      // This giver is default Wallet
      giver: {
        address: MAIN_NET_GIVER_ADDRESS,
        key: MAIN_NET_GIVER_SEED,
      },
      tracing: {
        endpoint: MAIN_NET_NETWORK_ENDPOINT,
      },
      keys: {
        phrase: MAIN_NET_SEED_PHRASE,
        amount: 20,
      },
    },
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
