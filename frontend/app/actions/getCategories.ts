import { getCategories } from "../services/category";

const getCategoriesMen = async () => {
  try {
    const response = await getCategories("men");
    return response;
  } catch (err) {
    return [];
  }
};

const getCategoriesWomen = async () => {
  try {
    const response = await getCategories("women");
    return response;
  } catch (err) {
    return [];
  }
};

export default async function getCategoriesNavbar() {
  const [categoriesMen, categoriesWomen] = await Promise.all([getCategoriesMen(), getCategoriesWomen()]);
  return {
    categoriesMen,
    categoriesWomen
  };
}
