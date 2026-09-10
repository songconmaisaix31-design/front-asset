# R2-COS — Cosmograph AI Model Atlas bounded capture

## Outcome

P0-B and P0-C are **not established** by this round.  The only new aligned screenshot is a visually inspected loading dialog: `Loading — Establishing database connection…`; its DOM contained no `canvas`, so it is intentionally private failure evidence rather than a graph asset.

The prior CAP-02 handoff's valid graph screenshot remains a separate historical observation.  This worker did not reclassify it, and did not infer loaded points or interactions from the page shell, resource traffic, or the loading progress bar.

## Capture method and originals

- Target/final URL: `https://run.cosmograph.app/public/ca9fd1ad-fe83-4238-8b69-b707c633aef0` (no content-affecting URL query).
- Target title: `AI Model Atlas – Cosmograph`; target name is **AI Model Atlas**.  No node name or node ID was exposed because the graph did not load.
- Isolated browser profile: `R2-COS-attempt-2-profile`, fresh and separate from the first stopped attempt; Chromium context viewport `1280x720`, DPR `1`, no private/default-browser reuse.
- Original screenshot: `.local-captures/R2-COS/default.png`, SHA-256 `541b0afe6cb44f5fe3ce1f9a95d72e5ceb95ca99b4c8acfd594d115f542e6cb4`.
- Aligned private companions: `default.observation.json` and `default.cleaned.html`.  They carry same-state DOM, critical `[role=main]` CSS (`1280x720`, `rgb(25,33,41)`, `overflow:hidden`), and resource entries sanitized to origin/path/query-key names only.

## Readiness and interaction result

The collector polled up to 180 seconds for a canvas plus point text while excluding the two loading phrases.  At capture, the visible text was `AI Model Atlas`, public path, `Loading`, and `Establishing database connection…`; `canvas_count=0`, `webgl=false`.

Therefore no coordinate action was sent to a putative graph.  Hover, selection, second-node selection, blank click, zoom/pan, interaction attribution, and hover-versus-selection distinction are all **gaps**, not negative interaction results.  One first run ended before state capture due to a local metadata-variable error; a fresh second profile corrected that error but remained in the service's database-connection state, then correctly stopped on the absent canvas.  Both attempt originals, including the incomplete recording, were preserved under the ignored raw directory; the recording is not declared because ffmpeg reported a read error and no valid duration.

## Source pointer (not captured interaction evidence)

Official Cosmograph library documentation describes `onClick` / `onPointClick` and explicitly notes that a clicked canvas point supplies an index, while the official labels documentation describes hovered labels.  These are capability pointers only, not a substitute for an attributable observed interaction in this commercial/public graph.  The task's corresponding official cosmos.gl interaction-example fallback was not collected: this worker did not locate and visually validate a public live example within the bounded two-attempt collection window.

## Validation

`node --check references/cosmograph/parts/R2-COS/capture.mjs` passed.  `Get-FileHash -Algorithm SHA256` matched the screenshot hash above, and the screenshot was opened for visual inspection: it is a dark loading page with the database-connection dialog, not a black screen, graph, or error page.

## Usage boundary

The screenshot, DOM/CSS, raw response, recording, and browser profile are ignored local originals.  Public files contain only original observation metadata and the collection script; `assets.json` marks the screenshot `blocked` and does not treat it as reusable or completed graph evidence.
