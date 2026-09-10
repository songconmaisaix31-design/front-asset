"""Build the public metadata index from preserved evidence without executing it."""
import hashlib
import json
import mimetypes
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PIN = 'ce35edacf94dba1f02ef2b47957e937e4c9acf17'
URLS = {'cosmograph': 'https://run.cosmograph.app/public/ca9fd1ad-fe83-4238-8b69-b707c633aef0',
        'obsidian': 'https://help.obsidian.md/plugins/graph',
        'cosmos-gl': f'https://github.com/cosmosgl/graph/tree/{PIN}',
        '100000-stars': 'https://stars.chromeexperiments.com/',
        'star-atlas': 'https://experience.staratlas.com/', 'owned': None, 'review': None}
by_path = {}
for part in sorted((ROOT / 'references').glob('*/parts/*/assets.json')):
    for asset in json.loads(part.read_text(encoding='utf-8-sig')):
        path = asset.get('path')
        if path and (ROOT / path).is_file():
            asset['source_id'] = part.relative_to(ROOT).parts[1]
            by_path[path] = asset

def source_for(path):
    if 'hero-original' in path:
        return 'owned'
    if '/SRC-01/' in path or path.startswith('reusable/'):
        return 'cosmos-gl'
    if 'obsidian' in path or '/REF-01/' in path or '/REF-02/' in path:
        return 'obsidian'
    if '/CAP-02/' in path or 'cosmo' in path:
        return 'cosmograph'
    if '/100000-stars/' in path or '/stars-' in path:
        return '100000-stars'
    if '/star-atlas/' in path:
        return 'star-atlas'
    return 'review'

paths = list((ROOT / 'reusable').rglob('*')) + list((ROOT / '.local-captures').rglob('*'))
assets = []
for file in sorted(paths):
    if not file.is_file():
        continue
    rel = file.relative_to(ROOT).as_posix()
    if any('profile' in p.lower() for p in file.relative_to(ROOT).parts[:-1]):
        continue
    sid = source_for(rel)
    asset = by_path.get(rel, {})
    stamp = datetime.fromtimestamp(file.stat().st_mtime, timezone.utc).isoformat()
    asset = {'id': 'asset-' + hashlib.sha256(rel.encode()).hexdigest()[:12],
             'source': sid, 'source_id': sid, 'url': URLS[sid], 'final_url': URLS[sid],
             'captured_at': stamp, 'timestamp_basis': 'filesystem mtime; exact capture time unverified',
             'path': rel, 'type': mimetypes.guess_type(file.name)[0] or 'text/plain',
             'state': 'retained static evidence', 'viewport': None, 'capture_id': 'retained-' + sid,
             'purpose': 'Source evidence; see catalog/CLOSEOUT.md for accepted scope',
             'license_basis': 'No redistribution clearance; local-only reference',
             'usage_scope': 'reference-only', 'acquisition_status': 'acquired-local-only',
             'gaps': 'Container/response files do not establish rendered behavior', **asset}
    asset['sha256'] = hashlib.sha256(file.read_bytes()).hexdigest()
    asset['bytes'] = file.stat().st_size
    if file.suffix.lower() == '.png':
        with Image.open(file) as image:
            asset['dimensions'] = list(image.size)
    if sid == 'cosmos-gl':
        source_rel = rel.split('reusable/cosmos-gl/', 1)[-1] if rel.startswith('reusable/') else rel.split('/originals/', 1)[-1]
        asset.update(url=f'https://github.com/cosmosgl/graph/blob/{PIN}/{source_rel}',
                     final_url=f'https://raw.githubusercontent.com/cosmosgl/graph/{PIN}/{source_rel}',
                     license_basis=f'MIT: reusable/cosmos-gl/LICENCE at {PIN}',
                     usage_scope='reuse-cleared', state='static upstream text only',
                     acquisition_status='acquired; partial source subset',
                     gaps='Clearance covers original file text with MIT notice only; dependencies, referenced media and complete runnable integration unverified')
    if sid == 'owned':
        asset.update(license_basis='User supplied and approved visual; underlying third-party rights unverified',
                     purpose='Recommended natural Milky Way entrance hero; small figure right of center on mountain ridge',
                     state='user-confirmed original; unchanged', gaps='Local-only; no public redistribution clearance')
    if sid == 'star-atlas':
        asset.update(state='blocked: loading screen', usage_scope='blocked',
                     gaps='No live scene or camera behavior acquired', purpose='Failure evidence only; not a visual recommendation')
    if sid == 'cosmograph' and (file.suffix == '.html' or 'observation' in file.name or 'playwright-default' in file.name or '69ae2072' in file.name):
        asset.update(state='loading-phase evidence; not aligned to successful later graph',
                     gaps='No same-state DOM/CSS captured for loaded graph; never pair as aligned evidence')
    if 'select-attempt' in rel:
        asset.update(state='loaded graph after issued click; selection response unproven',
                     purpose='Clean loaded graph showing clusters and open space; borrow density, not heavy yellow links')
    if 'zoom-attempt' in rel or file.name == 'cosmograph-zoom-15s.webm':
        asset.update(state='visually verified graph magnification', purpose='Actual graph zoom reference; source recording retained')
    if sid == '100000-stars':
        asset.update(state='live onboarding / entry into exploration; wheel issued, response unproven',
                     gaps='No ground-to-sky footage; onboarding motion does not prove wheel-caused zoom',
                     purpose='Space entry/onboarding and sparse star-field reference')
    provenance = file.with_name(file.name + '.provenance.json')
    if provenance.exists():
        asset['derivation'] = json.loads(provenance.read_text(encoding='utf-8'))
    assets.append(asset)

(ROOT / 'catalog/assets.json').write_text(json.dumps(assets, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
groups = {}
for asset in assets:
    groups.setdefault(asset['sha256'], []).append(asset['path'])
summary = {'asset_records': len(assets), 'unique_byte_hashes': len(groups),
           'by_source': {s: sum(a['source_id'] == s for a in assets) for s in URLS},
           'by_usage_scope': {s: sum(a['usage_scope'] == s for a in assets) for s in ('reference-only', 'reuse-cleared', 'reuse-candidate', 'blocked')},
           'duplicate_groups': [v for v in groups.values() if len(v) > 1],
           'excluded': 'Browser profile/cache trees; not counted as assets',
           'status': 'bounded collection archived with explicit gaps; not full interaction or ground-to-sky coverage'}
(ROOT / 'catalog/coverage.json').write_text(json.dumps(summary, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: v for k, v in summary.items() if k != 'duplicate_groups'}))
