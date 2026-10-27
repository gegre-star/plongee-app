"""Génère les icônes de l'application (à relancer si on change le dessin)."""
import math
from PIL import Image, ImageDraw

BG_TOP, BG_BOTTOM = (18, 74, 112), (7, 25, 42)
ACCENT, WHITE = (46, 196, 182), (242, 248, 252)


def gradient(size):
    img = Image.new("RGB", (size, size), BG_BOTTOM)
    px = img.load()
    for y in range(size):
        t = y / (size - 1)
        c = tuple(int(BG_TOP[i] * (1 - t) + BG_BOTTOM[i] * t) for i in range(3))
        for x in range(size):
            px[x, y] = c
    return img


def draw_logo(img, scale=1.0):
    """Bulles montantes et deux vagues, centrées, dans une zone sûre."""
    out_size = img.size[0]
    s = out_size * 4  # on dessine en 4x puis on réduit : traits lissés
    overlay = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay, "RGBA")
    cx = s / 2

    def circle(x, y, r, fill=None, outline=None, width=0):
        d.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=outline, width=width)

    big = s * 0.20 * scale
    circle(cx, s * 0.40, big, fill=(255, 255, 255, 30), outline=WHITE + (255,), width=int(s * 0.022 * scale))
    circle(cx - big * 0.45, s * 0.34, big * 0.28, fill=WHITE + (150,))  # reflet
    circle(cx + s * 0.20 * scale, s * 0.26, s * 0.065 * scale, outline=ACCENT + (255,), width=int(s * 0.016 * scale))
    circle(cx - s * 0.22 * scale, s * 0.24, s * 0.045 * scale, outline=ACCENT + (255,), width=int(s * 0.014 * scale))
    circle(cx + s * 0.12 * scale, s * 0.13, s * 0.03 * scale, outline=WHITE + (200,), width=int(s * 0.011 * scale))

    for k, (base, amp, alpha) in enumerate([(0.68, 0.035, 255), (0.78, 0.03, 170)]):
        pts = []
        for i in range(0, 101):
            x = s * (0.14 + 0.72 * i / 100)
            wave = math.sin(i / 100 * math.pi * 2 * 2 + k * 1.3)
            pts.append((x, s * base + s * amp * scale * wave))
        w = int(s * 0.04 * scale)
        d.line(pts, fill=ACCENT + (alpha,), width=w, joint="curve")
        for px_, py_ in (pts[0], pts[-1]):  # bouts arrondis
            d.ellipse((px_ - w / 2, py_ - w / 2, px_ + w / 2, py_ + w / 2), fill=ACCENT + (alpha,))
    small = overlay.resize((out_size, out_size), Image.LANCZOS)
    base_img = img.convert("RGBA")
    base_img.alpha_composite(small)
    return base_img if img.mode == "RGBA" else base_img.convert("RGB")


def save(img, name, size=None):
    if size and img.size != (size, size):
        img = img.resize((size, size), Image.LANCZOS)
    img.save(f"assets/{name}")
    print(name, img.size)


icon = draw_logo(gradient(1024))
save(icon, "icon.png")

# Android : le logo seul sur fond transparent, dans la zone centrale (66 %)
transparent = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
save(draw_logo(transparent, scale=0.8), "adaptive-icon.png")

# Écran de démarrage : logo seul sur fond transparent (la couleur est dans app.json)
save(draw_logo(Image.new("RGBA", (1024, 1024), (0, 0, 0, 0)), scale=0.9), "splash-icon.png")

save(icon, "favicon.png", 48)
save(icon, "apple-touch-icon.png", 180)
save(icon, "icon-192.png", 192)
save(icon, "icon-512.png", 512)
