# Maison Léonie — site vitrine de boutique

Site catalogue pour une boutique : présentation des produits, nouveautés,
fiches détaillées et page contact. **Pas de panier ni de paiement** pour
l'instant, tout est prévu pour les ajouter plus tard.

Construit avec **Next.js 16** et **Tailwind CSS 4**.

> 🌐 **Site en ligne** : https://maison-leonie-zeta.vercel.app
> 💻 **Code source** : https://github.com/kdaviddiane-king/maison-leonie
>
> 📘 **Toutes les informations du projet sont rassemblées dans
> [`INFOS-CLES.md`](./INFOS-CLES.md)** : commandes, structure, ajout de
> produits, design, déploiement et notes techniques.

---

## 1. Lancer le site sur ton ordinateur

```bash
npm install     # une seule fois
npm run dev
```

Puis ouvre <http://localhost:3000> dans ton navigateur.
Le site se met à jour tout seul à chaque fichier enregistré.

Pour voir la version « production » (comme en ligne) :

```bash
npm run build
npm start
```

---

## 2. Ajouter un nouvel arrivage (le plus important)

Tout se passe dans **un seul fichier** : `src/data/products.json`.

### a) Ajouter la photo

1. Place ta photo dans le dossier `public/images/products/`.
2. Nomme-la simplement, par exemple `lampe-lueur.jpg`.
3. Format conseillé : **portrait 4:5**, environ 1200 × 1500 px, moins de 500 Ko.

### b) Ajouter la fiche produit

Ouvre `src/data/products.json` et ajoute un bloc à la fin de la liste
(n'oublie pas la virgule entre deux blocs) :

```json
{
  "slug": "lampe-lueur",
  "name": "Lampe Lueur",
  "category": "Décoration",
  "price": 120,
  "isNew": true,
  "inStock": true,
  "image": "/images/products/lampe-lueur.jpg",
  "description": "Une lampe en papier de riz qui diffuse une lumière douce. Montée à la main.",
  "details": [
    "Papier de riz et chêne massif",
    "Hauteur 38 cm · Diamètre 20 cm",
    "Ampoule E27 non fournie"
  ]
}
```

À quoi sert chaque champ :

| Champ | Rôle |
|---|---|
| `slug` | Adresse de la page : `/produit/lampe-lueur`. En minuscules, sans accents ni espaces. |
| `name` | Nom affiché du produit. |
| `category` | Catégorie existante : `Céramique`, `Textile`, `Décoration` ou `Bijoux`. |
| `price` | Prix en euros, en nombre (pas de « € », pas de virgule). |
| `isNew` | `true` = apparaît dans « Nouveautés » avec le badge. |
| `inStock` | `false` = badge « Sur commande ». |
| `image` | Chemin de la photo dans `public/`. |
| `description` | Texte de la fiche produit. |
| `details` | Liste de précisions (matière, dimensions, entretien…). |

C'est tout : la boutique, les nouveautés et les pages catégories se mettent
à jour automatiquement.

> **Nouvelle catégorie ?** Ajoute-la simplement dans `category`. Une page
> `/boutique/ma-nouvelle-categorie` est créée toute seule.

---

## 3. Modifier les textes et les coordonnées

| Ce que tu veux changer | Fichier |
|---|---|
| Nom de la boutique, bandeau du haut, menu | `src/components/Header.js` |
| Adresse, liens, mentions du pied de page | `src/components/Footer.js` |
| Textes de la page d'accueil | `src/app/page.js` |
| Page « La maison » | `src/app/maison/page.js` |
| Page contact (adresse, horaires, e-mail) | `src/app/contact/page.js` |
| Titre et description pour Google | `src/app/layout.js` |

---

## 4. Changer les couleurs et les polices

Tout est centralisé dans `src/app/globals.css` :

```css
--color-cream: #faf7f2;   /* fond général */
--color-shell: #f2ece2;   /* fonds alternés */
--color-sand: #e6dccd;    /* fond des photos */
--color-ink: #201b16;     /* texte principal */
--color-muted: #7b7168;   /* texte secondaire */
--color-accent: #a4552f;  /* couleur d'accent (survol, liens) */
```

Les polices se changent dans `src/app/layout.js` (Cormorant Garamond pour
les titres, Inter pour le texte).

---

## 5. Mettre le site en ligne (gratuit)

1. Crée un compte sur [vercel.com](https://vercel.com).
2. Envoie le dossier sur GitHub (ou utilise `npx vercel` depuis ce dossier).
3. Sur Vercel, importe le projet : les réglages par défaut fonctionnent.
4. Ajoute ton nom de domaine dans *Settings → Domains*.

---

## 6. Structure du projet

```
src/
├── app/
│   ├── layout.js              → structure commune (menu, pied de page)
│   ├── page.js                → accueil
│   ├── boutique/
│   │   ├── page.js            → tous les objets
│   │   └── [categorie]/       → une page par catégorie
│   ├── produit/[slug]/        → fiche produit
│   ├── nouveautes/            → derniers arrivages
│   ├── maison/                → l'histoire de la boutique
│   └── contact/
├── components/                → éléments réutilisables (carte produit…)
├── data/products.json         → ⭐ tous les produits
└── lib/products.js            → fonctions de lecture des produits
```

---

## 7. Ce qui n'est pas encore branché

- **Panier et paiement** : à ajouter (Stripe, Shopify ou Snipcart) quand tu
  voudras vendre en ligne.
- **Formulaire de contact** : il affiche une confirmation mais n'envoie pas
  encore d'e-mail. Il suffit de le brancher sur Formspree, Resend ou une
  route API.
- **Photos** : les visuels actuels sont des images de démonstration
  générées (`npm run images`). Remplace-les par tes vraies photos en gardant
  les mêmes noms de fichiers.
