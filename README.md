# mohithpukale.github.io

Personal portfolio and resume, served by GitHub Pages. Hand-written HTML/CSS/JS — no framework and no build step.

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
