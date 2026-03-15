# AI Coding Instructions for PConfig

## Project Overview
**PConfig** is a Vue 3 + Vite PC component configuration application that allows users to build custom PC setups by selecting components (GPU, CPU, RAM, PSU, etc.). The app features a configurator with live component selection, price calculation, and persistent state management.

**Tech Stack:** Vue 3 (Composition API with `<script setup>`), Vite, Pinia (state), Tailwind CSS 4.0, Vue Router, PrimeVue/Lucide icons

## Architecture & Data Flow

### State Management (Pinia Store)
- **Location:** [src/stores/store.js](src/stores/store.js)
- Store manages `selected` object with keys for each component type: `gpu`, `cpu`, `mobo`, `ram`, `psu`, `storage`, `fan`, `thermo`, `case`
- Each component tracks `{value: null}` - stores selected item ID
- **Critical:** Store uses `pinia-plugin-persistedstate` to auto-save/load state from localStorage
- When adding new component types, update both `allComponents` object and `selected` state shape
- Store data sourced from [src/scripts/products.json](src/scripts/products.json) (638 lines, pre-limited to max items per category)

### Component Product Data
- **File:** [src/scripts/products.json](src/scripts/products.json)
- Structure: `{componentType: [{id, name, link, price, image, type/power, shortName}]}`
- Items have `power` (PSU requirement) and `type` (for filtering - see NVIDIA/AMD distinction)
- Used by store to populate `allComponents` with `limitItems(arr, max)` function

### Router & Views
- **Setup:** [src/main.js](src/main.js) - 7 routes defined with localized titles (Russian "Главная", "Конфигуратор", etc.)
- All routes use `meta: { title: 'Page Name - PConfig' }` for SEO
- Key views: `/` (HomeView), `/config` (ConfigView - main configurator), `/ready` (pre-built), `/service`, `/order`, `/login`, `/stalineldetey` (TestView)

### ConfigView Architecture (Main Flow)
- **File:** [src/views/ConfigView.vue](src/views/ConfigView.vue)
- 3-column responsive grid: sidebar (sticky ConfigAccordion) + center (ConfigList items) + right (ConfigTotal summary)
- Uses `slugify()` utility to anchor links to each component section
- Passes `@update:selected` event handler to child components to sync with store
- Error display: bottom-right toast shows `lastError` reactive state

### ConfigList Component (Item Selection)
- **File:** [src/components/ConfigList.vue](src/components/ConfigList.vue)
- Radio button interface for selecting one item per component category
- Dynamic filtering: component-specific (e.g., GPU type filter: NVIDIA/AMD)
- Displays product image + live preview on selection
- Props: `title`, `componentKey`, `items`, `icon`, `selected`
- Emits: `@update:selected` with `{value: itemId}`

### ConfigTotal Component (Summary & Totals)
- Calculates total price from selected items
- Likely computes PSU requirement from GPU + CPU power specs
- Clear button resets all selections via store `clearSelected()` action

## Key Development Patterns

### Component Creation
- Always use **`<script setup>`** syntax (modern Vue 3 standard here)
- Import icon from `lucide-vue-next` for consistency (see store.js: `Cpu`, `BoomBox`, `CircuitBoard`, etc.)
- Styling: Use **Tailwind CSS 4.0** (installed via `@tailwindcss/vite`, not v3)
- Dark mode support: Leverage `dark:` prefix classes (e.g., `dark:text-white`, `dark:bg-neutral-800`)

### State Updates & Reactivity
- Use store actions `setSelected(key, value)` or `clearSelected()` from store
- Watch for computed properties when aggregating data (e.g., total price calculation)
- Refs for local UI state (e.g., `selectedFilter` in ConfigList, `lastError` in ConfigView)

### Responsive Design
- Breakpoints used: `sm:`, `md:`, `lg:`, `2xl:` (Tailwind defaults)
- ConfigView uses `grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8` to adapt layout
- Sticky positioning for sidebars: `sticky top-4 self-start` (offset from navbar)

### UI Patterns
- Product images: fallback to `/component.png` (dark bg `#35373c`) when unavailable
- Radio buttons for single selection per category (HTML `<input type="radio">`)
- Cards/containers: `rounded-2xl` corners, `p-4`/`p-6` padding, `bg-neutral-200` with dark mode `dark:bg-neutral-800`
- Text hierarchy: h2 at `text-3xl font-semibold`, icons at `w-7 h-7`

### Utility Functions
- **[src/scripts/slugify.js](src/scripts/slugify.js):** Converts Russian component names to URL-friendly slugs (e.g., "Видеокарта" → anchor ID)
- **[src/scripts/useCompatibility.js](src/scripts/useCompatibility.js):** Likely validates component compatibility (CPU/Mobo, etc.)
- **[src/scripts/themeImage.js](src/scripts/themeImage.js) & [getThemeImage.js](src/scripts/getThemeImage.js):** Theme-based asset selection (light/dark mode images)

## Build & Development Commands

```bash
npm run dev      # Start Vite dev server (hot reload, HMR enabled)
npm run build    # Production build (minified SFCs, tree-shaken tree)
npm run preview  # Preview production build locally
```

- **No test suite configured** - add Jest/Vitest if needed
- Vite configuration is minimal ([vite.config.js](vite.config.js)) - just Vue plugin + Tailwind CSS plugin

## Important File Locations

| Purpose | Path |
|---------|------|
| State definitions | [src/stores/store.js](src/stores/store.js) |
| Product catalog | [src/scripts/products.json](src/scripts/products.json) |
| Main configurator | [src/views/ConfigView.vue](src/views/ConfigView.vue) |
| Component items UI | [src/components/ConfigList.vue](src/components/ConfigList.vue) |
| Routing & app setup | [src/main.js](src/main.js) |
| Root layout | [src/App.vue](src/App.vue) (NavBar + router-view + Footer) |
| Styles | [src/style.css](src/style.css) |

## Common Tasks for AI Agents

### Adding a New Component Category
1. Add entries to [src/scripts/products.json](src/scripts/products.json) under a new key (e.g., `"monitor"`)
2. Add to `store.js` `allComponents` object and `useConfigStore` selected state
3. Add metadata to `components` array in store with icon and Russian name
4. ConfigView automatically iterates; no hardcoding needed

### Fixing Component Compatibility Issues
- Check [src/scripts/useCompatibility.js](src/scripts/useCompatibility.js) - likely returns validation errors
- PSU wattage rules: sum GPU `power` + CPU `power`, add ~100W overhead
- Display errors in ConfigView's error toast (`lastError` state)

### Styling Dark Mode
- All components support `dark:` classes (watch ConfigList for examples)
- Test with browser DevTools: toggle `html.dark` class

### Debugging Store Issues
- Open Vue DevTools → Pinia tab to inspect `selected`, `allComponents`
- Check browser localStorage (key likely: `"config"`) for persistence

## Notes for AI Agents
- Project is **production-ready but under active development** (v0.0.0, GitHub repo: myafxd/pcconfig)
- Russian UI text is intentional (target: Russian-speaking users)
- PrimeVue is imported but not heavily used (lucide-vue-next icons preferred)
- No backend API calls in current codebase (axios dependency unused, verify before adding server logic)
