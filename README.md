# KoinX Tax Loss Harvesting Dashboard


## Key Features

- **Real-time Tax Calculations**: Instantly see your "After Harvesting" savings as you select different assets from your portfolio.
- **Dynamic Holdings Table**: Full sorting (Asset, Value, Gains), "View All" expansion, and indeterminate selection states.
- **Dark & Light Mode**: A premium theme system that remembers your preference and switches instantly without page flickers.
- **Mobile Responsive**: Fully optimized for phones and tablets, with intuitive horizontal scrolling for complex financial data.
- **Educational UI**: Contextual tooltips explaining Tax Harvesting and interactive disclaimer banners.

##  Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Branding**: KoinX Official Logo & Favicon

##  Optimization Techniques

I've implemented several performance and UX optimizations to ensure a smooth, professional experience:

### 1. Nano-Latency Theme Switching
Instead of re-rendering the entire React tree for theme changes, I used a **CSS Variable Architecture**. 
- Switching themes only toggles a `data-theme` attribute on the `<html>` element.
- All colors are mapped to variables (`--surface-card`, `--text-primary`), making transitions perfectly smooth and instant.

### 2. Memoized Financial Logic
Calculating capital gains across multiple categories (STCG/LTCG) can be heavy as selection state grows.
- Used `useMemo` to cache pre-harvesting and post-harvesting statistics.
- Calculations only run when the selection `selectedIds` or the `assetsData` actually changes.

### 3. Virtual-Style Table Expansion
To maintain a clean layout without overwhelming the user:
- The Holdings Table defaults to a **Top 4** view (sorted by gains).
- Users can toggle the full list dynamically, keeping the initial payload light and the UI focused.

### 4. Responsive UX Utilities
- **Fluid Grids**: Summary cards automatically stack on mobile but span side-by-side on desktop.
- **Table Scroll Protection**: While the page remains vertically fluid, the complex data table uses a protected horizontal scroll container to prevent "data squishing" on narrow screens.

### 5. Render Optimization
- Used `React.memo` for `HoldingsRow` to ensure that selecting one coin doesn't trigger a re-render of every other row in the portfolio.

##  Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

