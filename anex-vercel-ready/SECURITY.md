# Security notes

ANEX's chat can contain tax and dispute-related information, so this package avoids JavaScript-readable authentication tokens.

## Controls included
- PostgreSQL-backed operator sessions
- random cryptographic session tokens
- SHA-256 token hashes stored in the database
- HttpOnly cookies
- Secure cookies in production
- SameSite protection
- same-origin POST validation
- bcrypt operator password verification
- timing-safe operator email comparison
- database-backed brute-force and spam limits
- salted hashing of client IP addresses
- length validation for all chat text
- no raw credentials in source code
- no API keys sent to the browser
- `/desk` protected server-side, not only by client routing
- `/desk` and `/api` no-store headers
- search-engine exclusion for private/admin routes
- security response headers

## Deployment responsibility
Use a strong operator password, a private database, a long random `RATE_LIMIT_SALT`, and Vercel encrypted environment variables. Rotate credentials if they are ever exposed.
