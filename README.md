# mohithpukale.com

Personal portfolio and resume. Hand-written HTML/CSS/JS — no framework and no build step.

## Hosting

This repo is deployed twice, independently, both building from `master`:

- **[mohithpukale.com](https://mohithpukale.com)** — Cloudflare Pages. This is the canonical URL.
  The domain is bound under Cloudflare dashboard → Workers & Pages → Custom domains.
- **[mohithpukale.github.io](https://mohithpukale.github.io)** — GitHub Pages. A mirror, kept alive
  so older inbound links still resolve.

One `git push` triggers both builds. GitHub Pages has no custom domain configured and there is no
`CNAME` file, which is correct — GitHub plays no part in serving the apex domain, so adding one would
only start a fight over it. The mirror is deduplicated for search engines by the `rel=canonical` tag
in `index.html`, which points at `mohithpukale.com`; keep it that way if you touch the `<head>`.

| Path | Purpose |
| --- | --- |
| `index.html` | Portfolio homepage |
| `resume.html` | Resume, styled for both screen and print |
| `css/style.css` | Portfolio styles |
| `css/resume.css` | Resume styles, including the print/PDF layout |
| `js/main.js` | Theme toggle, mobile nav, scroll reveal |
| `resources/` | Generated resume PDF |

## Working on it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Regenerating the resume PDF

`resources/Mohith-Pukale-Resume.pdf` is generated from `resume.html`, so edit the HTML and re-export
rather than editing the PDF:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resources/Mohith-Pukale-Resume.pdf" \
  "file://$PWD/resume.html"
```

Keep it to two pages — the print stylesheet in `css/resume.css` is tuned for US Letter.
