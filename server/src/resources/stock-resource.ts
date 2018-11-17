import { Application, Request, Response } from 'express';
import { DatabaseService } from '../database/database.service';
import { Product } from '../database/model/product';
import { ProductDao } from '../database/product-dao';

export class StockResource {
    constructor(private app: Application, private databaseService: DatabaseService) {
        const productDao = new ProductDao(databaseService);

        /**
         * Returns all products from the database
         */
        app.route('/products')
            .get((request: Request, response: Response) => {
                productDao.getAll().then((products: Product[]) => {
                    response.status(200).send(products);
                }).catch((reason) => {
                    response.status(500).send(reason);
                });
            });

        /**
         * Creates a new product by name.
         */
        app.route('/products/product')
            .post((request: Request, response: Response) => {
                productDao.createProduct(request.body).then(() => {
                    response.status(204).send()
                }).catch((reason) => {
                    response.status(500).send(reason);
                });
            });
    }
}