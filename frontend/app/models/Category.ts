export interface Category {
  name: string;
  id: string;
  _id: string;
  description: string;
  system: string;
  thumbnail: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  id: string;
  _id: string;
  description: string;
  category: string;
  thumbnail: string;
}
