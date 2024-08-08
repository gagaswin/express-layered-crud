interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductData {
  name: string;
  price: number;
  description: string;
  image: string;
}

export { Product, ProductData };
