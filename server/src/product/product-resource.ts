import { Application, Request, Response } from 'express';
import { DatabaseService } from '../database/database.service';
import { Product } from './persistence/product';
import { ProductDao } from './persistence/product-dao';
import { CreateProduct } from './model/create-product';

/**
 * The Product resource
 */
export class ProductResource {
    productDao: ProductDao;

    constructor(private app: Application, private databaseService: DatabaseService) {
        this.productDao = new ProductDao(databaseService);

        // Returns all products from the database
        app.route('/products')
            .get(this.getAllProducts);

        // Creates a new product by name.
        app.route('/products/product')
            .post(this.createNewProduct);

        // Changes the stock amount of the product with the amount given (increases or decreases till 0)
        app.route('/products/product/:name')
            .put(this.updateStockAmount);

        // Removes an existing product from the database
        app.route('/products/product/:name')
            .delete(this.deleteProduct);
    }

    private getAllProducts = (request: Request, response: Response) => {
        this.productDao.getAll().then((products: Product[]) => {
            response.status(200).send(products);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    };

    private createNewProduct = (request: Request, response: Response) => {
        const product = new CreateProduct(request.body);
        this.productDao.createProduct(product).then(() => {
            // Return all products when successfully created
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    };

    private deleteProduct = (request: Request, response: Response) => {
        const productName = request.params.name;
        this.productDao.deleteProduct(productName).then(() => {
            // Return all products when successfully deleted
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    };

    private updateStockAmount = (request: Request, response: Response) => {
        const productName = request.params.name;
        const changeAmount = request.query.amount;
        this.productDao.changeStock(productName, changeAmount).then(() => {
            // Return all products when successfully updated stock
            this.getAllProducts(request, response);
        }).catch((reason) => {
            response.status(500).send(reason);
        });
    };
}