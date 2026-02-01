#!/usr/bin/env python3
from PIL import Image
import os

# Kreiraj img mapu ako ne postoji
img_dir = os.path.dirname(os.path.abspath(__file__))

# Boje
images = {
    'benefits-seekers.jpg': '#87D7D3',
    'benefits-employers.jpg': '#A848CC',
    'privacy-control.jpg': '#D1C4FF',
    'blog-placeholder-1.jpg': '#A848CC',
    'blog-placeholder-2.jpg': '#87D7D3',
    'blog-placeholder-3.jpg': '#D1C4FF',
    'mobile-mockup.png': '#F3F0FF'
}

for filename, color in images.items():
    filepath = os.path.join(img_dir, filename)
    img = Image.new('RGB', (600, 400), color=color)
    img.save(filepath)
    print(f'✓ {filename} -> {filepath}')

print('\n✅ Sve slike su kreirane!')
