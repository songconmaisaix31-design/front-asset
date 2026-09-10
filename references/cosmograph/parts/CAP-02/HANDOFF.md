# CAP-02 — Cosmograph official interactive capture

## Result

One valid default-state screenshot was acquired from Cosmograph's official public showcase. The official `cosmograph.app` homepage linked the selected public graph, **AI Model Atlas**, at `https://run.cosmograph.app/public/ca9fd1ad-fe83-4238-8b69-b707c633aef0`.

- Capture ID: `cap-02-ai-model-atlas-20260910-default`
- Ignored local original: `.local-captures/CAP-02/ai-model-atlas-default.png`
- SHA-256: `8b9c16e90e4368f75d6dae8fbcedf867a1866669d9c04348b43af1cd61a0eb98`
- Stored image dimensions: 786x541 PNG (desktop-provider scale 0.332628 from the 2363x1626 browser window)
- Browser evidence: the loaded accessibility tree exposed `AI Model Atlas`, 176,382 points, and 88,878 links. This is one narrow operational observation, not a claim about the graph's data license.

The critical screenshot was visually reviewed: it is a rendered dark graph canvas with dense colored node clusters and links, an AI Model Atlas information panel, and non-graph browser chrome only. It is not a marketing image, a loading page, or a blank/error page.

## Isolation and tools

The first route used Orca browser profile `84911274-8b0a-40ee-a7f0-d29098f58fa3`, scope `isolated`, with page `8237f75a-f59b-4927-926d-717b7e1a3d8f`. Its runtime bridge timed out once, so the evidence capture used a fresh Chrome process with a local CAP-02 user-data directory; it did not reuse a private/default browser profile.

The fallback helper `capture.mjs` uses the preinstalled Playwright 1.62 alpha module through `PLAYWRIGHT_MODULE` (or this machine's known existing module path), an explicit installed Chrome executable, and `newContext()` isolation. It writes raw response HTML, browser DOM HTML, cleaned HTML, observation JSON, and optional video only to the ignored CAP-02 local directory; it does not install packages or run downloaded code.

## Gaps deliberately retained

The fallback browser context reached only its database-connection loading screen before its bounded capture run ended, so its DOM/CSS/raw files are retained locally but are not declared as graph-state assets and must not be treated as aligned evidence for the valid desktop screenshot. No valid select, zoom, detail, or 10-20 second real-operation recording was acquired; do not infer any from the local attempted files.

## Validation

`Get-FileHash -Algorithm SHA256 C:/Users/DW/orca/front-asset/.local-captures/CAP-02/ai-model-atlas-default.png` produced the digest in `assets.json`. The PNG was loaded and visually inspected by the worker model; the ignored local-original directory is covered by `.gitignore` and public metadata uses only a repository-relative path.
