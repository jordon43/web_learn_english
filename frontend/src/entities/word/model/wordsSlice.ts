import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordData, WordNonFormatData } from "@/entities/word/model/types";
import { wordApi } from "@/entities/word/api/wordApi";
import { mapWords } from "@/entities/word/model/mapper";

type wordsState = {
  savedWords: WordData[];
  repeatWords: WordData[];
  allWords: WordData[];
};

const initialState: wordsState = {
  savedWords: [],
  repeatWords: [],
  allWords: [],
};

const wordsSlices = createSlice({
  name: "words",
  initialState: initialState,
  reducers: {
    setAllWords: (state, action: PayloadAction<WordData[]>) => {
      state.allWords = action.payload;
    },
    setRepeatWords: (state, action: PayloadAction<WordData[]>) => {
      state.repeatWords = action.payload;
    },
    addRepeatWord: (state, action: PayloadAction<WordData>) => {
      state.repeatWords.push(action.payload);
      state.allWords.shift();
    },
    addSavedWord: (state, action: PayloadAction<WordData>) => {
      state.savedWords.push(action.payload);
      state.allWords.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      wordApi.endpoints.getAllWords.matchFulfilled,
      (state, action: PayloadAction<WordNonFormatData[]>) => {
        state.allWords = mapWords(action.payload);
      },
    );
    builder.addMatcher(
      wordApi.endpoints.getRepeatWords.matchFulfilled,
      (state, action: PayloadAction<WordNonFormatData[]>) => {
        state.repeatWords = mapWords(action.payload);
      },
    );
    builder.addMatcher(
      wordApi.endpoints.getSavedWords.matchFulfilled,
      (state, action: PayloadAction<WordNonFormatData[]>) => {
        state.savedWords = mapWords(action.payload);
      },
    );
  },
});

export default wordsSlices.reducer;

export const { setAllWords, addRepeatWord, addSavedWord, setRepeatWords } =
  wordsSlices.actions;
