import os
import urllib.request, json, sys

GROQ_KEY = os.getenv('GROQ_API_KEY', '')
if not GROQ_KEY:
    raise SystemExit('Set GROQ_API_KEY before running this script.')

# Test Groq TTS with Arabic model for Urdu text
tests = [
    ('playai-tts-arabic', 'Zaid-PlayAI'),
    ('playai-tts-arabic', 'Noor-PlayAI'),
    ('playai-tts-arabic', 'Ahmad-PlayAI'),
    ('playai-tts',        'Fritz-PlayAI'),
]

URDU_TEXT = 'السلام علیکم! میں عائشہ ہوں، آپ کا خیر مقدم ہے!'

for model, voice in tests:
    try:
        req = urllib.request.Request(
            'https://api.groq.com/openai/v1/audio/speech',
            data=json.dumps({'model': model, 'input': URDU_TEXT, 'voice': voice}).encode(),
            headers={
                'Authorization': f'Bearer {GROQ_KEY}',
                'Content-Type': 'application/json'
            },
            method='POST'
        )
        r = urllib.request.urlopen(req, timeout=15)
        body = r.read()
        print(f'OK   {model}  voice={voice}  bytes={len(body)}')
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f'FAIL {model}  voice={voice}  status={e.code}  {body[:160]}')
    except Exception as e:
        print(f'ERR  {model}  voice={voice}  {e}')
