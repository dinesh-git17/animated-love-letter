# 💌 Animated Love Letter

A beautifully crafted, animated love letter experience built with **Next.js**, **Tailwind CSS**, **Framer Motion**, and **TypeScript** — designed to win hearts with floating emojis, typewriter love notes, and elegant interactive transitions.

## ✨ Features

- ❤️ Floating hearts in a zero-gravity environment
- 💬 Typewriter-style romantic letters revealed word-by-word
- 🎵 Background music that plays and fades out smoothly
- ✨ Sparkle rain and smooth page transitions
- ❓ “Do you love me?” interaction with playful button shrinking
- 💖 Final handwritten “I love you” animation with heart fill
- 📱 Fully responsive and mobile-ready

## 🛠️ Technologies Used

- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Fonts](https://fonts.google.com/)
- CSS animations + SVG path effects

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dinesh-git17/animated-love-letter.git
cd animated-love-letter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm run start
```

### 5. Naming Logic
- This letter was made specifically for someone
- Update the name in the following snippet to proceed with another name:
```typescript
  const handleSubmit = () => {
    if (name.trim().toLowerCase() === "carolina") {
      setStage("correct");
    } else {
      setStage("wrong");
    }
  };
```

- Update the love letter as required

## 🔊 Background Music

The music file (`love_theme.mp3`) should be placed inside the `/public` folder:

```
public/
├── love_theme.mp3
```

You can replace it with your own `.mp3` romantic track.

## 🎨 Customization

- Change letter content in `page.tsx`
- Customize emojis, sparkles, and final messages
- Add more stages or cards for extended interactions

## 💖 Credits

Created with love by [Dinesh Dawonauth](https://github.com/dinesh-git17)

---

_This project is a heartfelt gift. If you're reading this and smiling, then it’s already done its job._
