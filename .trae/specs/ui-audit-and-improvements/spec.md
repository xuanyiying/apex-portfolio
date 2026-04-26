# UI Audit & Improvements Spec

## Why
The current portfolio has strong cyberpunk visual foundations but suffers from several UX and visual consistency issues that degrade the professional impression: visual clutter from excessive glows/grids, information hierarchy problems, mobile responsiveness gaps, and performance concerns from heavy 3D backgrounds.

## What Changes
- **Refine visual hierarchy** across all sections with consistent spacing and typography scale
- **Simplify Hero section** — reduce competing background effects, improve content prominence
- **Restructure Skills section** — fix the confusing 3D/terminal/matrix toggle, prioritize readable skill presentation
- **Improve Projects cards** — better image handling, clearer architecture display, fix hover state inconsistencies
- **Streamline Experience timeline** — reduce visual noise, improve readability on mobile
- **Optimize Contact section** — fix form layout, improve visual balance
- **Unify Footer** — consistent styling with rest of site
- **Performance** — optimize 3D background, reduce unnecessary re-renders
- **Mobile responsiveness** — fix timeline layout, skill grid overflow, navigation touch targets
- **Color consistency** — unify the cyber-cyan/purple/pink usage, reduce competing gradients

## Impact
- Affected components: Hero, Skills, Projects, Experience, Contact, Footer, Navigation, ThreeBackground
- Affected styles: globals.css, tailwind.config.ts
- Affected data: minor updates to skills.ts category naming

## ADDED Requirements
### Requirement: Visual Hierarchy & Spacing
The system SHALL establish clear visual hierarchy with consistent section spacing (py-20 sm:py-28), unified title sizing (text-3xl sm:text-4xl lg:text-5xl), and reduced competing background effects.

#### Scenario: Section spacing
- **WHEN** user scrolls between sections
- **THEN** each section has consistent vertical padding and clear separation without excessive gradient overlays

### Requirement: Hero Clarity
The system SHALL simplify the Hero background to a single subtle animated gradient, removing the competing grid lines and multiple glow orbs while maintaining the cyberpunk aesthetic.

#### Scenario: Hero first impression
- **WHEN** page loads
- **THEN** the name and role are immediately readable without visual competition from background effects

### Requirement: Skills Readability
The system SHALL replace the confusing 3D/terminal/matrix view toggle with a clean, scannable skill grid showing all skills with proficiency bars, organized by category with clear visual grouping.

#### Scenario: Skills browsing
- **WHEN** user views the Skills section
- **THEN** all skills are visible at a glance with clear proficiency indicators, no interaction required to see basic information

### Requirement: Project Card Polish
The system SHALL improve project cards with consistent image aspect ratios, clearer tag hierarchy, and hover states that don't obscure content.

#### Scenario: Project browsing
- **WHEN** user hovers on a project card
- **THEN** the card lifts subtly with a unified glow, architecture info remains readable

### Requirement: Mobile Experience
The system SHALL ensure all sections are fully functional on mobile: timeline switches to single-column, skill grids adapt, navigation touch targets are min 44px, and text remains readable without horizontal scroll.

#### Scenario: Mobile timeline
- **WHEN** user views Experience on mobile
- **THEN** timeline shows as vertical cards with left-aligned content, no horizontal overflow

### Requirement: Performance Optimization
The system SHALL reduce Three.js particle count by 50%, implement visibility-based rendering (pause when not in viewport), and remove unused GSAP animation classes.

#### Scenario: Scroll performance
- **WHEN** user scrolls through the page
- **THEN** animations remain at 60fps without frame drops

## MODIFIED Requirements
### Requirement: Color System
The existing cyber palette SHALL be simplified: use cyber-cyan as primary accent, cyber-purple as secondary, and remove cyber-pink from primary UI elements (reserve for subtle hover states only).

### Requirement: Background Effects
The global background gradient animation SHALL be slowed to 30s cycle and opacity reduced to 0.4. Grid line overlays SHALL be removed from all sections except Skills.

## REMOVED Requirements
### Requirement: Excessive Glow Effects
**Reason**: Creates visual clutter and reduces readability
**Migration**: Replace with subtle border highlights and single-color glows on hover only

### Requirement: Multiple Competing Background Layers
**Reason**: Performance impact and visual noise
**Migration**: Use single subtle animated gradient per section
