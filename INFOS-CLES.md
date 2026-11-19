# 📘 INFOS CLÉS — Maison Léonie

> Fichier de référence du projet. Tout ce qu'il faut savoir est ici.
> Dernière mise à jour : 18 novembre 2026.

---

## Sommaire

1. [Le projet en une phrase](#1-le-projet-en-une-phrase)
2. [Accès et commandes](#2-accès-et-commandes)
3. [Stack technique](#3-stack-technique)
4. [Structure des fichiers](#4-structure-des-fichiers)
5. [Les produits : mode d'emploi](#5-les-produits--mode-demploi)
6. [Le design (couleurs, polices)](#6-le-design-couleurs-polices)
7. [Les textes à personnaliser](#7-les-textes-à-personnaliser)
8. [Ce qui est branché… et ce qui ne l'est pas](#8-ce-qui-est-branché-et-ce-qui-ne-lest-pas)
9. [Mettre le site en ligne](#9-mettre-le-site-en-ligne)
10. [Checklist avant mise en ligne](#10-checklist-avant-mise-en-ligne)
11. [Dépannage](#11-dépannage)
12. [Décisions prises et pourquoi](#12-décisions-prises-et-pourquoi)
13. [Notes techniques du projet](#13-notes-techniques-du-projet)

---

## 1. Le projet en une phrase

Un **site catalogue de boutique en ligne**, sans panier ni paiement, où l'on peut
ajouter facilement de nouveaux arrivages depuis un simple fichier JSON.

- Type : vitrine / catalogue (10 produits de démonstration)
- Langue : français
- Thème : objets pour la maison — céramique, textile, décoration, bijoux
- Dossier du projet : `boutique/`

---

## 2. Accès et commandes

Toutes les commandes se lancent **depuis le dossier `boutique/`**.

| Commande | Ce qu'elle fait |
|---|---|
| `npm install` | Installe les dépendances (une seule fois, ou après un `git pull`) |
| `npm run dev` | Lance le site en local sur **http://localhost:3000** |
| `npm run build` | Compile le site pour la production (à faire avant de publier) |
| `npm start` | Lance la version production (après un `build`) |
| `npm run lint` | Vérifie la qualité du code |
| `npm run images` | Régénère les visuels de démonstration |

**Arrêter le serveur :** `Ctrl + C` dans le terminal.
**Changer de port si 3000 est occupé :** `npm run dev -- -p 3001`.

> En mode `dev`, le site se recharge automatiquement à chaque fichier enregistré.
> Il n'y a rien à relancer.

---

## 3. Stack technique

| Élément | Version |
|---|---|
| Next.js (App Router) | 16.4.6 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| Node.js | 24.13.0 |
| Gestionnaire de paquets | npm 11.6.2 |
| Git | 2.56.0 (dépôt initialisé) |

- JavaScript (pas de TypeScript) — plus simple à lire quand on a « quelques bases ».
- Aucune base de données, aucun serveur : **tout est statique**, généré à la compilation.
- Alias d'import : `@/…` pointe vers `src/…` (défini dans `jsconfig.json`).

---

## 4. Structure des fichiers

```
boutique/
├── public/
│   └── images/
│       ├── hero.jpg                  → image de la page d'accueil
│       ├── maison.jpg                → image de la page « La maison »
│       └── products/                 → ⭐ les photos des produits
│           ├── vase-solene.jpg
│           ├── plaid-laine-alpes.jpg
│           └── …
│
├── src/
│   ├── app/
│   │   ├── layout.js                 → structure commune (menu + pied de page)
│   │   ├── page.js                   → accueil
│   │   ├── globals.css               → ⭐ couleurs, polices, styles de base
│   │   ├── not-found.js              → page 404
│   │   ├── boutique/
│   │   │   ├── page.js               → tous les objets
│   │   │   └── [categorie]/page.js   → une page par catégorie
│   │   ├── produit/[slug]/page.js    → fiche produit
│   │   ├── nouveautes/page.js        → derniers arrivages
│   │   ├── maison/page.js            → histoire de la boutique
│   │   └── contact/page.js           → formulaire + coordonnées
│   │
│   ├── components/
│   │   ├── Header.js                 → ⭐ nom, bandeau, menu, mobile
│   │   ├── Footer.js                 → ⭐ adresse, liens, mentions
│   │   ├── ProductCard.js            → carte produit réutilisable
│   │   ├── ShopView.js               → grille + filtres par catégorie
│   │   ├── ButtonLink.js             → bouton/lien (3 variantes)
│   │   ├── Eyebrow.js                → petit label au-dessus des titres
│   │   └── ContactForm.js            → formulaire de contact
│   │
│   ├── data/
│   │   └── products.json             → ⭐⭐ TOUS LES PRODUITS
│   │
│   └── lib/
│       └── products.js               → fonctions de lecture des produits
│
├── scripts/
│   └── create-images.mjs             → génère les visuels de démo
│
├── next.config.mjs                   → configuration Next.js
├── package.json                      → dépendances + commandes
├── README.md                         → guide d'utilisation
└── INFOS-CLES.md                     → ce fichier
```

⭐ = fichiers que tu modifieras le plus souvent.

---

## 5. Les produits : mode d'emploi

### Où ? Un seul fichier : `src/data/products.json`

C'est une **liste** d'objets. Chaque objet = un produit. Le site, les pages
catégories et la page « Nouveautés » se mettent à jour automatiquement.

### Ajouter un produit — 2 étapes

**Étape 1 — la photo**

1. Dépose la photo dans `public/images/products/`
2. Nomme-la comme le `slug`, par exemple `lampe-lueur.jpg`
3. Format conseillé : **portrait 4:5** (1200 × 1500 px), moins de 500 Ko
4. Formats acceptés : `.jpg`, `.png`, `.webp`

**Étape 2 — la fiche**

Ajoute un bloc à la fin de la liste. ⚠️ N'oublie pas la **virgule** entre deux blocs.

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

### Le détail des champs

| Champ | Obligatoire | Rôle |
|---|---|---|
| `slug` | ✅ | Adresse de la page : `/produit/lampe-lueur`. Minuscules, sans accents ni espaces. Doit être **unique**. |
| `name` | ✅ | Nom affiché du produit. |
| `category` | ✅ | Catégorie du produit (voir ci-dessous). |
| `price` | ✅ | Prix en euros, **en nombre** : `120` et non `"120 €"`. |
| `isNew` | ✅ | `true` = badge « Nouveau » + présent dans « Nouveautés ». |
| `inStock` | ✅ | `false` = badge « Sur commande » sur la carte. |
| `image` | ✅ | Chemin de la photo, toujours `/images/products/…`. |
| `description` | ✅ | Texte de la fiche produit (1 à 3 phrases). |
| `details` | ✅ | Liste de précisions : matière, dimensions, entretien… |

### Catégories actuelles

`Céramique` · `Textile` · `Décoration` · `Bijoux`

Une page `/boutique/<catégorie>` est créée automatiquement pour chaque catégorie
présente dans le fichier. **Pour ajouter une catégorie**, utilise simplement un
nouveau nom dans `category` : la page et le filtre apparaissent tout seuls
(l'adresse est générée sans accents, ex. « Luminaire » → `/boutique/luminaire`).

### Supprimer un produit

Supprime son bloc `{ … }` dans `products.json` (et la virgule qui va avec).
L'image peut rester dans le dossier, elle ne sera simplement plus affichée.

### Vérifier son JSON

Après chaque modification, lance `npm run dev` : si une virgule ou un guillemet
manque, le site affiche une erreur en rouge. Le message indique la ligne.

---

## 6. Le design (couleurs, polices)

### Couleurs — `src/app/globals.css`

```css
--color-cream: #faf7f2;   /* fond général de la page */
--color-shell: #f2ece2;   /* fonds alternés (bandeaux, pied de page) */
--color-sand: #e6dccd;    /* fond derrière les photos */
--color-line: #ded4c5;    /* bordures et séparateurs */
--color-ink: #201b16;     /* texte principal (et boutons pleins) */
--color-muted: #7b7168;   /* texte secondaire, descriptions */
--color-accent: #a4552f;  /* accent : survols, liens actifs (terracotta) */
```

Change une valeur et **tout le site** suit. Pour un rendu plus coloré, modifie
surtout `--color-accent`.

### Polices — `src/app/layout.js`

| Usage | Police | Variable CSS |
|---|---|---|
| Titres, noms de produits | **Cormorant Garamond** (serif) | `--font-cormorant` |
| Texte courant | **Inter** (sans serif) | `--font-inter` |

Les deux sont chargées et auto-hébergées par `next/font/google` : aucune requête
vers Google, pas de décalage d'affichage.

### Règles de mise en page du site

- Largeur maximale du contenu : `max-w-6xl` (72 rem), marges `px-5` / `px-8`.
- Photos produits : **ratio 4:5** (`aspect-[4/5]`), coins très légèrement arrondis.
- Grille produits : 2 colonnes sur mobile, 3 sur tablette, 4 sur grand écran.
- Boutons : forme « pilule », texte en petites majuscules espacées.
- Petits labels au-dessus des titres : composant `Eyebrow`.

### Les 3 variantes de bouton (`src/components/ButtonLink.js`)

| Variante | Rendu | Usage |
|---|---|---|
| `primary` | fond encre, texte crème | action principale |
| `ghost` | contour fin | action secondaire |
| `light` | fond crème | sur fond sombre |

---

## 7. Les textes à personnaliser

| Ce que tu veux changer | Fichier | Repère |
|---|---|---|
| **Nom de la boutique** | `src/components/Header.js` | « Maison Léonie » (aussi dans `Footer.js` et `layout.js`) |
| Bandeau du haut | `src/components/Header.js` | « Livraison offerte dès 80 €… » |
| Adresse, horaires, liens du pied de page | `src/components/Footer.js` | constantes `columns` |
| Textes de l'accueil (hero, réassurance…) | `src/app/page.js` | constante `guarantees` |
| Histoire de la boutique | `src/app/maison/page.js` | constante `values` |
| Coordonnées de la page contact | `src/app/contact/page.js` | constante `infos` |
| Titre et description pour Google | `src/app/layout.js` | objet `metadata` |
| Titre d'onglet de chaque page | fichier `page.js` concerné | `export const metadata` |

> Le nom « Maison Léonie » apparaît à 4 endroits : `Header.js`, `Footer.js`,
> `layout.js` (métadonnées) et `README.md`. Cherche-le dans le projet pour le
> remplacer partout d'un coup.

### Référencement (SEO)

Chaque page possède déjà un titre et une description propres. Le modèle de titre
est défini dans `src/app/layout.js` :

```js
title: { default: "Maison Léonie — Objets pour la maison", template: "%s · Maison Léonie" }
```

Pour Google, le plus important est la **description** et le contenu réel des
fiches produits.

---

## 8. Ce qui est branché… et ce qui ne l'est pas

### ✅ Fonctionne

- Navigation sur toutes les pages, menu mobile
- Liste des produits, filtres par catégorie, fiches produits
- Badges « Nouveau » et « Sur commande »
- Titre/description par page (SEO), page 404 personnalisée
- Images optimisées automatiquement (format, taille, chargement différé)
- Site 100 % statique → très rapide

### ⚠️ Pas encore branché

| Fonction | État | Comment le brancher plus tard |
|---|---|---|
| **Formulaire de contact** | Affiche une confirmation, **n'envoie pas d'e-mail** | Formspree (le plus simple), Resend, ou une route API Next.js |
| **Panier** | Absent | Ajouter un `CartProvider` (React Context) + page panier |
| **Paiement** | Absent | Stripe Checkout, ou basculer sur Shopify / Snipcart |
| **Comptes clients** | Absent | Supabase (auth + base de données) |
| **Photos réelles** | Visuels de démonstration générés | Remplacer les fichiers dans `public/images/products/` |
| **Mentions légales / CGV** | Liens non présents | Créer `src/app/mentions-legales/page.js` et `cgv/page.js` |

> Le formulaire de contact est un composant client (`ContactForm.js`) qui fait
> `event.preventDefault()` puis affiche un message. C'est volontaire : aucun
> message n'est réellement envoyé tant qu'un service n'est pas branché.

---

## 9. Mettre le site en ligne

### Option A — Vercel (recommandé, gratuit)

1. Créer un compte sur <https://vercel.com> (connexion avec GitHub).
2. Pousser le dossier `boutique/` sur un dépôt GitHub.
3. Sur Vercel : *Add New → Project*, importer le dépôt.
4. Ne rien changer aux réglages (Vercel détecte Next.js tout seul) → *Deploy*.
5. Le site est en ligne sur `https://<nom-du-projet>.vercel.app` en 1 à 2 minutes.

Chaque `git push` redéploie automatiquement.

### Option B — en ligne de commande

```bash
npm i -g vercel
vercel          # première fois : connexion + questions
vercel --prod   # mise en production
```

### Nom de domaine

Sur Vercel : *Settings → Domains → Add*, puis suivre les instructions chez ton
registraire (OVH, Gandi, Namecheap…). Compter 10 à 15 € par an pour un `.fr`.
Le HTTPS est inclus et renouvelé automatiquement.

---

## 10. Checklist avant mise en ligne

- [ ] Remplacer les photos de démonstration par les vraies
- [ ] Remplacer « Maison Léonie » par le vrai nom (4 endroits + `layout.js`)
- [ ] Mettre la vraie adresse, les vrais horaires, le vrai e-mail (`Footer.js`, `contact/page.js`)
- [ ] Vérifier les prix et les descriptions des produits
- [ ] Brancher le formulaire de contact
- [ ] Ajouter les mentions légales et les CGV
- [ ] Vérifier l'affichage sur téléphone
- [ ] Lancer `npm run build` : aucune erreur ne doit apparaître
- [ ] Ajouter le site à Google Search Console (après la mise en ligne)

---

## 11. Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| Page blanche / erreur rouge | Erreur dans un fichier | Lire le message : il donne le fichier et la ligne |
| « Unexpected token » dans le JSON | Virgule ou guillemet manquant | Vérifier `products.json` (virgule entre les blocs, pas de virgule après le dernier) |
| Une photo ne s'affiche pas | Nom de fichier différent de `image` | Le chemin dans le JSON doit correspondre **exactement** au nom du fichier |
| Le port 3000 est occupé | Un autre serveur tourne | `npm run dev -- -p 3001` |
| Les modifications n'apparaissent pas | Serveur arrêté | Relancer `npm run dev` |
| `npm` non reconnu | Node.js pas installé | Installer Node.js 20+ depuis nodejs.org |
| Le site compile mais une page est vide | `slug` en double | Chaque `slug` doit être unique |

---

## 12. Décisions prises et pourquoi

| Décision | Pourquoi |
|---|---|
| **Next.js** plutôt que HTML/CSS pur | Gérer une liste de produits, des filtres et des pages générées devient vite pénible en HTML statique. |
| **Next.js** plutôt que WordPress | Pas d'hébergement payant, pas de mises à jour de sécurité, ajout de produit via un fichier lisible. |
| **Next.js** plutôt que Shopify | Shopify est payant et inutile puisqu'il n'y a ni panier ni paiement pour l'instant. |
| **Tailwind CSS** | Style directement dans les composants, plus rapide à modifier, aucune feuille de style qui grossit. |
| **JavaScript** plutôt que TypeScript | Objectif : rester lisible avec « quelques bases ». |
| **Produits dans un fichier JSON** | Ajouter un arrivage = copier 12 lignes. Aucune base de données, aucune sauvegarde à gérer. |
| **Aucune fonctionnalité de panier** | Décision du client : catalogue seul pour démarrer. |
| **Images de démonstration générées** | Permettre de voir un site fini immédiatement, avant d'avoir les vraies photos. |
| **Polices auto-hébergées** | Conformité RGPD (pas d'appel à Google) + chargement plus rapide. |

### Évolutions prévues quand le projet grandira

1. Brancher le formulaire de contact (Formspree, 10 minutes).
2. Ajouter les vraies photos.
3. Ajouter un panier simple (React Context + `localStorage`).
4. Ajouter Stripe Checkout pour le paiement.
5. Si les produits deviennent nombreux ou changent souvent : Supabase
   (base de données + petite interface d'administration).

---

## 13. Notes techniques du projet

Ces points sont déjà réglés dans le code, mais il faut les connaître avant de
modifier certaines choses.

### `next.config.mjs`

```js
cacheComponents: true,
partialPrefetching: true,
```

Nouveauté de Next.js 16 : le rendu est **dynamique par défaut** et on choisit ce
qui est mis en cache. Conséquence concrète : **les valeurs qui changent à chaque
rendu sont interdites pendant la génération statique**.

### ⚠️ `new Date()` interdit au rendu

Utiliser `new Date()` dans un composant serveur fait échouer le build :

```
Next.js encountered the unstable value `new Date()` while prerendering.
```

C'est pour cela que l'année du pied de page est **écrite en dur** (`© 2026`) dans
`src/components/Footer.js`. Si tu veux l'année automatique, il faut soit la
calculer côté client (`"use client"`), soit mettre à jour la constante à la main.

### `export const instant = false`

Présent dans `src/app/boutique/[categorie]/page.js` et
`src/app/produit/[slug]/page.js`. C'est une **indication de navigation** :
ces pages lisent `params` et Next.js signale en développement qu'elles ne
peuvent pas être « instantanées » au sens strict. Le `false` évite un
avertissement dans le terminal. Cela n'a aucun impact sur les performances :
ces pages sont **entièrement générées à la compilation**.

### Routes dynamiques et `generateStaticParams`

- `src/app/produit/[slug]/page.js` liste tous les `slug` du JSON
- `src/app/boutique/[categorie]/page.js` liste toutes les catégories

C'est ce qui transforme chaque produit et chaque catégorie en page statique.
**Rien à faire manuellement** : ajouter un produit crée sa page au build suivant.

### `params` est asynchrone

Depuis Next.js 16, les `params` doivent être attendus :

```js
export default async function Page({ params }) {
  const { slug } = await params;
}
```

### Images

- Composant `next/image` partout, avec `fill` + un conteneur en `aspect-[4/5]`.
- Les images de `public/` sont référencées depuis la racine (`/images/...`).
- Les fichiers sont optimisés automatiquement à la demande par le serveur Next.
- `npm run images` régénère les visuels de démonstration (script `sharp`).

### Fichiers générés (à ne pas versionner)

`.next/` et `node_modules/` sont ignorés par Git (`.gitignore`). Ne les modifie
jamais à la main ; ils se reconstruisent tout seuls.

### Git

Un dépôt Git a été initialisé à la création du projet. Pour faire un point :

```bash
git add -A
git commit -m "Catalogue Maison Léonie : version initiale"
```

---

## Résumé ultra-court

- **Lancer** : `npm run dev` → http://localhost:3000
- **Ajouter un produit** : `src/data/products.json` + photo dans `public/images/products/`
- **Changer les couleurs** : `src/app/globals.css`
- **Changer le nom/adresse** : `Header.js` + `Footer.js`
- **Publier** : GitHub → Vercel
- **Pas encore fait** : envoi du formulaire, panier, paiement, mentions légales
