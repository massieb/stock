import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ProductResource } from './product/product-resource';
import { DatabaseService } from './database/database.service';

class App {
    public app: express.Application;
    public database: DatabaseService;

    constructor() {
        this.app = express();
        this.database = new DatabaseService();
        this.configApp();
        this.initResources();
    }

    private configApp(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private initResources() {
        new ProductResource(this.app, this.database);
    }
}

export default new App().app;
