import { defineConfig } from 'orval';
export default defineConfig({
  auth: {
    output: {
      mode: 'single',
      target: 'libs/sdk/mogtrade/api/auth',
      schemas: {
        type: 'zod',
        path: 'libs/sdk/mogtrade/schemas'
      },
      client: 'angular',
      override: {
        angular: {
          provideIn: false,
          runtimeValidation: true,

        },
      },
    },
    input: {
      target:
        'https://github.com/brinestone/mogtrade-engine/raw/refs/heads/master/build/smithy/source/openapi/Auth.openapi.json',
    },
  },
});
