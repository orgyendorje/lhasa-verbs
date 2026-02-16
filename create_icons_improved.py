#!/usr/bin/env python3
"""
Create beautiful, modern minimal app icons for Lhasa Verbs.
Tibetan language learning app with premium design.
Uses stylized geometric patterns inspired by Tibetan design.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
import os
import math

# Color palette - modern and eye-catching
DEEP_INDIGO = (30, 27, 75)      # #1e1b4b
VIBRANT_PURPLE = (67, 56, 202)   # #4338ca
GOLD_ACCENT = (212, 175, 55)     # #d4af37
WHITE = (255, 255, 255)
LIGHT_GRAY = (240, 240, 245)

def create_gradient_background(size):
    """Create a smooth radial gradient background from indigo to vibrant purple."""
    img = Image.new('RGBA', (size, size), DEEP_INDIGO)
    pixels = img.load()
    
    center_x = size / 2
    center_y = size / 2
    max_dist = math.sqrt(center_x ** 2 + center_y ** 2)
    
    for y in range(size):
        for x in range(size):
            # Calculate distance from center
            dx = x - center_x
            dy = y - center_y
            dist = math.sqrt(dx ** 2 + dy ** 2)
            
            # Normalize distance (0.0 to 1.0)
            ratio = min(1.0, dist / max_dist)
            
            # Interpolate between colors for smoother gradient
            r = int(DEEP_INDIGO[0] + (VIBRANT_PURPLE[0] - DEEP_INDIGO[0]) * ratio)
            g = int(DEEP_INDIGO[1] + (VIBRANT_PURPLE[1] - DEEP_INDIGO[1]) * ratio)
            b = int(DEEP_INDIGO[2] + (VIBRANT_PURPLE[2] - DEEP_INDIGO[2]) * ratio)
            
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

def draw_tibetan_inspired_symbol(draw, size):
    """
    Draw a stylized Tibetan-inspired symbol.
    Combines geometric elements for a modern, minimal look.
    """
    center_x = size // 2
    center_y = int(size * 0.40)
    
    # Main element: Large stylized circle/dot (represents unity/wholeness)
    main_radius = int(size * 0.12)
    draw.ellipse(
        [(center_x - main_radius, center_y - main_radius),
         (center_x + main_radius, center_y + main_radius)],
        fill=WHITE,
        outline=None
    )
    
    # Upper decorative curved lines (inspired by Tibetan script flourishes)
    line_thickness = max(2, int(size * 0.018))
    curve_radius = int(size * 0.18)
    
    # Left curve
    left_x = center_x - int(size * 0.15)
    for i in range(0, int(size * 0.12), max(1, int(size * 0.015))):
        angle = i / (size * 0.12)
        curve_y = center_y - int(curve_radius * math.sin(angle * math.pi / 2))
        draw.ellipse(
            [(left_x - 3, curve_y - 3), (left_x + 3, curve_y + 3)],
            fill=WHITE
        )
    
    # Right curve (mirror)
    right_x = center_x + int(size * 0.15)
    for i in range(0, int(size * 0.12), max(1, int(size * 0.015))):
        angle = i / (size * 0.12)
        curve_y = center_y - int(curve_radius * math.sin(angle * math.pi / 2))
        draw.ellipse(
            [(right_x - 3, curve_y - 3), (right_x + 3, curve_y + 3)],
            fill=WHITE
        )
    
    # Lower decorative elements: vertical lines suggesting columns/structure
    column_x_left = int(center_x * 0.7)
    column_x_right = int(center_x * 1.3)
    column_top = center_y + int(size * 0.08)
    column_bottom = column_top + int(size * 0.15)
    
    draw.rectangle(
        [(column_x_left, column_top), (column_x_left + max(1, int(size * 0.015)), column_bottom)],
        fill=WHITE
    )
    draw.rectangle(
        [(column_x_right, column_top), (column_x_right + max(1, int(size * 0.015)), column_bottom)],
        fill=WHITE
    )

def add_gold_accent(icon, size):
    """Add a subtle gold accent line and decorative dots."""
    draw = ImageDraw.Draw(icon)
    
    # Thin gold horizontal line below the symbol
    line_y = int(size * 0.62)
    line_width = int(size * 0.3)
    line_x_start = (size - line_width) // 2
    line_x_end = line_x_start + line_width
    line_thickness = max(2, int(size * 0.012))
    
    draw.rectangle(
        [(line_x_start, line_y - line_thickness // 2),
         (line_x_end, line_y + line_thickness // 2)],
        fill=GOLD_ACCENT
    )
    
    # Decorative gold dots (lotus-inspired pattern)
    dot_radius = max(2, int(size * 0.018))
    dot_y = int(size * 0.72)
    
    # Left dot
    left_x = int(size * 0.25)
    draw.ellipse(
        [(left_x - dot_radius, dot_y - dot_radius),
         (left_x + dot_radius, dot_y + dot_radius)],
        fill=GOLD_ACCENT
    )
    
    # Center dot (slightly larger)
    center_x = size // 2
    draw.ellipse(
        [(center_x - int(dot_radius * 1.2), dot_y - int(dot_radius * 1.2)),
         (center_x + int(dot_radius * 1.2), dot_y + int(dot_radius * 1.2))],
        fill=GOLD_ACCENT
    )
    
    # Right dot
    right_x = int(size * 0.75)
    draw.ellipse(
        [(right_x - dot_radius, dot_y - dot_radius),
         (right_x + dot_radius, dot_y + dot_radius)],
        fill=GOLD_ACCENT
    )

def add_subtle_glow(icon, size):
    """Add a very subtle glow/shadow for depth."""
    # Create a subtle blur for glow effect
    glow = icon.filter(ImageFilter.GaussianBlur(radius=1))
    
    # Blend slightly
    icon = Image.blend(icon, glow, 0.15)
    return icon

def create_icon(size, output_path):
    """Create a complete icon of the given size."""
    print(f"Creating {size}x{size} icon...")
    
    # Create rounded icon with gradient
    icon = create_rounded_icon(size)
    
    # Add main Tibetan-inspired symbol
    draw = ImageDraw.Draw(icon)
    draw_tibetan_inspired_symbol(draw, size)
    
    # Add gold accent
    add_gold_accent(icon, size)
    
    # Add subtle glow
    icon = add_subtle_glow(icon, size)
    
    # Convert to RGB for PNG export
    icon_rgb = Image.new('RGB', icon.size, WHITE)
    icon_rgb.paste(icon, mask=icon.split()[3])
    
    # Save
    icon_rgb.save(output_path, quality=95)
    print(f"Saved: {output_path}")

def main():
    base_dir = "/sessions/compassionate-funny-mccarthy/mnt/Tibetan Word App/icons"
    
    # Create icons
    create_icon(192, os.path.join(base_dir, "icon-192.png"))
    create_icon(512, os.path.join(base_dir, "icon-512.png"))
    create_icon(180, os.path.join(base_dir, "apple-touch-icon.png"))
    
    print("\nAll icons created successfully!")
    print(f"\nIcons created at: {base_dir}")

if __name__ == "__main__":
    main()
