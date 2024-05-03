from django.test import TestCase
from PIL import Image, ImageFilter
import os
import sys
# Create your tests here.

img_path_before = r"C:\Users\lyzlo\Pictures\hero.jpg"
img_path_after = r"C:\Users\lyzlo\Pictures\hero_test.jpg"

image = Image.open(img_path_before)
image.thumbnail([sys.maxsize, 300], Image.Resampling.LANCZOS)
image = image.filter(ImageFilter.BoxBlur(50))
image.save(fp=img_path_after, quality=10, format="JPEG", optimize=True)
dim = image.size
print(f"Image size: {dim}")
print(f"File size before compressing: {os.path.getsize(img_path_before)}")
print(f"File size after compressing: {os.path.getsize(img_path_after)}")