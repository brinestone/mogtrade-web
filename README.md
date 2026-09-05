# Mogtrade

## Project Overview
Mogtrade is a trading platform web application that connects to various stock exchanges, permitting users to perform trades on the stock market. This codebase is the Angular frontend UI, built with Angular 22 and integrating with a RESTful API backend as the source of truth.

## Technology Stack

- **Framework**: Angular 22 (standalone components, default in Angular v20+)
- **Rendering**: SSR/SSG enabled via `@angular/platform-server` and `express`
- **Styling**: Tailwind CSS v4
- **State Management**: Angular Signals (recommended approach)
- **Forms**: Signal Forms (`@angular/forms/signals`) for new forms; Reactive Forms as alternative
- **HTTP**: RxJS for reactive programming
- **Authentication**: FingerprintJS for device fingerprinting (`@fingerprintjs/fingerprintjs`)
- **Build Tool**: pnpm v11

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
│   │   └── ...             # Feature modules, components, services
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

## Architecture & Patterns

- **Standalone Components**: All components are standalone (default in Angular v20+)
- **Signal-Based State**: Use signals for local component state and `computed()` for derived state
- **Lazy Loading**: Feature routes should use lazy loading
- **Reactive Forms**: Signal Forms for new forms; Reactive Forms as alternative
- **SSR/SSG**: Server-Side Rendering and Static Site Generation enabled
- **API Integration**: RESTful API backend is the source of truth; all data fetching goes through the backend
- **Accessibility**: Must pass AXE checks and follow WCAG AA minimums
- **Component Guidelines**:
  - Small, focused components with single responsibility
  - `input()` and `output()` functions instead of decorators
  - Native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
  - `NgOptimizedImage` for all static images
  - No `ngClass`/`ngStyle` — use class/style bindings instead
  - No `@HostBinding`/`@HostListener` — use `host` object instead

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server (`ng serve`) |
| `build` | Build the application (`ng build`) |
| `watch` | Watch for changes and rebuild (`ng build --watch --configuration development`) |
| `test` | Run tests (`ng test`) |
| `serve:ssr` | Serve the SSR application (`node dist/mogtrade/server/main.js`) |

## Development Notes

- **TypeScript strict mode** enabled
- **Prettier** for code formatting
- **Vitest** for testing
- **JSdom** for test environment
- Tailwind CSS v4 used for styling — no custom CSS framework beyond that

## License

Private project — all rights reserved.