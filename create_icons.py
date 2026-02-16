#!/usr/bin/env python3
"""
Create beautiful, modern minimal app icons for Lhasa Verbs.
Tibetan language learning app with premium design.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Font path
font_path = "/sessions/compassionate-funny-mccarthy/mnt/Tibetan Word App/icons/NotoSansTibetan.ttf"

# Color palette - modern and eye-catching
DEEP_INDIGO = (30, 27, 75)      # #1e1b4b
VIBRANT_PURPLE = (67, 56, 202)   # #4338ca
GOLD_ACCENT = (212, 175, 55)     # #d4af37
WHITE = (255, 255, 255)
LIGHT_GRAY = (240, 240, 245)

def create_gradient_background(size):
    """Create a smooth gradient background from indigo to vibrant purple."""
    img = Image.new('RGBA', (size, size), DEEP_INDIGO)
    pixels = img.load()
    
    for y in range(size):
        # Calculate gradient ratio (0.0 to 1.0)
        ratio = y / size
        
        # Interpolate between colors
        r = int(DEEP_INDIGO[0] + (VIBRANT_PURPLE[0] - DEEP_INDIGO[0]) * ratio)
        g = int(DEEP_INDIGO[1] + (VIBRANT_PURPLE[1] - DEEP_INDIGO[1]) * ratio)
        b = int(DEEP_INDIGO[2] + (VIBRANT_PURPLE[2] - DEEP_INDIGO[2]) * ratio)
        
        for x in range(size):
            pixels[x, y] = (r, g, b, 255)
    
    return img

def create_rounded_icon(size):
    """Create a rounded square icon with gradient background."""
    # Create base image with gradient
    img = create_gradient_background(size)
    
    # Create mask for rounded corners (20% radius)
    corner_radius = int(size * 0.2)
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(
        [(0, 0), (size - 1, size - 1)],
        radius=corner_radius,
        fill=255
    )
    
    # Apply rounded corners
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask)
    
    return output

def add_tibetan_symbol(icon, size, font_size):
    """Add Tibetan syllable or decorative element to the icon."""
    draw = ImageDraw.Draw(icon)
    
    # Tibetan syllable "ཚིག" (word/verb) - try to use it
    tibetan_symbol = "ཚིག"
    
    try:
        # Load the Tibetan font
        font = ImageFont.truetype(font_path, font_size)
        
        # Get bounding box for centering
        bbox = draw.textbbox((0, 0), tibetan_symbol, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Position in center
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.05)
        
        # Draw with white color
        draw.text((x, y), tibetan_symbol, fill=WHITE, font=font)
        
    except Exception as e:
        print(f"Could not render Tibetan font, using fallback: {e}")
        # Fallback: use a stylized circle/dot pattern
        center_x = size // 2
        center_y = size // 2 - int(size * 0.05)
        radius = int(size * 0.15)
        
        # Draw a circle as main element
        draw.ellipse(
            [(center_x - radius, center_y - radius),
             (center_x + radius, center_y + radius)],
            fill=WHITE,
            outline=LIGHT_GRAY,
            width=2
        )

def add_gold_accent(icon, size):
    """Add a subtle gold accent line and decorative dots."""
    draw = ImageDraw.Draw(icon)
    
    # Thin gold horizontal line below the symbol
    line_y = int(size * 0.62)
    line_width = int(size * 0.3)
    line_x_start = (size - line_width) // 2
    line_x_end = line_x_start + line_width
    
    draw.line(
        [(line_x_start, line_y), (line_x_end, line_y)],
        fill=GOLD_ACCENT,
        width=max(2, int(size * 0.012))
    )
    
    # Optional: Add subtle gold dots for lotus-inspired pattern
    dot_radius = max(1, int(size * 0.015))
    dot_spacing = int(size * 0.08)
    
    # Left dot
    left_x = int(size * 0.25)
    dot_y = int(size * 0.7)
    draw.ellipse(
        [(left_x - dot_radius, dot_y - dot_radius),
         (left_x + dot_radius, dot_y + dot_radius)],
        fill=GOLD_ACCENT
    )
    
    # Right dot
    right_x = int(size * 0.75)
    draw.ellipse(
        [(right_x - dot_radius, dot_y - dot_radius),
         (right_x + dot_radius, dot_y + dot_radius)],
        fill=GOLD_ACCENT
    )

def create_icon(size, output_path):
    """Create a complete icon of the given size."""
    print(f"Creating {size}x{size} icon...")
    
    # Create rounded icon with gradient
    icon = create_rounded_icon(size)
    
    # Font size scales with icon size
    font_size = int(size * 0.5)
    
    # Add Tibetan symbol
    add_tibetan_symbol(icon, size, font_size)
    
    # Add gold accent
    add_gold_accent(icon, size)
    
    # Convert to RGB for PNG export (some systems need this)
    icon_rgb = Image.new('RGB', icon.size, WHITE)
    icon_rgb.paste(icon, mask=icon.split()[3])
    
    # Save
    icon_rgb.save(output_path)
    print(f"Saved: {output_path}")

def main():
    base_dir = "/sessions/compassionate-funny-mccarthy/mnt/Tibetan Word App/icons"
    
    # Create icons
    create_icon(192, os.path.join(base_dir, "icon-192.png"))
    create_icon(512, os.path.join(base_dir, "icon-512.png"))
    create_icon(180, os.path.join(base_dir, "apple-touch-icon.png"))
    
    print("\nAll icons created successfully!")

if __name__ == "__main__":
    main()
