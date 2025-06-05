const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fiscalesRoutes = require('./routes/fiscales.routes');
const casosRoutes = require('./routes/casos.routes');
const authRoutes = require('./routes/auth.routes');
const fiscaliasRoutes = require('./routes/fiscalias.routes');
const logsRoutes = require('./routes/logs.routes');
const { swaggerUi, swaggerSpec } = require('./swagger');
const connectWithRetry = require('./connectWithRetry');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', fiscalesRoutes);
app.use('/api', casosRoutes);
app.use('/api', authRoutes);
app.use('/api', fiscaliasRoutes);
app.use('/api', logsRoutes);

const PORT = process.env.PORT || 3000;

// Inicio del servidor después del retry de la BD
connectWithRetry().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
}).catch(err => {
    console.error(err.message);
    process.exit(1);
});
