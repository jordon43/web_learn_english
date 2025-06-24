export type WordData = {
  id: number;
  word_en: string;
  word_ru: string;
  isRepeat: boolean;
  isSaved: boolean;
  isFavorite: boolean;
};

export type WordNonFormatData = {
  id: number;
  data_on_english: string;
  data_on_russian: string;
  is_repeat: boolean;
  is_saved: boolean;
  is_favorite: boolean;
};
