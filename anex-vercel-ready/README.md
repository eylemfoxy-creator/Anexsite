# ANEX - Vercel-ready full source package

This package contains the complete ANEX website and digital advisory desk for Vercel.

## Included

- Five-language website: English, German, Turkish, Russian, Chinese
- International Tax, European Tax Law, Company Formation, Tax Disputes
- 24/7 visitor messaging
- Live chat behavior by automatic polling (no third-party realtime service required)
- Automatic translation using DeepL
- PostgreSQL database for rooms, messages, sessions, presence and rate limits
- Secure `/desk` operator login
- HttpOnly operator session cookie
- HttpOnly visitor chat cookie
- Operator presence / online status
- Spam and brute-force protection
- Same-origin checks for POST requests
- Message length validation
- Honeypot on chat creation
- Secure headers
- `/desk` and `/api` excluded from search indexing
- Vercel/Neon-compatible serverless architecture
- Legacy ANEX website visual archive extracted from the supplied source PDFs
- Original supplied source documents in `reference-material/`

## Quick Vercel setup

### 1. Put this folder in GitHub or upload/import it into Vercel

The application root is this folder. Framework: **Next.js**.

Vercel defaults are enough:
- Install: `npm install`
- Build: `npm run build`

### 2. Create a PostgreSQL database

Recommended: use the Neon integration in Vercel or any PostgreSQL-compatible pooled database.

Add the resulting connection string as:

`DATABASE_URL`

### 3. Apply the database schema

From a terminal with `DATABASE_URL` set:

```bash
npm install
npm run db:migrate
```

Or paste `db/schema.sql` into your database SQL console.

### 4. Create the private `/desk` password hash

```bash
npm run hash-password -- "YOUR-STRONG-PASSWORD"
```

Copy the printed bcrypt hash into:

`ANEX_OPERATOR_PASSWORD_HASH`

Set the login email in:

`ANEX_OPERATOR_EMAIL`

### 5. Add Vercel environment variables

Copy all keys from `.env.example` into Vercel Project Settings -> Environment Variables.

Required:
- `DATABASE_URL`
- `ANEX_OPERATOR_EMAIL`
- `ANEX_OPERATOR_PASSWORD_HASH`
- `RATE_LIMIT_SALT`

Required for automatic translation:
- `DEEPL_API_KEY`

Recommended:
- `DEEPL_API_URL=https://api-free.deepl.com` for DeepL Free
- `NEXT_PUBLIC_SITE_URL=https://anexglobal.uk` when the custom domain is connected

Generate `RATE_LIMIT_SALT` with at least 32 random characters.

### 6. Deploy preview first

Deploy as a Vercel preview and test:
- language switching
- chat creation
- visitor message persistence
- `/desk/login`
- operator presence
- Turkish operator reply
- translation into the visitor language
- logout
- spam limits

Only after testing should you attach `anexglobal.uk`.

## Chat architecture

The visitor browser never stores the chat secret in JavaScript-accessible storage. The chat credential is held in an HttpOnly cookie and validated against a SHA-256 token hash stored in PostgreSQL.

The operator session is also an HttpOnly cookie. The database stores only a SHA-256 hash of the random session token.

The site uses short polling:
- visitor messages: every ~2 seconds while chat is open
- operator messages: every ~1.8 seconds
- room list: every ~4 seconds
- operator presence heartbeat: every 15 seconds

This gives live-chat behavior on Vercel without requiring WebSockets, Redis, Pusher, Ably or another realtime vendor.

## Translation behavior

Visitor message:
1. original visitor text is saved
2. DeepL translates it to Turkish for the operator
3. `/desk` displays Turkish, with the original available

Operator reply:
1. operator writes Turkish
2. Turkish is saved as the operator original
3. DeepL translates to the visitor's selected language
4. visitor receives translated text

If DeepL is not configured or temporarily fails, the original text is preserved and the UI marks translation as unavailable. No message is discarded.

Supported language codes:
- EN
- DE
- TR
- RU
- ZH (DeepL target: ZH-HANS)

## Spam protection

Database-backed rate limits:
- chat starts per hashed IP
- visitor messages per room
- visitor hourly volume per hashed IP
- operator login attempts per hashed IP
- operator send rate per room

IP addresses are not stored raw. They are salted and SHA-256 hashed with `RATE_LIMIT_SALT`.

## Legacy images

`public/assets/legacy/` contains all unique embedded images extracted from the supplied ANEX website PDFs.

Files are named with:
- source PDF
- source page number
- image index
- page heading

`asset-manifest.json` and `asset-manifest.csv` record provenance, dimensions, SHA-256 hashes and duplicate mappings.

The original supplied files are preserved in `reference-material/`.

## Important operational note

This package is code-complete, but third-party services still require credentials:
- PostgreSQL needs a `DATABASE_URL`
- DeepL needs a `DEEPL_API_KEY`
- `/desk` needs an operator email and bcrypt password hash

No secrets are included in this ZIP.
