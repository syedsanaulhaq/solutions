import os
import urllib.request, json

EL_KEY = os.getenv('ELEVENLABS_API_KEY', '')
if not EL_KEY:
    raise SystemExit('Set ELEVENLABS_API_KEY before running this script.')

# Test several known voice IDs with eleven_multilingual_v2
voices = [
    ('Adam (en)',      'pNInz6obpgDQGcFmaJgB'),
    ('Rachel (en)',    '21m00Tcm4TlvDq8ikWAM'),
    ('Bella (en)',     'EXAVITQu4vr4xnSDxMaL'),
    ('Antoni (en)',    'ErXwobaYiN019PkySvjV'),
    ('Elli (en)',      'MF3mGyEYCl7XYWbV9V6O'),
    ('Josh (en)',      'TxGEqnHWrfWFTfGW9XjX'),
    ('Arnold (en)',    'VR6AewLTigWG4xSOukaG'),
    ('Sam (en)',       'yoZ06aMxZJJ28mfd3POQ'),
]

for name, vid in voices:
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{vid}',
        data=json.dumps({
            'text': 'This is a test',
            'model_id': 'eleven_multilingual_v2'
        }).encode(),
        headers={
            'xi-api-key': EL_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
        },
        method='POST'
    )
    try:
        r = urllib.request.urlopen(req)
        body = r.read()
        print(f'OK   {name:20s} {vid}  bytes={len(body)}')
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f'FAIL {name:20s} {vid}  status={e.code}  {body[:120]}')
    except Exception as e:
        print(f'ERR  {name:20s} {vid}  {e}')
