import { Application, Request, Response } from 'express';
import { DatabaseService } from '../database/database.service';
import { Product } from './persistence/product';
import { ProductDao } from './persistence/product-dao';
import { WebCreateProduct } from './model/web-create-product';
import { ProductTransformer } from './model/product-transformer';
import { ProductUrlBuilder } from './product-url-builder';

/**
 * The Product resource
 */
export class ProductResource {
    private productDao: ProductDao;

    constructor(private app: Application, private databaseService: DatabaseService) {
        this.productDao = new ProductDao(databaseService);

        // Returns all products from the database
        app.route(ProductUrlBuilder.GET_ALL_PRODUCTS)
            .get((req, res) => this.getAllProducts(req, res));

        // Creates a new product by name.
        app.route(ProductUrlBuilder.POST_NEW_PRODUCT)
            .post((req, res) => this.createNewProduct(req, res));

        // Changes the stock amount of the product with the amount given (increases or decreases till 0)
        app.route(ProductUrlBuilder.PUT_STOCK_AMOUNT)
            .put((req, res) => this.updateStockAmount(req, res));

        // Removes an existing product from the database
        app.route(ProductUrlBuilder.DELETE_PRODUCT)
            .delete((req, res) => this.deleteProduct(req, res));
    }

    private getAllProducts(request: Request, response: Response) {
        this.productDao.getAll().then((products: Product[]) => {
            response.status(200).send(ProductTransformer.toWebObjects(products));
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    }

    private createNewProduct(request: Request, response: Response) {
        const product: WebCreateProduct = request.body;
        this.productDao.createProduct(product).then(() => {
            // Return all products when successfully created
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    }

    private deleteProduct(request: Request, response: Response) {
        const productName = request.params.name;
        this.productDao.deleteProduct(productName).then(() => {
            // Return all products when successfully deleted
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    }

    private updateStockAmount(request: Request, response: Response) {
        const productName = request.params.name;
        const changeAmount = request.query.amount;
        this.productDao.changeStock(productName, changeAmount).then(() => {
            // Return all products when successfully updated stock
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    }
}
