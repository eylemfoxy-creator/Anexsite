# Package verification report

Generated: 2026-09-22

## Functional modules included
- 5-language public site: EN / DE / TR / RU / ZH
- Digital advisory desk
- 24/7 persistent messaging
- Near-real-time chat polling
- DeepL translation layer
- PostgreSQL schema
- Secure operator login
- HttpOnly visitor session
- HttpOnly operator session
- Private `/desk`
- Presence / online indicator
- Database-backed spam protection
- Login brute-force limiting
- Same-origin POST checks
- Search-engine exclusion for `/desk` and `/api`
- Vercel security headers
- Responsive mobile layout

## Legacy visual archive
- 214 unique JPEG assets extracted from the supplied ANEX website PDFs
- 227 source-page/image occurrences recorded in the manifest
- Source PDFs and the supplied tax-law chapter preserved under `reference-material/`
- Offline review gallery: `reference-material/legacy-image-gallery.html`

## Validation performed
- TypeScript/TSX syntax transpilation check: PASS
- JavaScript/MJS syntax check: PASS
- Internal `@/` import path existence check: PASS
- Public asset reference existence check: PASS
- Legacy manifest file/duplicate target check: PASS
- Secret-pattern scan: no embedded credentials found
- Browser storage scan: only UI language preference uses localStorage; chat/operator credentials do not

## Remaining deployment-time requirements
A production `next build` requires installing the dependencies listed in `package.json`.
Database and DeepL credentials must be supplied as Vercel environment variables.
