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
        }
        resolve(results.rows);
      })
    }) 
}

const add_user = (body) => {
    const { user_email, username, user_password, user_fullname } = body;
    return new Promise(function(resolve, reject) {
        const query = `INSERT INTO morpheus.users (email, username, password, full_name)
                        values (${user_email}, ${username}, ${user_password}, ${user_fullname});`;
        
        db_pool.query(query, (error, results) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        console.log(results);
        // resolve(results.rows);
      })
    }) 
}

module.exports = {
    get_all_users,
    add_user
}