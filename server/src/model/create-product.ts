/**
 * Object that is used to create new products
 */
export class CreateProduct {
    /**
     * Constructor
     * @param {string} name The name of the product (must be unique)
     */
    constructor(public name: string) {
    }
}