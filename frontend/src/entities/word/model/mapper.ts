import { WordData, WordNonFormatData } from "@/entities/word/model/types";

export function mapWord(raw: WordNonFormatData): WordData {
  const {
    id,
    data_on_english: word_en,
    data_on_russian: word_ru,
    is_repeat: isRepeat,
    is_saved: isSaved,
    is_favorite: isFavorite,
  } = raw;

  return { id, word_en, word_ru, isRepeat, isSaved, isFavorite };
}

export function mapWords(raws: WordNonFormatData[]): WordData[] {
  return raws.map(mapWord);
}
