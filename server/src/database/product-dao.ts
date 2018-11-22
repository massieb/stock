import { DatabaseService } from './database.service';
import { Product } from './model/product';
import { CreateProduct } from '../model/create-product';

/**
 * Product data access object
 */
export class ProductDao {

    /**
     * Constructor
     * @param {DatabaseService} databaseService The database service
     */
    constructor(private databaseService: DatabaseService) {
    }

    /**
     * Gets all products from the database
     * @returns {Promise<Product[]>} The result
     */
    getAll(): Promise<Product[]> {
        const query =
            `SELECT * ` +
            `FROM ${Product.TABLE_NAME}`;
        return this.databaseService.executeQuery(query);
    }

    /**
     * Add a new product to the database
     * @param {CreateProduct} product The product to create
     * @returns {Promise<void>} The result
     */
    createProduct(product: CreateProduct): Promise<void> {
        const query =
            `INSERT INTO ${Product.TABLE_NAME} ` +
            `(name, stockAmount) ` +
            `VALUES ('${product.name}', 0);`;
        return this.databaseService.executeQuery(query);
    }

    increaseStock(productName: string): Promise<Product> {
        const query =
            `UPDATE ${Product.TABLE_NAME} ` +
            `SET stockAmount = stockAmount + 1 ` +
            `WHERE name = ${productName};`;
        return this.databaseService.executeQuery(query);
    }
}