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
