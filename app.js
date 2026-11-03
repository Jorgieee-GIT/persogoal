/* PersoGoal: no build step, no external database, no stored plaintext PIN. */
"use strict";

const STORAGE_KEY = "little-blue-hq.v1.encrypted";
const PBKDF2_ITERATIONS = 350000;
const NAV = [
    ["overview", "home", "Dashboard"],
    ["notes", "sticky", "Sticky notes"],
    ["quests", "check", "Tasks & quests"],
    ["calendar", "calendar", "Calendar"],
    ["savings", "jar", "Savings jars"],
    ["wishlist", "heart", "Wishlist"],
    ["finances", "wallet", "My finances"],
    ["settings", "settings", "Settings"]
];
const PATHS = {
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22v-8h6v8"/>',
    sticky: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8h10M7 12h7M7 16h5"/>',
    check: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m7 12 3 3 7-7"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
    jar: '<path d="M7 4h10M8 4v4c-3 2-4 5-4 8 0 4 3 6 8 6s8-2 8-6c0-3-1-6-4-8V4"/><path d="M5 14h14M9 18h6"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    wallet: '<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M3 10h18M6 6V4h12v2M16 15h2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="M5 5 19 19M19 5 5 19"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0"/>',
    bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.8 8.6c-1.5-1.5-5.8-1-5.8 1.6 0 3 6 1.4 6 4.4 0 2.6-4.4 3.1-6 1.5M12 5v14"/>',
    pencil: '<path d="M4 20l5-.8L20 8a2 2 0 0 0-4-4L5 15l-1 5zM14 6l4 4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    pin: '<path d="m16 3 5 5-3 1-3 6-3 1-3-3-6 8 8-8-3-3 1-3 6-3z"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 17v4h16v-4"/>',
    moon: '<path d="M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    repeat: '<path d="M4 7h12l-3-3m3 3-3 3M20 17H8l3 3m-3-3 3-3"/>',
    link: '<path d="M10 13a5 5 0 0 0 8 1l2-2a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-8-1l-2 2a5 5 0 0 0 7 7l2-2"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12M12 9c-9 0-8-6-4-6 3 0 4 6 4 6Zm0 0c9 0 8-6 4-6-3 0-4 6-4 6Z"/>',
    trending: '<path d="M3 17l7-7 4 4 7-7M15 7h6v6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    logout: '<path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 7l5 5-5 5M8 12h11"/>',
    edit: '<path d="M4 20l5-.8L20 8a2 2 0 0 0-4-4L5 15l-1 5z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    money: '<rect x="2" y="5" width="20" height="14" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M5 9h1m12 6h1"/>',
    search: '<circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 5 5"/>'
};

function icon(name, size = 19, cls = "") {
    return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || PATHS.info}</svg>`;
}
function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function id() {
    return crypto.randomUUID();
}
function localDate(date = new Date()) {
    const y = date.getFullYear();
    return `${y}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseLocalDate(value) {
    if (!/^\d{4}-\d\d-\d\d$/.test(value || "")) return null;
    const [y,m,d] = value.split("-").map(Number);
    return new Date(y,m - 1,d);
}
function readableDate(value) {
    const parsed = parseLocalDate(value);
    return parsed ? parsed.toLocaleDateString("en-PH", {month:"short", day:"numeric", year:"numeric"}) : "No deadline";
}
function pesos(value) {
    return new Intl.NumberFormat("en-PH", {style:"currency", currency:"PHP", maximumFractionDigits:2}).format(Number(value) || 0);
}
function number(value) {
    return Math.max(0, Math.round((Number(value) || 0) * 100) / 100);
}
function percent(part, whole) {
    return whole > 0 ? Math.max(0, Math.min(100, Math.round(part / whole * 100))) : 0;
}
function shortText(value, n = 92) {
    const t = String(value || "");
    return t.length > n ? `${t.slice(0,n)}...` : t;
}
function safeHref(href) {
    try {
        const u = new URL(href);
        return ["http:","https:"].includes(u.protocol) ? u.href : "";
    } catch { return ""; }
}
function bytesToB64(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
}
function b64ToBytes(base64) {
    const s = atob(base64);
    return Uint8Array.from(s, ch => ch.charCodeAt(0));
}
function randomB64(n) {
    return bytesToB64(crypto.getRandomValues(new Uint8Array(n)));
}
async function deriveKey(pin, salt) {
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(pin), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({name:"PBKDF2", salt:b64ToBytes(salt), iterations:PBKDF2_ITERATIONS, hash:"SHA-256"}, material, {name:"AES-GCM", length:256}, false, ["encrypt","decrypt"]);
}
async function encryptData(data, key) {
    const iv = randomB64(12);
    const encrypted = await crypto.subtle.encrypt({name:"AES-GCM", iv:b64ToBytes(iv)}, key, new TextEncoder().encode(JSON.stringify(data)));
    return {iv, payload:bytesToB64(new Uint8Array(encrypted))};
}
async function decryptData(record, key) {
    const decrypted = await crypto.subtle.decrypt({name:"AES-GCM", iv:b64ToBytes(record.iv)}, key, b64ToBytes(record.payload));
    return JSON.parse(new TextDecoder().decode(decrypted));
}
function validRecord(r) {
    return r && r.version === 1 && [4,6].includes(r.pinLength) && typeof r.salt === "string" && typeof r.iv === "string" && typeof r.payload === "string" && r.salt.length < 100 && r.iv.length < 100 && r.payload.length < 4000000;
}
function seedData() {
    return {
        version:1,
        profile:{name:"You", workspace:"PersoGoal", theme:"light"},
        notes:[],
        tasks:[],
        jars:[], wishlist:[],
        finance:{salary:0, allowance:0, expenses:[]}
    };
}
let vault = null;
let activeKey = null;
let data = null;
let page = "overview";
let menuOpen = false;
let pinLengthChoice = 6;
let monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let taskFilter = "all";
let saveChain = Promise.resolve();
let shownReminders = new Set();
let saveErrorShown = false;

