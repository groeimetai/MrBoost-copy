# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dark Aura Studio** is a creative agency portfolio website built with modern web technologies. It features a dark, premium aesthetic with custom animations, effects, and a unique custom cursor experience. The site is a single-page application (SPA) showcasing services, portfolio work, and company information.

### Project Evolution & Vision

**Current Challenge:** We're enhancing this portfolio to showcase advanced 3D animations and scroll effects, inspired by **[MrBoost.nl](https://www.mrboost.nl/)** - a premium marketing agency site known for its impressive interactive animations and visual storytelling.

**Goal:** Build an **improved, more extreme version** in 1 day that demonstrates:
- Advanced 3D transformations and depth effects
- Sophisticated scroll-triggered animations
- Eye-catching interactive elements that make a lasting impression
- Professional-grade motion design that stands out

**Why anime.js?** While Framer Motion excels at React component animations, we're adding **anime.js** for:
- More granular control over complex 3D transforms
- Advanced SVG morphing and path animations
- Precise timing and easing for choreographed sequences
- Lightweight performance for layered animation effects
- Better support for CSS transform matrices and 3D perspective

**Tech Stack:**
- Vite (build tool & dev server)
- React 18.3 with TypeScript
- shadcn/ui (component library based on Radix UI)
- Tailwind CSS (utility-first styling)
- **Framer Motion** (React component animations & layout transitions)
- **anime.js** (3D transforms, advanced scroll animations, SVG effects)
- React Router v6 (client-side routing)
- TanStack Query (server state management)

**Lovable Integration:** This project is integrated with Lovable.dev for collaborative development. Changes can be made through the Lovable editor or locally, and they sync automatically.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Production build
npm run build

# Development build (includes dev tools)
npm run build:dev

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture & Code Organization

### Directory Structure

```
src/
├── pages/           # Page components (routed views)
│   ├── Index.tsx    # Main landing page with all sections
│   └── NotFound.tsx # 404 error page
├── components/      # Reusable components
│   ├── ui/          # shadcn/ui components (auto-generated)
│   ├── CustomCursor.tsx    # Custom animated cursor
│   ├── AnimatedSection.tsx # Scroll-triggered animation wrapper
│   ├── Spotlight.tsx       # Spotlight visual effect
│   └── NoiseOverlay.tsx    # Film grain texture overlay
├── hooks/           # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/             # Utility functions
│   └── utils.ts     # cn() helper for class names
├── assets/          # Static assets (images, etc.)
└── index.css        # Global styles and CSS variables
```

### Key Architectural Patterns

**1. Component Composition**
The main Index page is composed of multiple sections (Hero, Services, Portfolio, CTA, etc.) all within a single file. Each section uses the `AnimatedSection` wrapper for scroll-triggered animations.

**2. Design System via CSS Variables**
All colors, spacing, and design tokens are defined in `src/index.css` using HSL color values as CSS variables (e.g., `--creme`, `--accent`). This allows consistent theming across the application.

**3. Custom Visual Effects**
Three global effect components enhance the visual experience:
- `CustomCursor`: Replaces default cursor with animated gradient cursor
- `Spotlight`: Creates mouse-following spotlight effect
- `NoiseOverlay`: Adds subtle film grain texture

**4. Path Aliases**
Import paths use the `@/` alias which resolves to `./src/`:
```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## Design System

### Color Palette (HSL)
The site uses a dark theme with accent colors:
- **Background:** Pure black (`0 0% 0%`)
- **Foreground:** Pure white (`0 0% 100%`)
- **Creme:** Light beige accent (`40 11% 90%`) - primary text color
- **Accent:** Teal green (`160 84% 39%`) - CTAs and highlights
- **Border:** Dark gray (`0 0% 20%`)
- **Muted:** Medium gray for secondary content

### Typography & Styling
- **Border Radius:** Set to 0 (sharp corners) via `--radius: 0rem`
- **Cursor:** Default cursor is hidden; custom cursor is always active
- **Animations:** Heavy use of Framer Motion with custom easing curves
- **Transitions:** Smooth transitions using `cubic-bezier(0.4, 0, 0.2, 1)`

### Custom Animations
Defined in `src/index.css`:
- `marquee` - Horizontal scrolling ticker
- `float` - Vertical floating effect
- `fadeInUp` - Fade in with upward motion
- `scaleIn` - Scale from 95% to 100%

## Working with shadcn/ui Components

This project uses shadcn/ui, which means UI components are copied into your codebase (not installed as npm packages).

**To add a new shadcn component:**
```bash
npx shadcn@latest add <component-name>
```

Components are configured in `components.json` with:
- Style: default
- Base color: slate
- CSS variables: enabled
- TypeScript: enabled

All components are stored in `src/components/ui/` and can be customized directly.

## Animation Patterns

### Framer Motion Usage

**1. Scroll-Based Animations**
Use `AnimatedSection` wrapper for elements that should animate on scroll:
```tsx
<AnimatedSection delay={0.2}>
  <p>Content that fades in on scroll</p>
