import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../server/product/persistence/product';
import { Observable } from 'rxjs/Observable';
import { WebCreateProduct } from '../../server/product/model/web-create-product';
import { ProductUrlBuilder } from '../../server/product/product-url-builder';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get(ProductUrlBuilder.getAllProducts());
    }

    addNewProduct(productName: string, initialAmount: number): Observable<Product[]> {
        return this.http.post(ProductUrlBuilder.addNewProduct(), new WebCreateProduct(productName, initialAmount));
    }

    changeStock(productName: string, amountToChange: number) {
        return this.http.put(ProductUrlBuilder.changeStock(productName, amountToChange), undefined);
    }

    deleteProductByName(productName: string) {
        return this.http.delete(ProductUrlBuilder.deleteProductByName(productName));
    }
}
