const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());


// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
