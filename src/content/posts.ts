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
