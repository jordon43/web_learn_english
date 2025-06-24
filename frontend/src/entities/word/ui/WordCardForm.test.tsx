import { render, screen } from "@testing-library/react";
import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import { WordData } from "@/entities/word/model/types";

let mockDataWord: WordData;

beforeAll(() => {
  mockDataWord = {
    word_en: "test",
    word_ru: "test",
    id: 1,
    isSaved: false,
    isFavorite: false,
    isRepeat: false,
  };
});

it("renders WordCardForm", () => {
  render(<WordCardForm word={mockDataWord} />);
  expect(screen.getAllByTestId("WordCardForm")).toHaveLength(1);

  // expect(screen.getByText("Learn React")).toBeInTheDocument();
});
