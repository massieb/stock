import { Product } from '../persistence/product';

export class WebProduct {
    public name: string;
    public stockAmount: number;

    constructor(product: Product) {
        this.name = product.name;
        this.stockAmount = product.stockAmount;
    }
}
