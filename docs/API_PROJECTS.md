# API Projects - Documentation

## Endpoint
`GET /api/projects`

## Description
Récupère la liste des projets vedettes avec options de filtrage, recherche, tri et pagination.

---

## Paramètres de requête

### Filtres

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `category` | string | Filtrer par type (`web`, `mobile`, `other`, `all`) | `?category=web` |
| `search` | string | Recherche textuelle dans tous les champs | `?search=IA` |
| `status` | string | Filtrer par statut (`Live`, `In production`, `Pilot in production`, `Ongoing`, `Actively maintained`) | `?status=In production` |
| `featured` | boolean | Filtrer les projets vedettes uniquement | `?featured=true` |
| `technologies` | string | Technologies séparées par virgule | `?technologies=Next.js,TypeScript` |

### Tri

| Paramètre | Type | Description | Valeurs possibles | Défaut |
|-----------|------|-------------|-------------------|--------|
| `sortBy` | string | Champ de tri | `timeline`, `title` | `timeline` |
| `order` | string | Ordre de tri | `asc`, `desc` | `desc` |

### Pagination

| Paramètre | Type | Description | Défaut |
|-----------|------|-------------|--------|
| `page` | number | Numéro de page | `1` |
| `limit` | number | Nombre de résultats par page | `10` |

---

## Exemples d'utilisation

### 1. Récupérer tous les projets
```bash
GET /api/projects
```

### 2. Filtrer par catégorie Web
```bash
GET /api/projects?category=web
```

### 3. Recherche textuelle
```bash
GET /api/projects?search=Flutter
```

### 4. Projets utilisant Next.js ou TypeScript
```bash
GET /api/projects?technologies=Next.js,TypeScript
```

### 5. Projets en production, triés par titre
```bash
GET /api/projects?status=In production&sortBy=title&order=asc
```

### 6. Pagination (page 2, 5 résultats)
```bash
GET /api/projects?page=2&limit=5
```

### 7. Filtrage avancé
```bash
GET /api/projects?category=web&search=IA&featured=true&sortBy=timeline&order=desc&page=1&limit=10
```

---

## Réponse

### Structure de la réponse

```json
{
  "success": true,
  "data": [
    {
      "id": "fais-mon-cv",
      "title": "Fais Mon CV",
      "headline": "Assistant CV propulsé par IA...",
      "description": "...",
      "summary": "...",
      "problem": "...",
      "solution": "...",
      "impact": ["500+ CV générés...", "..."],
      "features": ["Assistant IA...", "..."],
      "role": ["Product design...", "..."],
      "timeline": "2024 · 4 weeks",
      "team": "Solo project",
      "status": "In production",
      "technologies": ["Next.js 15", "TypeScript", "..."],
      "image": "/images/projects/cv.jpg",
      "liveUrl": "https://cv.starland9.dev",
      "githubUrl": null,
      "featured": true,
      "category": "web"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalProjects": 12,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "stats": {
    "total": 12,
    "categories": ["mobile", "web", "other"],
    "technologies": ["Next.js 15", "TypeScript", "Flutter", "..."]
  },
  "filters": {
    "category": "web",
    "search": null,
    "status": null,
    "featured": null,
    "technologies": null,
    "sortBy": "timeline",
    "order": "desc"
  }
}
```

### Codes de statut HTTP

| Code | Description |
|------|-------------|
| 200 | Succès |
| 500 | Erreur serveur |

---

## Exemples de code

### JavaScript / TypeScript (fetch)

```typescript
// Récupérer tous les projets web
const response = await fetch('/api/projects?category=web');
const data = await response.json();

if (data.success) {
  console.log('Projets:', data.data);
  console.log('Total:', data.pagination.totalProjects);
}
```

### React / Next.js (avec useState/useEffect)

```tsx
import { useState, useEffect } from 'react';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects?category=web&limit=6');
      const data = await res.json();
      
      if (data.success) {
        setProjects(data.data);
      }
      setLoading(false);
    }
    
    fetchProjects();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.headline}</p>
        </div>
      ))}
    </div>
  );
}
```

### Avec SWR (recommandé)

```tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function ProjectsList() {
  const { data, error, isLoading } = useSWR(
    '/api/projects?category=web&limit=6',
    fetcher
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;

  return (
    <div>
      {data.data.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

---

## Notes

- Les résultats sont mis en cache côté client
- La recherche est insensible à la casse
- Les technologies peuvent être filtrées avec correspondance partielle
- Le tri par `timeline` extrait l'année du champ texte
- Les filtres peuvent être combinés librement

## Source des données

Depuis la refonte (spec `specs/001-ui-ux-redesign`), les projets viennent de
`src/content/projects/<slug>.json` (un fichier par projet, en français et en anglais).
L'API renvoie la version **anglaise**, avec la même forme de réponse qu'avant
(adaptateur : `src/content/legacy.ts`). Changements mineurs :

- `category` vaut `web`, `mobile` ou `other` (`other` remplace `Bot`) ;
- `status` est l'un des libellés anglais listés plus haut ;
- le champ décoratif `color` n'existe plus ;
- les liens Play Store n'ont plus le paramètre de suivi `pcampaignid`.
