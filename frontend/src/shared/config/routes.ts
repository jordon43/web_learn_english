type Routes = {
  path: string;
  name: string;
}


export const routes: Routes[] = [
  { path: "/words", name: "Изучение" },
  { path: "/repeat-words", name: "Для повторения" },
  { path: "/saved-words", name: "Сохраненные слова" },
  { path: "/favorite-words", name: "Избранные слова" },
];