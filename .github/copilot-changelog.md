Changelog — recent fixes made by AI assistant

- src/scripts/useCompatibility.js: Reworked into robust utilities and debugging:
  - Added `parseNumberField`, `getItemByKey`, `getTotalPrice`, `validateCompatibility` exports.
  - `validateCompatibility` now detects PSU/CPU/GPU power from several field names, extracts DDR version for RAM checks, and logs debug info with `console.debug`.
  - Added `lastErrors` (array) and preserved `lastError` (string) in default export for backward compatibility.

- src/components/ConfigList2.vue and src/components/ConfigList.vue:
  - Components now emit primitive `id` values (not full objects). Selection is resolved against `allComponents` when rendering names/images.

- src/stores/store.js:
  - `loadComponents()` normalizes persisted `selected` entries (converts any stored objects to ids) to avoid `[object Object]` rendering.
  - Store fetches components from backend `/api/components/grouped`.

- src/components/ConfigTotal.vue and src/views/OrderView.vue:
  - Use `getTotalPrice` and `validateCompatibility` to compute totals and compatibility status; selected item names are resolved from `allComponents`.

- src/views/ConfigView.vue and src/views/TestView.vue:
  - Pass `allComponents` into `useCompatibility()` and improved watchers to trigger compatibility checks when selections change.
  - `ConfigView` mirrors compatibility `lastErrors` into `configStore.lastError` and displays each error in its own red toast block.

Suggested follow-ups (recommended but not yet implemented):

- Migrate/normalize persisted localStorage data explicitly on app startup (optionally clear old keys with a user prompt) to avoid silent conversions.
- Add unit tests for `validateCompatibility` covering varied DB schemas (different field names like `watt`, `power`, `tdp`, `wattage`, etc.).
- Add integration tests that start the server and mock DB records to verify totals and compatibility rules.
- Improve UI: show compatibility warnings also in `OrderView.vue` near the checkout button and disable purchase if critical errors exist.
- Add a small admin/seed script to keep Prisma `component` records consistent (standardize `power`, `socket`, `ramType` fields).
- Replace `console.debug` traces with a toggleable debug mode and/or structured logging so production logs remain clean.

If you want, I can implement any of the suggested follow-ups — tell me which one to do next.