</AnimatedSection>
```

**2. Hover Effects**
Most interactive elements use `motion` components with hover states:
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  <Button>Hover me</Button>
</motion.div>
```

**3. Scroll Progress Effects**
The hero section uses `useScroll()` and `useTransform()` for parallax effects tied to scroll position.

### anime.js Integration Patterns

**Installation:**
```bash
npm install animejs
```

**1. 3D Transform Animations**
anime.js excels at complex 3D transformations with perspective:
```tsx
import anime from 'animejs';

useEffect(() => {
  anime({
    targets: '.card-3d',
    rotateY: [0, 360],
    translateZ: [0, 100],
    scale: [1, 1.2, 1],
    duration: 2000,
    easing: 'easeInOutQuad',
    loop: true
  });
}, []);
```

**2. Scroll-Triggered anime.js Animations**
Combine with Intersection Observer for scroll effects:
```tsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          translateX: [-100, 0],
          rotateZ: [-15, 0],
          opacity: [0, 1],
          duration: 1200,
          easing: 'easeOutExpo'
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}, []);
```

**3. Staggered & Timeline Animations**
Create choreographed sequences:
```tsx
const timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

timeline
  .add({
    targets: '.element-1',
    translateY: [-30, 0],
    opacity: [0, 1]
  })
  .add({
    targets: '.element-2',
    translateX: [50, 0],
    rotateZ: [90, 0],
    opacity: [0, 1]
  }, '-=500'); // Overlap by 500ms
```

**4. SVG Path & Morphing Animations**
anime.js provides excellent SVG support:
```tsx
anime({
  targets: 'path',
  d: [
    { value: 'M10 10 L90 10 L90 90 L10 90 Z' },
    { value: 'M50 10 L90 50 L50 90 L10 50 Z' }
  ],
  duration: 2000,
  easing: 'easeInOutQuart',
  loop: true,
  direction: 'alternate'
});
```

**5. Mouse-Follow & Interactive Animations**
Create responsive animations based on user interaction:
```tsx
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

  anime({
    targets: e.currentTarget,
    rotateX: -y,
    rotateY: x,
    duration: 300,
    easing: 'easeOutQuad'
  });
};
```

**Best Practices for anime.js:**
- Store animation instances in refs to control/cleanup
- Use `anime.remove()` in cleanup to prevent memory leaks
- Prefer CSS transforms over position properties for performance
- Combine with React state for conditional animations
- Use timeline for complex multi-step animations
- Leverage easing presets: `easeInOutExpo`, `spring`, `easeOutElastic`

## Routing

React Router v6 is configured in `src/App.tsx`:
- Single route: `/` → `Index` page
- Catch-all: `*` → `NotFound` page
- Add new routes **above** the catch-all `*` route

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD CUSTOM ROUTES HERE */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

## TypeScript Configuration

TypeScript is configured with relaxed settings for rapid development:
- `noImplicitAny: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`
- `strictNullChecks: false`

This allows for faster prototyping but should be tightened for production.

## Important Notes

### Custom Cursor Behavior
The entire site has `cursor: none !important` applied globally. The custom cursor component tracks mouse position and provides visual feedback. When working with interactive elements:
- Add `cursor-pointer` class to make elements "hoverable"
- The cursor automatically detects buttons and links
- Touch devices automatically fall back to default behavior

### Performance Considerations
- The Index page is large (~800+ lines) with many animations
- Consider code-splitting if adding more pages
- Framer Motion animations are optimized with `once: true` for scroll triggers
- Images are loaded from `src/assets/` and bundled by Vite

### Vite Configuration
Server runs on port `8080` (not the default 5173) and listens on all interfaces (`::`) for network access. The `lovable-tagger` plugin is active in development mode only.

## Common Tasks

### Adding a New Section to the Landing Page
1. Create a new `<section>` in `src/pages/Index.tsx`
2. Wrap content in `<AnimatedSection>` for scroll animations
3. Add a top border: `className="border-t border-border"`
4. Use consistent spacing: `className="py-32"`

### Creating a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx` above the catch-all route
3. Import and use layout components as needed

### Modifying Colors
Update CSS variables in `src/index.css` under the `:root` selector. All colors must be in HSL format without the `hsl()` wrapper:
```css
--custom-color: 200 100% 50%;  /* HSL values only */
```

Then use in Tailwind: `className="bg-custom-color"`

### Working with Forms
The project includes `react-hook-form` with `zod` for validation. shadcn/ui provides Form components. See the shadcn/ui documentation for form patterns.

## ESLint Configuration

ESLint is configured with TypeScript support and React-specific rules:
- React Hooks rules enforced
- Fast Refresh rules for better DX
- Unused variables warnings disabled

Run linting before committing: `npm run lint`
