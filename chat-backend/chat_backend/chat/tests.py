from django.test import TestCase

# Create your tests here.
from PIL import Image
import numpy as np

from randimage import get_random_image, show_array
from io import BytesIO


def create_random_image():
    img_size = (128, 128)
    img = get_random_image(img_size)
    byte_stream = BytesIO()
    img_normalized  =  (img * 255).astype(np.uint8)
    image = Image.fromarray(img_normalized)
    image.save(byte_stream, format="JPEG")
    byte_stream.seek(0)

    return byte_stream.read()

data = create_random_image()
bin_data = BytesIO(data)
image = Image.open(bin_data)
image.save("test.png")
