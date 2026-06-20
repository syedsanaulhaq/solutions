with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ur.html', 'r', encoding='utf-8') as f:
    c = f.read()

old = """  const elKey = getELKey();
  if (elKey) {
    try {
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.50, similarity_boost: 0.80, style: 0.25, use_speaker_boost: true }
        })
      });
      if (ttsSession !== mySession) return;
      if (res.ok) {
        const blob  = await res.blob();
        if (ttsSession !== mySession) return;
        const url   = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio = audio;
        audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.play();
        return;
      } else {
        const err = await res.json().catch(() => ({}));
        console.warn('ElevenLabs error:', err.detail || res.status);
      }
    } catch (e) { console.warn('ElevenLabs fetch failed, using browser TTS:', e.message); }
  }"""

new = """  // \u2500 Groq TTS (primary \u2014 Arabic model reads Urdu/Arabic script) \u2500
  const groqKey = getLLMKey();
  if (groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'playai-tts-arabic',
          input: clean,
          voice: 'Noor-PlayAI',
          response_format: 'mp3'
        })
      });
      if (ttsSession !== mySession) return;
      if (res.ok) {
        const blob  = await res.blob();
        if (ttsSession !== mySession) return;
        const url   = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio = audio;
        audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.play();
        return;
      } else {
        const err = await res.json().catch(() => ({}));
        console.warn('Groq TTS error:', err);
      }
    } catch (e) { console.warn('Groq TTS failed:', e.message); }
  }

  if (ttsSession !== mySession) return;
  // \u2500 ElevenLabs (secondary) \u2500
  const elKey = getELKey();
  if (elKey) {
    try {
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.50, similarity_boost: 0.80, style: 0.25, use_speaker_boost: true }
        })
      });
      if (ttsSession !== mySession) return;
      if (res.ok) {
        const blob  = await res.blob();
        if (ttsSession !== mySession) return;
        const url   = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio = audio;
        audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.play();
        return;
      } else {
        const err = await res.json().catch(() => ({}));
        console.warn('ElevenLabs error:', err.detail || res.status);
      }
    } catch (e) { console.warn('ElevenLabs failed:', e.message); }
  }"""

if old in c:
    c = c.replace(old, new, 1)
    print('TTS block replaced: OK')
else:
    print('TTS block: NOT FOUND')

with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ur.html', 'w', encoding='utf-8') as f:
    f.write(c)
print('Saved.')
