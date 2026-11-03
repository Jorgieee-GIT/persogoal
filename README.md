# PersoGoal

An initial version of your **personal, local-first task and life dashboard**, drawn in soft blues, gray, navy, and white with visibly rough, grain-textured cartoon SVG artwork.

**No backend. No database. No React/npm/build step required.** The project is plain HTML, CSS, and JavaScript to make it as easy as possible to deploy directly to GitHub Pages. It is completely editable on the website itself, with no admin or client panel.

## What's working in this first version

- **First-time PIN setup**: choose a 4- or 6-digit PIN and confirm it. On subsequent visits, enter your PIN. The PIN is not hardcoded or saved as plain text.
- **Encrypted local data**: personal data is encrypted with AES-256-GCM using a key derived from the PIN via PBKDF2-SHA-256 (350,000 iterations). Only encrypted data is saved in LocalStorage.
- **Auto-lock**: the workspace locks on refresh, tab/browser close, switching tabs, switching apps, and when the page becomes hidden. There's also a manual lock button. No unlocked session is stored.
- **Dashboard**: greeting, quest counters, sticky notes, current month, savings summary, monthly income and spending.
- **Sticky notes**: create, edit, pin, change paper color, delete, and drag to rearrange on desktop.
- **Tasks and quests**: create, edit, complete, delete; dates/times, priorities, categories, and repeating quests. A repeating quest creates its next instance on completion.
- **Calendar**: browse months, see task counts on dates, tap a date to add a task.
- **Reminder notifications**: browser and in-app notifications for timed quests while the unlocked website is visible and running. Enable browser permission in Settings.
- **Savings jars**: multiple custom goals, animated-fill-style SVG jar illustrations, deposits, withdrawals, and progress tracking.
- **Wishlist**: create and edit products, price, notes, priority, product links, purchased state.
- **Finance**: set a monthly salary and allowance; log dated expenses by category and see monthly totals and the amount left after expenses.
- **Settings**: display name, workspace name, light/dark blue theme, change PIN, encrypted JSON backup export/import, erase local workspace.
- **Responsive design**: desktop sidebar and mobile navigation drawer.

## Start it locally

Unzip. From the folder containing `index.html`, run (requires Node.js):

```bash
npx serve . -l 8000
```

Open <http://localhost:8000> in your browser. You can also use VS Code Live Server (right-click `index.html` and choose **Open with Live Server**). There is no need to install Python or run a frontend build.

For the full cryptographic PIN system, use **localhost or HTTPS**, not a random insecure `http://` address. Avoid opening `index.html` directly from a `file://` URL: browser storage rules can vary.

## Publish on GitHub Pages

1. Create a GitHub repository, e.g. `persogoal`.
2. Upload the **contents** of this folder directly to the repository root (`index.html`, `app.js`, `styles.css`, `assets/`, etc.). Do not upload the parent folder as an extra directory level.
3. Open your repository's **Settings > Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
5. Open the Pages URL shown in the repository settings after deployment.
6. Set up your PIN on **the laptop/browser you intend to use**.

No `npm install`, `.env`, Firebase, Neon, Render, Vercel, or API keys are needed. `.nojekyll` is included.

## Important privacy and backup notes

- GitHub Pages serves the public frontend source. **Your tasks and PIN-derived encrypted data are not pushed to GitHub.** They remain in the LocalStorage of the browser profile used to open the website.
- Each browser profile/device starts with its own independent workspace, even when opening the same URL. To move your data, **Export backup** in Settings and import the encrypted JSON file in the other browser. Use the original PIN for the backup.
- A **4-digit or 6-digit PIN is a convenience-level lock**. Encryption prevents plain-text viewing of browser storage, but a determined attacker who copies the encrypted data may be able to guess a short numeric PIN offline. Do not treat this as a high-security vault for banking credentials or other highly sensitive records.
- Clearing site data, some browser cleanup tools, or using a different browser profile can remove local data. Export a backup regularly and store that backup in a safe location.
- The app locks when `visibilitychange` reports hidden, because phones do not always send reliable app-close signals. On some devices the operating-system recent-app preview may still display a previously captured frame.
- Reminder notifications are **not reliable if your tab is hidden, locked, or your browser/phone is closed**. This app has no background push server. Consider adding deadlines to a device calendar for closed-app reminders.
- Salary and allowance are **manual monthly estimates**, not a bank integration. Savings jar balances are tracked separately from expense totals.
- The new typography uses Google Fonts: Bricolage Grotesque for headings and Plus Jakarta Sans for UI/body text. Fonts load from Google Fonts when online and fall back to system fonts when offline. No personal workspace data is sent to Google Fonts.
- This project does not include device sync, online accounts, scheduled server notifications, or a traditional multi-user authentication backend.

## Project files

```
index.html
app.js
styles.css
assets/
    desk-scene.svg      # Cartoon SVG illustration with embedded grain filter
    grain.svg           # SVG noise texture overlay
    favicon.svg
.nojekyll
README.md
```

## Further enhancements you could add

A quest XP/achievement system, wishlist images, a jar-to-wishlist savings link, finance charts, multiple finance months, a focus timer, better mobile sticky-note sorting, PWA install support, and customizable dashboard widget positions.

## November 2026 visual update

- Rebranded the website title and default workspace name to **PersoGoal**.
- Existing workspaces using the original default name are upgraded after PIN unlock. Custom names remain unchanged.
- More visible printed/rough-grain textures on SVG illustrations, savings jars, illustrated wishlist cards, and textured panels.
- Removed decorative star/sparkle glyphs preceding copy and replaced the quest badge with a check icon.
- Updated footer to **© [current year] HORHE PERSONAL. All rights reserved.**
- Uses the Google Fonts **Bricolage Grotesque** (titles) and **Plus Jakarta Sans** (interface).
- **Data compatibility:** `little-blue-hq.v1.encrypted` remains the exact LocalStorage key to preserve existing saved progress, encrypted backups and PINs. Do not rename or delete it.

## QR backup transfer (v1.4)

You can manually move an encrypted backup between a desktop and a phone without a server.

1. Open PersoGoal on the **desktop**, unlock with your existing PIN, and click the **scan/QR icon** beside **Quick add**.
2. Keep the displayed QR code visible. Larger workspaces rotate through multiple QR frames automatically.
3. On your **phone**, open your deployed PersoGoal page. Use **Scan QR backup from another device** on the PIN screen, or the scan/QR icon beside Quick add if already unlocked.
4. Allow camera permission and aim the scanner at the code until all frames are collected.
5. Enter the **source workspace's original PIN** and confirm replacement. Unlock using that original PIN.

The backup is encrypted before QR generation and decoded on the receiving browser. Nothing is uploaded to a database. This action **replaces** the phone's existing local workspace and does **not** create live synchronization. Reverse the steps to transfer newer phone progress back to desktop, after backing up the desktop first.

For very large workspaces, QR codes are not practical; use the existing encrypted JSON file export/import instead. Scan with a modern browser via **HTTPS** (GitHub Pages). The camera uses native browser QR detection where supported; otherwise the free, open-source jsQR library is fetched from a CDN when scanning starts. Photos are decoded within the browser. QR data remains PIN-encrypted, but a 4- or 6-digit PIN should not be considered high-security encryption against a determined offline attacker.
