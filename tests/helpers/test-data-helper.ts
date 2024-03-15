import fs from 'fs';
import path from 'path';
import { Product } from '../model/product';

export function loadProducts(): Product[] {
  const filePath = path.join(__dirname, '../data/products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export function getProductByAlias(alias: string): Product | undefined {
    return loadProducts().find(product => product.alias === alias);
}