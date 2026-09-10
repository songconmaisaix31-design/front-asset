# REF-01 handoff

- Official source fetched once with PowerShell `Invoke-WebRequest` (HTTP 200): https://help.obsidian.md/plugins/graph
- Preserved raw response, cleaned response, and the direct markdown payload under ignored `.local-captures/REF-01/`.
- Observed official documentation points: circles are note nodes; lines are internal-link edges; highly referenced nodes are larger; labels can fade; groups distinguish notes by color; filters include search/tags/attachments/orphans; local graph shows notes connected to the active note.
- These are documentation observations, not app DOM or interaction captures. No official graph screenshot was acquired before the collection stop; viewport, browser profile/session, computed CSS, DOM, and recording are unavailable.
- User hero was visually inspected with Pillow/viewer at 1672x941 RGB PNG. SHA256: `4FC6838CFEF7CC802264728B222C97E4090ACC882AECFDB6F9CEC1A315BB6825` (source and preserved copy match).
- Tooling: PowerShell `Invoke-WebRequest`; Python Pillow (local validation); viewer inspection. Model/effort: gpt-5.6-luna, low, cumulative generated 2000 (per dispatch).
- Public Git contains metadata/observations only; original image and fetched HTML remain ignored local captures.
