# PersoGoal

An initial version of your **personal, local-first task and life dashboard**, drawn in soft blues, gray, navy, and white with visibly rough, grain-textured cartoon SVG artwork.

**No backend. No database. No React/npm/build step required.** The project is plain HTML, CSS, and JavaScript to make it as easy as possible to deploy directly to GitHub Pages. It is completely editable on the website itself, with no admin or client panel.

## What's working in this first version

- **First-time PIN setup**: choose a 4- or 6-digit PIN and confirm it. On subsequent visits, enter your PIN. The PIN is not hardcoded or saved as plain text.
- **Encrypted local data**: personal data is encrypted with AES-256-GCM using a key derived from the PIN via PBKDF2-SHA-256 (350,000 iterations). Only encrypted data is saved in LocalStorage.
- **Auto-lock**: the workspace locks on refresh, tab/browser close, switching tabs, switching apps, and when the page becomes hidden. There's also a manual lock button. No unlocked session is stored.
- **Dashboard**: greeting, quest counters, sticky notes, current month, savings summary, monthly income and spending.
- **Sticky notes**: create, edit, pin, change paper color, delete, and drag to rearrange on desktop.
- **Tasks and quests**: create, edit, complete, delete; optional start/due dates, multi-day date ranges, nested feature checklists, priorities, categories, and repeating quests. A repeating quest creates its next instance on completion.
- **Calendar**: browse months, see dated tasks and highlighted multi-day ranges, tap a date to add a task. Quests without dates do not appear on the calendar.
- **Reminder notifications**: browser and in-app notifications for timed quests while the unlocked website is visible and running. Enable browser permission in Settings.
- **Savings jars**: multiple custom goals, animated-fill-style SVG jar illustrations, deposits, withdrawals, and progress tracking.
- **Wishlist**: create and edit products, price, notes, priority, product links, purchased state, and image thumbnails from a direct image link or a small uploaded JPG/PNG/WebP image.
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

A quest XP/achievement system, a jar-to-wishlist savings link, finance charts, multiple finance months, a focus timer, better mobile sticky-note sorting, PWA install support, and customizable dashboard widget positions.

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

## Quests, calendar ranges and wishlist thumbnails (v1.5)

- **Optional dates:** New quests begin with blank dates. Leave both blank for project work or other ongoing checklists with no deadline. You can optionally select a start date only, a due date only, or both. A quest with both dates is shown across that inclusive range on the calendar.
- **Project feature checklists:** Create a quest, click **Add item** under Checklist, and add steps/features. Each step can be marked complete independently on the Tasks & quests page. A "No deadline" filter makes undated projects easy to find. Existing quests do not need to be recreated.
- **Reminders:** A time reminder requires a due date. Repeating quests also require a due date; when completed they spawn the next instance and reset the checklist statuses. As before, notifications only work while the site is active/unlocked.
- **Wishlist images:** A product URL pointing directly to a JPG/PNG/WebP/GIF/AVIF image can be used as the thumbnail automatically. Regular shopping-product pages (such as a merchant product detail page) cannot generally have their Open Graph product thumbnail fetched by a static browser app because of cross-origin restrictions. For those, add a separate **Thumbnail image URL** or **Upload thumbnail** from your device. Uploaded images are downscaled and stored inside the encrypted local data.
- **Image limitations:** Merchants may block third-party image loading; if so, the gift illustration is shown. Embedded image uploads consume local browser storage and can make QR transfers too large. Continue to use encrypted JSON backup/import if the QR backup says it exceeds the QR limit. An external image URL may make a request to that image host when the wishlist is opened.
- **Data compatibility:** No schema version or LocalStorage key migration is required. Old data is read with missing start dates, checklists and image fields treated as empty. Preserve your PIN and make a JSON backup before significant updates.

## Quest layout, connected calendar ranges and subscriptions (v1.6)

- **Quest modal:** The Add/Edit Quest editor is wider and grouped into clearly spaced fields, date controls and a separate feature checklist. It scrolls within the viewport on small devices.
- **Checklist layout:** A quest's heading and its feature checklist now share one connected, rounded border. Checklist rows have roomier click targets and centered checkboxes.
- **Calendar spans:** Multi-day quests draw connected bars between adjacent dates within a calendar week. The bar ends cleanly at the week boundary and continues on the next calendar row. Undated quests remain off the calendar.
- **Subscriptions:** A new **Subscriptions** tab and **Quick add → Subscription** let you save the subscription name, price (PHP), monthly/yearly billing cycle, next billing date, days of cancellation notice, reminder lead time, status, and optional notes. Edit, pause, cancel, or delete entries directly. Next billing dates advance automatically for monthly/yearly cycles. The panel shows each next renewal date and a calculated cancellation date, plus estimated monthly and yearly commitments. A year-billed plan contributes one twelfth of its cost to the monthly estimate.
- **Subscriptions are projections, not transactions:** A billing date does not automatically deduct money, mark an expense as paid, cancel a service, or contact a merchant. Enter actual expenses separately in **My finances** if you want to account for a charge; this avoids accidental double-counting. Subscription reminders only fire while the site is open, visible and unlocked. The browser's notification permission is also needed for system notifications.
- **Progress preserved:** Existing encrypted LocalStorage key (`little-blue-hq.v1.encrypted`), vault version, PIN, saved quests, wishlist images, and QR/JSON backup format remain intact. Older workspaces gain an empty `subscriptions` array automatically on PIN unlock. Subscription entries are included in subsequent encrypted QR and JSON backups; the QR frame limit still applies.

### Updating from v1.5

Extract the changed-files ZIP into your existing PersoGoal project root and overwrite **`app.js`**, **`styles.css`**, **`README.md`**, and **`CHANGELOG.md`**. Make a JSON backup before deploying significant changes, then push to GitHub Pages and hard-refresh the site. No external packages or backend are needed.
