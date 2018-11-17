const mysql = require('mysql');

export class DatabaseService {
    public executeQuery<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            // Create a database connection
            const connection = this.createConnection();

            // Execute the query
            connection.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });

            // Terminate the database connection
            this.endConnection(connection);
        });
    }

    /**
     * Starts a database connection
     */
    private createConnection(): any {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            passoword: '',
            database: 'stock'
        });
    }

    /**
     * Ends the database connection
     */
    private endConnection(connection: any): void {
        connection.end((error) => {
            console.log('DatabaseService connection terminated', error);
        });
    }
}
