import json
import math
import pathlib
import re
import tempfile
import wave
from piper import PiperVoice, SynthesisConfig

root = pathlib.Path('.voz')
model = root / 'es_MX-claude-high.onnx'
script = pathlib.Path('piloto.txt').read_text()
parts = re.split(r'^# (.+)\n', script, flags=re.M)[1:]
items = [(title, line) for title, passage in zip(parts[::2], parts[1::2])
         for line in passage.strip().splitlines() if line.strip()]

def chunks(line):
    for sentence in re.split(r'(?<=[.!?])\s+', line):
        words = sentence.split()
        groups = max(1, math.ceil(len(words) / 12))
        for group in range(groups):
            yield ' '.join(words[group * len(words) // groups:(group+1) * len(words) // groups])

scenes = []
with tempfile.TemporaryDirectory() as work:
    groups = [list(chunks(line)) for _, line in items]
    paths = [[pathlib.Path(work) / f'{i}-{j}.wav' for j in range(len(group))]
             for i, group in enumerate(groups)]
    voice = PiperVoice.load(model)
    config = SynthesisConfig(length_scale=1.13)
    for group, files in zip(groups, paths):
        for text, path in zip(group, files):
            with wave.open(str(path), 'wb') as audio:
                voice.synthesize_wav(text, audio, syn_config=config)

    for i, ((title, line), group, files) in enumerate(zip(items, groups, paths)):
        src = f'narracion-{i:02}.wav'
        cues = []
        samples = 0
        with wave.open(f'public/{src}', 'wb') as out:
            for text, path in zip(group, files):
                with wave.open(str(path)) as audio:
                    if samples == 0:
                        out.setparams(audio.getparams())
                    cues.append({'at': round(samples * 30 / audio.getframerate()), 'text': text})
                    out.writeframesraw(audio.readframes(audio.getnframes()))
                    samples += audio.getnframes()
                    rate = audio.getframerate()
        scenes.append(dict(title=title, line=line, src=src, frames=math.ceil(samples*30/rate)+12, cues=cues))
pathlib.Path('piloto.json').write_text(json.dumps(scenes, ensure_ascii=False, indent=2))
print(sum(scene['frames'] for scene in scenes)/30)
