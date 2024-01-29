export interface IProduct {
  _id: string;
  product_name: string;
  product_description: string;
  product_thumb: string;
  product_price: number;
  product_quantity: number;
  product_shop: IProductShop;
  product_type: string;
  product_attribute: IProductAttribute;
  product_rateAverage: number;
  product_variation: string[];
  createdAt: string;
  updatedAt: string;
  product_slug: string;
}

export interface IProductShop {
  email: string;
}

export interface IProductAttribute {
  brand: string;
  size: string;
  material: string;
}
