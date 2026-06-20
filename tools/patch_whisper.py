#!/usr/bin/env python3
"""Patch Whisper error handling in both demo.html files."""
import re

BASE = '/var/www/hostingocean/frontend/solutions-site/public'

# ── English demo ──────────────────────────────────────────────────────────────
with open(f'{BASE}/demo.html', 'r', encoding='utf-8') as f:
    en = f.read()

# 1) Insert key-guard after response_format line (before the fetch)
OLD_EN_GUARD = "      form.append('response_format', 'json');\n      const resp = await fetch"
NEW_EN_GUARD = "      form.append('response_format', 'json');\n      if (!getLLMKey()) { setStatus('idle', '\u2699\ufe0f Add your Groq API key in Settings to use voice input'); audioChunks = []; mediaRec = null; return; }\n      const resp = await fetch"

# 2) Replace generic error message with status-aware one
OLD_EN_ERR = "        console.warn('Whisper error:', resp.status);\n        setStatus('idle', '\U0001f399 Could not transcribe \u2014 type your order instead');"
NEW_EN_ERR = "        console.warn('Whisper error:', resp.status);\n        const sc = resp.status;\n        const em = sc===401 ? 'Invalid API key \u2014 check Settings \u2699\ufe0f'\n                  : sc===429 ? 'Rate limited \u2014 wait a moment and retry'\n                  : 'Could not transcribe (' + sc + ') \u2014 try again';\n        setStatus('idle', '\U0001f399 ' + em);"

changed_en = 0
if OLD_EN_GUARD in en:
    en = en.replace(OLD_EN_GUARD, NEW_EN_GUARD, 1)
    changed_en += 1
    print('EN guard: OK')
else:
    print('EN guard: NOT FOUND')

if OLD_EN_ERR in en:
    en = en.replace(OLD_EN_ERR, NEW_EN_ERR, 1)
    changed_en += 1
    print('EN error msg: OK')
else:
    print('EN error msg: NOT FOUND')

if changed_en:
    with open(f'{BASE}/demo.html', 'w', encoding='utf-8') as f:
        f.write(en)
    print(f'EN: saved ({changed_en} change(s))')

# ── Japanese demo ─────────────────────────────────────────────────────────────
with open(f'{BASE}/demo-ja.html', 'r', encoding='utf-8') as f:
    ja = f.read()

OLD_JA_GUARD = "      form.append('response_format', 'json');\n      const resp = await fetch"
NEW_JA_GUARD = "      form.append('response_format', 'json');\n      if (!getLLMKey()) { setStatus('idle', '\u2699\ufe0f \u8a2d\u5b9a\u304bGroq API\u30ad\u30fc\u3092\u8ffd\u52a0\u3057\u3066\u304f\u3060\u3055\u3044'); audioChunks = []; mediaRec = null; return; }\n      const resp = await fetch"

OLD_JA_ERR = "        console.warn('Whisper error:', resp.status);\n        setStatus('idle', '\U0001f3a4 \u6587\u5b57\u8d77\u3053\u3057\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u6587\u5b57\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044');"
NEW_JA_ERR = "        console.warn('Whisper error:', resp.status);\n        const sc = resp.status;\n        const em = sc===401 ? 'API\u30ad\u30fc\u304c\u7121\u52b9\u3067\u3059\u3002\u8a2d\u5b9a\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044 \u2699\ufe0f'\n                  : sc===429 ? '\u30ec\u30fc\u30c8\u5236\u9650\u4e2d\u3002\u5c11\u3057\u5f85\u3063\u3066\u304b\u3089\u518d\u8a66\u884c\u3057\u3066\u304f\u3060\u3055\u3044'\n                  : '\u6587\u5b57\u8d77\u3053\u3057\u30a8\u30e9\u30fc (' + sc + ') \u2014 \u3082\u3046\u4e00\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044';\n        setStatus('idle', '\U0001f3a4 ' + em);"

changed_ja = 0
if OLD_JA_GUARD in ja:
    ja = ja.replace(OLD_JA_GUARD, NEW_JA_GUARD, 1)
    changed_ja += 1
    print('JA guard: OK')
else:
    print('JA guard: NOT FOUND')

if OLD_JA_ERR in ja:
    ja = ja.replace(OLD_JA_ERR, NEW_JA_ERR, 1)
    changed_ja += 1
    print('JA error msg: OK')
else:
    print('JA error msg: NOT FOUND')

if changed_ja:
    with open(f'{BASE}/demo-ja.html', 'w', encoding='utf-8') as f:
        f.write(ja)
    print(f'JA: saved ({changed_ja} change(s))')

print('All done.')
