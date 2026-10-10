#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

src_path = "assets/branding/Australia Chapter_whitebackground.png"
img = Image.open(src_path).convert("RGBA")

# Mask polygon for triangle
mask = Image.new("L", img.size, 0)
draw = ImageDraw.Draw(mask)
# Top point: (375, 191), Bottom Right: (464, 336), Bottom Left: (285, 336)
draw.polygon([(375, 191), (464, 336), (285, 336)], fill=255)

# Apply mask
out = Image.new("RGBA", img.size, (0, 0, 0, 0))
out.paste(img, (0, 0), mask)

# Crop to triangle bbox
crop_bbox = (285, 191, 465, 337)
cropped = out.crop(crop_bbox)
cw, ch = cropped.size

# Square canvas with minimal padding for full-bleed tab visibility
sq_dim = max(cw, ch) + 8
sq = Image.new("RGBA", (sq_dim, sq_dim), (0, 0, 0, 0))
sq.paste(cropped, ((sq_dim - cw) // 2, (sq_dim - ch) // 2), cropped)

sizes = [
    ("theme/images/sfpe-favicon-192x192.png", 192),
    ("theme/images/sfpe-favicon-48x48.png", 48),
    ("theme/images/sfpe-favicon-32x32.png", 32),
    ("theme/images/sfpe-favicon-16x16.png", 16),
    ("theme/images/sfpe-apple-touch-icon.png", 180),
    ("theme/images/sfpe-favicon.png", 512),
    ("assets/branding/sfpe-favicon-192x192.png", 192),
    ("assets/branding/sfpe-favicon-48x48.png", 48),
    ("assets/branding/sfpe-favicon-32x32.png", 32),
    ("assets/branding/sfpe-favicon-16x16.png", 16),
    ("assets/branding/sfpe-apple-touch-icon.png", 180),
    ("assets/branding/sfpe-favicon.png", 512),
]

for out_file, s in sizes:
    resized = sq.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(out_file, "PNG")
    print(f"Saved {out_file} ({s}x{s})")

# Also save multi-res favicon.ico
ico_16 = sq.resize((16, 16), Image.Resampling.LANCZOS)
ico_32 = sq.resize((32, 32), Image.Resampling.LANCZOS)
ico_48 = sq.resize((48, 48), Image.Resampling.LANCZOS)
ico_16.save("theme/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
ico_16.save("theme/images/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Saved theme/favicon.ico and theme/images/favicon.ico")
