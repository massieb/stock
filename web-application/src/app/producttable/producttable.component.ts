import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { WebProduct } from '../../../server/product/model/web-product';

@Component({
    selector: 'app-producttable',
    templateUrl: './producttable.component.html',
    styleUrls: ['./producttable.component.css']
})
export class ProducttableComponent implements OnInit {
    products: WebProduct[] = [];
    addName;
    addAmount;

    /**
     * Constructor
     * @param {ProductService} productService The product service
     */
    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.productService.getAllProducts()
            .subscribe((products: WebProduct[]) => this.setProducts(products));
    }

    plusOne(product: WebProduct): void {
        this.productService.changeStock(product.name, 1)
            .subscribe((products: WebProduct[]) => this.setProducts(products));
    }

    minusOne(product: WebProduct): void {
        this.productService.changeStock(product.name, -1)
            .subscribe((products: WebProduct[]) => this.setProducts(products));
    }

    deleteProduct(product: WebProduct): void {
        this.productService.deleteProductByName(product.name)
            .subscribe((products: WebProduct[]) => this.setProducts(products));
    }

    addProduct(): void {
        if ((this.addName !== '') && !isNaN(parseInt(this.addAmount, 10))) {
            console.log('add');
            this.productService.addNewProduct(this.addName, this.addAmount)
                .subscribe((products: WebProduct[]) => this.setProducts(products));
        }
    }

    private setProducts(products: WebProduct[]) {
        this.products = products;
    }
}
