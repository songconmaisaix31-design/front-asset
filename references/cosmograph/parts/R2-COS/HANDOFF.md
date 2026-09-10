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

## Engine fallback — official cosmos.gl Actions (P0-C)

The pinned `reusable/cosmos-gl/README.md` links the official Storybook **Actions** example. Its discovered final page was `https://cosmos.gl/?path=/story/examples-get-started--actions`; preview iframe `https://cosmos.gl/iframe.html?viewMode=story&id=examples-get-started--actions&globals=` rendered one WebGL canvas (980x380, background `rgb(45,49,58)`) in a fresh `R2-COS-engine-actions-profile`, without sign-in or private browser reuse.

This is valid **engine-fallback** interaction evidence, not an AI Model Atlas success. The official source panel visibly states that `onPointClick` highlights/outlines the clicked point and calls `zoomToPointByIndex`, while `onBackgroundClick` clears highlighting; no local UI or data was injected.

### Attributable recorded sequence

The retained private original video is 47.600 seconds, VP8 WebM, 1280x720, and ffmpeg-decodable. It is continuous across the following offsets, with per-state DOM/CSS/screenshot metadata under `.local-captures/R2-COS/enginefallback/actions-run-20260911-i/`:

| Video offset | Actual observation |
|---:|---|
| 32.463 s | mouse moved to rendered node candidate |
| 33.323 s | official callback logged `Clicked point index: 3091` |
| 35.826 s | click-node-1 state, then visible ring/layout response |
| 37.888 s | pointer moved away; selection screenshot remains after hover leaves |
| 40.446 s | official callback logged distinct `Clicked point index: 3568` |
| 42.952 s | click-node-2 state; visibly distinct selected-ring location |
| 44.420 s | example's own Pause control used only to stabilize the following read-only pixel observation |
| 45.371 s | the supposed blank target instead logged `Clicked point index: 4344` |

Thus click selection is distinct from hover: the first selected state persists after pointer departure, and each successful click has an official callback index plus a visible rendering response. The example has no human-readable node labels; its observable identifiers are the example-local callback indices `3091`, `3568`, and (failed blank attempt) `4344`.

### Explicit remaining gap

No blank-background clear is claimed. Multiple fresh runs preserved their originals; the dense moving graph repeatedly resolved candidates as points, including the final paused run's index `4344`, so the state file named `blank-clears-selection` is failure evidence only. The fallback collector now has `try/finally` closure, readiness/bounds guards, and retained valid recording even on a failure; it must not be used to imply that the commercial AI Model Atlas graph became available.
