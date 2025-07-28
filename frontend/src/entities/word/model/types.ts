export type WordData = {
  id: number;
  word: string;
  translations: string[];
  // word_en: string;
  // word_ru: string;
  // isRepeat: boolean;
  // isSaved: boolean;
  // isFavorite: boolean;
};

export type WordNonFormatData = {
  id: number;
  word: string;
  translations: string[];
  // is_repeat: boolean;
  // is_saved: boolean;
  // is_favorite: boolean;
};
