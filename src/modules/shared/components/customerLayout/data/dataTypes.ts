export interface categoryType {
  icon: string;
  name: string;
  id: number;
  isPublished: number;
}

export interface categoryStateType {
  categories: categoryType[];
  error: string;
  status: string;
  selectedCategoryById: number | null;
}

export interface brandType {
  id: string;
  logo: string;
  name: string;
}

export interface stateType {
  error: string;
  status: string;
  brands: brandType[];
}
