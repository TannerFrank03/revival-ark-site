# Revival Ark - Static Website (HTML/CSS/JS)

This is a lightweight static build based on your design screenshot.
You said you'll add the images yourself — everything is already wired with placeholders.

## Run locally
Option 1 (simple):
- Open `index.html` in your browser.

Option 2 (recommended):
- Use VS Code Live Server extension, then right-click `index.html` → **Open with Live Server**.

## Add your images
Replace the placeholder blocks in `index.html`:
- `.hero-image`
- `.media-image`
- `.gallery-img` (3 featured)
- `.support-img` (3 cards)

If you prefer real `<img>` tags instead of placeholders:
1. Replace a placeholder `<div class="hero-image">` with `<img class="hero-image-img" src="assets/images/your-file.jpg" alt="...">`
2. Add CSS if needed.

## Customize
- Colors and layout tokens are in `css/styles.css` under `:root`.
- Buttons and text can be edited directly in `index.html`.
