# Mogtrade

## Project Overview

Mogtrade is a trading platform web application that connects to various stock exchanges, permitting users to perform trades on the stock market (stocks, options, futures, etc.). This codebase is the Angular frontend UI, built with Angular 22 and integrating with a RESTful API backend as the source of truth.

## Technology Stack

- **Framework**: Angular 22 (standalone components, default in Angular v20+)
- **Rendering**: SSR/SSG enabled via `@angular/platform-server` and `express`
- **Styling**: Tailwind CSS v4
- **State Management**: Angular Signals with NgRx SignalStore
- **Forms**: Signal Forms (`@angular/forms/signals`) for new forms; Reactive Forms as alternative
- **HTTP**: RxJS for reactive programming, with orval-generated typesafe SDK
- **Authentication**: JWT bearer tokens with refresh token rotation, FingerprintJS for device fingerprinting (`@fingerprintjs/fingerprintjs`)
- **Build Tool**: pnpm v11
- **UI Library**: spartan-ng components (similar to shadcn-ui for Angular)

## Project Structure

```
mogtrade/
├── src/
│   ├── app/                # Angular application code
│   │   ├── app.ts          # Main application entry point
│   │   ├── app.html        # Root template
│   │   ├── app.config.ts   # Client-side configuration
│   │   ├── app.config.server.ts # Server-side configuration
│   │   ├── app.routes.ts   # Client-side routes
│   │   ├── app.routes.server.ts # Server-side routes
│   │   ├── app.spec.ts     # Test configuration
│   │   ├── models/         # Application models (e.g., Principal)
│   │   ├── store/          # NgRx SignalStore state management
│   │   ├── adapters/       # Adapters for external services
│   │   ├── components/     # Reusable standalone components
│   │   ├── interceptors/   # HTTP interceptors
│   │   ├── guards/         # Route guards
│   │   ├── layouts/        # Page layout components
│   │   ├── pages/          # Page-level components
│   │   └── utils/          # Utility functions
│   ├── main.ts             # Client-side entry point
│   ├── main.server.ts      # Server-side rendering entry point
│   ├── server.ts           # Express server setup
│   ├── index.html          # HTML template
│   └── styles.scss         # Global styles
├── angular.json            # Angular CLI configuration
├── tsconfig*.json          # TypeScript configurations
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # Lock file
└── tailwind.config.*       # Tailwind CSS configuration
├── orval.config.ts         # API client generation configuration
└── components.json         # spartan-ng component configuration
```

### Key Directories

- **`src/app/`**: Contains all Angular components, services, and modules
- **`src/app/app.html`**: Root component template
- **`src/app/app.config.ts`**: Client-side application configuration
- **`src/app/app.config.server.ts`**: Server-side rendering configuration
- **`src/app/app.routes.ts`**: Client-side routing configuration
- **`src/app/app.routes.server.ts`**: Server-side routing configuration
- **`src/main.ts`**: Bootstrap the application in the browser
- **`src/main.server.ts`**: Bootstrap the application for server-side rendering
- **`src/server.ts`**: Express server for serving the SSR application
- **`src/store/`**: NgRx SignalStore state management (auth, device, upcoming: wallets)
- **`libs/sdk/`**: Orval-generated typesafe Angular SDK
- **`libs/ui/`**: Spartan-ng UI components (added incrementally)

## Architecture & Patterns

- **Standalone Components**: All components are standalone (default in Angular v20+). No NgModules.
- **Signal-Based State**: Use signals for local component state and `computed()` for derived state. NgRx SignalStore for global state management.
- **State Stores Currently Implemented**:
  - `AuthStore`: Manages authentication state (principal, access token, refresh token, signedIn status). Uses `withState`, `withMethods`, `withEventHandlers`, `withHooks`. Principal model extracted from JWT claims (id, displayName, email, emailVerified, photo).
  - `DeviceStore`: Manages device fingerprint state. Uses `withState` and `withMethods`.
  - `wallets`: Next store to be implemented.
- **Lazy Loading**: Feature routes should use lazy loading.
- **Reactive Forms**: Signal Forms (`@angular/forms/signals`) for new forms. Pattern demonstrated in `LoginPage` using `form()`, `validateStandardSchema`, and signal-based submission. All new forms should follow this pattern.
- **SSR/SSG**: Server-Side Rendering and Static Site Generation enabled. Auth-required pages render on the client to avoid SSR hydration issues.
- **API Integration**: RESTful API backend is the source of truth. Orval generates a typesafe Angular SDK from the OpenAPI spec. All data fetching goes through the generated SDK.
- **API Interceptors**:
  - `apiBearerTokenInterceptor`: Modifies API URLs based on executing environment, provides bearer token handling.
  - `apiDeviceIdInterceptor`: Adds `x-d-id` header with device fingerprint from FingerprintJS.
- **Authentication Flow**:
  - Login via `POST /api/v1/auth/login/credential` endpoint.
  - Successful response contains access token and refresh token.
  - Tokens stored in `localStorage` AND NgRx SignalStore state.
  - Refresh token rotation handled in `signed-in-guard.ts` (note: recommended to move to interceptor for broader applicability).
  - FingerprintJS used for device fingerprinting (`@fingerprintjs/fingerprintjs`).
- **Accessibility**: Must pass AXE checks and follow WCAG AA minimums.
- **Component Guidelines**:
  - Small, focused components with single responsibility.
  - `input()` and `output()` functions instead of decorators.
  - Native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
  - `NgOptimizedImage` for all static images.
  - No `ngClass`/`ngStyle` — use class/style bindings instead.
  - No `@HostBinding`/`@HostListener` — use `host` object instead.
  - Use `NgIcon` from `@ng-icons/core` for icons.
  - `Hlm*` components from `@spartan-ng/helm` for styled primitives.
- **Available Scripts**

| Script | Description |
|--------|-------------|
| `dev` | Start development server (`ng serve`) |
| `build` | Build the application (`ng build`) |
| `watch` | Watch for changes and rebuild (`ng build --watch --configuration development`) |
| `test` | Run tests (`ng test`) |
| `serve:ssr` | Serve the SSR application (`node dist/mogtrade/server/main.js`) |
| `sdk:update` | Update the orval-generated SDK |

## Development Notes

- **TypeScript strict mode** enabled
- **Prettier** for code formatting
- **Vitest** for testing
- **JSdom** for test environment
- Tailwind CSS v4 used for styling — no custom CSS framework beyond that
- UI components added incrementally via `ng generate @spartan-ng/cli:ui <name-of-component>`
- Orval SDK generated from: `https://github.com/brinestone/mogtrade-engine/raw/refs/heads/master/build/smithy/source/openapi/Auth.openapi.json`

## License

Private project — all rights reserved.