export interface Product {
    alias: string | null;
    id: string | null;
    name: string;
    description: string | null;
    price: number | null;
    imageSrc: string | null;
}

export function areProductsEqual(productA: Product, productB: Product): boolean {
  return productA.id === productB.id &&
         productA.name === productB.name &&
         productA.description === productB.description &&
         productA.price === productB.price &&
         productA.imageSrc === productB.imageSrc;
}