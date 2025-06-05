const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'mp_PruebaA3',
    server: 'sqlserver',
    database: 'master',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function connectWithRetry(maxRetries = 10, delayMs = 5000) {
    console.log('⏳ Intentando conectar a la base de datos...');
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await sql.connect(config);
            console.log(`✅ Conexión a "master" exitosa en intento ${attempt}.`);
            return;
        } catch (err) {
            console.log(`❌ Error al conectar: ${err.message}. Reintentos restantes: ${maxRetries - attempt}`);
            if (attempt === maxRetries) throw new Error('❌ No se pudo conectar a la base de datos. Abortando.');
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

module.exports = connectWithRetry;
