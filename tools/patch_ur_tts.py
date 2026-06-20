with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ur.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix 1: Change model to eleven_multilingual_v2 (supports Urdu; turbo_v2_5 does not)
old1 = "          model_id: 'eleven_turbo_v2_5',"
new1 = "          model_id: 'eleven_multilingual_v2',"
if old1 in c:
    c = c.replace(old1, new1, 1)
    print('Fix 1 (model eleven_multilingual_v2): OK')
else:
    print('Fix 1 (model): NOT FOUND')

# Fix 2: Browser TTS fallback — only assign a voice if it actually speaks Urdu
# (avoids an English voice trying to read Urdu text, which produces silence)
old2 = "  if (aishaVoice) utter.voice = aishaVoice;"
new2 = "  if (aishaVoice && (aishaVoice.lang === 'ur-PK' || aishaVoice.lang.startsWith('ur'))) utter.voice = aishaVoice;"
if old2 in c:
    c = c.replace(old2, new2, 1)
    print('Fix 2 (browser TTS voice guard): OK')
else:
    print('Fix 2 (browser TTS voice guard): NOT FOUND')

with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ur.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Saved.')
