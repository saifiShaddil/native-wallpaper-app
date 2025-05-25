export const categories = [
  "background",
  "fashion",
  "nature",
  "science",
  "feelings",
  "education",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

const filters = {
  order: ["popular", "lastest"],
  orientation: ["horizontal", "vertical"],
  type: ["photo", "illustration", "vector"],
  colors: ["red", "orange", "yellow", "green", "turquoise", "blue", "pink", "gray", "black", "brown", "white"],
};

export type FiltersKeyType = keyof typeof filters;

export type FilterType = Record<FiltersKeyType, string>;

export const data = {
  categories,
  filters,
};
