import { Request, Response } from 'express';
import { exec } from 'child_process';
import { CardModel } from '../models/card';
import mongoose from 'mongoose';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const imagePath = req.file?.path; 

    exec(`python ../scripts/classify_image.py --image ${imagePath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Error processing image');
        return;
      }

      const result = JSON.parse(stdout); 

      const image = new CardModel({
        imagePath,
        classificationResult: result.class,
        accuracy: result.accuracy,
      });

      await image.save();
      res.json({ classification: result.class, accuracy: result.accuracy });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
};

export const getResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await CardModel.find();
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }


};

export const getResultsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ID format',
      });
    }

    
    const result = await CardModel.findById(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: `No result found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching classification result by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching result',
    });
  }
};