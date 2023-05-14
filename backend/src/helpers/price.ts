const getDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export default getDiscount;
