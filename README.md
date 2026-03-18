# Portfolio Client

This is the Next.js app for the portfolio site. It includes the contact form API route at `POST /api/contact`, which sends email with Nodemailer.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Fill in these variables:
   - `CONTACT_EMAIL`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_FROM` (optional)
   - `EMAIL_SERVICE` for provider shortcuts like Gmail, or `SMTP_HOST`/`SMTP_PORT`/`SMTP_SECURE` for an explicit SMTP server
3. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Vercel deploy

1. Import the `client` folder into Vercel as the project root.
2. Add the same mail environment variables in Vercel project settings for the Production environment.
3. If you use Gmail, `EMAIL_PASS` must be a Google app password, not your normal Gmail password.
4. If you use a custom SMTP provider, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS`.
5. After adding or changing env vars in Vercel, redeploy so the serverless function picks them up.
6. Check the Vercel function logs for `/api/contact` if the route still returns 500. The route now logs the underlying mailer error message.

The contact form will post to `/api/contact` automatically on Vercel.
