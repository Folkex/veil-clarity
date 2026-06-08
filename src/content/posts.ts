export type Category =
  | "Privacy Guides"
  | "Feature Deep-Dives"
  | "Privacy News"
  | "Product Updates";

export const CATEGORIES: Category[] = [
  "Privacy Guides",
  "Feature Deep-Dives",
  "Privacy News",
  "Product Updates",
];

export function categorySlug(category: Category): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  category: Category;
  author: string;
  authorRole: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  tags: string[];
  featured?: boolean;
  /** Markdown body */
  content: string;
}

export const SITE = {
  name: "Veilo Blog",
  brand: "Veilo",
  mainSite: "https://veilo.link",
  url: "https://blog.veilo.link",
  tagline: "Privacy, encryption & digital safety — from the team behind Veilo.",
  description:
    "Guides, feature deep-dives and privacy news from Veilo — the privacy-first app to hide and protect your photos, videos and files with end-to-end encryption.",
};

export const POSTS: Post[] = [
  {
    slug: "how-to-hide-photos-on-iphone",
    title: "How to Hide Photos on iPhone (The Truly Private Way)",
    description:
      "Apple's built-in Hidden album isn't really private. Here's how hiding photos actually works on iOS — and how to lock them behind real end-to-end encryption.",
    category: "Privacy Guides",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-05-28",
    readingMinutes: 7,
    tags: ["iOS", "Photos", "How-To", "Encryption"],
    featured: true,
    content: `Most people think the Photos app's **Hidden album** keeps sensitive pictures safe. It doesn't. It simply moves them to a folder that anyone holding your unlocked phone can open in seconds.

If you actually care about privacy, you need more than "out of sight." You need photos that are **encrypted**, **locked**, and **invisible** even to someone scrolling through your device.

## Why the Hidden album falls short

The Hidden album was designed for convenience, not security:

- It's listed right inside the Photos app under "Utilities."
- Hidden photos still live in your normal photo library and iCloud backup.
- Face ID on the album is optional and easy to disable.

In other words, it hides photos from a casual glance — not from a determined snoop, a jealous partner, or a thief.

## The truly private way

To genuinely protect photos, look for three things:

1. **End-to-end encryption** — your media is scrambled on-device so no one (not even the app maker) can read it.
2. **A separate, locked vault** — protected by a PIN, Face ID, or Touch ID.
3. **No visible trace** — ideally the vault can disguise itself so it doesn't advertise that you're hiding anything.

This is exactly what [Veilo](https://veilo.link) was built for.

### Step by step with Veilo

1. Download Veilo from the App Store and set a strong PIN.
2. Enable Face ID or Touch ID for one-tap unlocking.
3. Tap **Import**, select the photos you want to protect, and confirm.
4. Delete the originals from your camera roll.

That's it. Your photos are now encrypted with a key derived from *your* passcode — meaning they're unreadable without it.

> Privacy isn't about having something to hide. It's about choosing who gets to see what.

## Bonus: hide the fact you're hiding

Veilo's **decoy vault** lets you set a second PIN that opens a harmless-looking collection. If you're ever forced to unlock the app, you can reveal the decoy instead of your real vault.

## The bottom line

The Hidden album is a curtain. Real privacy is a locked door. If your photos matter, encrypt them.`,
  },
  {
    slug: "what-is-end-to-end-encryption",
    title: "What Is End-to-End Encryption? A Plain-English Guide",
    description:
      "End-to-end encryption is the gold standard for digital privacy — but what does it actually mean? A jargon-free explanation of how it keeps your data yours.",
    category: "Privacy Guides",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-05-20",
    readingMinutes: 6,
    tags: ["Encryption", "Fundamentals", "Security"],
    featured: true,
    content: `You've seen the phrase on messaging apps and privacy tools: *"protected with end-to-end encryption."* It sounds reassuring. But what does it really mean — and why does it matter?

## The simplest definition

End-to-end encryption (E2EE) means your data is scrambled on **your** device and can only be unscrambled on the device of the intended recipient — or, for storage, only by **you**.

Nobody in between can read it. Not the network, not the servers, not even the company that made the app.

## A quick analogy

Imagine sending a letter in a locked box. Only you and the recipient have a key. The mail carrier can carry the box, drop it, even lose it — but they can never open it.

That's E2EE. The "ends" are the only places where the data is readable.

## How it works (briefly)

Encryption relies on **keys**:

- A **key** turns readable data ("plaintext") into scrambled data ("ciphertext").
- Without the right key, ciphertext is mathematical noise.

In a properly designed E2EE system, the keys never leave your device in a usable form. For storage apps like Veilo, the key is derived from your PIN or passphrase — so your files stay locked even if the cloud backup is breached.

\`\`\`text
Your photo  →  [encrypt with your key]  →  unreadable blob  →  cloud
Cloud blob  →  [decrypt with your key]  →  your photo  →  your screen
\`\`\`

## Why it matters

- **Breaches become harmless.** Stolen ciphertext is useless without your key.
- **Trust shifts to math, not promises.** You don't have to *trust* a company not to peek — they *can't*.
- **You stay in control.** Your data is yours, end to end.

## What E2EE is *not*

E2EE protects data in transit and at rest, but it can't protect a device that's already compromised, or a screen someone is looking over. That's why Veilo pairs encryption with biometric locks and intrusion detection.

## The takeaway

If a service can read your data, so can a hacker or a subpoena. End-to-end encryption removes that risk by design — and it's the foundation everything Veilo does is built on.`,
  },
  {
    slug: "intrusion-detection-explained",
    title: "Intrusion Detection: How Veilo Catches Snoopers in the Act",
    description:
      "A deep-dive into Veilo's intrusion detection — what triggers it, what it captures, and how it turns a failed unlock attempt into a silent alarm.",
    category: "Feature Deep-Dives",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-05-12",
    readingMinutes: 5,
    tags: ["Intrusion Detection", "Features", "Security"],
    featured: false,
    content: `Locking your vault is defense. Knowing *who tried to get in* is intelligence. Veilo's **intrusion detection** gives you both.

## What it does

When someone enters the wrong PIN too many times, Veilo quietly:

1. Captures a photo using the front camera.
2. Records the **time and date** of the attempt.
3. Logs the attempt to your private security feed.

No flash, no sound, no warning. The snooper has no idea they've been caught.

## When it triggers

You decide the threshold. By default, intrusion detection activates after **three** failed unlock attempts, but you can set it to trigger on the very first wrong code for maximum vigilance.

## Where the evidence goes

Every captured photo and log entry is stored **inside your encrypted vault** — never uploaded anywhere you don't control. Review them anytime from the Security tab.

> The best deterrent is the one nobody knows about.

## Pairing it with decoy mode

Intrusion detection becomes especially powerful alongside the **decoy vault**. A snooper might successfully open the decoy, think they've "won," and never realize the real vault exists — while you still get a record of every real attempt.

## Privacy of the feature itself

Because everything is captured and stored on-device with end-to-end encryption, the intrusion logs are as private as the photos they protect. Veilo can't see them. Only you can.

Intrusion detection turns your phone from a passive lockbox into an active witness.`,
  },
  {
    slug: "decoy-vault-guide",
    title: "The Decoy Vault: Plausible Deniability for Your Phone",
    description:
      "Sometimes the safest answer is to show something. Learn how Veilo's decoy vault uses a second PIN to protect your real data under pressure.",
    category: "Feature Deep-Dives",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-05-04",
    readingMinutes: 5,
    tags: ["Decoy Vault", "Features", "Plausible Deniability"],
    featured: false,
    content: `Encryption protects your data from machines. The **decoy vault** protects it from people — specifically, from anyone who can pressure you into unlocking your phone.

## The problem with a single lock

A strong PIN is great until someone is standing over you demanding you enter it. At that moment, an unbreakable lock doesn't help — you're the one being forced to open it.

## How the decoy vault works

Veilo lets you set **two** PINs:

- **Your real PIN** opens your actual, private vault.
- **Your decoy PIN** opens a separate, harmless-looking vault you've pre-filled with unremarkable photos.

If you're ever coerced, you simply enter the decoy PIN. The intruder sees a believable, boring collection and walks away satisfied — never suspecting a second vault exists.

## Setting it up

1. Go to **Settings → Decoy Vault**.
2. Choose a distinct decoy PIN.
3. Add a handful of innocuous photos so the decoy looks lived-in.

The key is realism: an empty decoy is suspicious. A few screenshots, memes, and travel pics make it convincing.

> Plausible deniability isn't paranoia. For journalists, activists, and travelers crossing borders, it can be essential.

## Decoy + intrusion detection

Combine the decoy vault with intrusion detection and you get a quiet, layered defense: the intruder opens the decoy, feels successful, and never triggers suspicion — while Veilo still logs the encounter.

Real privacy sometimes means having something safe to show. The decoy vault gives you exactly that.`,
  },
  {
    slug: "trusted-contacts-explained",
    title: "Trusted Contacts: Recover Access Without Sacrificing Privacy",
    description:
      "Strong encryption means losing your PIN can mean losing your data. Trusted contacts give you a safety net without handing anyone the keys.",
    category: "Feature Deep-Dives",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-04-26",
    readingMinutes: 4,
    tags: ["Trusted Contacts", "Recovery", "Features"],
    featured: false,
    content: `The flip side of real encryption is real responsibility: if only you hold the key, what happens if you forget your PIN? Veilo's **trusted contacts** answer that without weakening your security.

## The recovery dilemma

Most apps offer "reset password" by email. But if a company can reset your access, so can an attacker who compromises that email — which defeats end-to-end encryption.

Veilo takes a different path.

## How trusted contacts work

You nominate one or more people you trust. Recovery requires their cooperation, using a split-key approach:

- No single trusted contact can open your vault alone.
- Recovery only succeeds when the required number of contacts approve.
- Your contacts never see your photos — they only hold a fragment that helps reconstruct *your* key, for *you*.

This is sometimes called **social recovery**, and it's the same principle that secures high-value crypto wallets.

## Choosing your contacts

Pick people who:

- You trust deeply and can reach if needed.
- Are unlikely to collude with each other against you.
- Understand they're a safety net, not a backdoor.

## Privacy guarantees

Because recovery is cryptographic, Veilo never holds a master key. Your trusted contacts can help *you* get back in — but they can never browse your vault themselves.

It's the rare feature that adds a safety net **and** strengthens your privacy posture at the same time.`,
  },
  {
    slug: "border-crossing-phone-privacy",
    title: "Crossing Borders With a Phone Full of Private Data",
    description:
      "Border searches of phones are rising worldwide. Here's a practical, privacy-respecting checklist for travelers who value their data.",
    category: "Privacy News",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-04-18",
    readingMinutes: 6,
    tags: ["Travel", "Border Security", "Privacy News"],
    featured: false,
    content: `Phone searches at borders have climbed steadily over the past decade. In many countries, agents can ask you to unlock your device — and refusing can carry consequences. Here's how to travel smart.

## Know the landscape

Rules vary wildly by country. In some, a search requires suspicion; in others, agents have broad authority at the border. Before you travel, research the specific policies of your **destination and any layovers**.

## Practical steps before you fly

- **Minimize what you carry.** The data that isn't on your device can't be searched.
- **Use full-device encryption** (on by default on modern iPhones and most Androids).
- **Power your phone all the way off.** Encryption protections are strongest before the first unlock.
- **Back up sensitive data** to an encrypted vault, then remove the local copies.

## Where a vault like Veilo helps

Veilo lets you encrypt sensitive photos and files into a separate, locked vault — and its **decoy vault** means that if you're asked to open an app, you can reveal a harmless collection instead of your real data.

> The goal isn't to break rules. It's to ensure that *routine* searches don't expose your *private* life.

## After you cross

- Restore from your encrypted backup once you're safely through.
- Review intrusion logs if your device was out of your sight.
- Change any credentials you're unsure about.

## The bigger picture

Border privacy is a moving target, and laws change. The durable strategy is **data minimization plus strong encryption** — carry less, encrypt the rest, and keep a believable decoy for high-pressure moments.

Travel light. Travel private.`,
  },
  {
    slug: "veilo-pro-max-cloud-backup",
    title: "Product Update: Encrypted Cloud Backup Comes to Pro Max",
    description:
      "Veilo Pro Max now includes zero-knowledge encrypted cloud backup, so your vault survives a lost phone without ever leaving your control.",
    category: "Product Updates",
    author: "The Veilo Team",
    authorRole: "Product",
    date: "2026-04-10",
    readingMinutes: 3,
    tags: ["Changelog", "Cloud Backup", "Pro Max"],
    featured: false,
    content: `We're rolling out one of our most-requested features: **zero-knowledge encrypted cloud backup**, now available to **Veilo Pro Max** subscribers.

## What's new

- **Automatic encrypted backup** of your entire vault to the cloud.
- **Zero-knowledge design** — your files are encrypted on-device before upload, so we can never read them.
- **Cross-device restore** — set up a new phone and recover your vault in minutes.

## How it stays private

Backup uses the same end-to-end encryption that protects your local vault. Your key is derived from your passphrase and **never** transmitted to our servers. If our infrastructure were ever breached, attackers would find only encrypted blobs.

## Getting started

1. Update to the latest version of Veilo.
2. Open **Settings → Cloud Backup** (Pro Max required).
3. Confirm your recovery method (we strongly recommend setting up [trusted contacts](/trusted-contacts-explained)).
4. Toggle backup on.

## What's next on the roadmap

- Selective backup (choose which albums sync).
- Backup history and versioning.
- Faster restore on large vaults.

Thanks to everyone who requested this. As always, your privacy is the product — not the price.`,
  },
  {
    slug: "android-vs-ios-privacy",
    title: "Android vs iOS Privacy in 2026: What Actually Matters",
    description:
      "The Android-vs-iPhone privacy debate is mostly noise. Here's what genuinely affects your data — and the habits that matter more than the OS.",
    category: "Privacy Guides",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-04-02",
    readingMinutes: 7,
    tags: ["Android", "iOS", "Comparison"],
    featured: false,
    content: `Ask the internet whether Android or iOS is more private and you'll get a religious war. The honest answer: both are far better than they used to be, and your **habits** matter more than your logo.

## Where the platforms stand

Both modern platforms offer full-device encryption, app permission controls, and regular security patches. The meaningful differences are narrower than the marketing suggests.

### iOS strengths

- Tight hardware-software integration and a strong default permission model.
- App Tracking Transparency limits cross-app tracking.
- Long, consistent update support.

### Android strengths

- More control for power users (app sandboxing options, granular permissions).
- Choice of hardware, including privacy-focused builds.
- Update timeliness depends heavily on the manufacturer.

## What actually moves the needle

Regardless of platform, these habits dominate your real-world privacy:

1. **Lock your device** with a strong passcode and biometrics.
2. **Encrypt sensitive data** in a dedicated vault rather than the camera roll.
3. **Audit app permissions** — revoke camera, mic, and location access you don't need.
4. **Keep software updated** to patch known vulnerabilities.
5. **Use end-to-end encrypted** apps for anything you'd hate to leak.

> The most private phone is the one whose owner has good habits.

## Where Veilo fits

Veilo runs on **both** iOS and Android, bringing the same encrypted vault, biometric locks, intrusion detection, and decoy mode to either platform. So you don't have to switch ecosystems to get serious privacy — you just have to add the right layer.

## The verdict

Pick the platform you enjoy. Then do the five things above. That'll protect you more than any OS-vs-OS argument ever could.`,
  },
  {
    slug: "how-to-hide-videos-on-your-phone",
    title: "How to Hide Videos on Your Phone Without Leaving a Trace",
    description:
      "Videos are harder to hide than photos — they leave bigger footprints. Here's how to truly conceal sensitive videos on iOS and Android, from thumbnails to cloud leaks.",
    category: "Privacy Guides",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-03-25",
    readingMinutes: 8,
    tags: ["Videos", "iOS", "Android", "How-To"],
    featured: false,
    content: `Photos are static. **Videos are noisy** — they generate thumbnails, cache frames, appear in recent files, and demand far more storage scrutiny. If you're serious about hiding videos, you need to understand every place they leave a mark.

## Why videos are harder to hide than photos

Your phone treats videos differently from the moment they're captured:

- **Thumbnails** are extracted and stored separately in the gallery app's cache.
- **Recent files** lists on Android and iOS surface videos in app pickers and share sheets.
- **Cloud sync** uploads them aggressively because of their file size, creating multiple copies.
- **Playback history** in media apps can reveal what you've watched even if the file is moved.

Simply moving a video to a "Hidden" folder doesn't touch any of these traces.

## The complete hiding checklist

### 1. Remove from the native gallery

On iOS, delete the video from Photos *and* from the Recently Deleted album, which holds items for 30 days. On Android, delete from the gallery app and check the trash. Until you empty trash, the file is still recoverable.

### 2. Clear app caches

Thumbnail databases live inside gallery apps. The only reliable way to clear them is to either wipe the app's storage (Android) or use a dedicated vault that never writes to the system gallery in the first place.

### 3. Disable cloud backup for the folder

If you use iCloud Photos or Google Photos, anything in your camera roll gets synced. Move videos *out* of the camera roll before backup runs. Better yet, import directly into an encrypted vault that never touches the camera roll path.

### 4. Watch the share sheet

Both iOS and Android "suggest" recently shared files. A hidden video that you once sent via Messages can reappear in the share sheet for weeks. The fix: clear your Messages cache or use a separate sharing method that doesn't leave a trail.

### 5. Use a true vault app

The cleanest solution is to **never let sensitive videos touch the system gallery at all**. Apps like Veilo let you import directly into an encrypted container. The video is encrypted on-device, the thumbnail is generated inside the vault (not the OS), and no trace remains in Recent Files or share history.

## What about screen recordings?

Screen recordings are especially risky because they often capture sensitive UI (banking apps, private chats, passwords). They save directly to Photos by default. Change this: on iOS, use a third-party recorder that saves to Files instead. On Android, use a recorder with a private output folder.

## The cloud problem

Even after you hide a video locally, cloud backups can resurrect it. If you've ever synced to Google Photos, iCloud, Dropbox, or OneDrive, copies may persist on those servers — sometimes indefinitely. To truly erase a video, you must delete it from **every synced service** and check the cloud trash.

## A word on "secure deletion"

Standard deletion on phones doesn't overwrite the underlying storage blocks. Forensic tools can recover "deleted" videos until those blocks are reused by new data. For maximum certainty:

- Fill your storage with large files after deletion to overwrite freed blocks.
- Or use a vault app that encrypts videos **before** writing them, so even if recovered, they're unreadable.

> Hiding a video isn't just about moving the file. It's about erasing every breadcrumb it leaves behind.

## Bottom line

If the video matters enough to hide, it matters enough to encrypt. Use a vault that intercepts the file before it ever touches the gallery, the thumbnail cache, or the cloud. That's the only way to hide a video without leaving a trace.`,
  },
  {
    slug: "how-to-hide-photos-on-android",
    title: "How to Hide Photos on Android: The Complete Guide",
    description:
      "Android gives you more control than iOS — but also more ways to leak photos. A full guide to hiding pictures on Android, from built-in tools to encrypted vaults.",
    category: "Privacy Guides",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-03-18",
    readingMinutes: 7,
    tags: ["Android", "Photos", "How-To", "Guide"],
    featured: false,
    content: `Android's open nature is a double-edged sword. You have more tools to hide photos than on iOS, but you also have more system layers that can leak them. This guide covers every method, ranked from weakest to strongest.

## Method 1: Built-in Secure Folder (Samsung)

Samsung devices include a **Secure Folder** powered by Knox. It creates an isolated, encrypted space with its own apps and storage.

- **Pros:** No third-party apps needed; hardware-backed encryption.
- **Cons:** Samsung-only; still visible as an app on your phone; photos inside can be screenshotted by Knox itself.

To use it: Settings → Biometrics and Security → Secure Folder. Move photos into the Secure Folder gallery.

## Method 2: File manager hiding (".nomedia")

Create a folder starting with a dot (e.g., ".private") and place a blank file named ".nomedia" inside it. Most gallery apps will skip this folder during scans.

- **Pros:** No apps needed; works on any Android device.
- **Cons:** Extremely weak security. Any file manager can open the folder. The photos are unencrypted. Recovery tools see them instantly.

This method only hides from casual browsing — it offers zero real protection.

## Method 3: Third-party "hide" apps

The Play Store is full of apps promising to hide photos with a PIN. Most fall into two camps:

- **Weak:** They move photos to a hidden folder but don't encrypt them. Uninstall the app and the "hidden" path is exposed.
- **Better:** They encrypt photos but store the key in plain text or rely on server-side unlock — meaning the developer can access your photos.

Before trusting any hide app, check:

1. Does it claim end-to-end encryption?
2. Does it require internet access? (It shouldn't need it to unlock your vault.)
3. Are there ads? Ad-supported privacy apps have a fundamental conflict of interest.

## Method 4: A true encrypted vault

A proper vault app like Veilo encrypts photos **on your device** using a key derived from your PIN. The encrypted blobs are stored locally. No server holds your key. No ad network sees your content.

On Android specifically, look for:

- **Biometric unlock** with fallback PIN — faster and more secure than typing.
- **Decoy vault** support — essential if someone forces you to unlock the app.
- **No system gallery integration** — the vault should generate its own thumbnails, not write to the MediaStore.
- **Intrusion detection** — captures failed unlock attempts.

## The MediaStore problem

Android's MediaStore is the system database that indexes all photos and videos for apps to query. When you hide a photo using a basic app, it often just removes the MediaStore entry. The actual file remains on disk.

A real vault bypasses MediaStore entirely by storing encrypted data in its own app-private directory, inaccessible to other apps.

## Cloud backup gotchas

Google Photos on Android is aggressive. It can sync photos before you even realize they're backed up. If you're hiding something sensitive:

1. Open Google Photos → Library → Trash and empty it.
2. Check Google Photos archive for any backed-up copies.
3. Disable backup for the camera roll before moving photos into a vault.

## Advanced: Work Profile isolation

Android's Work Profile (available on Pixel and some other devices) creates a completely separate user space. You can install a vault app only in the Work Profile, making it invisible from your personal profile.

This is overkill for most users, but it's a powerful layer for those who need maximum separation.

## Verdict

- **Casual hiding:** Secure Folder (Samsung) or .nomedia.
- **Real privacy:** An encrypted vault with local-only keys, biometric unlock, and no cloud dependency.

Android gives you the tools. It's up to you to choose the ones that actually protect you.`,
  },
  {
    slug: "private-photo-vault-apps-2026",
    title: "Private Photo Vault Apps: What to Actually Look For in 2026",
    description:
      "Not all photo vaults are created equal. A checklist of security features, red flags, and must-haves when choosing an app to protect your sensitive photos and videos.",
    category: "Privacy Guides",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-03-10",
    readingMinutes: 6,
    tags: ["Photo Vault", "Apps", "Security", "Guide"],
    featured: false,
    content: `The App Store and Play Store are crowded with apps calling themselves "private photo vaults." Most are disappointingly weak. Here's how to separate the real privacy tools from the pretenders.

## The non-negotiables

If an app doesn't do these four things, it's not a privacy vault — it's a folder with a password.

### 1. True on-device encryption

The app must encrypt your photos **on your device** before storing them. Not "password protected." Not "hidden." Encrypted. Look for mentions of AES-256 or similar standards. The key should be derived from your PIN or passphrase, not hardcoded or stored on a server.

### 2. No internet required to unlock

A vault that phones home to verify your PIN is sending your access pattern to a server. That's a surveillance risk. The best vaults work entirely offline for unlocking and viewing.

### 3. Biometric support with fallback

Face ID, Touch ID, and fingerprint unlock are convenient, but biometric locks can be forced in some jurisdictions. A secure vault always allows (and sometimes requires) a PIN fallback that only you know.

### 4. Decoy mode

If an app has only one vault, you're vulnerable to coercion. A decoy vault — opened with a different PIN — gives you plausible deniability. It's a hallmark of serious privacy design.

## Red flags that should make you uninstall

- **Ads.** An ad-supported vault is monetizing your attention. Worse, ad networks can fingerprint your device and infer behavior.
- **Cloud-first storage.** If the app uploads your photos before encrypting them, the service sees everything.
- **No privacy policy.** Or worse, a privacy policy that says "we collect usage data to improve experiences."
- **Reset by email.** If the app can reset your access via email, they hold a master key. That's a backdoor.
- **Overly flashy marketing.** "Military-grade encryption" is a meaningless phrase. Real security doesn't need buzzwords.

## Nice-to-haves that matter

These features separate good vaults from great ones:

- **Intrusion detection:** Snaps a photo of anyone who enters the wrong PIN.
- **Break-in alerts:** Notifies you after failed attempts.
- **Shredding/secure delete:** Overwrites the original file after import so it can't be recovered.
- **Stealth mode:** The app disguises itself as a calculator, utility, or another innocent-looking icon.
- **Trusted contacts / social recovery:** Lets you recover access if you forget your PIN without giving anyone else the keys.

## iOS vs Android vault differences

On **iOS**, vault apps are sandboxed tightly. They can't access each other's data, which is good. But they also can't fully clear system caches, so importing into a vault should happen *before* the system gallery indexes the photo.

On **Android**, a vault can request broad file access — which is powerful but also risky if the app is malicious. Prefer vaults that use the Storage Access Framework or scoped storage properly rather than requesting blanket permissions.

## Free vs paid

Free tiers are fine for testing, but real privacy features usually cost money to build and maintain. Zero-knowledge cloud backup, social recovery, and advanced encryption aren't sustainable as free offerings. Expect to pay for a Pro tier if you're storing anything genuinely sensitive.

## The Veilo approach

Veilo was designed around the checklist above:

- AES-256 encryption on-device with keys derived from your PIN.
- No network required to unlock.
- Biometric unlock + mandatory PIN.
- Decoy vault with full customization.
- Intrusion detection with front-camera capture.
- Trusted contacts for recovery.
- Zero-knowledge cloud backup (Pro Max) where your key never touches our servers.

> The right vault doesn't just hide your photos. It makes them mathematically unreadable to anyone except you.

## Final checklist before you choose

- [ ] Encryption happens on-device.
- [ ] No internet required to unlock.
- [ ] Biometric + PIN fallback.
- [ ] Decoy vault available.
- [ ] No ads.
- [ ] Clear privacy policy with no data collection.
- [ ] Intrusion detection or break-in logging.
- [ ] Original file shredding after import.

If an app checks every box, you've found a vault worth trusting.`,
  },
  {
    slug: "hide-photos-from-gallery-without-deleting",
    title: "How to Hide Photos From Your Gallery Without Deleting Them",
    description:
      "You don't have to erase memories to keep them private. Here's how to remove photos from your phone's gallery while keeping them safe, accessible, and encrypted.",
    category: "Privacy Guides",
    author: "Marco Reyes",
    authorRole: "Security Engineer",
    date: "2026-03-03",
    readingMinutes: 6,
    tags: ["Gallery", "Photos", "How-To", "Privacy"],
    featured: false,
    content: `There's a difference between hiding a photo and deleting it. Deletion risks losing memories forever. Hiding keeps them accessible to you while invisible to anyone scrolling through your gallery. Here's how to do it right.

## Why the gallery is the problem

Your phone's gallery app is designed for convenience, not discretion. It surfaces:

- Every photo you've taken, screenshotted, or saved.
- Memories and auto-generated slideshows.
- Recently added items at the top.
- Shared albums and synced cloud collections.

Anyone who picks up your unlocked phone sees all of this instantly. The gallery has no concept of "sensitive" vs. "casual" — it just shows everything.

## Method 1: Move to a hidden album (weak)

Both iOS and Android let you create albums and move photos into them. You can name the album something innocuous.

- **The catch:** The photos still appear in "All Photos" or "Camera" views. Albums are organizational tools, not privacy tools.

## Method 2: Use the built-in "Hidden" album (slightly better)

iOS has a Hidden album under Utilities. Some Android skins offer similar features.

- **The catch:** The Hidden album is trivial to open. On iOS, it's a single tap in the Albums tab. It offers no encryption and no lock. It's hiding in name only.

## Method 3: Archive in cloud storage (risky)

Some users upload photos to Google Drive, Dropbox, or iCloud and delete the local copy.

- **The catch:** Now your photos live on someone else's server, governed by their terms of service. Law enforcement can subpoena cloud providers. Data breaches can expose them. And the thumbnails may still linger on your phone.

## Method 4: Import into an encrypted vault (the right way)

A dedicated vault app removes photos from the gallery **and** protects them with encryption. The workflow is simple:

1. Open your vault app.
2. Tap Import and select the photos you want to hide.
3. The app copies them into its encrypted container.
4. Delete the originals from your gallery.
5. Empty the Recently Deleted / Trash folder.

The photos are now:

- **Gone from the gallery:** No album, no "All Photos" view, no memories slideshow.
- **Encrypted:** Unreadable without your PIN.
- **Still accessible:** Open the vault, enter your PIN, and view them normally.
- **Protected from recovery:** The vault shreds the original file so forensic tools can't resurrect it.

## What about videos?

Videos follow the same pattern but require extra care. They generate thumbnails that can persist in the gallery app's cache even after the original is deleted. A proper vault generates thumbnails internally and never writes them to the system cache.

## The Recently Deleted trap

Here's where most people slip up. On iOS, deleted photos sit in "Recently Deleted" for 30 days. On Android, many gallery apps have a Trash folder. Until you empty these, your "hidden" photos are one tap away from recovery.

**Always empty the trash after deletion.**

## Restoring photos to the gallery

If you want a photo back in your gallery, a vault app can export it. On iOS, this saves it back to the Photos app. On Android, it writes to the MediaStore. Just remember: once it's back in the gallery, it's visible again.

## A middle ground: keep some, hide some

You don't have to hide everything. Many users keep casual photos in the gallery and move only sensitive items — documents, IDs, intimate photos, financial screenshots — into the vault. This balances convenience with privacy.

> You shouldn't have to choose between keeping a photo and keeping it private. A vault lets you do both.

## Summary

| Method | Hides from Gallery | Encrypts | Easy to Recover by Others |
|--------|-------------------|------------|---------------------------|
| Hidden album | Partially | No | Very easy |
| Cloud archive | Yes | Sometimes | Subpoena / breach |
| Encrypted vault | Yes | Yes | Cryptographically impossible |

If you want to hide photos without deleting them, an encrypted vault is the only method that actually delivers on all three criteria.`,
  },
  {
    slug: "deleted-photos-not-really-gone",
    title: "Why Your 'Deleted' Photos Aren't Really Gone (And How to Actually Erase Them)",
    description:
      "Standard deletion doesn't erase data — it just hides it. Here's what happens when you delete a photo, who can still recover it, and how to make sure it's gone for good.",
    category: "Privacy Guides",
    author: "Lena Hart",
    authorRole: "Privacy Editor",
    date: "2026-02-25",
    readingMinutes: 7,
    tags: ["Deletion", "Forensics", "Security", "Data Recovery"],
    featured: false,
    content: `You tap Delete. The photo vanishes from your gallery. You breathe a sigh of relief. But on a modern smartphone, **deletion is not destruction**. It's just a change of address.

## What "delete" actually does

When you delete a photo, the operating system doesn't overwrite the file's data. It simply marks the storage blocks as "available." The photo's bits remain on the flash memory until new data happens to land on top of them.

This is by design. Overwriting data takes time and wears out flash storage. For performance and longevity, your phone prefers lazy deletion.

## Who can recover deleted photos

### 1. Forensic tools

Software like Cellebrite, Oxygen, and open-source alternatives can scan raw storage and reconstruct "deleted" files. Law enforcement, repair shops, and determined attackers all have access to these tools.

### 2. Cloud services

If you use iCloud Photos, Google Photos, or OneDrive, your "deleted" photo may live in the cloud trash for 30–60 days. Even after that, cloud providers often retain backups for legal and operational reasons.

### 3. The next app you install

Any app with storage permission can scan free blocks. Malicious or poorly designed apps can harvest fragments of deleted photos. This is rare but not impossible.

## The Recently Deleted / Trash problem

Both iOS and Android hold deleted photos in a recoverable state for weeks:

- **iOS Recently Deleted:** 30 days by default.
- **Android Trash:** Varies by manufacturer, often 15–30 days.
- **Google Photos Trash:** 60 days.
- **iCloud Trash:** 30 days.

Until these trash bins are emptied, recovery requires zero technical skill.

## How to actually erase a photo

### Method 1: Overwrite after deletion

1. Delete the photo.
2. Empty Recently Deleted / Trash.
3. Fill your phone's storage with large, benign files (videos, game downloads).
4. Delete those files.
5. Repeat.

This isn't guaranteed — modern flash controllers use wear-leveling that maps logical blocks to physical blocks unpredictably — but it dramatically reduces recoverability.

### Method 2: Factory reset with encryption

On modern phones, storage is encrypted by default. A factory reset destroys the encryption key, rendering all data unreadable. This is the most reliable way to sanitize a device you're selling or giving away.

**Important:** The reset must happen while the device is powered on and encryption is active. If the storage controller was somehow bypassed, traces could remain.

### Method 3: Never let unencrypted sensitive data touch disk

The most reliable approach is prevention. If a photo is encrypted before it's ever written to storage as plaintext, then "deleting" it only means destroying the key. Without the key, the remaining ciphertext is useless.

This is how proper vault apps work. When you import a photo into Veilo:

1. The photo is encrypted in memory.
2. Only the ciphertext is written to the vault's storage.
3. The original is shredded (overwritten before deletion).
4. Even if someone recovers the vault's storage blocks, they find only noise.

## The cloud backup paradox

You delete a photo locally, but your cloud backup already has a copy. Now you need to delete it from:

- The cloud photo service (Google Photos, iCloud).
- The cloud trash.
- Any other device that synced the photo.
- Any shared album you added it to.

This is why privacy-conscious users disable cloud photo sync entirely for sensitive content.

## What about screenshots and shared images?

Screenshots often contain the most sensitive data: banking details, passwords, private messages. They save automatically to Photos. Shared images from WhatsApp, Telegram, or Messages also land in the gallery by default.

To contain these:

- Disable auto-save for screenshots (not always possible on iOS).
- Use in-app media viewers that don't write to the gallery.
- Import into a vault immediately after capture.

## When law enforcement gets involved

If you're in a situation where authorities may seize your device, understand that:

- A factory reset looks suspicious and may be interpreted as destruction of evidence.
- Encrypted vaults with decoy modes are designed for exactly this scenario.
- Cloud providers often comply with legal requests even without your device.

This isn't legal advice, but it's worth knowing the landscape.

## The bottom line

Standard deletion is hiding, not erasing. If you need a photo truly gone, you must either overwrite the storage blocks, destroy the encryption key, or never let the data exist in plaintext on disk.

For most users, the practical answer is simple: **use a vault that encrypts on import and shreds the original**. That way, "deletion" is just key management — and key management is something you control.`,
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  const featured = getAllPosts().filter((p) => p.featured);
  return featured.length ? featured : getAllPosts().slice(0, 2);
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(getAllPosts().filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, limit);
}
