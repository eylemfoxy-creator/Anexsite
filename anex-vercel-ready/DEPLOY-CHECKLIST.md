# ANEX Vercel preview checklist

## Before deploy
- [ ] Create PostgreSQL database
- [ ] Run `db/schema.sql`
- [ ] Set `DATABASE_URL`
- [ ] Set `ANEX_OPERATOR_EMAIL`
- [ ] Generate and set `ANEX_OPERATOR_PASSWORD_HASH`
- [ ] Set a 32+ character `RATE_LIMIT_SALT`
- [ ] Set `DEEPL_API_KEY` for translation
- [ ] Use Preview environment first

## Preview tests
- [ ] Home page loads without login
- [ ] EN works
- [ ] DE works
- [ ] TR works
- [ ] RU works
- [ ] 中文 works
- [ ] Chat launcher opens
- [ ] Visitor can start a conversation
- [ ] Visitor message remains after refresh
- [ ] `/desk` redirects to `/desk/login`
- [ ] Wrong operator password is rejected
- [ ] Correct operator login opens `/desk`
- [ ] Operator appears online on visitor site
- [ ] Visitor message appears in `/desk`
- [ ] Turkish translation appears for non-TR visitor message
- [ ] Operator can reply in Turkish
- [ ] Visitor receives reply in selected language
- [ ] Logout ends operator session
- [ ] Multiple rapid login attempts receive 429
- [ ] Message spam receives 429

## After approval only
- [ ] Add `anexglobal.uk`
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://anexglobal.uk`
- [ ] Promote tested deployment to production
