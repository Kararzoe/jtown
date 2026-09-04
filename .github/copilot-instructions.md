# Copilot instructions for jos-nuxt

## Project overview

This repository is a Nuxt 4 + Vue marketplace/site for local service and product discovery in Jos, with a customer-facing landing experience, seller flows, and an admin dashboard. The app is primarily organized under `app/`:

- `app/pages/` contains route-driven pages such as `/`, `/products`, `/services`, `/dashboard`, `/admin`, `/login`, and seller/admin-specific screens.
- `app/components/` holds shared UI blocks such as navbars, footer, product cards, and floating action buttons.
- `app/composables/` contains reusable logic; `useLanguage.ts` is the main pattern for translations and locale switching.
- `app/layouts/default.vue` wraps the entire app with the shared `AppNavbar`, `AppFooter`, and floating buttons.
- `nuxt.config.ts` is the central configuration file. It registers `@nuxt/ui` and `@nuxtjs/supabase`, sets `ssr: false`, configures auth redirects, and targets Vercel for Nitro output.

The app relies heavily on Supabase from the client side. Look for patterns such as `useSupabaseClient()`, `useSupabaseUser()`, and direct `.from('table')` queries in pages and components instead of a server-side API layer. This repo is not a pure REST/Node service; it is a Nuxt app with direct database access from the frontend.

## Build, lint, and validation commands

Use the repo-level package scripts from the project root:

- Install dependencies: `pnpm install`
- Start the development app: `pnpm dev`
- Production build: `pnpm build`
- Local preview of production build: `pnpm preview`
- Lint: `pnpm run lint`
- Type check: `pnpm run typecheck`

CI is configured in `.github/workflows/ci.yml` and runs on Ubuntu with Node 22, then executes `pnpm install`, `pnpm run lint`, and `pnpm run typecheck`.

There is no dedicated test runner configured in `package.json`. For focused validation on a single file, prefer ESLint directly:

- `pnpm exec eslint app/pages/admin.vue`
- `pnpm exec eslint app/composables/useLanguage.ts`

If you are making a functional change to a page or composable, validate it with the smallest relevant lint/typecheck pass rather than assuming the full suite is required.

## Key conventions and patterns

- Use `script setup lang="ts"` in Vue files unless the file already follows a different pattern.
- Prefer Nuxt auto-imports and composables (`useSupabaseClient`, `useSupabaseUser`, `navigateTo`, `ref`, `computed`, `onMounted`, etc.) over importing from app-specific modules.
- Most pages are written as single-file Vue components with inline `script` and `template` blocks. Keep logic near the page/component that uses it unless the code is truly shared.
- Use Nuxt UI components (`UInput`, `UIcon`, `UButton`, etc.) when matching the existing UI patterns instead of introducing ad hoc component libraries.
- The project uses a centralized language helper instead of per-component hardcoded user-facing strings. Translation keys are defined in `app/composables/useLanguage.ts` and consumed via `const { t } = useLanguage()`.
- Admin, seller, and customer flows are separated by route/page names rather than by a deeply nested folder structure. Example routes include `/admin`, `/dashboard`, `/seller-dashboard`, `/upload-product`, `/become-seller`, and `/login`.
- Auth and redirect behavior are handled in pages themselves. Many pages check `user.value` and redirect to `/login` or `/dashboard` when the session is missing or insufficient.
- Data access pattern for marketplace features is usually: `const supabase = useSupabaseClient(); await supabase.from('table').select(...)` and then update the local `ref` values. This repo does not appear to use a separate data-layer abstraction or service module.
- Keep route changes and shared layout changes consistent with `app/layouts/default.vue` and `nuxt.config.ts` because the app is configured for a SPA-like user flow with auth redirect rules and a Vercel Nitro preset.

## Repository-specific notes

- `pnpm` is the package manager (`packageManager: "pnpm@11.20.0"`). Prefer `pnpm` commands over `npm` for consistency with CI and lockfiles.
- The app is configured with Tailwind via Nuxt and the Nuxt UI module; global CSS is loaded from `assets/css/main.css`.
- The repository also includes a Supabase schema file, `supabase-schema.sql`, which is a useful reference when adding or modifying database-backed features.
- Current app behavior is strongly tied to Supabase tables such as `profiles`, `products`, `orders`, `service_providers`, and `support_messages`.
