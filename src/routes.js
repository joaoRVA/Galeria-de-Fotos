import {Router} from 'express';
import {PostController} from './controller/PostController.js';
import multerConfig from  './config/multerConfig.js'; 
import multer from 'multer';

const upload = multer(multerConfig);

export const router = Router();

const postController = new PostController();

router.post('/upload', upload.array("fotos"), postController.store);
router.get('/images', (req, res) => postController.getImages(req, res));
router.delete('/images/:id', (req, res) => postController.deleteImage(req, res));