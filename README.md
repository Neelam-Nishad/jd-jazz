
# JD Jazz

A modern, responsive website for JD Jazz built with React, TypeScript, and Tailwind CSS.

## Features

- 🎬 **Video Gallery** - Showcase performance videos with modal player
- 📧 **Contact Forms** - Email integration for inquiries and quotes
- 👥 **Team Section** - Display team members with Instagram links
- 📱 **Responsive Design** - Mobile-first approach with smooth animations
- 🎨 **Modern UI** - Gradient themes with Framer Motion animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Neelam-Nishad/jd-jazz.git
cd jd-jazz
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── public/          # Static assets (team photos, etc.)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ui/    # Shadcn/ui components
│   │   └── App.tsx    # Main application component
│   ├── main.tsx       # Application entry point
│   └── styles/        # Global styles and fonts
├── index.html        # HTML template
├── package.json      # Dependencies and scripts
├── tailwind.config.ts # Tailwind configuration
├── vite.config.ts    # Vite configuration
└── README.md         # This file
```

## Customization

### Adding Team Photos
Place team member photos in the `public/team/` folder:
- `public/team/sachin.jpeg`
- `public/team/neelam.jpeg`
- `public/team/shivam.jpeg`

### Updating Videos
Edit the `videos` array in `src/app/App.tsx` with your Vimeo/YouTube embed URLs.

### Contact Information
Update address and phone numbers in the contact section of `App.tsx`.

## Deployment

The built files in the `dist/` folder can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

This project is private and proprietary to JD Jazz.
  