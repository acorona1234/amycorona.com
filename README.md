# amycorona.com

Personal portfolio site for Amy Corona — Data Scientist.

## Tech Stack

- **Next.js 16** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling

## Development

```bash
# Install dependencies
npm install

# Run dev server (accessible on local network)
npm run dev -- -H 0.0.0.0

# View at http://localhost:3000 or http://pi4.local:3000
```

## Project Structure

```
src/
  app/
    page.tsx        # Homepage
    layout.tsx      # Metadata, fonts, SEO
    globals.css     # Global styles
public/
  images/           # Static images
```

## Build for Production

```bash
npm run build
```

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Add custom domain (amycorona.com)

## Creating a New Next.js Site (from scratch)

```bash
# 1. Create project
npx create-next-app@latest mysite --typescript --tailwind --app --src-dir

# 2. Navigate to project
cd mysite

# 3. Add images to public/images/

# 4. Edit src/app/page.tsx (homepage content)

# 5. Edit src/app/layout.tsx (title, description, SEO)

# 6. Run dev server
npm run dev -- -H 0.0.0.0

# 7. Build for production
npm run build
```

## Adding Images

1. Place images in `public/images/`
2. Reference in code as `/images/filename.png`
3. Use Next.js `<Image>` component for optimization:

```tsx
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## Mobile-First Best Practices

- Start with mobile styles, add larger breakpoints:
  - `text-sm` → `sm:text-base` → `md:text-lg`
  - `px-4` → `sm:px-6`
  - `py-8` → `sm:py-12`
- Use `flex-col` → `sm:flex-row` for stacking
- Test on real devices or browser dev tools

## Useful Tailwind Classes

| Purpose | Classes |
|---------|---------|
| Container | `max-w-6xl mx-auto px-4` |
| Card | `bg-slate-800 rounded-xl p-4` |
| Button | `bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg` |
| Muted text | `text-slate-400 text-sm` |
| Section spacing | `py-8 sm:py-12` |
