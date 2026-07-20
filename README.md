This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Copy `.env.example` → `.env.local` and fill Google Sheets + CMS values as needed.

### CMS env (News / Projects / mega-menu banner)

| Variable | Description |
|----------|-------------|
| `CMS_API_URL` | CMS origin (default `https://cms.gonline.id`) |
| `CMS_BRAND_ID` | Brand slug (default `gec`) |
| `CMS_PREVIEW_SECRET` | Optional. Draft preview: `/news/{slug}?preview=1&token=<secret>` |

**Content before production:** publish articles; category `our-project` for projects; `highlighted` for Featured; banner key `mega-menu`; replace base64 `authorImage` with HTTPS URLs on the CMS (list payloads are otherwise multi‑MB).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- gec-sheet-service@gecproject-474303.iam.gserviceaccount.com -->
