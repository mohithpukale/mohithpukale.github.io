# mohithpukale.com

Personal portfolio and resume. Hand-written HTML/CSS/JS — no framework and no build step.

Served by GitHub Pages from `master`, and reachable at both
[mohithpukale.com](https://mohithpukale.com) (proxied through Cloudflare) and
[mohithpukale.github.io](https://mohithpukale.github.io). The custom domain is not configured in the
GitHub Pages settings — there is deliberately no `CNAME` file — so the apex domain depends on the
Cloudflare proxy in front of it. `mohithpukale.com` is the canonical URL.

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
