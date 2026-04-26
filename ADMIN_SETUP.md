# Admin panel setup

The site has a free, self-hosted admin UI at `/admin` powered by [Decap CMS](https://decapcms.org). Stakeholders log in with GitHub, edit entrepreneurs / podcasts / reels / page copy through a friendly form, and every save commits straight back to this repo. Vercel rebuilds automatically; the change is live in about a minute.

The admin static files (`public/admin/index.html`, `public/admin/config.yml`) are already in the repo. **One-time auth wiring is required** — that step needs *your* GitHub account and a tiny free deployment.

You will only do this once. It takes about 10 minutes.

## What you need

- A GitHub account that can create OAuth apps (any account works).
- A free [Vercel](https://vercel.com) account (you almost certainly already have one for the main site — the proxy can live in the same account, as a separate project).

## Step 1 — Create a GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**.
   Direct link: https://github.com/settings/developers
2. Fill in:
   - **Application name**: `V2V Bridge CMS`
   - **Homepage URL**: `https://www.v2vbridge.org`
   - **Authorization callback URL**: `https://YOUR-PROXY-URL.vercel.app/callback`
     (you don't have this URL yet — put a placeholder, you will edit it after Step 2.)
3. Click **Register application**.
4. On the next screen:
   - Copy the **Client ID** (visible).
   - Click **Generate a new client secret**, copy it. You won't see it again.

Keep the Client ID and Client Secret somewhere safe — you'll paste them into Vercel in Step 2.

## Step 2 — Deploy the OAuth proxy

The proxy is a tiny serverless function that exchanges GitHub's auth code for a token. Decap maintains an official one.

**Easiest path — one-click deploy:**

1. Go to https://github.com/decaporg/decap-proxy
2. Click the **"Deploy"** button (or fork the repo and import it into Vercel).
3. In Vercel's import screen, set the project name to e.g. `v2v-cms-auth`.
4. Add environment variables:
   - `OAUTH_CLIENT_ID` → the Client ID from Step 1
   - `OAUTH_CLIENT_SECRET` → the Client Secret from Step 1
   - `OAUTH_PROVIDER` → `github`
5. Deploy. Vercel will give you a URL like `https://v2v-cms-auth.vercel.app`.

Now go back to the GitHub OAuth App you made in Step 1 and update the **Authorization callback URL** to:

```
https://v2v-cms-auth.vercel.app/callback
```

(Use whatever URL Vercel actually assigned.)

## Step 3 — Point the admin at your proxy

Edit `public/admin/config.yml` in this repo and change the `base_url` line:

```yaml
backend:
  name: github
  repo: shakibbinkabir/v2v
  branch: integration-v1
  base_url: https://v2v-cms-auth.vercel.app   # <- your proxy URL
  auth_endpoint: api/auth
```

Commit + push. The next Vercel build picks it up.

## Step 4 — Open `/admin` and log in

Visit https://www.v2vbridge.org/admin — you'll see a "Login with GitHub" button. Click it, authorise the OAuth app for your repo, and you're in.

---

## Who can edit?

Anyone with **push access to the repo** (or who has been granted access by repo settings) can log in and save changes through the CMS. To add a stakeholder:

- Add them as a collaborator on the GitHub repo: **Settings → Collaborators → Add people**.
- Send them the link `https://www.v2vbridge.org/admin`.

They will be prompted to authorise the OAuth app once, then they can edit.

## Optional — turn on review workflow later

Out of the box, every save commits straight to `integration-v1`. If you'd rather every change become a draft Pull Request that YSC + project lead review before merging, uncomment this line in `public/admin/config.yml`:

```yaml
publish_mode: editorial_workflow
```

Stakeholders then see a "Workflow" tab listing drafts in `In Review` / `Ready` columns.

## What stakeholders can edit

- **Entrepreneurs** — create / edit / delete profiles, set the `published` flag, link to podcast + reels.
- **Podcasts** — create / edit / delete episodes, paste in the Spotify embed ID.
- **Reels** — create / edit / delete reel embeds.
- **Pages** — edit the body copy of Home, About, Safeguarding, Withdraw, Resources.
- **Site (nav + footer)** — edit nav labels, footer copy, credit lines.

The CMS fully respects the bilingual (EN + BN) structure: every text field has both inputs side-by-side.

## What the CMS *cannot* do

- Upload PDF consent forms — those are kept off the public site by policy. Only the filename is recorded.
- Edit the language toggle behaviour, brand colours, or page layouts — those are code, not content.
- Skip Zod validation. If a stakeholder saves a record with missing required fields, the next Vercel build will fail and surface the error. Fix the record and rebuild.

## Cost

Free.
- Decap CMS itself is open source.
- Vercel Hobby plan covers both the main site and the OAuth proxy at $0.
- GitHub OAuth Apps are free.

## Troubleshooting

**"Failed to load entries" after login** — the OAuth app callback URL doesn't match your deployed proxy URL. Re-check Step 1 / Step 2.

**Login popup closes with no error** — usually a popup blocker. Allow popups for `www.v2vbridge.org`.

**Save succeeds but nothing changes on the live site** — Vercel is rebuilding. Wait ~60 seconds and refresh.

**"Branch not found"** — `config.yml` points at `integration-v1`. If you've merged to `main` and want the CMS to commit there instead, change `branch:` in the config.
