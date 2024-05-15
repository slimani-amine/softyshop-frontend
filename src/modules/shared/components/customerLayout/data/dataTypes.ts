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
