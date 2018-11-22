/**
 * Object that is used to create new products
 */
export class CreateProduct {
    // The name of the product (must be unique)
    name: string;
    // The initial amount (optional)
    initialAmount: number;

    constructor(requestBody: any) {
        this.name = requestBody.name;
        this.initialAmount = requestBody.initialAmount ? requestBody.initialAmount : 0;
    }
}