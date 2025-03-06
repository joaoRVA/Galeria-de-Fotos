import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) =>{
            callback(null, `${Date.now()}_${file.originalname}`);
        }
    }),
    fileFilter: (req, file, callback) => {
        const mimeType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

        if (!mimeType.includes(file.mimetype)) {
            callback(null, false);
        }
        callback(null, true);
    }
}