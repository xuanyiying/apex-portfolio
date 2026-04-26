# Tasks

- [ ] Task 1: Simplify global styles and background effects
  - [ ] SubTask 1.1: Reduce background gradient animation speed and opacity in globals.css
  - [ ] SubTask 1.2: Remove grid line overlays from Hero, Experience, Contact sections
  - [ ] SubTask 1.3: Unify section spacing to py-20 sm:py-28 across all sections
  - [ ] SubTask 1.4: Simplify title sizing to text-3xl sm:text-4xl lg:text-5xl with consistent gradient

- [ ] Task 2: Refactor Hero section for clarity
  - [ ] SubTask 2.1: Remove competing background glow orbs and grid lines
  - [ ] SubTask 2.2: Keep single subtle animated gradient background
  - [ ] SubTask 2.3: Ensure name/role have maximum visual prominence
  - [ ] SubTask 2.4: Fix mobile layout (stack vertically, reduce 3D scene height)

- [ ] Task 3: Restructure Skills section for readability
  - [ ] SubTask 3.1: Remove 3D/terminal/matrix view toggle completely
  - [ ] SubTask 3.2: Create clean skill grid with all skills visible
  - [ ] SubTask 3.3: Show proficiency bars with clear percentage labels
  - [ ] SubTask 3.4: Fix category tab switching (remove auto-rotate, make manual only)
  - [ ] SubTask 3.5: Ensure mobile grid doesn't overflow

- [ ] Task 4: Polish Projects cards
  - [ ] SubTask 4.1: Fix image aspect ratios (consistent 16:9)
  - [ ] SubTask 4.2: Simplify hover state — single lift + glow, no corner SVGs
  - [ ] SubTask 4.3: Improve architecture badge readability
  - [ ] SubTask 4.4: Ensure tags don't overflow on mobile

- [ ] Task 5: Streamline Experience timeline
  - [ ] SubTask 5.1: Remove excessive gradient backgrounds
  - [ ] SubTask 5.2: Simplify timeline node animation
  - [ ] SubTask 5.3: Fix mobile layout — single column, left-aligned cards
  - [ ] SubTask 5.4: Improve stats row readability

- [ ] Task 6: Optimize Contact section
  - [ ] SubTask 6.1: Balance left/right visual weight
  - [ ] SubTask 6.2: Ensure form fields have consistent sizing
  - [ ] SubTask 6.3: Fix mobile stacking order (info first, form second)

- [ ] Task 7: Unify Footer styling
  - [ ] SubTask 7.1: Match footer background to section styling
  - [ ] SubTask 7.2: Ensure consistent link hover states

- [ ] Task 8: Performance optimizations
  - [ ] SubTask 8.1: Reduce Three.js particle count from 4000 to 2000
  - [ ] SubTask 8.2: Implement IntersectionObserver to pause 3D when not visible
  - [ ] SubTask 8.3: Remove unused GSAP animation classes from components

# Task Dependencies
- Task 1 should be completed before Tasks 2-7 (provides base styles)
- Task 8 can be done in parallel with Tasks 2-7