function readVault() {
    try {
        const found = localStorage.getItem(STORAGE_KEY);
        return found ? JSON.parse(found) : null;
    } catch { return {invalid:true}; }
}
function writeVault(snapshot, key) {
    const salt = vault.salt;
    const pinLength = vault.pinLength;
    const captured = structuredClone(snapshot);
    saveChain = saveChain.catch(() => {}).then(async () => {
        const cipher = await encryptData(captured, key);
        const next = {version:1, pinLength, salt, ...cipher};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        if (vault && vault.salt === salt) vault = next;
    }).catch(() => {
        if (!saveErrorShown) {
            saveErrorShown = true;
            toast("Could not save. Export a backup and check browser storage settings.", "error");
        }
    });
    return saveChain;
}
function changeData(updater) {
    if (!data || !activeKey) return;
    updater(data);
    const snapshot = structuredClone(data);
    writeVault(snapshot, activeKey);
    render();
}
async function createWorkspace(pin) {
    const salt = randomB64(16);
    const key = await deriveKey(pin, salt);
    const freshData = seedData();
    const cipher = await encryptData(freshData, key);
    const record = {version:1, pinLength:pin.length, salt, ...cipher};
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    vault = record;
    activeKey = key;
    data = freshData;
    page = "overview";
    render();
    toast("Your private workspace is ready.");
}
async function unlockWorkspace(pin) {
    const key = await deriveKey(pin, vault.salt);
    const result = await decryptData(vault, key);
    if (!result || result.version !== 1 || !Array.isArray(result.tasks) || !Array.isArray(result.notes)) throw Error("Invalid workspace");
    activeKey = key;
    data = result;
    // Preserve existing encrypted data while upgrading the original default name.
    // Custom workspace names are left untouched.
    if (data.profile && (!data.profile.workspace || data.profile.workspace === "Little Blue HQ")) {
        data.profile.workspace = "PersoGoal";
        writeVault(structuredClone(data), activeKey);
    }
    page = "overview";
    shownReminders.clear();
    render();
    checkReminders();
}
function lockWorkspace() {
    if (!data) return;
    document.getElementById("toast-root").innerHTML = "";
    data = null;
    activeKey = null;
    page = "overview";
    shownReminders.clear();
    menuOpen = false;
    document.getElementById("modal-root").innerHTML = "";
    render();
}
function toast(message, kind="info") {
    const root = document.getElementById("toast-root");
    const el = document.createElement("div");
    el.className = `toast toast--${kind}`;
    el.innerHTML = `${icon(kind === "error" ? "info" : "check",17)}<span>${esc(message)}</span>`;
    root.appendChild(el);
    setTimeout(() => { el.classList.add("toast-leaving"); setTimeout(() => el.remove(),260); }, 3900);
}
function taskDue(t) {
    if (!t.dueDate) return "Anytime";
    if (t.dueDate === localDate()) return t.dueTime ? `Today, ${t.dueTime}` : "Today";
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if (t.dueDate === localDate(yesterday)) return "Yesterday";
    return readableDate(t.dueDate) + (t.dueTime ? ` at ${t.dueTime}` : "");
}
function sortedTasks(items) {
    return [...items].sort((a,b) => Number(a.done) - Number(b.done) || (a.dueDate || "9999").localeCompare(b.dueDate || "9999") || (b.createdAt || 0) - (a.createdAt || 0));
}
function monthExpenses() {
    const prefix = localDate().slice(0,7);
    return data.finance.expenses.filter(x => x.date.startsWith(prefix)).reduce((sum,x) => sum + number(x.amount), 0);
}
function totalSaved() { return data.jars.reduce((sum,j) => sum + number(j.balance), 0); }
function totalIncome() { return number(data.finance.salary) + number(data.finance.allowance); }
function labelPage() { return NAV.find(n => n[0] === page)?.[2] || "Dashboard"; }
function sectionTitle(title, action="") {
    return `<div class="section-heading"><h1>${esc(title)}</h1>${action}</div>`;
}
function buttonAction(label, action, iconName="plus", extra="") {
    return `<button class="btn btn-primary" type="button" data-action="${esc(action)}" ${extra}>${icon(iconName,18)}<span>${esc(label)}</span></button>`;
}
function navMarkup() {
    return `<aside class="sidebar ${menuOpen ? "sidebar--open" : ""}">
        <div class="brand"><div class="brand-mark">${icon("sticky",26)}</div><div><div class="brand-name">${esc(data.profile.workspace || "PersoGoal")}</div></div></div>
        
        <nav class="side-nav" aria-label="Main navigation">${NAV.map(([p,i,label],index) => `<button type="button" class="nav-link ${page===p?"active":""} ${index===7?"nav-link--settings":""}" data-page="${p}">${icon(i,19)}<span>${esc(label)}</span>${p==="quests" && data.tasks.filter(t=>!t.done).length ? `<span class="nav-counter">${data.tasks.filter(t=>!t.done).length}</span>`:""}</button>`).join("")}</nav>
        <div class="sidebar-bottom"><button class="sidebar-lock" type="button" data-action="lock">${icon("lock",17)} Lock workspace</button></div>
    </aside>`;
}
function render() {
    const root = document.getElementById("app");
    document.title = `PersoGoal | ${data ? labelPage() : "Private workspace"}`;
    if (!vault || vault.invalid || !validRecord(vault)) {
        root.innerHTML = vault && vault.invalid ? `<div class="fatal"><h1>Could not read saved workspace</h1><p>Browser storage may be damaged. Try restoring a backup rather than clearing your data.</p></div>` : renderGate("setup");
        document.body.dataset.theme = "light";
    } else if (!data) {
        root.innerHTML = renderGate("unlock");
        document.body.dataset.theme = "light";
    } else {
        document.body.dataset.theme = data.profile.theme === "dark" ? "dark" : "light";
        root.innerHTML = `<div class="app-shell">${navMarkup()}${menuOpen ? '<button class="sidebar-backdrop" data-action="close-menu" aria-label="Close navigation"></button>' : ""}<main class="main-area">
            <header class="topbar"><div class="topbar-left"><button class="icon-button menu-button" data-action="menu" aria-label="Open menu">${icon("menu",23)}</button><span class="breadcrumb">MY SPACE <span>/</span> <strong>${esc(labelPage())}</strong></span></div><div class="topbar-actions"><span class="today-chip">${icon("calendar",16)} ${new Date().toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric"})}</span><button class="icon-button" data-action="lock" title="Lock now" aria-label="Lock now">${icon("lock",19)}</button><button class="btn btn-primary btn-small" data-action="quick-add">${icon("plus",18)}<span>Quick add</span></button></div></header>
            <div class="main-content">${renderPage()}</div>
            <footer class="site-footer">© ${new Date().getFullYear()} HORHE PERSONAL. <span>All rights reserved.</span></footer>
        </main></div>`;
    }
}
function renderGate(mode) {
    const setup = mode === "setup";
    return `<div class="gate-shell"><div class="gate-left grain"><div class="gate-brand">${icon("sticky",25)} PersoGoal.</div><div class="gate-copy"><h1>Your plans deserve<br><em>a happy place.</em></h1><img class="gate-art" src="assets/desk-scene.svg" alt="Cartoon notebook, cloud, sticky note, and cup" /></div></div>
        <div class="gate-right"><div class="gate-card"><div class="gate-card-icon">${icon("lock",27)}</div><h2>${setup ? "Let's make it yours." : "Your desk is waiting."}</h2>
            <form id="gate-form" data-form="${setup?"setup":"unlock"}" autocomplete="off">
                ${setup ? `<label class="field-label">PIN length</label><div class="segmented"><button type="button" data-action="pin-choice" data-value="4" class="segment ${pinLengthChoice===4?"selected":""}">4 digits</button><button type="button" data-action="pin-choice" data-value="6" class="segment ${pinLengthChoice===6?"selected":""}">6 digits</button></div>`:""}
                <label class="field-label" for="pin-field">${setup ? "Create your PIN" : "Enter your PIN"}</label><input id="pin-field" class="input pin-input" type="password" name="pin" inputmode="numeric" pattern="[0-9]{${setup ? pinLengthChoice : vault.pinLength}}" maxlength="${setup ? pinLengthChoice : vault.pinLength}" minlength="${setup ? pinLengthChoice : vault.pinLength}" placeholder="${"●".repeat(setup ? pinLengthChoice : vault.pinLength)}" required autocomplete="off" />
                ${setup ? `<label class="field-label" for="pin-confirm">Confirm your PIN</label><input id="pin-confirm" class="input pin-input" type="password" name="confirm" inputmode="numeric" maxlength="${pinLengthChoice}" minlength="${pinLengthChoice}" pattern="[0-9]{${pinLengthChoice}}" placeholder="Enter the same PIN" required autocomplete="off" />`:""}
                <div id="gate-error" class="form-error" role="alert"></div><button class="btn btn-primary btn-full gate-submit" type="submit">${icon(setup ? "lock" : "unlock",19)}${setup ? "Create my workspace" : "Unlock workspace"}${icon("arrow",18)}</button>
            </form>
        </div></div></div>`;
}
function renderPage() {
    switch(page) {
        case "notes": return renderNotesPage();
        case "quests": return renderQuestsPage();
        case "calendar": return renderCalendarPage();
        case "savings": return renderSavingsPage();
        case "wishlist": return renderWishlistPage();
        case "finances": return renderFinancesPage();
        case "settings": return renderSettingsPage();
        default: return renderOverview();
    }
}
function renderOverview() {
    const open = data.tasks.filter(t => !t.done);
    const upcoming = open.filter(t => t.dueDate && t.dueDate >= localDate()).length;
    const displayName = data.profile.name.trim() || "friend";
    return `<section class="hero grain"><div class="hero-copy"><h1>Hello, ${esc(displayName)}<span class="wave-dot">.</span></h1><button type="button" class="btn btn-dark" data-action="new-task">${icon("plus",18)} Create a quest</button></div><img src="assets/desk-scene.svg" class="hero-art" alt="Textured cartoon desk with notebook and stationery" /></section>
    <div class="stat-grid">
        ${statCard("TO-DO QUESTS",open.length,"check","sky")}
        ${statCard("UPCOMING",upcoming,"calendar","ice")}
        ${statCard("SAVED SO FAR",pesos(totalSaved()),"jar","cloud")}
        ${statCard("WISHLIST",data.wishlist.filter(w=>!w.purchased).length,"heart","slate")}
    </div>
    <div class="overview-grid"><div class="overview-left">
        <section class="panel notes-panel"><div class="panel-heading"><div><h2>${icon("sticky",23)} Your sticky notes</h2></div><button class="text-action" data-page="notes">All notes ${icon("arrow",16)}</button></div><div class="notes-grid notes-grid--mini">${renderNotes(3)}<button class="add-note-tile" data-action="new-note">${icon("plus",23)}<span>New note</span></button></div></section>
        <section class="panel"><div class="panel-heading"><div><h2>${icon("check",23)} Quest board</h2></div><button class="text-action" data-page="quests">See all ${icon("arrow",16)}</button></div><div class="quest-list">${sortedTasks(data.tasks).slice(0,4).map(renderTask).join("") || emptyState("check","No quests yet")}</div><button class="subtle-button" data-action="new-task">${icon("plus",17)} Add a quest</button></section>
    </div><div class="overview-right">
        <section class="panel calendar-panel"><div class="panel-heading"><div><h2>${icon("calendar",23)} Calendar</h2></div><button class="text-action" data-page="calendar">Open ${icon("arrow",16)}</button></div>${renderCalendarGrid(true)}</section>
        <section class="panel jar-snapshot"><div class="panel-heading"><div><h2>${icon("jar",23)} Savings jar</h2></div><button class="text-action" data-page="savings">View ${icon("arrow",16)}</button></div><div class="jar-snapshot-body">${jarSvg(data.jars[0] || {id:"empty",balance:0,target:100},102)}<div><span class="muted-small">TOTAL SAVINGS</span><strong class="snapshot-money">${pesos(totalSaved())}</strong><button class="text-action" data-action="new-jar">${icon("plus",15)} New jar</button></div></div></section>
        <section class="panel mini-money"><div class="panel-heading"><div><h2>${icon("wallet",23)} Money snapshot</h2></div><button class="text-action" data-page="finances">Details ${icon("arrow",16)}</button></div><div class="money-lines"><div><span>Salary + allowance</span><strong>${pesos(totalIncome())}</strong></div><div><span>Expenses this month</span><strong>${pesos(monthExpenses())}</strong></div><div class="money-remaining"><span>After expenses</span><strong>${pesos(totalIncome()-monthExpenses())}</strong></div></div></section>
    </div></div>`;
}
function statCard(label, value, symbol, tone) {
    return `<div class="stat-card stat-card--${tone} grain"><div class="stat-top"><span>${label}</span><div class="stat-icon">${icon(symbol,24)}</div></div><strong title="${esc(value)}">${esc(value)}</strong></div>`;
}
function renderNotes(max) {
    const sorted = [...data.notes].sort((a,b) => Number(b.pinned)-Number(a.pinned) || (a.sortOrder ?? -(a.createdAt||0))-(b.sortOrder ?? -(b.createdAt||0)));
    return sorted.slice(0,max || Infinity).map(n => `<button type="button" class="sticky-note grain note--${["sky","paper","slate","night"].includes(n.color)?n.color:"sky"}" data-action="edit-note" data-id="${n.id}" draggable="true"><span class="note-pin">${n.pinned ? icon("pin",18) : icon("sticky",15)}</span><span class="note-text">${esc(shortText(n.text,max?135:550))}</span><span class="note-end">${new Date(n.createdAt || Date.now()).toLocaleDateString("en-PH",{month:"short",day:"numeric"})}${icon("edit",15)}</span></button>`).join("");
}
function renderNotesPage() {
    return `${sectionTitle("Sticky notes",buttonAction("New sticky note","new-note"))}
        
        <div class="notes-grid notes-grid--full">${renderNotes()}<button class="add-note-tile" data-action="new-note">${icon("plus",28)}<span>Write something new</span></button></div>`;
}
function renderTask(t) {
    const overdue = t.dueDate && t.dueDate < localDate() && !t.done;
    return `<div class="quest-row ${t.done?"quest-row--done":""}"><button type="button" class="quest-check ${t.done?"checked":""}" data-action="toggle-task" data-id="${t.id}" aria-label="${t.done ? "Mark incomplete" : "Complete quest"}">${t.done?icon("check",17):""}</button><button class="quest-details" data-action="edit-task" data-id="${t.id}"><strong>${esc(t.title)}</strong><span>${icon("calendar",14)} ${esc(taskDue(t))}${t.recurrence && t.recurrence!=="none"?` · ${icon("repeat",13)} ${esc(t.recurrence)}`:""}</span></button><span class="priority priority--${esc(t.priority||"low")}">${esc(t.priority||"low")}</span><button class="icon-button item-edit" data-action="edit-task" data-id="${t.id}" aria-label="Edit quest">${icon("edit",17)}</button>${overdue?'<span class="sr-only">Overdue</span>':""}</div>`;
}
function renderQuestsPage() {
    let tasks = sortedTasks(data.tasks);
    if (taskFilter === "today") tasks = tasks.filter(t=>t.dueDate===localDate());
    else if (taskFilter === "upcoming") tasks = tasks.filter(t=>!t.done && t.dueDate && t.dueDate>=localDate());
    else if (taskFilter === "done") tasks = tasks.filter(t=>t.done);
    const complete = data.tasks.filter(t=>t.done).length;
    return `${sectionTitle("Tasks & quests",buttonAction("Add quest","new-task"))}
    <div class="quest-intro grain"><div><h2>${complete} of ${data.tasks.length} quests finished</h2><div class="progress-track"><div class="progress-fill" style="width:${percent(complete,data.tasks.length)}%"></div></div></div><div class="quest-intro-badge">${icon("check",69)}</div></div>
    <section class="panel"><div class="filter-row">${[["all","All quests"],["today","Today"],["upcoming","Upcoming"],["done","Completed"]].map(([k,l])=>`<button data-action="filter-tasks" data-value="${k}" class="filter-pill ${taskFilter===k?"active":""}">${l}</button>`).join("")}</div><div class="quest-list quest-list--page">${tasks.length?tasks.map(renderTask).join(""):emptyState("check","No quests found")}</div></section>`;
}
function calendarCells(date) {
    const year = date.getFullYear(), month = date.getMonth();
    const offset = new Date(year,month,1).getDay();
    const count = new Date(year,month+1,0).getDate();
    return Array.from({length:Math.ceil((offset+count)/7)*7}, (_,i) => {
        const d=i-offset+1;
        return d>0 && d<=count ? localDate(new Date(year,month,d)) : "";
    });
}
function renderCalendarGrid(mini=false) {
    const monthText = monthCursor.toLocaleDateString("en-PH",{month:"long",year:"numeric"});
    const tasksByDate = new Map();
    for (const t of data.tasks) if (t.dueDate) tasksByDate.set(t.dueDate,(tasksByDate.get(t.dueDate)||0)+1);
    return `<div class="calendar-controls"><strong>${esc(monthText)}</strong><div><button class="icon-button" data-action="calendar-prev" aria-label="Previous month">${icon("left",17)}</button><button class="icon-button" data-action="calendar-next" aria-label="Next month">${icon("right",17)}</button></div></div>
        <div class="calendar-grid ${mini?"calendar-grid--mini":""}">${["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=>`<span class="calendar-weekday">${d}</span>`).join("")}${calendarCells(monthCursor).map(date=>date?`<button class="calendar-day ${date===localDate()?"is-today":""} ${tasksByDate.has(date)?"has-events":""}" data-action="calendar-date" data-date="${date}" title="${tasksByDate.get(date)||0} quest(s)"><span>${parseLocalDate(date).getDate()}</span>${tasksByDate.has(date)?`<i class="cal-dot"></i>${!mini?`<small>${tasksByDate.get(date)} quest${tasksByDate.get(date)===1?"":"s"}</small>`:""}`:""}</button>`:`<span class="calendar-day calendar-day--blank"></span>`).join("")}</div>`;
}
function renderCalendarPage() {
    const month = `${monthCursor.getFullYear()}-${String(monthCursor.getMonth()+1).padStart(2,"0")}`;
    const items=sortedTasks(data.tasks).filter(t=>t.dueDate?.startsWith(month));
    return `${sectionTitle("Calendar",buttonAction("New event / quest","new-task"))}
        <div class="calendar-page-grid"><section class="panel calendar-large">${renderCalendarGrid()}</section><section class="panel"><div class="panel-heading"><div><h2>Upcoming notes</h2></div></div><div class="quest-list">${items.length?items.map(renderTask).join(""):emptyState("calendar","No events this month")}</div></section></div>`;
}
function jarSvg(j, width=150) {
    const ratio = percent(j.balance,j.target);
    const safeId = String(j.id).replace(/[^a-z0-9-]/gi,"").slice(0,30);
    const y=126-(ratio/100)*84;
    return `<svg class="jar-drawing" width="${width}" height="${Math.round(width*1.2)}" viewBox="0 0 130 157" role="img" aria-label="Savings jar ${ratio}% filled"><defs>
        <clipPath id="clip-${safeId}"><path d="M33 30h64l8 92q0 18-40 18t-40-18z"/></clipPath>
        <pattern id="jar-print-${safeId}" patternUnits="userSpaceOnUse" width="58" height="58"><circle cx="32.2" cy="20.5" r="0.52" fill="#174968" opacity="0.40"/><circle cx="19.8" cy="14.6" r="1.10" fill="#174968" opacity="0.51"/><circle cx="51.2" cy="5.4" r="0.25" fill="#174968" opacity="0.74"/><circle cx="45.4" cy="34.8" r="1.10" fill="#174968" opacity="0.81"/><path d="M26.5 27.9l1.0 0.2" stroke="#174968" stroke-width="0.42" opacity="0.38" stroke-linecap="round"/><circle cx="56.6" cy="1.2" r="0.25" fill="#174968" opacity="0.49"/><circle cx="53.3" cy="8.9" r="0.25" fill="#174968" opacity="0.40"/><circle cx="35.9" cy="54.2" r="0.52" fill="#174968" opacity="0.78"/><path d="M34.0 34.8l2.5 0.4" stroke="#174968" stroke-width="0.42" opacity="0.39" stroke-linecap="round"/><circle cx="43.5" cy="55.1" r="0.80" fill="#174968" opacity="0.59"/><circle cx="4.9" cy="40.7" r="0.25" fill="#174968" opacity="0.71"/><circle cx="3.4" cy="4.6" r="0.52" fill="#174968" opacity="0.64"/><circle cx="15.5" cy="9.4" r="1.10" fill="#174968" opacity="0.45"/><circle cx="17.3" cy="25.8" r="0.42" fill="#174968" opacity="0.66"/><path d="M11.2 5.3l1.7 0.4" stroke="#174968" stroke-width="0.25" opacity="0.57" stroke-linecap="round"/><circle cx="32.4" cy="17.5" r="0.35" fill="#174968" opacity="0.66"/><path d="M40.6 27.6l2.2 -0.4" stroke="#174968" stroke-width="0.65" opacity="0.57" stroke-linecap="round"/><circle cx="11.6" cy="21.5" r="0.80" fill="#174968" opacity="0.74"/><circle cx="36.7" cy="3.7" r="0.25" fill="#174968" opacity="0.50"/><circle cx="34.7" cy="11.3" r="0.35" fill="#174968" opacity="0.75"/><circle cx="51.5" cy="43.0" r="0.35" fill="#174968" opacity="0.59"/><circle cx="26.0" cy="33.7" r="1.10" fill="#174968" opacity="0.71"/><circle cx="37.1" cy="8.0" r="0.65" fill="#174968" opacity="0.42"/><path d="M52.2 23.3l1.7 -0.2" stroke="#174968" stroke-width="1.10" opacity="0.72" stroke-linecap="round"/><path d="M33.8 18.9l1.6 -0.3" stroke="#174968" stroke-width="0.65" opacity="0.76" stroke-linecap="round"/><circle cx="49.7" cy="7.6" r="0.65" fill="#174968" opacity="0.54"/><circle cx="8.7" cy="34.4" r="0.25" fill="#174968" opacity="0.62"/><circle cx="25.3" cy="13.4" r="0.52" fill="#174968" opacity="0.62"/><path d="M1.9 35.3l1.9 0.6" stroke="#174968" stroke-width="0.25" opacity="0.50" stroke-linecap="round"/><circle cx="16.3" cy="23.6" r="0.65" fill="#174968" opacity="0.42"/><circle cx="12.2" cy="51.7" r="0.25" fill="#174968" opacity="0.55"/><path d="M44.9 34.5l2.2 -0.6" stroke="#174968" stroke-width="0.52" opacity="0.75" stroke-linecap="round"/><circle cx="13.6" cy="54.6" r="0.65" fill="#174968" opacity="0.48"/><circle cx="17.3" cy="44.0" r="0.52" fill="#174968" opacity="0.54"/><path d="M38.3 39.2l1.7 -0.6" stroke="#174968" stroke-width="0.25" opacity="0.70" stroke-linecap="round"/><circle cx="40.8" cy="12.8" r="0.65" fill="#174968" opacity="0.56"/><circle cx="8.4" cy="5.4" r="0.42" fill="#174968" opacity="0.75"/><circle cx="22.9" cy="35.0" r="0.25" fill="#174968" opacity="0.37"/><circle cx="29.4" cy="40.4" r="0.42" fill="#174968" opacity="0.62"/><path d="M45.5 31.3l1.8 -0.0" stroke="#174968" stroke-width="0.65" opacity="0.52" stroke-linecap="round"/><circle cx="21.2" cy="32.9" r="0.52" fill="#174968" opacity="0.58"/><circle cx="33.7" cy="28.3" r="1.10" fill="#174968" opacity="0.77"/><circle cx="34.7" cy="37.4" r="0.42" fill="#174968" opacity="0.40"/><circle cx="12.9" cy="6.2" r="0.35" fill="#174968" opacity="0.54"/><circle cx="5.6" cy="38.8" r="0.25" fill="#174968" opacity="0.59"/><circle cx="46.1" cy="55.8" r="0.42" fill="#174968" opacity="0.72"/><circle cx="32.6" cy="40.6" r="0.35" fill="#174968" opacity="0.68"/><circle cx="41.8" cy="2.5" r="0.25" fill="#174968" opacity="0.47"/><circle cx="9.6" cy="42.1" r="1.10" fill="#174968" opacity="0.46"/><path d="M37.6 30.2l1.0 -0.1" stroke="#174968" stroke-width="0.52" opacity="0.71" stroke-linecap="round"/><path d="M56.5 9.6l2.1 0.1" stroke="#174968" stroke-width="1.10" opacity="0.68" stroke-linecap="round"/><circle cx="22.8" cy="25.3" r="0.80" fill="#174968" opacity="0.76"/><circle cx="38.7" cy="11.1" r="0.52" fill="#174968" opacity="0.53"/><path d="M1.6 33.0l1.3 -0.3" stroke="#174968" stroke-width="0.52" opacity="0.49" stroke-linecap="round"/><circle cx="53.1" cy="24.5" r="0.25" fill="#174968" opacity="0.49"/><circle cx="4.7" cy="22.3" r="0.25" fill="#174968" opacity="0.49"/><path d="M52.3 34.9l1.0 -0.2" stroke="#174968" stroke-width="0.52" opacity="0.58" stroke-linecap="round"/><circle cx="35.3" cy="3.7" r="0.35" fill="#174968" opacity="0.75"/><circle cx="0.5" cy="33.5" r="0.65" fill="#174968" opacity="0.75"/><path d="M8.5 42.9l1.3 -0.5" stroke="#174968" stroke-width="0.80" opacity="0.80" stroke-linecap="round"/><circle cx="23.2" cy="15.7" r="0.42" fill="#174968" opacity="0.76"/><path d="M55.9 7.8l2.0 0.0" stroke="#174968" stroke-width="0.25" opacity="0.49" stroke-linecap="round"/><circle cx="55.5" cy="18.0" r="0.25" fill="#174968" opacity="0.76"/><circle cx="53.1" cy="52.8" r="0.25" fill="#174968" opacity="0.55"/><path d="M33.0 27.7l1.2 0.2" stroke="#174968" stroke-width="0.65" opacity="0.54" stroke-linecap="round"/><circle cx="48.9" cy="0.6" r="1.10" fill="#174968" opacity="0.73"/><circle cx="25.0" cy="14.9" r="0.35" fill="#174968" opacity="0.63"/><circle cx="8.2" cy="28.6" r="0.65" fill="#174968" opacity="0.52"/><circle cx="12.9" cy="17.2" r="0.80" fill="#174968" opacity="0.77"/><circle cx="4.6" cy="22.7" r="0.35" fill="#174968" opacity="0.68"/><circle cx="46.9" cy="50.0" r="1.10" fill="#174968" opacity="0.73"/><circle cx="47.5" cy="54.1" r="0.52" fill="#174968" opacity="0.67"/><path d="M34.5 57.8l2.0 -0.4" stroke="#174968" stroke-width="0.42" opacity="0.77" stroke-linecap="round"/><path d="M11.3 31.1l1.3 0.2" stroke="#174968" stroke-width="1.10" opacity="0.37" stroke-linecap="round"/><circle cx="45.7" cy="23.7" r="0.42" fill="#174968" opacity="0.44"/><path d="M11.3 52.3l1.7 -0.1" stroke="#174968" stroke-width="0.42" opacity="0.45" stroke-linecap="round"/><circle cx="30.7" cy="40.9" r="0.35" fill="#174968" opacity="0.47"/><circle cx="14.3" cy="41.5" r="0.42" fill="#174968" opacity="0.43"/><circle cx="43.2" cy="51.4" r="0.52" fill="#174968" opacity="0.38"/><circle cx="35.3" cy="8.7" r="0.42" fill="#174968" opacity="0.51"/><circle cx="43.4" cy="17.5" r="0.80" fill="#174968" opacity="0.74"/><circle cx="7.6" cy="1.6" r="1.10" fill="#174968" opacity="0.42"/><circle cx="13.1" cy="27.6" r="0.25" fill="#174968" opacity="0.56"/><circle cx="16.3" cy="20.4" r="0.80" fill="#174968" opacity="0.59"/><path d="M17.9 8.2l2.4 -0.1" stroke="#174968" stroke-width="0.42" opacity="0.80" stroke-linecap="round"/></pattern>
        <filter id="jar-rough-${safeId}" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".78" numOctaves="4" seed="12" stitchTiles="stitch" result="noise"/>
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 .15  0 0 0 0 .28  0 0 0 0 .43  1.45 0 0 0 -.55"/>
        </filter>
    </defs><ellipse cx="65" cy="143" rx="45" ry="7" fill="#355471" opacity=".1"/><path d="M33 30h64l8 92q0 18-40 18t-40-18z" fill="#EFF8FF" stroke="#3E6687" stroke-width="3.5"/><g clip-path="url(#clip-${safeId})"><rect x="16" y="${y}" width="100" height="124" fill="#95CEEF"/><path d="M18 ${y+4}q20-8 42 0t54 0" stroke="#E5F6FF" stroke-width="5" fill="none"/><g fill="#ECF7FF" stroke="#5E9BC6" stroke-width="2"><circle cx="46" cy="110" r="10"/><circle cx="68" cy="117" r="10"/><circle cx="84" cy="100" r="10"/><circle cx="58" cy="84" r="10"/><circle cx="80" cy="137" r="10"/></g></g><path d="M36 44q-7 27-5 50" stroke="white" stroke-width="6" opacity=".7" stroke-linecap="round"/><rect x="26" y="19" width="78" height="15" rx="6" fill="#719AB8" stroke="#315774" stroke-width="3"/><rect x="29" y="15" width="72" height="10" rx="5" fill="#D0E8F8" stroke="#315774" stroke-width="3"/><rect x="38" y="67" width="54" height="31" rx="7" fill="#FFFFFF" stroke="#608CAD" stroke-width="2.5"/><path d="M49 79h32M54 87h22" stroke="#8EB8D6" stroke-width="3.5" stroke-linecap="round"/>
    <g clip-path="url(#clip-${safeId})" opacity=".73"><rect x="23" y="31" width="84" height="110" filter="url(#jar-rough-${safeId})"/></g>
    <g clip-path="url(#clip-${safeId})" opacity=".8"><rect x="23" y="31" width="84" height="110" fill="url(#jar-print-${safeId})"/></g>
    </svg>`;
}
function renderSavingsPage() {
    return `${sectionTitle("Savings jars",buttonAction("Create savings jar","new-jar"))}
        <div class="savings-summary grain">${icon("jar",32)}<div><span>YOUR TOTAL SAVINGS</span><strong>${pesos(totalSaved())}</strong></div></div>
        <div class="jar-grid">${data.jars.map(j=>`<article class="jar-card grain"><div class="jar-card-top"><button class="icon-button" data-action="edit-jar" data-id="${j.id}" aria-label="Edit jar">${icon("edit",17)}</button></div>${jarSvg(j)}<h3>${esc(j.name)}</h3><strong class="jar-balance">${pesos(j.balance)}</strong><p>of ${pesos(j.target)}</p><div class="progress-track"><div class="progress-fill" style="width:${percent(j.balance,j.target)}%"></div></div><span class="progress-caption">${percent(j.balance,j.target)}% of goal</span><div class="jar-buttons"><button class="btn btn-primary" data-action="jar-deposit" data-id="${j.id}">${icon("plus",16)} Deposit</button><button class="btn btn-outline" data-action="jar-withdraw" data-id="${j.id}">Withdraw</button></div></article>`).join("")}
        <button type="button" class="empty-add-card" data-action="new-jar">${icon("plus",34)}<strong>Create a savings jar</strong></button></div>`;
}
function renderWishlistPage() {
    return `${sectionTitle("Wishlist",buttonAction("Add a wish","new-wish"))}
        <div class="wishlist-grid">${data.wishlist.map(w=>`<article class="wish-card grain ${w.purchased?"wish-card--bought":""}"><div class="wish-illustration">${icon("gift",70)}<span class="wish-tag">${esc(w.priority || "Someday")}</span></div><div class="wish-body"><div class="wish-title-row"><h3>${esc(w.name)}</h3><button class="icon-button" data-action="edit-wish" data-id="${w.id}" aria-label="Edit wish">${icon("edit",17)}</button></div><div class="wish-price">${pesos(w.price)}</div>${w.note ? `<p class="wish-user-note">${esc(shortText(w.note,130))}</p>` : ""}<div class="wish-actions"><button class="mini-outline" data-action="toggle-wish" data-id="${w.id}">${icon("check",15)} ${w.purchased?"Mark unbought":"Mark purchased"}</button>${safeHref(w.url)?`<a class="wish-link" target="_blank" rel="noopener noreferrer" href="${esc(safeHref(w.url))}" aria-label="Open product link">${icon("link",16)}</a>`:""}</div></div></article>`).join("")}
        <button type="button" class="empty-add-card" data-action="new-wish">${icon("heart",34)}<strong>Add a wishlist item</strong></button></div>`;
}
function renderFinancesPage() {
    const total = totalIncome(), spent = monthExpenses();
    const recent = [...data.finance.expenses].sort((a,b)=>b.date.localeCompare(a.date));
    const spentPercentage = percent(spent,total);
    return `${sectionTitle("My finances",buttonAction("Add expense","new-expense"))}
        <div class="finance-top"><div class="finance-hero grain"><div class="eyebrow">MONTHLY INCOME ESTIMATE</div><strong>${pesos(total)}</strong><p>Salary ${pesos(data.finance.salary)} <span class="finance-plus">+</span> Allowance ${pesos(data.finance.allowance)}</p><button class="btn btn-dark" data-action="edit-income">${icon("edit",16)} Edit salary & allowance</button><div class="finance-hero-decoration">${icon("wallet",130)}</div></div>
        <div class="finance-metrics"><div class="finance-metric"><span>Spent this month</span><strong>${pesos(spent)}</strong></div><div class="finance-metric"><span>After expenses</span><strong>${pesos(total-spent)}</strong></div></div></div>
        <div class="finance-lower"><section class="panel"><div class="panel-heading"><div><h2>${icon("wallet",22)} Expense history</h2></div><button class="text-action" data-action="new-expense">${icon("plus",16)} Add</button></div><div class="expense-list">${recent.length?recent.map(e=>`<div class="expense-row"><div class="expense-icon">${icon("money",19)}</div><div class="expense-detail"><strong>${esc(e.name)}</strong><span>${esc(e.category || "Other")} · ${readableDate(e.date)}</span></div><strong class="expense-amount">−${pesos(e.amount)}</strong><button class="icon-button" data-action="edit-expense" data-id="${e.id}" aria-label="Edit expense">${icon("edit",17)}</button></div>`).join(""):emptyState("wallet","No expenses yet")}</div></section>
        <section class="panel"><div class="panel-heading"><div><h2>Monthly overview</h2></div></div><div class="spending-illustration">${icon("coin",75)}<span>${spentPercentage}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${spentPercentage}%"></div></div></section></div>`;
}
function renderSettingsPage() {
    return `${sectionTitle("Settings")}
        <div class="settings-grid"><section class="panel settings-card"><div class="settings-icon">${icon("edit",24)}</div><h2>Personal details</h2><form data-form="profile"><label class="field-label">Your display name</label><input class="input" name="name" value="${esc(data.profile.name)}" maxlength="34" required/><label class="field-label">Workspace name</label><input class="input" name="workspace" value="${esc(data.profile.workspace)}" maxlength="38" required/><button class="btn btn-primary" type="submit">Save details</button></form></section>
        <section class="panel settings-card"><div class="settings-icon">${icon("sun",24)}</div><h2>Appearance</h2><div class="theme-options"><button type="button" class="theme-option ${data.profile.theme!=="dark"?"selected":""}" data-action="theme" data-value="light"><span class="theme-swatch theme-swatch--light"></span>Cloud blue</button><button type="button" class="theme-option ${data.profile.theme==="dark"?"selected":""}" data-action="theme" data-value="dark"><span class="theme-swatch theme-swatch--dark"></span>Midnight blue</button></div></section>
        <section class="panel settings-card"><div class="settings-icon">${icon("lock",24)}</div><h2>Privacy and PIN</h2><div class="settings-actions"><button class="btn btn-outline" data-action="change-pin">${icon("lock",17)} Change PIN</button><button class="btn btn-outline" data-action="lock">${icon("logout",17)} Lock right now</button></div></section>
        <section class="panel settings-card"><div class="settings-icon">${icon("bell",24)}</div><h2>Reminders</h2><button class="btn btn-outline" data-action="enable-alerts">${icon("bell",17)} ${typeof Notification !== "undefined" && Notification.permission === "granted" ? "Notifications allowed" : "Enable browser notifications"}</button></section>
        <section class="panel settings-card"><div class="settings-icon">${icon("download",24)}</div><h2>Encrypted backups</h2><div class="settings-actions"><button class="btn btn-primary" data-action="export">${icon("download",16)} Export backup</button><button class="btn btn-outline" data-action="import">${icon("upload",16)} Import backup</button></div></section>
        <section class="panel settings-card"><div class="settings-icon">${icon("info",24)}</div><h2>Storage information</h2><div class="storage-counts"><span>${data.notes.length} notes</span><span>${data.tasks.length} quests</span><span>${data.jars.length} jars</span><span>${data.wishlist.length} wishes</span></div><button class="text-danger" data-action="wipe">Erase this workspace</button></section></div>`;
}
function emptyState(symbol, title) {
    return `<div class="empty-state">${icon(symbol,34)}<strong>${esc(title)}</strong></div>`;
}
function field(label, name, value="", type="text", extra="") {
    return `<label class="field-label" for="f-${name}">${esc(label)}</label><input class="input" id="f-${name}" name="${name}" type="${type}" value="${esc(value)}" ${extra}/>`;
}
function selectField(label,name,selected,options) {
    return `<label class="field-label" for="f-${name}">${esc(label)}</label><select class="input" id="f-${name}" name="${name}">${options.map(([value,title])=>`<option value="${esc(value)}" ${selected===value?"selected":""}>${esc(title)}</option>`).join("")}</select>`;
}
function textArea(label,name,value,limit=1500) {
    return `<label class="field-label" for="f-${name}">${esc(label)}</label><textarea class="input textarea" id="f-${name}" name="${name}" maxlength="${limit}" rows="4">${esc(value||"")}</textarea>`;
}
function modalMarkup(title, description, inner, className="") {
    document.getElementById("modal-root").innerHTML = `<div class="modal-overlay" data-action="close-modal"><div class="modal ${className}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-top"><div><h2>${esc(title)}</h2>${description && (description.startsWith("This will") || description.startsWith("All notes") || description.startsWith("This action") || description.startsWith("Current balance:")) ? `<p class="modal-critical-note">${esc(description)}</p>` : ""}</div><button type="button" class="icon-button" data-action="close-modal" aria-label="Close">${icon("close",21)}</button></div>${inner}</div></div>`;
    document.querySelector(".modal input:not([type='hidden']),.modal textarea,.modal select,.modal button[data-autofocus]")?.focus({preventScroll:true});
}
function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
function modalFooter(type, identity, label="Save changes", danger=false) {
    return `<div class="modal-bottom">${danger && identity ? `<button type="button" class="text-danger" data-action="delete-${type}" data-id="${identity}">${icon("trash",16)} Delete</button>`:"<span></span>"}<div class="modal-bottom-right"><button type="button" class="btn btn-outline" data-action="close-modal">Cancel</button><button type="submit" class="btn btn-primary">${label}</button></div></div>`;
}
function openEditor(type, identity="", presetDate="") {
    if (!data) return;
    if (type === "note") {
        const n = data.notes.find(x=>x.id===identity);
        modalMarkup(n?"Edit sticky note":"A fresh sticky note", "", `<form data-form="note" data-id="${n?.id||""}">${textArea("Your note","text",n?.text||"",1500)}${selectField("Paper color","color",n?.color||"sky",[["sky","Sky blue"],["paper","Cloud white"],["slate","Blue gray"],["night","Midnight blue"]])}<label class="checkbox-line"><input type="checkbox" name="pinned" ${n?.pinned?"checked":""}/> Keep this note pinned</label>${modalFooter("note",n?.id,n?"Save note":"Add note",true)}</form>`);
    } else if (type === "task") {
        const t = data.tasks.find(x=>x.id===identity);
        modalMarkup(t?"Edit your quest":"Start a little quest", "", `<form data-form="task" data-id="${t?.id||""}">${field("Quest title","title",t?.title||"","text","maxlength='90' required")}${textArea("Extra details (optional)","description",t?.description||"",600)}<div class="form-two">${field("Due date","dueDate",t?.dueDate||presetDate,"date")}${field("Reminder time","dueTime",t?.dueTime||"","time")}</div><div class="form-two">${selectField("Priority","priority",t?.priority||"medium",[["low","Low"],["medium","Medium"],["high","High"]])}${selectField("Category","category",t?.category||"Personal",[["Personal","Personal"],["Work","Work"],["Study","Study"],["Errands","Errands"],["Other","Other"]])}</div>${selectField("Repeat","recurrence",t?.recurrence||"none",[["none","Does not repeat"],["daily","Every day"],["weekly","Every week"],["monthly","Every month"]])}${modalFooter("task",t?.id,t?"Save quest":"Add quest",true)}</form>`);
    } else if (type === "jar") {
        const j = data.jars.find(x=>x.id===identity);
        modalMarkup(j?"Edit savings jar":"Create a savings jar", "", `<form data-form="jar" data-id="${j?.id||""}">${field("What are you saving for?","name",j?.name||"","text","maxlength='70' required")}${field("Savings target (PHP)","target",j?.target||"","number","min='1' max='999999999' step='0.01' required")}${modalFooter("jar",j?.id,j?"Save goal":"Create jar",true)}</form>`);
    } else if (type === "movement") {
        const j = data.jars.find(x=>x.id===identity);
        if (!j) return;
        const mode = presetDate === "withdraw" ? "withdraw" : "deposit";
        modalMarkup(mode==="deposit"?"Add to your jar":"Take from your jar", `Current balance: ${pesos(j.balance)}`, `<form data-form="movement" data-id="${j.id}" data-mode="${mode}">${field("Amount (PHP)","amount","","number",`min='0.01' max='${mode==="withdraw"?j.balance:999999999}' step='0.01' required`)}${modalFooter("", "", mode==="deposit"?"Deposit savings":"Withdraw savings")}</form>`);
    } else if (type === "wish") {
        const w = data.wishlist.find(x=>x.id===identity);
        modalMarkup(w?"Edit wishlist item":"Add a little wish", "", `<form data-form="wish" data-id="${w?.id||""}">${field("What would you like?","name",w?.name||"","text","maxlength='90' required")}${field("Price (PHP)","price",w?.price||"","number","min='0' step='0.01' max='999999999'")}${field("Product URL (optional)","url",w?.url||"","url","maxlength='600' placeholder='https://...'")}${selectField("Priority","priority",w?.priority||"Someday",[["Someday","Someday"],["Soon","Soon"],["High priority","High priority"]])}${textArea("Notes (optional)","note",w?.note||"",300)}${modalFooter("wish",w?.id,w?"Save wish":"Add wish",true)}</form>`);
    } else if (type === "income") {
        modalMarkup("Salary & allowance", "", `<form data-form="income">${field("Monthly salary (PHP)","salary",data.finance.salary,"number","min='0' step='0.01' max='999999999' required")}${field("Monthly allowance (PHP)","allowance",data.finance.allowance,"number","min='0' step='0.01' max='999999999' required")}${modalFooter("", "", "Save income")}</form>`);
    } else if (type === "expense") {
        const e = data.finance.expenses.find(x=>x.id===identity);
        modalMarkup(e?"Edit expense":"Log an expense", "", `<form data-form="expense" data-id="${e?.id||""}">${field("What did you spend on?","name",e?.name||"","text","maxlength='90' required")}<div class="form-two">${field("Amount (PHP)","amount",e?.amount||"","number","min='0.01' max='999999999' step='0.01' required")}${field("Date","date",e?.date||localDate(),"date","required")}</div>${selectField("Category","category",e?.category||"Everyday",[["Everyday","Everyday"],["Food","Food"],["Transport","Transport"],["Bills","Bills"],["Shopping","Shopping"],["Other","Other"]])}${modalFooter("expense",e?.id,e?"Save expense":"Log expense",true)}</form>`);
    }
}
function quickAdd() {
    modalMarkup("Quick add", "", `<div class="quick-options"><button data-action="new-note">${icon("sticky",24)}<strong>Sticky note</strong></button><button data-action="new-task">${icon("check",24)}<strong>Quest</strong></button><button data-action="new-jar">${icon("jar",24)}<strong>Savings jar</strong></button><button data-action="new-wish">${icon("heart",24)}<strong>Wishlist item</strong></button></div>`);
}
function confirmRemove(type, identity) {
    const labels={note:"sticky note",task:"quest",jar:"savings jar",wish:"wishlist item",expense:"expense entry"};
    modalMarkup(`Delete this ${labels[type]||"item"}?`, "This action can't be undone unless you restore an earlier backup.", `<form data-form="confirm-delete" data-type="${type}" data-id="${esc(identity)}"><div class="modal-bottom"><button class="btn btn-outline" type="button" data-action="close-modal">Keep it</button><button class="btn btn-danger" type="submit">Delete permanently</button></div></form>`);
}
function shiftRecurringDate(value, repeat) {
    const d=parseLocalDate(value);
    if (!d) return "";
    if (repeat === "daily") d.setDate(d.getDate()+1);
    if (repeat === "weekly") d.setDate(d.getDate()+7);
    if (repeat === "monthly") {
        const day=d.getDate();
        d.setDate(1); d.setMonth(d.getMonth()+1);
        const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
        d.setDate(Math.min(day,last));
    }
    return localDate(d);
}
async function handleForm(event) {
    const form=event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    const kind=form.dataset.form;
    const values=new FormData(form);
    const get=name => String(values.get(name) || "").trim();
    const identity=form.dataset.id;
    const submit=form.querySelector("button[type=submit]");
    if (submit) submit.disabled=true;
    try {
        if (kind === "setup") {
            const pin=get("pin"), confirm=get("confirm");
            if (!/^\d+$/.test(pin) || pin.length!==pinLengthChoice) throw Error(`Enter a ${pinLengthChoice}-digit PIN.`);
            if (pin!==confirm) throw Error("Your PINs don't match.");
            await createWorkspace(pin);
            return;
        }
        if (kind === "unlock") {
            const pin=get("pin");
            if (!/^\d+$/.test(pin) || pin.length!==vault.pinLength) throw Error("Enter the correct number of digits.");
            try { await unlockWorkspace(pin); }
            catch { throw Error("That PIN didn't unlock the workspace. Please try again."); }
            return;
        }
        if (!data) return;
        if (kind === "note") {
            const text=get("text");
            if (!text) throw Error("Write something on your note.");
            changeData(db => {
                const existing=db.notes.find(x=>x.id===identity);
                if (existing) Object.assign(existing,{text,color:get("color"),pinned:values.has("pinned")});
                else db.notes.unshift({id:id(),text,color:get("color"),pinned:values.has("pinned"),sortOrder:Math.min(0,...db.notes.map(n=>n.sortOrder??0))-1,createdAt:Date.now()});
            });
        } else if (kind === "task") {
            const title=get("title");
            if (!title) throw Error("Add a title for your quest.");
            const content={title,description:get("description"),dueDate:get("dueDate"),dueTime:get("dueTime"),priority:get("priority"),category:get("category"),recurrence:get("recurrence")};
            changeData(db=>{ const existing=db.tasks.find(x=>x.id===identity); if (existing) Object.assign(existing,content); else db.tasks.unshift({id:id(),...content,done:false,createdAt:Date.now()}); });
        } else if (kind === "jar") {
            const target=number(get("target"));
            if (target<=0) throw Error("Your target must be above zero.");
            changeData(db=>{ const existing=db.jars.find(x=>x.id===identity); if (existing) Object.assign(existing,{name:get("name"),target}); else db.jars.push({id:id(),name:get("name"),target,balance:0}); });
        } else if (kind === "movement") {
            const amount=number(get("amount"));
            const mode=form.dataset.mode;
            const jar=data.jars.find(x=>x.id===identity);
            if (!jar || amount<=0) throw Error("Enter a valid amount.");
            if (mode==="withdraw" && amount>jar.balance) throw Error("That is more than the jar contains.");
            changeData(db=>{ const j=db.jars.find(x=>x.id===identity); j.balance=number(j.balance+(mode==="withdraw"?-amount:amount)); });
        } else if (kind === "wish") {
            const price=number(get("price"));
            const content={name:get("name"),price,url:safeHref(get("url")),priority:get("priority"),note:get("note")};
            if (get("url") && !content.url) throw Error("Enter a valid http or https link.");
            changeData(db=>{ const existing=db.wishlist.find(x=>x.id===identity); if (existing) Object.assign(existing,content); else db.wishlist.push({id:id(),...content,purchased:false}); });
        } else if (kind === "income") {
            changeData(db=>{db.finance.salary=number(get("salary")); db.finance.allowance=number(get("allowance"));});
        } else if (kind === "expense") {
            const amount=number(get("amount"));
            if (amount<=0) throw Error("Enter a positive expense amount.");
            const content={name:get("name"),amount,date:get("date"),category:get("category")};
            changeData(db=>{const existing=db.finance.expenses.find(x=>x.id===identity); if (existing) Object.assign(existing,content); else db.finance.expenses.unshift({id:id(),...content});});
        } else if (kind === "profile") {
            changeData(db=>{ db.profile.name=get("name"); db.profile.workspace=get("workspace"); });
            toast("Personal details updated.");
        } else if (kind === "confirm-delete") {
            const type=form.dataset.type;
            changeData(db=>{
                if (type==="note") db.notes=db.notes.filter(x=>x.id!==identity);
                else if (type==="task") db.tasks=db.tasks.filter(x=>x.id!==identity);
                else if (type==="jar") db.jars=db.jars.filter(x=>x.id!==identity);
                else if (type==="wish") db.wishlist=db.wishlist.filter(x=>x.id!==identity);
                else if (type==="expense") db.finance.expenses=db.finance.expenses.filter(x=>x.id!==identity);
            });
        } else if (kind === "pin-change") {
            const oldPin=get("oldPin"), newPin=get("newPin"), confirm=get("confirmPin");
            if (newPin!==confirm || !/^\d{4}$|^\d{6}$/.test(newPin)) throw Error("The new PIN must be 4 or 6 matching digits.");
            const oldKey=await deriveKey(oldPin,vault.salt);
            try { await decryptData(vault,oldKey); } catch { throw Error("Your current PIN is incorrect."); }
            const salt=randomB64(16), nextKey=await deriveKey(newPin,salt);
            await saveChain;
            const snapshot=structuredClone(data);
            const enc=await encryptData(snapshot,nextKey);
            const replacement={version:1,pinLength:newPin.length,salt,...enc};
            localStorage.setItem(STORAGE_KEY,JSON.stringify(replacement));
            vault=replacement;
            closeModal(); lockWorkspace(); toast("PIN changed. Unlock using your new PIN."); return;
        } else if (kind === "backup-import") {
            const file=values.get("file"), pin=get("backupPin");
            if (!file || !file.size || file.size>4000000) throw Error("Choose an encrypted JSON backup under 4 MB.");
            const record=JSON.parse(await file.text());
            if (!validRecord(record)) throw Error("This does not look like a compatible encrypted workspace backup.");
            const k=await deriveKey(pin,record.salt);
            const decoded=await decryptData(record,k);
            if (!decoded || decoded.version!==1 || !Array.isArray(decoded.notes)) throw Error("Could not read backup data.");
            await saveChain;
            localStorage.setItem(STORAGE_KEY,JSON.stringify(record));
            vault=record;
            closeModal(); lockWorkspace(); toast("Backup restored. Unlock using its original PIN."); return;
        } else if (kind === "wipe") {
            if (get("confirmation")!=="ERASE") throw Error('Type ERASE to confirm.');
            await saveChain;
            localStorage.removeItem(STORAGE_KEY);
            vault=null; data=null; activeKey=null; closeModal(); render();
            toast("This browser's workspace was erased."); return;
        }
        closeModal();
    } catch (err) {
        const place=form.querySelector(".form-error") || document.getElementById("gate-error");
        if (place) place.textContent=err.message || "Something went wrong. Please try again.";
        else toast(err.message || "Could not save changes.","error");
        if (submit) submit.disabled=false;
    }
}
function changePinDialog() {
    modalMarkup("Change your PIN", "", `<form data-form="pin-change">${field("Current PIN","oldPin","","password","inputmode='numeric' pattern='[0-9]*' required autocomplete='off'")}${field("New 4- or 6-digit PIN","newPin","","password","inputmode='numeric' pattern='([0-9]{4}|[0-9]{6})' maxlength='6' required autocomplete='off'")}${field("Confirm new PIN","confirmPin","","password","inputmode='numeric' pattern='([0-9]{4}|[0-9]{6})' maxlength='6' required autocomplete='off'")}<div class="form-error"></div>${modalFooter("","","Change PIN and lock")}</form>`);
}
function importDialog() {
    modalMarkup("Import encrypted backup", "This will replace everything currently stored in this browser.", `<form data-form="backup-import"><label class="field-label">Encrypted backup file</label><input class="input" type="file" name="file" accept=".json,application/json" required/>${field("PIN used for the backup","backupPin","","password","inputmode='numeric' required autocomplete='off'")}<div class="form-error"></div>${modalFooter("","","Replace with backup")}</form>`);
}
function wipeDialog() {
    modalMarkup("Erase your entire workspace?", "All notes, tasks, jars, wishes and finances saved in this browser will be deleted.", `<form data-form="wipe"><p class="warning-panel">This cannot be undone. Export a backup first if you want to keep anything.</p>${field("Type ERASE to confirm","confirmation","","text","required autocomplete='off'")}<div class="form-error"></div>${modalFooter("","","Erase everything")}</form>`);
}
async function exportBackup() {
    await saveChain;
    const current=localStorage.getItem(STORAGE_KEY);
    if (!current) {toast("No workspace was found to export.","error");return;}
    const file=new Blob([JSON.stringify(JSON.parse(current),null,2)],{type:"application/json"});
    const url=URL.createObjectURL(file);
    const a=document.createElement("a");
    a.href=url; a.download=`persogoal-backup-${localDate()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast("Encrypted backup exported. Keep your PIN safe.");
}
function checkReminders() {
    if (!data || document.hidden) return;
    const now=new Date();
    const nowStamp=`${localDate(now)}T${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    for (const t of data.tasks) {
        if (t.done || !t.dueDate || !t.dueTime) continue;
        const stamp=`${t.dueDate}T${t.dueTime}`;
        if (stamp>nowStamp || shownReminders.has(t.id)) continue;
        shownReminders.add(t.id);
        toast(`Reminder: ${t.title}`);
        if (typeof Notification!=="undefined" && Notification.permission==="granted") {
            try { new Notification("PersoGoal reminder",{body:t.title,icon:"assets/favicon.svg"}); } catch { /* In-app reminder still works. */ }
        }
    }
}
document.addEventListener("submit", handleForm);
document.addEventListener("click", async event => {
    const target=event.target.closest("[data-action],[data-page]");
    if (!target) return;
    if (target.classList.contains("modal-overlay") && event.target!==target) return;
    const nav=target.dataset.page;
    if (nav && data) {
        page=nav; menuOpen=false; closeModal(); render();
        window.scrollTo({top:0,behavior:"instant"});
        return;
    }
    const action=target.dataset.action;
    const identity=target.dataset.id || "";
    if (action==="pin-choice") {
        pinLengthChoice=Number(target.dataset.value); render();
        return;
    }
    if (action==="close-modal") {closeModal();return;}
    if (!data) return;
    if (action==="lock") {lockWorkspace();return;}
    if (action==="menu") {menuOpen=!menuOpen;render();return;}
    if (action==="close-menu") {menuOpen=false;render();return;}
    if (action==="quick-add") {quickAdd();return;}
    if (action==="new-note") {openEditor("note");return;}
    if (action==="edit-note") {openEditor("note",identity);return;}
    if (action==="new-task") {openEditor("task");return;}
    if (action==="edit-task") {openEditor("task",identity);return;}
    if (action==="new-jar") {openEditor("jar");return;}
    if (action==="edit-jar") {openEditor("jar",identity);return;}
    if (action==="jar-deposit" || action==="jar-withdraw") {openEditor("movement",identity,action==="jar-deposit"?"deposit":"withdraw");return;}
    if (action==="new-wish") {openEditor("wish");return;}
    if (action==="edit-wish") {openEditor("wish",identity);return;}
    if (action==="edit-income") {openEditor("income");return;}
    if (action==="new-expense") {openEditor("expense");return;}
    if (action==="edit-expense") {openEditor("expense",identity);return;}
    if (action.startsWith("delete-")) {confirmRemove(action.slice(7),identity);return;}
    if (action==="toggle-task") {
        changeData(db=>{
            const t=db.tasks.find(x=>x.id===identity);
            if (!t) return;
            if (!t.done && t.recurrence!=="none" && t.dueDate) {
                const nextDate=shiftRecurringDate(t.dueDate,t.recurrence);
                if (nextDate) db.tasks.push({...t,id:id(),dueDate:nextDate,done:false,createdAt:Date.now()});
            }
            t.done=!t.done;
        });
        return;
    }
    if (action==="toggle-wish") {changeData(db=>{const w=db.wishlist.find(x=>x.id===identity);if(w)w.purchased=!w.purchased;});return;}
    if (action==="calendar-prev") {monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()-1,1);render();return;}
    if (action==="calendar-next") {monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()+1,1);render();return;}
    if (action==="calendar-date") {openEditor("task","",target.dataset.date);return;}
    if (action==="filter-tasks") {taskFilter=target.dataset.value;render();return;}
    if (action==="theme") {changeData(db=>{db.profile.theme=target.dataset.value;});return;}
    if (action==="change-pin") {changePinDialog();return;}
    if (action==="export") {await exportBackup();return;}
    if (action==="import") {importDialog();return;}
    if (action==="wipe") {wipeDialog();return;}
    if (action==="enable-alerts") {
        if (typeof Notification==="undefined") toast("This browser does not support desktop notifications.","error");
        else {
            const permission=await Notification.requestPermission();
            toast(permission==="granted"?"Browser notifications enabled.":"Notification permission is not enabled.",permission==="granted"?"info":"error");
            render();
        }
    }
});
document.addEventListener("keydown", event => {
    if (event.key==="Escape") {
        if (document.querySelector(".modal-overlay")) closeModal();
        else if (menuOpen) {menuOpen=false;render();}
    }
});
// Lock as soon as a page goes to the background. Some mobile operating systems
// do not send reliable "closing" events when an app is swiped away.
document.addEventListener("visibilitychange", () => { if (document.hidden) lockWorkspace(); });
window.addEventListener("pagehide", () => lockWorkspace());
setInterval(checkReminders,30000);

