# Resume/CV

`CV.pdf` is served at `/resume/CV.pdf` and linked from the hero's "Download CV"
button and the footer. The browser saves it as `Slav_Lambov_CV.pdf`.

## Do not edit this PDF by hand

It is generated. The source of truth lives in the Cowork project, not here:

- Content: `Claude Cowork\my-cv\outputs\junior-dev-cv_<date>_v<n>.md`
- Print layout: `Claude Cowork\my-cv\outputs\junior-dev-cv_<date>_v<n>.html`

To regenerate, render the HTML with headless Chrome and copy the result here:

```bash
chrome.exe --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="<out>.pdf" "file:///<path>/junior-dev-cv_<date>_v<n>.html"
cp "<out>.pdf" public/resume/CV.pdf
```

`--no-pdf-header-footer` is not optional: without it Chrome stamps the date and
the local `file://` path across every page.

## Why it is a PDF and not a link

Recruiters and applicant tracking systems expect a file. The layout is a single
column on purpose — ATS parsers read columns in DOM order and interleave
two-column CVs into nonsense. Verified parseable with `pdftotext`.

## After changing it

Check the file is actually present before deploying. A missing file here does
not 404: the SPA fallback returns the app shell with HTTP 200, so the download
button silently hands over an HTML page named `.pdf`.
