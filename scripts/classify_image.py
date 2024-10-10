import matplotlib.pyplot as plt
import numpy as np
import PIL
import tensorflow as tf
import argparse
import json

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

batch_size = 32
img_height = 180
img_width = 180

#sample_img_path='../samples/sample8.jpeg'

parser = argparse.ArgumentParser()
parser.add_argument('--image', type=str, help="Path to the image file")
args = parser.parse_args()
sample_img_path=args.image

img = tf.keras.utils.load_img(
    sample_img_path, target_size=(img_height, img_width)
)
img_array = tf.keras.utils.img_to_array(img)
img_array = tf.expand_dims(img_array, 0)

TF_MODEL_FILE_PATH = '../models/model.tflite'

interpreter = tf.lite.Interpreter(model_path=TF_MODEL_FILE_PATH)
interpreter.get_signature_list()

classify_lite = interpreter.get_signature_runner('serving_default')
class_names=['ace of clubs', 'ace of diamonds', 'ace of hearts', 'ace of spades', 'eight of clubs', 'eight of diamonds', 'eight of hearts', 'eight of spades', 'five of clubs', 'five of diamonds', 'five of hearts', 'five of spades', 'four of clubs', 'four of diamonds', 'four of hearts', 'four of spades', 'jack of clubs', 'jack of diamonds', 'jack of hearts', 'jack of spades', 'joker', 'king of clubs', 'king of diamonds', 'king of hearts', 'king of spades', 'nine of clubs', 'nine of diamonds', 'nine of hearts', 'nine of spades', 'queen of clubs', 'queen of diamonds', 'queen of hearts', 'queen of spades', 'seven of clubs', 'seven of diamonds', 'seven of hearts', 'seven of spades', 'six of clubs', 'six of diamonds', 'six of hearts', 'six of spades', 'ten of clubs', 'ten of diamonds', 'ten of hearts', 'ten of spades', 'three of clubs', 'three of diamonds', 'three of hearts', 'three of spades', 'two of clubs', 'two of diamonds', 'two of hearts', 'two of spades']
predictions_lite = classify_lite(keras_tensor=img_array)['output_0']
score_lite = tf.nn.softmax(predictions_lite)

#print(
#    "This image most likely belongs to {} with a {:.2f} percent confidence."
#    .format(class_names[np.argmax(score_lite)], 100 * np.max(score_lite))
#)

result = {
    'class': class_names[np.argmax(score_lite)],
    'accuracy': 100 * np.max(score_lite)
}

print(json.dumps(result))