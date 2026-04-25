# T-Goda Static Web

Project structure:

- `index.html` — Main home page (Standardized layout)
- `404.html` — Root 404 page
- `pages/search-result.html` — Search results page (Standardized layout + Pagination Mockup)
- `pages/room-detail.html` — Room detail page (Standardized layout)
- `assets/js/shared-layout.js` — **Unified Layout Engine**: Injects global Navbar & Footer + Hamburger menu
- `assets/css/shared-layout.css` — **Global Design System**: Navbar/Footer styles (Figma 100% Match) + Mobile responsive
- `assets/css/home-fix.css`, `search-fix.css`, `room-fix.css` — Page-specific layout fixes, overrides, and mobile responsive
- `assets/js/app.js` — Core page interactions and navigation logic
- `public/` — Shared images, SVGs, and exported Figma assets

## Latest Status (April 2026)

- **Standardized Global Navigation**: All pages now use a single `shared-layout.js` script to ensure a consistent top navigation bar and footer.
- **Figma Parity**:
  - **Navbar**: Exact match with blue branding (#2563EB), active states with 2px underline, and premium blur effects.
  - **Footer**: Unified 3-column layout with dark SVG social icons and brand messaging.
- **Search Result Fixes**: Implemented a responsive grid for hotel results and added a functional-looking pagination mockup.
- **Room Detail Fixes**: Standardized image galleries, amenity grids, and room selection tables.
- **Premium UI Refinements**: Added glassmorphism, floating cards, and horizontal scroll animations to the home page for a native app-like experience.

### Bug Fixes
- **Layout Overlapping**: Fixed critical mobile layout issues where elements stacked incorrectly due to `absolute` positioning. Implemented a "Global Figma Reset" that restores natural document flow while maintaining low specificity for custom overrides.
- **Flex-Shrink Fixes**: Prevented elements from breaking out of containers by forcing `flex-shrink: 1` and `box-sizing: border-box` across all generated components.
- **Desktop Footer Spacing**: Fixed excessive blank space above the footer on the Home and Search pages by overriding rigid Figma container heights.
- **Text Wrapping**: Fixed discount badges, score labels, and buttons that were clipping or wrapping incorrectly on small screens.
- **UTF-8 Encoding**: Fixed mojibake characters in room descriptions (`m²`, `•`, `©`).

### Mobile Responsive (all pages ≤768px)
- **App-Like Design**: UI now feels like a high-end mobile application with floating elements and touch-friendly paddings.
- **Home Page**: 
    - **Hero**: Glassmorphism search card with blur effects.
    - **Destinations**: Smooth horizontal scrolling gallery (scroll-snap enabled) to save vertical space.
    - **Grid Flow**: Why Choose Us, Promotional Banner, and Newsletter all stack elegantly into a single column.
- **Search Result**: Sidebar moves to top, hotel cards stack with full-width images, and pagination is optimized for thumb reach.
- **Navbar**: Animated hamburger menu with a modern slide-down overlay.

## Page Routes

- `/index.html` (Home)
- `/pages/search-result.html` (Search)
- `/pages/room-detail.html` (Details)

## Development Notes

- **Source of Truth**: Any changes to the header or footer should be made in `assets/js/shared-layout.js` and `assets/css/shared-layout.css`.
- **Path Resolution**: The shared layout script automatically detects if a page is at the root or nested in `/pages/` and adjusts asset paths accordingly.
- **Responsive Strategy**: Desktop layout is the Figma export as-is (absolute positioning). Mobile overrides live entirely in `@media (max-width: 768px)` blocks inside each page's `-fix.css` file.
- **Mockups**: The pagination on the search result page is currently a visual mockup.
- **Assets**: Use only files from the `public/` directory — no external image CDNs.
