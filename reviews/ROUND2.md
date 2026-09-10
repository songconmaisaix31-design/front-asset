# Round 2 independent evidence review

## Scope and method

This is an independent integration review of merged R2-SRC `9cc778c`, R2-MOT `2cafeaee`, R2-REF `1644e6ddea04d2ecf5a49a2e137df76c40ea7ab2`, initial R2-COS `fdf37a9`, and final R2-COS `07f4830`. I did not recapture a page or run a downloaded project: I inspected preserved original PNG/WebM/HTML files, SHA-256 values, frame samples, DOM/CSS observations, and console/event ordering. `reviews/REVIEW.md` remains the historical INT-02 record.

## Nine requested checks

| Check | Independent result | Classification |
|---|---|---|
| Natural entrance | Local user original shows small figure and broad Milky Way sky; rights unresolved. | Direct visual |
| Graph default | Official cosmos.gl Actions iframe has WebGL canvas; AI Model Atlas is loading-only. | Direct fallback; target missing |
| Graph zoom | Historic AI Model Atlas 80s frame is magnified; DOM/CSS were loading-phase. | Segmented |
| Hover | Candidate pointer move at 32.463s; hover-only visual effect not separately attributable. | Indirect |
| First selection | Callback index `3091` at 33.323s, then selected-node-1 response. | Direct fallback |
| Persistent selection | Pointer departed 37.888s; selection remained at video 38.387s. | Direct fallback |
| Other selection | Callback `3568` at 40.446s, distinct second selected state at 43.476s. | Direct fallback |
| Blank clear | Purported blank action produced index `4344`; no background callback. | Missing / failed candidate |
| Ground-to-stars | Stellarium ends on daylight solar-system objects; Star Atlas is loading/marketing shell. | Segmented / missing stellar condition |

## P0 A–F disposition

- **P0-A:** natural hero is direct local visual reference, not reuse-cleared.
- **P0-B:** target graph is segmented: historic visual frames exist, current AI Model Atlas R2 capture is loading-only.
- **P0-C:** direct only for official cosmos.gl engine fallback: point click, persistence, and distinct second selection; not the target graph.
- **P0-D:** missing: Star Atlas never reached exploration/camera/runtime.
- **P0-E:** segmented/missing: 43.84s decoded video begins blank, is loading around 21s, then ends daylight. The 81-second session span (`15:55:44.229Z`–`15:57:05.174Z`) is not video duration or stellar-takeover proof.
- **P0-F:** partial direct: downloaded upstream LF helpers and LICENCE have exact raw hashes, while checkout files have CRLF byte drift. Stable old originals omit these helpers/LICENCE, so local-original byte equality is unavailable; dependencies/media are not cleared.

## COS ordering and visual conclusion

Final fallback video is VP8, 1280×720, 47.60s, SHA-256 `669ded316bd87e441c8ed305b583f244e81e2297ecdd259ae96112f95e048b4e`. Browser action timestamps are logged after awaited calls/capture delay, while callbacks can fire within the await; conclusions use ordered events plus independent `video_offset_seconds`, not post-await timestamps as causal click moments. The selected/persistent frames agree with callbacks and visible canvas change but expose only example-local indices; the blank-clear state is failure evidence.

## REF, MOT, and permission corrections

The preserved DEPT HTML currently hashes to the manifest value `1c6b6923b1ff2bdc1bada5ce80243d96bf2c65d48fd0dc9f99cb2b68571138bc`. A reported historical mismatch cannot prove overwrite without before/after bytes; record an unresolved metadata-history discrepancy. It contains four Vimeo IDs (`718320881`, `718668646`, `718668346`, `718668582`), with no verified media. CONTROL-R2's 1792×869 decoded DEPT image is a huge bright core: rejected style, not coverage.

Screenshots, recordings, raw helpers, extracts, and contact sheet are local-only/reference-only. Profile/cache trees, sensitive paths, authentication material, and unverified player media are excluded. No all-green result is warranted: blank clear, target interaction, Star Atlas runtime, and ground-to-stars takeover remain unproven.
