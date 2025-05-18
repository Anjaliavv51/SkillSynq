# SkillSynq

SkillSynq is a peer-matching platform designed to connect learners and professionals for collaborative learning, group sessions, and knowledge sharing. Built with modern web technologies, it offers a responsive, interactive experience.

## Project info

**URL**: [https://peer-spark-match.vercel.app/)

## Features

The website includes a dedicated **Features** section that highlights the core functionalities of SkillSynq:

- Peer-to-peer matching and messaging
- Group learning sessions
- Gamification hub for engagement
- Real-time network status
- Session summaries and progress tracking

## Technologies Used

- [Vite](https://vitejs.dev/) – Fast frontend tooling
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [React](https://react.dev/) – UI library
- [shadcn-ui](https://ui.shadcn.com/) – UI components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS

## AI Usage Explanation

SkillSynq leverages artificial intelligence to enhance the user experience and platform functionality in the following ways:

- **Smart Peer Matching:** AI algorithms analyze user profiles, learning goals, and activity to recommend the most relevant peers for collaboration.
- **Session Summaries:** After group sessions, AI generates concise summaries and highlights key discussion points for participants.
- **Personalized Recommendations:** The platform uses AI to suggest learning resources, group sessions, and activities tailored to individual interests and progress.
- **Moderation & Safety:** AI tools help monitor interactions to maintain a safe and respectful environment.

All AI features are designed to assist users, not replace human judgment. User data is processed in accordance with privacy policies and is not shared with third parties for unrelated purposes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & npm (recommended: use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Development

Start the development server with hot reloading:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

## Editing the Code

You can edit this project in several ways:

- **Via [Lovable](https://lovable.dev/projects/305bbf98-9018-41bc-9561-829e039d1084):** Prompt and edit directly in the Lovable interface.
- **Locally in your IDE:** Clone the repo, make changes, and push.
- **Directly in GitHub:** Use the web editor to modify files.
- **GitHub Codespaces:** Launch a codespace for a cloud-based dev environment.

## Deployment

Deploy instantly via [Lovable](https://lovable.dev/projects/305bbf98-9018-41bc-9561-829e039d1084) by clicking Share → Publish.

## Custom Domain

Connect a custom domain in Lovable under Project > Settings > Domains.  
See [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide).

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party integrations
│   ├── lib/             # Library utilities
│   ├── pages/           # Page components
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── supabase/            # Supabase config
├── index.html           # HTML entry point
├── tailwind.config.ts   # Tailwind CSS config
├── vite.config.ts       # Vite config
└── README.md            # Project documentation
```

## License

This project is for demonstration and educational purposes.