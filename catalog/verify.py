"""Offline inventory of retained evidence; never executes acquired content."""
import hashlib
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
files = []
errors = []
for folder in ('references', 'reusable', 'owned', '.local-captures'):
    base = root / folder
    for path in sorted(base.rglob('*')):
        if not path.is_file():
            continue
        data = path.read_bytes()
        record = {'path': path.relative_to(root).as_posix(), 'bytes': len(data),
                  'sha256': hashlib.sha256(data).hexdigest(),
                  'local_only': folder == '.local-captures'}
        try:
            if path.name == 'tsconfig.json':
                record['format_note'] = 'Upstream JSONC with trailing commas; preserved, not strict JSON validated.'
            elif path.suffix.lower() == '.json':
                json.loads(data.decode('utf-8-sig'))
            if path.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp', '.gif'):
                with Image.open(path) as im:
                    record['dimensions'] = list(im.size)
                    record['format'] = im.format
                    im.verify()
        except Exception as exc:
            errors.append({'path': record['path'], 'error': str(exc)})
        files.append(record)
groups = {}
for record in files:
    groups.setdefault(record['sha256'], []).append(record['path'])
result = {'files': files, 'file_count': len(files), 'errors': errors,
          'duplicates': [v for v in groups.values() if len(v) > 1],
          'limits': 'Integrity and decoding only; not visual authenticity, permission clearance, or video validation.'}
(root / 'catalog' / 'file-inventory.json').write_text(
    json.dumps(result, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps({'files': len(files), 'errors': len(errors)}))
raise SystemExit(bool(errors))
