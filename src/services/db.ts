import pg from "pg";

// Database connection
const config : object = {
    host: process.env.HOST as string,
    port: process.env.DB_PORT,
    database: process.env.DB as string,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
};

export const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to the Database.");
});

pool.on('remove', () => {
    console.log('client removed.');
    // Terminate only called from terminal
    if(process.argv[3] == "--kill") {
        process.exit(0);
    }
})

export function migrate()  {
    const updated_timestamp_trigger : string = `CREATE OR REPLACE FUNCTION trigger_set_timestamp()
                                                RETURNS TRIGGER AS $$
                                                BEGIN
                                                    NEW.updated_at = NOW();
                                                    RETURN NEW;
                                                END;
                                                $$ LANGUAGE plpgsql;`
    const assing_trigger_query : string  = `CREATE TRIGGER set_timestamp
                                            BEFORE UPDATE ON $1
                                            FOR EACH ROW
                                            EXECUTE PROCEDURE trigger_set_timestamp();`
    // TODO: Create User Table
    const createUsersTable = `CREATE TABLE IF NOT EXISTS
                    users(
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(200) NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
                    )`;
    pool.query(createUsersTable).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
    // Create trigger
    pool.query(updated_timestamp_trigger).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    // Assign the trigger
    pool.query(assing_trigger_query, ["users"]).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

    // TODO: Create Personal Access Tokens Table
    // TODO: Create Reservations Table
    // TODO: Create Flight Reservations Table
    pool.end();
}

export function down() {
    // DROP Tables
    pool.query("DROP TABLE IF EXISTS users CASCADE;").then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    // DROP Triggers
    pool.query("DROP TRIGGER IF EXISTS set_timestamp").then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    // DROP functions
    pool.query("DROP FUNCTION IF EXISTS set_timestamp()").then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    // TODO: Drop User Table
    // TODO: Drop Personal Access Tokens Table
    // TODO: Drop Reservations Table
    // TODO: Drop Flight Reservations Table
    pool.end();
}

/*
 * Checks the existance of a record according to given value and fieldName parameters
 * on tableName table. Returns true if the record exists. 
 */
export async function doesExists(tableName: string, fieldName: string, value: string | number) : Promise<boolean> {
    var exists : boolean = false;
    const q = `SELECT * FROM ${tableName} WHERE ${fieldName} = $1;`;
    await pool.query(q, [value]).then((res) => {
        if(res.rowCount > 0) {
            exists = true;
          } else {
            exists = false;
          }
    }).catch((err) => {
        console.log(`[Error] db existance check: \n parameters: ${tableName}, ${fieldName}, ${value}\n ${err}`);
    });
    return exists;
}

export default { migrate, pool, down, doesExists }



require('make-runnable');