# R2-REF — Star Atlas indirect official evidence

Captured the public DEPT case page `https://www.deptagency.com/en-dk/case/an-immersive-metaverse-gaming-experience/` as `.local-captures/R2-REF/star-atlas/dept-star-atlas-case.html` (SHA-256 `1c6d6923b1ff2bdc1bada5ce80243d96bf2c65d48fd0dc9f99cb2b68571138bc`). The page identifies creative studio Hello Monday (part of DEPT) as partnering with the Star Atlas team to build an immersive digital experience and includes a Vimeo embed.

This is `official-indirect-case` / `reference-only`: it supports production provenance and the existence of the marketing experience, not direct runtime, graph, camera, or ground-to-sky evidence. The Vimeo asset was not downloaded, no timestamps are claimed, and licensing for redistribution was not verified. Existing MOT-01 loading evidence remains blocked and is not overwritten.

Actual model/effort: gpt-5.6-luna / low. Observable usage: unknown.

## Playback follow-up

The preserved HTML contains two Vimeo embeds: `https://player.vimeo.com/video/718320881?background=1&autoplay=1&controls=0&byline=0&title=0&muted=1&loop=1&portrait=0&speed=0&gesture=media&dnt=1` and the same query string for video `718668646`. A normal unauthenticated open attempt was rejected by the web retrieval safety gate (`player.vimeo.com` URL unsafe to open); no media was downloaded, recorded, or visually claimed. The exact embed is recorded as `playback-blocked` with `path`/`sha256` null, and the prior HTML timestamp was corrected to its filesystem mtime with an explicit `timestamp_basis`.
