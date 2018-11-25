import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ProductResource } from './product/product-resource';
import { DatabaseService } from './database/database.service';

export class App {
    public app: express.Application;
    public database: DatabaseService;

    constructor() {
        this.app = express();
        this.database = new DatabaseService();
        this.configApp();
    }

    // https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli
    private configApp(): void {
        // Support application/json type post data
        this.app.use(bodyParser.json());

        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.initResources();
    }

    private initResources() {
        /* tslint:disable */
        new ProductResource(this.app, this.database);
        /* tslint:enable */
    }
}

export default new App().app;
