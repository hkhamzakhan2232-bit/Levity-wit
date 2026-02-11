# Bunny.net Edge Script – Levity & Wit Auth API

This folder contains a **Bunny Edge Script** that runs the auth API (register, login, profile, verify) at the edge. It’s compatible with the levity-wit frontend and uses Supabase for storage.

## Requirements

- **Bunny.net** account (Edge Platform → Scripting)
- **Supabase** project (free tier works)
- Environment variables configured in Bunny (see below)

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run:

```sql
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  email text unique not null,
  password text not null,
  created_at timestamptz default now()
);

-- Optional: disable RLS if using service key only
alter table public.users enable row level security;

create policy "Allow service role full access"
  on public.users for all
  using (true)
  with check (true);
```

3. In **Settings → API**, copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key → `SUPABASE_SERVICE_KEY` (keep this secret)

## Bunny Edge Deployment

### 1. Create the script

1. Go to [Bunny.net Dashboard](https://dash.bunny.net) → **Edge Platform** → **Scripting**.
2. Click **Add Script**.
3. Choose **Standalone** and **Default standalone**.
4. Replace the placeholder code with the contents of `index.ts`.

### 2. Set environment variables / secrets

In **Env Configuration** → **Environment Variables** (or **Secrets** for sensitive values), add:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key |
| `JWT_SECRET` | Strong random string (e.g. 32+ chars) |
| `FRONTEND_URL` | Your frontend origin (e.g. `https://your-app.vercel.app`) or `*` for dev |

Use **Secrets** for `SUPABASE_SERVICE_KEY` and `JWT_SECRET`.

### 3. Save & Publish

Click **Save** then **Publish**. Bunny will give you a URL for the script (e.g. `https://your-script.xxx.b-cdn.net`).

## Frontend configuration

Set `NEXT_PUBLIC_API_BASE` to your Bunny Edge script URL:

```env
NEXT_PUBLIC_API_BASE=https://your-script.xxx.b-cdn.net
```

The frontend expects:

- `POST /api/register`
- `POST /api/login`
- `GET /api/profile` (Bearer token)
- `GET /api/verify` (Bearer token)

## Local testing (Deno)

```bash
SUPABASE_URL=... SUPABASE_SERVICE_KEY=... JWT_SECRET=... deno run -A index.ts
```

Then hit `http://localhost:8080/api/login` (or the port Deno uses).

## GitHub deployment (optional)

Use the [Bunny Edge Scripting GitHub Action](https://docs.bunny.net/docs/edge-scripting-github-action) to deploy on push. Store `script_id` and `deploy_key` as GitHub secrets.
