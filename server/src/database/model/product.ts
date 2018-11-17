/**
 * Represents a single product type in stock
 */
export class Product {
    private id: number;

    /**
     * Constructor
     * @param {string} name The name of the product
     * @param {number} stockAmount The stockAmount in stock
     */
    constructor(private name: string, private stockAmount: number) {
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getStockAmount() {
        return this.stockAmount;
    }
}