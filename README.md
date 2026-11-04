# Personal website

An engineering portfolio built with Next.js 14, Tailwind CSS and TypeScript. The layout and styling are modeled on calebvergene.com. All copy, logos and images are placeholders.

## Make it yours

- Edit `lib/content.ts` for your name, links, roles and projects.
- Replace the placeholder avatar, project previews and photo strip with real images in `public/`.

## Develop

```bash
npm install
npm run dev
```

## Build (static export)

```bash
npm run build   # outputs to ./out
```

## Deploy to GitHub Pages

The site is exported statically. For a project page at `https://<user>.github.io/<repo>/`, build with `NEXT_PUBLIC_BASE_PATH=/<repo>`. A user page (`<user>.github.io`) needs no base path.
