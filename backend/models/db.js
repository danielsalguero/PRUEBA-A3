const sql = require('mssql');

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'YourPassword123',
    server: process.env.DB_HOST || 'sqlserver',  // nombre del servicio en docker-compose
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || 'master',
    options: {
        encrypt: false,               // no usar SSL interno en docker
        trustServerCertificate: true
    }
};

let poolPromise;

async function getPool() {
    if (!poolPromise) {
        poolPromise = sql.connect(config)
            .then(pool => {
                console.log('✅ Pool de conexión SQL creado');
                return pool;
            })
            .catch(err => {
                console.error('❌ Error al crear pool de conexión SQL:', err);
                throw err;
            });
    }
    return poolPromise;
}

module.exports = { getPool, sql };
