"""
Patch demo.html (English) and demo-ja.html (Japanese):
- English: insert Groq playai-tts as primary TTS (before ElevenLabs)
- Japanese: insert Groq playai-tts as primary TTS (best-effort; browser TTS fallback handles Japanese)
"""

# ─── ENGLISH DEMO ────────────────────────────────────────────────────────────
with open('/var/www/hostingocean/frontend/solutions-site/public/demo.html', 'r', encoding='utf-8') as f:
    en = f.read()

en_old = """  const elKey = getELKey();
  if (elKey) {
    // \u2500 Neural voice via ElevenLabs \u2500
    try {
      const abort = new AbortController();
      ttsAbort = abort;
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        signal: abort.signal,
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.45, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true }
        })
      });
      ttsAbort = null;
      if (res.ok) {
        const blob  = await res.blob();
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
    } catch (e) { if (e.name !== 'AbortError') console.warn('ElevenLabs fetch failed, using browser TTS:', e.message); else return; }
  }"""

en_new = """  // \u2500 Groq TTS (primary \u2014 free, same key as chat) \u2500
  const groqKey = getLLMKey();
  if (groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'playai-tts', input: clean, voice: 'Fritz-PlayAI', response_format: 'mp3' })
      });
      if (res.ok) {
        const blob  = await res.blob();
        const url   = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio = audio;
        audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; finish(); };
        audio.play();
        return;
      } else { console.warn('Groq TTS error:', res.status); }
    } catch (e) { console.warn('Groq TTS failed:', e.message); }
  }

  // \u2500 ElevenLabs (secondary \u2014 when quota available) \u2500
  const elKey = getELKey();
  if (elKey) {
    try {
      const abort = new AbortController();
      ttsAbort = abort;
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        signal: abort.signal,
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: { stability: 0.45, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true }
        })
      });
      ttsAbort = null;
      if (res.ok) {
        const blob  = await res.blob();
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
    } catch (e) { if (e.name !== 'AbortError') console.warn('ElevenLabs fetch failed, using browser TTS:', e.message); else return; }
  }"""

if en_old in en:
    en = en.replace(en_old, en_new, 1)
    print('EN TTS block: OK')
else:
    print('EN TTS block: NOT FOUND')

with open('/var/www/hostingocean/frontend/solutions-site/public/demo.html', 'w', encoding='utf-8') as f:
    f.write(en)


# ─── JAPANESE DEMO ───────────────────────────────────────────────────────────
with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ja.html', 'r', encoding='utf-8') as f:
    ja = f.read()

ja_old = """  const elKey = getELKey();
  if (elKey) {
    try {
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_turbo_v2_5',
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

ja_new = """  // \u2500 ElevenLabs (primary when quota available; Groq has no Japanese TTS model) \u2500
  const elKey = getELKey();
  if (elKey) {
    try {
      const res = await fetch(`${EL_API}/${getELVoice()}`, {
        method: 'POST',
        headers: { 'xi-api-key': elKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
        body: JSON.stringify({
          text: clean,
          model_id: 'eleven_turbo_v2_5',
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

# Japanese: no Groq TTS model for ja — just update comment, keep same logic
if ja_old in ja:
    ja = ja.replace(ja_old, ja_new, 1)
    print('JA TTS comment updated: OK')
else:
    print('JA TTS block: NOT FOUND')

with open('/var/www/hostingocean/frontend/solutions-site/public/demo-ja.html', 'w', encoding='utf-8') as f:
    f.write(ja)

print('All done.')
