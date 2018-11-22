/**
 * Represents a single product type in stock
 */
export class Product {
    public static TABLE_NAME = 'product';

    private readonly id: number;
    private readonly name: string;
    private readonly stockAmount: number;

    /**
     * Constructor
     * @param {string} name The name of the product
     * @param {number} stockAmount The stockAmount in stock
     */
    constructor(name: string, stockAmount: number) {
        this.name = name;
        this.stockAmount = stockAmount;
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