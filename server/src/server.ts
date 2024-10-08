import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
//import * as tf from '@tensorflow/tfjs-node';

const app = express();
app.use(cors());
app.use(express.json());
/*
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/imageClassification', {
    //useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Image upload and classification route
app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    try {
        const model = await tf.loadLayersModel('file://path/to/model/model.json');
        const imageBuffer = path.resolve(req.file.path);
        const image = await tf.node.decodeImage(imageBuffer);
        const tensor = image.expandDims(0);  // Preprocess image for model
        
        const predictions = model.predict(tensor) as tf.Tensor;
        res.json({ predictions: predictions.arraySync() });
    } catch (error) {
        res.status(500).send('Error processing image');
    }
});
*/
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
