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

const config: LockliftConfig = {
  compiler: {
    version: "0.64.0",

    externalContractsArtifacts : {
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
    verifierVersion: 'latest',
    apiKey: process.env.EVERSCAN_API_KEY!,
    secretKey: process.env.EVERSCAN_SECRET_KEY!,
  },
  networks: {
    locklift: {
      deploy: ["common/", "local/"],
      giver: {
        address: process.env.LOCAL_GIVER_ADDRESS!,
        key: process.env.LOCAL_GIVER_KEY!,
      },
      connection: {
        id: 1001,
        type: "proxy",
        // @ts-ignore
        data: {}
      },
      keys: {
        phrase: process.env.LOCAL_PHRASE,
        amount: 20,
      },
    },
    local: {
      deploy: ["common/", "local/"],
      connection: {
        id: 1,
        group: "localnet",
        type: "graphql",
        data: {
          endpoints: [process.env.LOCAL_NETWORK_ENDPOINT!],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      giver: {
        address: process.env.LOCAL_GIVER_ADDRESS!,
        key: process.env.LOCAL_GIVER_KEY!,
      },
      keys: {
        phrase: process.env.LOCAL_PHRASE,
        amount: 20,
      },
    },
    test: {
      deploy: ["common/", "test/"],
      connection: {
        id: 1,
        type: "graphql",
        group: "dev",
        data: {
          endpoints: [process.env.DEVNET_NETWORK_ENDPOINT!],
          latencyDetectionInterval: 1000,
          local: false,
        },
      },
      giver: {
        address: process.env.DEVNET_GIVER_ADDRESS!,
        key: process.env.DEVNET_GIVER_KEY!,
      },
      keys: {
        phrase: process.env.DEVNET_PHRASE,
        amount: 20,
      },
    },
    venom_testnet: {
      deploy: ["common/", "venom_testnet/"],
      connection: {
        id: 1000,
        type: "jrpc",
        group: "dev",
        data: {
          endpoint: process.env.VENOM_TESTNET_RPC_NETWORK_ENDPOINT!,
        },
      },
      giver: {
        address: process.env.VENOM_TESTNET_GIVER_ADDRESS!,
        phrase: process.env.VENOM_TESTNET_GIVER_PHRASE!,
        accountId: 0,
      },
      keys: {
        phrase: process.env.VENOM_TESTNET_PHRASE,
        amount: 20,
      },
    },
    main: {
      deploy: ["common/", "main/"],
      connection: {
        id: 1,
        type: "jrpc",
        group: "main",
        data: {
          endpoint: process.env.MAINNET_RPC_NETWORK_ENDPOINT!,
        },
      },
      giver: {
        address: process.env.MAINNET_GIVER_ADDRESS!,
        key: process.env.MAINNET_GIVER_KEY!,
      },
      keys: {
        phrase: process.env.MAINNET_PHRASE,
        amount: 20,
      },
    },
  },
  mocha: { timeout: 2000000, bail: true },
};

export default config;
