import { defineConfig } from 'orval';
export default defineConfig({
  economy: {
    output: {
      clean: true,
      mode: 'tags-split',
      target: 'libs/sdk/mogtrade/api/economy',
      schemas: {
        type: 'zod',
        path: 'libs/sdk/mogt`rade/schemas/economy',
      },
      client: 'angular',
      override: {
        angular: {
          provideIn: false,
          runtimeValidation: true,
          retrievalClient: 'both',
        },
      },
    },
    input: {
      target:
        'https://github.com/brinestone/mogtrade-engine/raw/refs/heads/master/openapi/economy/openapi/Economy.openapi.json',
    },
  },
  auth: {
    output: {
      clean: true,
      mode: 'tags-split',
      target: 'libs/sdk/mogtrade/api/auth',
      schemas: {
        type: 'zod',
        path: 'libs/sdk/mogtrade/schemas/auth',
      },
      client: 'angular',
      override: {
        angular: {
          provideIn: false,
          runtimeValidation: true,
          retrievalClient: 'both',
        },
      },
    },
    input: {
      target:
        'https://github.com/brinestone/mogtrade-engine/raw/refs/heads/master/openapi/auth/openapi/Auth.openapi.json',
    },
  },
  // wallet: {
  //   output: {
  //     clean: true,
  //     mode: 'tags-split',
  //     target: 'libs/sdk/mogtrade/api/wallet',
  //     schemas: {
  //       type: 'zod',
  //       path: 'libs/sdk/mogtrade/schemas/wallet',
  //     },
  //     client: 'angular',
  //     override: {
  //       angular: {
  //         provideIn: false,
  //         runtimeValidation: true,
  //         retrievalClient: 'both',
  //       },
  //     },
  //   },
  //   input: {
  //     target:
  //       'https://github.com/brinestone/mogtrade-engine/raw/refs/heads/master/openapi/wallet/openapi/Wallet.openapi.json',
  //   },
  // },
});