vault=readVault();
if (!globalThis.crypto?.subtle) {
    document.getElementById("app").innerHTML="<div class='fatal'><h1>A secure browser is required</h1><p>Please open this site using HTTPS (GitHub Pages) or localhost in a modern browser.</p></div>";
} else render();

let draggedNoteId = null;
document.addEventListener("dragstart", event => {
    const target = event.target.closest(".sticky-note[data-id]");
    if (!target || !data) return;
    draggedNoteId = target.dataset.id;
    target.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedNoteId);
});
document.addEventListener("dragover", event => {
    const target = event.target.closest(".sticky-note[data-id]");
    if (!target || !draggedNoteId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    target.classList.add("note-drag-over");
});
document.addEventListener("dragleave", event => {
    event.target.closest(".sticky-note")?.classList.remove("note-drag-over");
});
document.addEventListener("drop", event => {
    const target = event.target.closest(".sticky-note[data-id]");
    if (!target || !draggedNoteId || !data) return;
    event.preventDefault();
    const targetId = target.dataset.id;
    if (draggedNoteId !== targetId) {
        changeData(db => {
            const sorted = [...db.notes].sort((a,b) => Number(b.pinned)-Number(a.pinned) || (a.sortOrder??0)-(b.sortOrder??0));
            const sourceIndex=sorted.findIndex(n=>n.id===draggedNoteId);
            const destinationIndex=sorted.findIndex(n=>n.id===targetId);
            if (sourceIndex<0 || destinationIndex<0) return;
            const [moving]=sorted.splice(sourceIndex,1);
            moving.pinned=sorted.find(n=>n.id===targetId).pinned;
            sorted.splice(destinationIndex,0,moving);
            sorted.forEach((n,i)=>n.sortOrder=i);
        });
    }
    draggedNoteId=null;
    document.querySelectorAll(".note-drag-over,.dragging").forEach(el=>el.classList.remove("note-drag-over","dragging"));
});
document.addEventListener("dragend", () => {
    draggedNoteId=null;
    document.querySelectorAll(".note-drag-over,.dragging").forEach(el=>el.classList.remove("note-drag-over","dragging"));
});
