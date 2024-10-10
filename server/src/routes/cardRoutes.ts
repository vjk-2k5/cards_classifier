import { Router } from 'express';
import upload from '../middleware/uploadImage';

import { uploadImage,getResults,getResultsById } from '../controller/cardController';

const router = Router();

router.post('/upload', upload.single('card'), uploadImage);
router.get('/results', getResults);
router.get('/results/:id',getResultsById);

export default router;
