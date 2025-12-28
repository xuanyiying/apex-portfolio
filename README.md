---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100c078fdbbe0896ea7880a9a403eeba6cac19b6bf4c6a4602c8fcbcd5dacadb152022100ef3877921e3323bedd1c60b5c8f638f3ffbca16686d437235aea9482111d1c02
    ReservedCode2: 3045022100e86cb0c812602709b53b9761f2517c45d03454c8c3ddcaa3b48b7d7024e99df502207710f9e7a4899e16b098386582578a909ed7e2be6be29181ab159a3967a162f9
---

# Apex Portfolio - Full Stack Developer Portfolio

A modern, stunning portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a cyberpunk-inspired design with glassmorphism effects, smooth animations, and bilingual (EN/ZH) support.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber (Three.js)
- **Icons**: Lucide React
- **Internationalization**: Custom i18n solution
- **Form Handling**: Canvas Confetti for success animations

## Features

- 🎨 Modern cyberpunk + glassmorphism design
- ✨ Smooth animations and transitions
- 🌍 Bilingual support (English/Chinese)
- 📱 Fully responsive design
- 🎮 Interactive 3D elements
- 💬 Contact form with confetti celebration
- 🔥 Dark mode optimized
- ⚡ Performance optimized

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── [locale]/           # Internationalized routes
├── components/
│   ├── Navigation.tsx      # Navigation bar
│   ├── Hero.tsx            # Hero section with 3D
│   ├── Skills.tsx          # Skills showcase
│   ├── Projects.tsx        # Projects gallery
│   ├── Experience.tsx      # Experience timeline
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
├── lib/
│   ├── i18n.ts             # Internationalization
│   ├── utils.ts            # Utility functions
│   └── LanguageContext.tsx # Language provider
└── messages/
    ├── en.json             # English translations
    └── zh.json             # Chinese translations
```

## Customization

### Colors
Edit `tailwind.config.ts` to customize the cyberpunk color palette:

```typescript
colors: {
  cyber: {
    cyan: '#00F0FF',
    purple: '#7000FF',
    pink: '#FF006E',
    // ...
  }
}
```

### Content
Edit `messages/en.json` and `messages/zh.json` to customize the content.

### Projects
Edit the `projects` array in `src/components/Projects.tsx` to add your own projects.

## License

MIT License
