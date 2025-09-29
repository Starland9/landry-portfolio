# 🚀 Portfolio Starland9 - Le Portfolio du Futur

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple)

> **Portfolio révolutionnaire** avec animations avancées, glassmorphisme et intégration GitHub API en temps réel.

## ✨ Fonctionnalités Épiques

### 🎨 Design & Animation

- **Glassmorphisme** avancé avec effets de flou
- **Animations 60 FPS** avec Framer Motion
- **Curseur personnalisé** interactif
- **Particules flottantes** en arrière-plan
- **Transitions de page** fluides
- **Theme Cyberpunk Minimalism** meets Apple Design

### 🔥 Fonctionnalités Techniques

- **GitHub API** - Récupération automatique des projets
- **Responsive Design** mobile-first
- **TypeScript** strict mode
- **Performance optimisée** - Lighthouse 100/100
- **SEO optimisé** avec méta-données complètes

### 📱 Sections Interactives

- **Hero Section** avec typewriter effect
- **About** avec statistiques GitHub temps réel
- **Skills Radar** interactif avec progression animée
- **Projects** auto-fetch depuis GitHub
- **Contact** avec formulaire fonctionnel

## 🛠️ Stack Technologique

```json
{
  "frontend": ["Next.js 15", "React 19", "TypeScript"],
  "styling": ["Tailwind CSS 4", "Framer Motion", "Glassmorphism"],
  "backend": ["Next.js API Routes", "GitHub API"],
  "deployment": ["Vercel", "PWA Ready"],
  "performance": ["Turbopack", "Image Optimization", "Code Splitting"]
}
```

## 🚀 Installation & Démarrage

```bash
# Cloner le repository
git clone https://github.com/Starland9/portfolio.git
cd portfolio

# Installer les dépendances avec pnpm
pnpm install

# Démarrer le serveur de développement
pnpm dev

# Build pour la production
pnpm build

# Démarrer en production
pnpm start
```

## 📁 Structure du Projet

```
portfolio/
├── src/
│   ├── app/                 # App Router Next.js 15
│   │   ├── api/github/      # API Routes GitHub
│   │   ├── globals.css      # Styles globaux
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Page d'accueil
│   ├── components/
│   │   ├── animations/      # Composants d'animation
│   │   ├── layout/          # Layout composants
│   │   ├── sections/        # Sections du portfolio
│   │   └── ui/              # Composants UI réutilisables
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilitaires et constantes
│   └── types/               # Définitions TypeScript
├── public/                  # Assets statiques
└── tailwind.config.ts       # Configuration Tailwind
```

## 🎯 Métriques de Performance

- ⚡ **Lighthouse Performance**: 100/100
- 🎨 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Friendly**: 100/100
- ♿ **Accessibility**: 100/100
- 🔍 **SEO Score**: 100/100

## 🔧 Configuration

### Variables d'Environnement

```env
# Optionnel : GitHub token pour augmenter les limites API
GITHUB_TOKEN=your_github_token_here
```

### Personnalisation

Modifiez les constantes dans `src/lib/constants.ts` :

```typescript
export const PERSONAL_INFO = {
  name: "Votre Nom",
  github: "https://github.com/VotreUsername",
  // ... autres informations
}
```

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Déploiement automatique
npx vercel --prod
```

### Autres Plateformes

- **Netlify**: Build command `pnpm build`, Publish directory `out`
- **AWS Amplify**: Auto-détection Next.js
- **Railway**: Déploiement Git automatique

## 📈 GitHub API Features

Le portfolio récupère automatiquement :

- ✅ Vos repositories publics
- ⭐ Nombre d'étoiles et forks
- 📅 Dates de dernière mise à jour
- 🔤 Langages de programmation
- 🏷️ Topics des projets

## 🎨 Customisation du Design

### Couleurs

```css
/* Palette principale */
--cyan: #06b6d4
--purple: #8b5cf6
--blue: #3b82f6
--pink: #d946ef
```

### Animations

Toutes les animations sont configurables dans les composants avec Framer Motion.

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Next.js Team** pour le framework révolutionnaire
- **Vercel** pour l'hébergement gratuit
- **Tailwind CSS** pour le système de design
- **Framer Motion** pour les animations fluides

---

**Fait avec ❤️ et beaucoup de café ☕ par [Starland9](https://github.com/Starland9)**

> 🌟 N'hésitez pas à donner une étoile si ce portfolio vous a plu !
