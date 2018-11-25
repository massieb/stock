import { Connection, ConnectionConfig } from 'mysql';

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
    private createConnection(): Connection {
        const config: ConnectionConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'stock'

        };
        return mysql.createConnection(config);
    }

    /**
     * Ends the database connection
     */
    private endConnection(connection: Connection): void {
        connection.end((error) => {
            if (error) {
                console.log('DatabaseService connection terminated', error);
            }
        });
    }
}
