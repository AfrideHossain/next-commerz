//Formatting price (comma separated)
export const formatPrice = (amount) =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
