/**
 * Represents a single product type in stock
 */
export class Product {
    public static TABLE_NAME = 'product';

    public id: number;
    public name: string;
    public stockAmount: number;

    /**
     * Constructor
     * @param {string} name The name of the product
     * @param {number} stockAmount The stockAmount in stock
     */
    constructor(name: string, stockAmount: number) {
        this.name = name;
        this.stockAmount = stockAmount;
    }
}
