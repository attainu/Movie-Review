const Sequelize = require('sequelize');
/*
const env = {
  database: 'movie-review',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
  protocol:'postgres',
  pool: {
	  max: 9,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  protocol: env.protocol,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 */

const {POSTGRES_URI, POSTGRES_PASSWORD } = process.env;
const sequelize = new Sequelize(POSTGRES_URI.replace('<password>',POSTGRES_PASSWORD));

sequelize.sync({alter:true});
// sequelize.sync();
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.movie = require('../model/movie.model.js')(sequelize, Sequelize);
db.review = require('../model/review.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
//db.movie.belongsToMany(db.movie, { through: 'user_roles', foreignKey: 'movieId', otherKey: 'roleId'});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


module.exports = db;
