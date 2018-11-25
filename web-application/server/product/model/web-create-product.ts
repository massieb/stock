/**
 * Object that is used to create new products
 */
export class WebCreateProduct {
    /**
     * Constructor
     * @param {string} name The name of the product (must be unique)
     * @param {number} initialAmount The initial amount (optional)
     */
    constructor(public name: string, public initialAmount?: number) {
    }
}
