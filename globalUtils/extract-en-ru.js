import fs from 'fs';
import readline from 'readline';

// Formating wiki... to my format for

const INPUT  = 'ru-extract.jsonl';
const OUTPUT = 'en_ru_census.jsonl';

const rl = readline.createInterface({ input: fs.createReadStream(INPUT) });
const out = fs.createWriteStream(OUTPUT);

for await (const line of rl) {
  if (!line.trim()) continue;
  const obj = JSON.parse(line);

  // Только английские леммы
  if (obj.lang_code !== 'en') continue;
  if (!obj.word) continue;

  // Собираем русские глоссы
  const ruGlosses = (obj.senses || [])
    .flatMap(s => s.glosses || [])
    .map(g => g.replace(/^,\s*/, '').trim())  // убираем нач. запятые
    .filter(Boolean);                        // убираем пустое

  if (!ruGlosses.length) continue;

  const ipa = obj.sounds?.[0]?.ipa ?? null;

  const row = {
    word: obj.word,
    pos: obj.pos ?? null,
    ipa,
    ru: ruGlosses
  };
  out.write(JSON.stringify(row) + '\n');
}