import express from 'express';
import {router} from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});