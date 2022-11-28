const Pool = require('pg').Pool;

const db_pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'public',
  password: 'postgres',
  port: 5432,
});

const get_all_users = () => {
    return new Promise(function(resolve, reject) {
        const queryText = `SELECT * FROM morpheus.users`;

        db_pool.query(queryText, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows);
        }
      })
    }) 
}

const add_user = (body) => {
    const { email, username, password, fullName } = body;
    return new Promise(function(resolve, reject) {
        const query = `INSERT INTO morpheus.users (email, username, password, full_name)
                        values ($1, $2, $3, $4);`;
        
        db_pool.query(query, [email, username, password, fullName], (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(results.rows);
        }
      })
    }) 
}

module.exports = {
    get_all_users,
    add_user
}