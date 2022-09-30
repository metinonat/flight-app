import pg from "pg";
import dotenv from "dotenv/config";

// Database connection
const config : object = {
    host: process.env.HOST as string,
    port: process.env.DB_PORT,
    database: process.env.DB as string,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to the Database.");
});

pool.on('remove', () => {
    console.log('client removed.');
    process.exit(0);
})

export function migrate()  {
    // TODO: Create User Table
    const createUsersTable = `CREATE TABLE IF NOT EXISTS
                    users(
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        created_at TIMESTAMP,
                        updated_at TIMESTAMP
                    )`;
    pool.query(createUsersTable).then((res) => {
        console.log(res);
        pool.end();
    }).catch((err) => {
        console.log(err);
        pool.end();
    })
    // TODO: Create Personal Access Tokens Table
    // TODO: Create Reservations Table
    // TODO: Create Flight Reservations Table
}

export function down() {
    // TODO: Drop User Table
    // TODO: Drop Personal Access Tokens Table
    // TODO: Drop Reservations Table
    // TODO: Drop Flight Reservations Table
}

export default { migrate, pool }



require('make-runnable');