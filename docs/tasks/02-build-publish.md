# Sprint 5 — Build & Publish

Configure the production build pipeline, verify package exports, set up CI/CD, and publish the initial version to npm. After this sprint, component2block is a consumable package.

**Estimated total: ~2.5 hours**

**Prerequisite:** Sprint 4 (components implemented and tested)

---

## Task 5.1 — Verify Vite Library Build

**Time estimate:** 30 minutes

**Description:**
Run the Vite library build and verify the output in `dist/`. The build should produce ESM and CJS bundles, type declarations, and the compiled CSS from `main.scss`.

- Run `pnpm build` and inspect the `dist/` directory
- Verify `dist/index.mjs` exists (ESM bundle)
- Verify `dist/index.cjs` exists (CJS bundle)
- Verify `dist/index.d.ts` exists (type declarations from `vite-plugin-dts`)
- Verify `dist/style.css` exists (compiled from `src/styles/main.scss`)
- Confirm React and ReactDOM are **not** bundled (externalized as peer deps)
- Confirm component SCSS modules are compiled and included in the JS bundle
- Check bundle size is reasonable for two components

If the build output is incorrect, adjust `vite.config.ts` — the library mode config, `rollupOptions.external`, and the `dts` plugin options.

**Resources:**

- [PLAN.md — Vite Library Build](../PLAN.md) for the `vite.config.ts` config
- [PLAN.md — Package.json exports](../PLAN.md) for the expected exports map
- [docs/scss/main-scss.md](../scss/main-scss.md) — Explains what compiles to `dist/style.css`

---

## Task 5.2 — Configure Package Exports

**Time estimate:** 20 minutes

**Description:**
Finalize `package.json` with the correct `exports` map, `main`, `module`, `types`, `files`, and `peerDependencies` fields so consumers can import the library correctly in any module system.

Fields to set:

```json
{
  "name": "@troychaplin/c2b-storybook",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "sideEffects": ["**/*.css"]
}
```

Verify by running `pnpm pack` and inspecting the tarball contents — only `dist/` should be included.

**Resources:**

- [PLAN.md — Package.json exports](../PLAN.md) for the full exports example

---

## Task 5.3 — Test Local Consumption

**Time estimate:** 30 minutes

**Description:**
Create a temporary test project to verify the package works as a consumer would use it. This catches issues with exports, types, and CSS that automated tests won't find.

- Build the library: `pnpm build`
- In a separate directory, create a basic Vite React app
- Link the library: `pnpm link ../path/to/c2b-storybook`
- Test three import patterns:
  1. `import { Button, Card } from '@troychaplin/c2b-storybook'` — JS components
  2. `import '@troychaplin/c2b-storybook/styles'` — global CSS
  3. Verify TypeScript types resolve (hover over `Button` shows `ButtonProps`)
- Render a `<Button>` and `<Card>` — confirm styles apply correctly
- Clean up the test project when done

**Resources:**

- [PLAN.md — Package.json exports](../PLAN.md) for the expected import paths
- [docs/scss/main-scss.md](../scss/main-scss.md) — The three consumer import patterns

---

## Task 5.4 — Set Up GitHub Actions CI

**Time estimate:** 45 minutes

**Description:**
Create `.github/workflows/ci.yml` that runs on every pull request. The workflow validates that the codebase is clean, types check, tests pass, and both the library and Storybook build successfully.

Pipeline steps:

1. Checkout code
2. Set up Node 22 (from `.nvmrc`)
3. Set up pnpm with caching
4. Install dependencies (`pnpm install --frozen-lockfile`)
5. Run `pnpm lint` — ESLint
6. Run `pnpm format:check` — Prettier
7. Run `pnpm typecheck` — `tsc --noEmit`
8. Install Playwright browsers (`pnpm exec playwright install chromium`)
9. Run `pnpm test` — Vitest (requires Playwright for browser mode)
10. Run `pnpm build` — Vite library build
11. Run `pnpm build-storybook` — Storybook static build

Use pnpm store caching and Playwright browser caching to speed up runs.

**Resources:**

- [PLAN.md — CI/CD Pipeline](../PLAN.md) for the `ci.yml` pipeline definition
- [PLAN.md — Scripts](../PLAN.md) for all script commands used in CI

---

## Task 5.5 — Set Up GitHub Actions Publish

**Time estimate:** 30 minutes

**Description:**
Create `.github/workflows/publish.yml` that runs when a GitHub Release is created. The workflow builds the library and publishes to npm.

Pipeline steps:

1. Checkout code
2. Set up Node 22 with npm registry URL (`https://registry.npmjs.org`)
3. Set up pnpm
4. Install dependencies
5. Run `pnpm build`
6. Run `npm publish --access public` with `NODE_AUTH_TOKEN` secret

Prerequisites:

- Create an npm access token and add it as a GitHub secret (`NPM_TOKEN`)
- Ensure the npm org `@carletonuniversity` exists and the token has publish access
- Add `publishConfig` to `package.json`: `{ "access": "public" }`

**Resources:**

- [PLAN.md — CI/CD Pipeline](../PLAN.md) for the `publish.yml` pipeline definition

---

## Task 5.6 — First Publish to npm

**Time estimate:** 15 minutes

**Description:**
Perform the initial publish of the package to verify the full pipeline works end-to-end.

- Ensure `package.json` version is set to `0.1.0` (initial release)
- Create a GitHub Release tagged `v0.1.0` to trigger the publish workflow
- Verify the package appears on npmjs.com at `@troychaplin/c2b-storybook`
- Verify the package can be installed in a fresh project: `pnpm add @troychaplin/c2b-storybook`
- Verify imports work as tested in Task 5.3

If the automated publish fails, debug the workflow and fix. As a fallback, publish manually:

```bash
pnpm build
npm publish --access public
```

**Resources:**

- [PLAN.md — CI/CD Pipeline](../PLAN.md) for the publish workflow

---

## Checklist

- [ ] 5.1 — Verify Vite Library Build
- [ ] 5.2 — Configure Package Exports
- [ ] 5.3 — Test Local Consumption
- [ ] 5.4 — Set Up GitHub Actions CI
- [ ] 5.5 — Set Up GitHub Actions Publish
- [ ] 5.6 — First Publish to npm
