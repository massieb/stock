import { Connection, ConnectionConfig } from 'mysql';

const mysql = require('mysql');

export class DatabaseService {
    /**
     * Starts a database connection
     */
    private static createConnection(): Connection {
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
    private static endConnection(connection: Connection): void {
        connection.end((error) => {
            if (error) {
                console.log('DatabaseService connection terminated', error);
            }
        });
    }

    /**
     * Executes a MySQL query
     * @param {string} query The query to execute
     * @return {Promise<T>} A promise with the result in the resolve callback
     */
    public executeQuery<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            // Create a database connection
            const connection = DatabaseService.createConnection();

            // Execute the query
            connection.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });

            // Terminate the database connection
            DatabaseService.endConnection(connection);
        });
    }
}
