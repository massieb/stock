import { Product } from '../persistence/product';
import { WebProduct } from './web-product';

export class ProductTransformer {
    public static toWebObjects(products: Product[]): WebProduct[] {
        return products.map((product: Product) => {
            return ProductTransformer.toWebObject(product);
        });
    }

    public static toWebObject(product: Product): WebProduct {
        return new WebProduct(product);
    }
}
