# 🍳 ChefAI - TasteCraft AI Recipe Generator

**Smarter Cooking Starts Here** - An AI-powered recipe generator that transforms your ingredients into delicious, gourmet-grade meals personalized for your taste and wellness goals.

![ChefAI Demo](https://github.com/user-attachments/assets/d3265145-7f93-4f65-a7ed-34778e52dd03)

---

## ✨ Features

- 🤖 **AI-Powered Recipe Generation** - Create unique recipes based on your available ingredients
- 📝 **Smart Ingredient Input** - Easy-to-use interface for adding ingredients
- 💾 **Save Your Favorites** - Keep track of recipes you love
- 🔐 **User Authentication** - Secure login with Supabase Auth
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast & Modern** - Built with React, TypeScript, and Vite
- 🎨 **Professional UI** - Crafted with shadcn/ui and Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chinnu122/ChefAI.git
   cd ChefAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   > **Note:** Get your Supabase credentials from [supabase.com](https://supabase.com) after creating a project.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8080` to see the application running!

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:8080` |
| `npm run build` | Build the app for production to `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **[React 18](https://react.dev/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service (authentication & database)
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

---

## 📁 Project Structure

```
ChefAI/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Hero.tsx     # Landing page hero section
│   │   ├── IngredientInput.tsx
│   │   └── RecipeCard.tsx
│   ├── pages/           # Application pages
│   │   ├── Index.tsx    # Home page
│   │   ├── Auth.tsx     # Authentication page
│   │   ├── SavedRecipes.tsx
│   │   └── NotFound.tsx
│   ├── integrations/    # Third-party integrations
│   │   └── supabase/    # Supabase client & types
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── supabase/            # Supabase functions
│   └── functions/       # Edge functions
│       └── generate-recipe/
└── package.json         # Dependencies and scripts
```

---

## 🎯 How It Works

1. **Add Ingredients** - Enter the ingredients you have available
2. **Generate Recipe** - Click the "Generate Recipe" button
3. **AI Magic** - Our AI analyzes your ingredients and creates a custom recipe
4. **Cook & Enjoy** - Follow the step-by-step instructions
5. **Save Favorites** - Bookmark recipes you love for easy access

---

## 🔧 Configuration

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Set up the database schema:
   - Create a `recipes` table with columns for title, ingredients, instructions, etc.
3. Deploy the Edge Function in `supabase/functions/generate-recipe/`
4. Add your API keys to environment variables

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette (defined in CSS variables)
- Responsive breakpoints
- Custom animations
- Dark mode support (class-based)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**Port 8080 is already in use**
```bash
# Kill the process using port 8080
lsof -ti:8080 | xargs kill -9
```

**Supabase connection errors**
- Verify your `.env.local` file has correct credentials
- Check your Supabase project is active
- Ensure Row Level Security policies are configured

**Build errors**
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

This project is available for personal and educational use.

---

## 👏 Acknowledgments

- Recipe generation powered by AI via TasteCraft AI Gateway
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Built with ❤️ using [Vite](https://vitejs.dev/)

---

## 📧 Contact & Support

If you have questions or need help:
- Open an [issue](https://github.com/Chinnu122/ChefAI/issues)
- Check existing [discussions](https://github.com/Chinnu122/ChefAI/discussions)

---

<div align="center">

**Happy Cooking! 🍽️**

Made with 💚 by the ChefAI Team

</div>
