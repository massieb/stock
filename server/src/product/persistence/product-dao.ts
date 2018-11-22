import { DatabaseService } from '../../database/database.service';
import { Product } from './product';
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
            `VALUES ('${product.name}', ${product.initialAmount});`;
        return this.databaseService.executeQuery(query);
    }

    /**
     * Removes an existing product from the database
     * @param {string} productName The name of the product to remove
     * @returns {Promise<Product[]>} The result
     */
    deleteProduct(productName: string): Promise<void> {
        const query =
            `DELETE FROM ${Product.TABLE_NAME} ` +
            `WHERE name = '${productName}'`;
        return this.databaseService.executeQuery(query);
    }

    /**
     * Changes the stock amount of an existing product.
     * When decreasing the amount the total amount can never be lower than 0
     * @param {string} productName The name of the product
     * @param {number} changeAmount The amount to increase or decrease
     * @returns {Promise<Product[]>} The result
     */
    changeStock(productName: any, changeAmount: number): Promise<void> {
        const query =
            `UPDATE ${Product.TABLE_NAME} ` +
            `SET stockAmount = CASE ` +
            `  WHEN stockAmount + ${changeAmount} < 0 THEN 0 ` +
            `  ELSE (stockAmount + ${changeAmount}) ` +
            `  END ` +
            `WHERE name = '${productName}';`;
        return this.databaseService.executeQuery(query);
    }
}