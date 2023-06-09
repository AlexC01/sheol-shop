import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, SORT_VALIDATIONS } from "@constants/sorts";
import { TypedRequestQuery } from "@interfaces/express-int";
import { SortOrder } from "mongoose";

export const getQuery = (req: TypedRequestQuery) => {
  const {
    sortBy = DEFAULT_SORT_BY,
    sortOrder = DEFAULT_SORT_ORDER,
    sizes,
    colors,
    brands,
    minPrice,
    maxPrice,
    category,
    system,
    isFeatured,
    isOnSale,
    isNewArrivals,
    subcategory,
    search
  } = req.query;

  const sortByParam = SORT_VALIDATIONS.validSortBy.includes(sortBy) ? sortBy : DEFAULT_SORT_BY;
  const sortOrderParam = SORT_VALIDATIONS.validSortOrder.includes(sortOrder)
    ? (sortOrder as SortOrder)
    : (DEFAULT_SORT_ORDER as SortOrder);

  const query = {} as any;

  if (system !== undefined) {
    query.system = system;
  }

  if (category !== undefined) {
    query.category = category;
  }

  if (subcategory !== undefined) {
    query.subcategory = subcategory;
  }

  if (search !== undefined) {
    query.name = { $regex: search, $options: "i" };
  }

  if (isFeatured !== undefined) {
    query.isFeatured = true;
  }

  if (isOnSale !== undefined) {
    query.isDiscount = true;
  }

  if (isNewArrivals !== undefined) {
    // it shows the products added in the last 7 days
    query.createdAt = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
  }

  if (sizes !== undefined) {
    query.sizes = { $elemMatch: { size: { $in: [sizes] }, stock: { $gt: 0 } } };
  } else {
    query.totalStock = { $gt: 0 };
  }

  if (colors !== undefined) {
    query.color = { $in: [colors] };
  }

  if (brands !== undefined) {
    query.brand = { $in: [brands] };
  }

  if (minPrice !== undefined) {
    query.price = { $gte: parseFloat(minPrice) };
  }

  if (maxPrice !== undefined) {
    query.price = { ...query.price, $lte: parseFloat(maxPrice) };
  }

  return { sort: { [sortByParam]: sortOrderParam }, query };
};

export const pages = (req: TypedRequestQuery) => {
  const { page = "1", limit = "10" } = req.query;
  return { page: parseInt(page), limit: parseInt(limit), skip: (+page - 1) * +limit };
};
