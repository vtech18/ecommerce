export const categoryArray = [
  { id: 0, url: require("../assets/electronics.png"), category: "electronics" },
  { id: 1, url: require("../assets/jewelery.jpg"), category: "" },
  { id: 2, url: require("../assets/mensfashion.jpg"), category: "" },
  { id: 3, url: require("../assets/mobiles.webp"), category: "" },
  { id: 4, url: require("../assets/toys.jpg"), category: "" },
  { id: 5, url: require("../assets/womanFashion.jpg"), category: "" },
  { id: 6, url: require("../assets/grocerry.jpg"), category: "" },
  { id: 7, url: require("../assets/electronics.png"), category: "" },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  url: string;
  category: string;
};
