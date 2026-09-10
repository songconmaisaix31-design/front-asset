# Round 2 independent evidence review

## Scope and method

This is an independent integration review of merged R2-SRC `9cc778c`, R2-MOT `2cafeaee`, R2-REF `1644e6ddea04d2ecf5a49a2e137df76c40ea7ab2`, initial R2-COS `fdf37a9`, and final R2-COS `07f4830`. I did not recapture a page or run a downloaded project: I inspected preserved original PNG/WebM/HTML files, SHA-256 values, frame samples, DOM/CSS observations, and console/event ordering. `reviews/REVIEW.md` remains the historical INT-02 record.

## Nine requested checks

| Check | Independent result | Classification |
|---|---|---|
| Natural entrance | Local user original shows small figure and broad Milky Way sky; rights unresolved. | Direct visual |
| Graph default, zoom, and selection lifecycle | Official Actions fallback supplies WebGL default, callbacks `3091`/`3568`, persistence after pointer departure, and a distinct second state; hover alone is indirect and blank clear failed at `4344`. Target AI Model Atlas is loading-only; historic 80s zoom frame has loading-phase DOM. | Direct fallback; target segmented/missing |
| Segmented ground-up motion | Raw 43.84s video has black ground/horizon at 28–32s and it is absent by 36s, so `[28,36]` is usable for upward ground exit only. | Direct visual segment |
| Separate starfield scale | 100,000 Stars remains a separate historic reference; Stellarium's post-exit frames show daylight planets, not stellar takeover. | Indirect / separate |
| DOM-stage alignment | Fallback Actions screenshots, iframe DOM/CSS, and video state align; AI Model Atlas DOM/CSS align only to its loading dialog, never its historic graph frame. | Directly bounded |
| Stable paths and hashes | Reviewed source paths and hashes match current manifests for MOT, final COS, and current DEPT HTML; missing pre/post bytes make the reported historical DEPT discrepancy non-diagnostic. | Direct current check |
| Licence and public scope | Public-page observation is not redistribution permission; user/Obsidian/media references remain local/reference-only. MIT applies to copied upstream source text, not linked media. | Direct scope boundary |
| Dependency completeness | Exact helper symbols are present at `createCosmos:18` and `generateMeshData:30`, but their imports require `@cosmos.gl/graph`, `d3-scale`, and `d3-scale-chromatic`; dependency licences/runtime completeness remain unaudited. | Partial |
| No frontend/product work | This lane only merged evidence, reviewed originals, and wrote reviews/recipes/local derivatives; no frontend or downloaded project was executed. | Direct process check |

## P0 A–F disposition

- **P0-A:** natural hero is direct local visual reference, not reuse-cleared.
- **P0-B:** target graph is segmented: historic visual frames exist, current AI Model Atlas R2 capture is loading-only.
- **P0-C:** direct only for official cosmos.gl engine fallback: point click, persistence, and distinct second selection; not the target graph.
- **P0-D:** missing: Star Atlas never reached exploration/camera/runtime.
- **P0-E:** segmented: decoded video shows black ground/horizon at 28–32s and it leaves the frame by 36s, so `[28,36]` is usable for the actual upward ground-exit gesture. It then ends daylight; pair a separate starfield-scale reference if desired, but do not call the combined idea a single observed stellar takeover. The 81-second session span (`15:55:44.229Z`–`15:57:05.174Z`) is not video duration.
- **P0-F:** partial direct: downloaded upstream LF helpers and LICENCE have exact raw hashes, while checkout files have CRLF byte drift. Stable old originals omit these helpers/LICENCE, so local-original byte equality is unavailable; dependencies/media are not cleared.

## COS ordering and visual conclusion

Final fallback video is VP8, 1280×720, 47.60s, SHA-256 `669ded316bd87e441c8ed305b583f244e81e2297ecdd259ae96112f95e048b4e`. Browser action timestamps are logged after awaited calls/capture delay, while callbacks can fire within the await; conclusions use ordered events plus independent `video_offset_seconds`, not post-await timestamps as causal click moments. The selected/persistent frames agree with callbacks and visible canvas change but expose only example-local indices; the blank-clear state is failure evidence.

## REF, MOT, and permission corrections

The preserved DEPT HTML currently hashes to the manifest value `1c6b6923b1ff2bdc1bada5ce80243d96bf2c65d48fd0dc9f99cb2b68571138bc`. A reported historical mismatch cannot prove overwrite without before/after bytes; record an unresolved metadata-history discrepancy. It contains four Vimeo IDs (`718320881`, `718668646`, `718668346`, `718668582`), with no verified media. CONTROL-R2's 1792×869 decoded DEPT image is a huge bright core: rejected style, not coverage.

Screenshots, recordings, raw helpers, extracts, and contact sheet are local-only/reference-only. Profile/cache trees, sensitive paths, authentication material, and unverified player media are excluded. No all-green result is warranted: blank clear, target interaction, Star Atlas runtime, and ground-to-stars takeover remain unproven.
