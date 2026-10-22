# Neon Portfolio Starter

A beginner-friendly personal portfolio made with plain HTML, CSS, and JavaScript. It includes a dark futuristic layout, cyan neon cursor glow, smooth cursor lag, responsive navigation, animated project cards, scroll reveals, and reduced-motion/touch-device fallbacks.

## 1. Run it locally

1. Extract the ZIP.
2. Open the `neon-portfolio-starter` folder.
3. Open `index.html` in your browser.

For a more realistic local development setup, open the folder in VS Code and use the **Live Server** extension, then choose **Open with Live Server** on `index.html`.

No build step or package installation is required.

## 2. Personalize it first

Open `index.html` and search for these placeholders:

- `YOURNAME` — update the logo in the header and footer.
- `Your Name` — replace with your name.
- `your.email@example.com` — use the email address you want people to contact.
- `https://github.com/` — replace with your actual profile and project repository URLs.
- `https://www.linkedin.com/` — replace with your actual LinkedIn profile.
- Project titles, summaries, and technologies — keep only projects you can honestly explain.

Update the page title and description in the `<head>` section too.

## 3. Change the neon cursor

In `style.css`, search for `.cursor-glow` and `.cursor-core`.

- Increase the glow width/height for a broader aura.
- Change the cyan RGB values in `rgba(0, 229, 255, ...)` for another hue.
- In `script.js`, change `0.105` to a smaller number for more lag, or a larger number for a faster follow.
- Change `0.28` to tune the small bright core's follow speed.

The cursor is hidden on touch-first devices and when reduced motion is requested. Do not remove these fallbacks without a good reason.

## 4. Publish it free

### Netlify
1. Create a GitHub repository and upload the three site files (`index.html`, `style.css`, `script.js`) plus this README.
2. Sign in to Netlify and choose **Add new site / Import an existing project**.
3. Connect the repository.
4. Because this is a static HTML site, leave the build command blank and set the publish directory to the repository root (`.`).
5. Deploy. Netlify will give you a public URL.

### GitHub Pages
1. Push the files to a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Choose deployment from the `main` branch and `/ (root)`.
4. Save and wait for the published URL.

## 5. Suggested next improvements

1. Replace all placeholder copy and links.
2. Add real screenshots for each project.
3. Add a résumé PDF if useful.
4. Test on a phone and a narrow browser window.
5. Check keyboard navigation and contrast.
6. Only add a contact form once you connect it to a real form/email service; a visual form alone cannot send messages.

## File map

- `index.html` — page content and section structure.
- `style.css` — layout, colors, responsive styles, glow and animations.
- `script.js` — cursor animation, scroll reveals, and mobile navigation.
