import { DatabaseService } from './database.service';
import { Product } from './model/product';
import { CreateProduct } from '../model/create-product';

/**
 * Product data access object
 */
export class ProductDao {
    private static TABLE_NAME = 'product';

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
        return this.databaseService.executeQuery(`SELECT * FROM ${ProductDao.TABLE_NAME}`);
    }

    /**
     * Add a new product to the database
     * @param {CreateProduct} product The product to create
     * @returns {Promise<void>} The result
     */
    createProduct(product: CreateProduct): Promise<void> {
        // TODO validate product
        return this.databaseService.executeQuery(`INSERT INTO ${ProductDao.TABLE_NAME} ` +
            `(name, stockAmount) VALUES ('${product.name}', 0)`);
    }
}