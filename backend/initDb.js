const sql = require('mssql');
const fs = require('fs/promises');

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'mp_PruebaA3',
    server: process.env.DB_HOST || 'sqlserver',
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || 'master',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function initDatabase() {
    console.log("⏳ Esperando que el servidor SQL esté listo...");
    let pool;

    for (let attempt = 1; attempt <= 10; attempt++) {
        try {
            pool = await sql.connect(config);
            console.log(`✅ Servidor SQL listo (conectado a "${config.database}") en intento ${attempt}.`);
            break;
        } catch (err) {
            console.log(`Intento ${attempt} fallido: ${err.message}`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    if (!pool) {
        console.error("❌ No se pudo conectar al servidor SQL.");
        process.exit(1);
    }

    try {
        console.log("⚙️ Ejecutando script init.sql...");
        const script = await fs.readFile('bd/init.sql', 'utf8');

        // Separar por marcador personalizado
        const batches = script.split('--SPLIT--');

        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i].trim();
            if (batch.length > 0) {
                console.log(`🚀 Ejecutando batch ${i + 1} de ${batches.length}...`);
                await pool.request().batch(batch);
                console.log(`✅ Batch ${i + 1} ejecutado correctamente.`);
            }
        }

        console.log("✅ Inicialización de base de datos completada.");
    } catch (err) {
        console.error("❌ Error al inicializar la base de datos:", err.message);
        process.exit(1);
    } finally {
        await pool.close();
    }
}

initDatabase();
