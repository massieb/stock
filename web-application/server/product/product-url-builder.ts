import { Urls } from '../urls';

export class ProductUrlBuilder {
    static GET_ALL_PRODUCTS = `${ Urls.BASE_URL }/products`;
    static POST_NEW_PRODUCT = `${ Urls.BASE_URL }/products/product`;
    static PUT_STOCK_AMOUNT = `${ Urls.BASE_URL }/products/product/:name`;
    static DELETE_PRODUCT = `${ Urls.BASE_URL }/products/product/:name`;

    static getAllProducts(): string {
        return this.GET_ALL_PRODUCTS;
    }

    static addNewProduct(): string {
        return this.POST_NEW_PRODUCT;
    }

    static changeStock(productName: string, amountToChange: number): string {
        // Replace :name with the product name as path param
        const url = this.PUT_STOCK_AMOUNT.replace(':name', productName);
        // Add the amount as query param
        return `${ url }?amount=${ amountToChange }`;
    }

    static deleteProductByName(productName: string): string {
        return this.DELETE_PRODUCT.replace(':name', productName);
    }
}
