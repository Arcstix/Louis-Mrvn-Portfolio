# Portfolio · Louis Morvan

Portfolio de Game Programmer en HTML / CSS / JS pur, sans framework, hébergé sur GitHub Pages.
La page d'accueil contient une **machine à sous** : chaque tirage de levier donne une carte
(compétence, projet ou info de profil), sans doublon, à collectionner sur `collection.html`.

## Structure

```
index.html        Accueil : machine à cartes + intro, projets, qui suis-je, parcours, contact
project.html      Page détaillée d'un projet (project.html?id=<id>)
collection.html   Cartes obtenues / toutes les cartes
css/style.css     Styles (couleurs en variables dans :root)
js/data.js        TOUT le contenu du site (projets, parcours, liens) ← à modifier
js/site.js        Génère les pages à partir de data.js
js/cards.js       Cartes : tirage, sauvegarde, rendu, page Collection
js/slots.js       La machine à sous (levier, rouleaux, éjection, révélation)
js/theme.js       Mode jour / nuit
js/i18n.js        Langue FR / EN + textes fixes de l'interface
js/data.en.js     Traductions anglaises du contenu de data.js
js/bg.js          Fond animé (colonnes de code qui défilent)
assets/           CV (CV_Louis_Morvan.pdf), images de couverture, logos des cartes
```

## Mettre à jour le contenu

Tout se passe dans `js/data.js` :
- **Ajouter un projet** : copier un bloc dans `projects`, changer `id` (sans espaces ni accents).
- **Trailer** : `youtube: "ID"` (la partie après `v=` dans l'URL YouTube).
- **Widget itch.io** : `itchEmbed: "1234567"` (page du jeu → Edit game → Distribute → Embed game).
- **Couverture** : mettre une image dans `assets/` et `cover: "assets/mon-jeu.jpg"`.
  Sans couverture, la miniature YouTube est utilisée, sinon un visuel est généré.
- **CV** : remplacer `assets/CV_Louis_Morvan.pdf` (même nom de fichier).

## Tester en local

```bash
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier sur GitHub Pages

1. Créer un dépôt public nommé **`<pseudo>.github.io`** (site à la racine : `https://<pseudo>.github.io`).
2. Pousser ces fichiers à la racine de la branche `main`.
3. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch → `main` / `(root)`**.
4. Le site est en ligne au bout d'une minute environ.

Le fichier `.nojekyll` désactive Jekyll (inutile ici).

## Les cartes

Dans `js/data.js`, tableau `cards` :
- `rarity` : `gold`, `silver` ou `bronze`. Les chances dépendent des poids dans `rarity`
  (Or = 1, Argent = 2,5, Bronze = 5 par défaut).
- `icon` : logo de la carte, par ex. `assets/cards/unity.png` (PNG transparent conseillé).
  Sans icône, un monogramme (`glyph`) est affiché dans la couleur `color`.
- `kind: "project"` + `project: "<id du projet>"` : la carte reprend le titre et l'image
  du projet, et renvoie vers sa page.
- Le tirage est **pondéré et sans remise** : une carte obtenue ne peut plus sortir.
- La collection est sauvegardée dans le navigateur du visiteur (localStorage).
  La page Collection propose « Tout révéler » pour les recruteurs pressés, et une remise à zéro.

## Version anglaise

- Le bouton **FR / EN** en haut de chaque page change la langue. Le choix suit d'une page à l'autre.
- Par défaut : français si le navigateur du visiteur est en français, anglais sinon.
- **Contenu** (projets, cartes, parcours, « Qui suis-je ») : `js/data.en.js`, rangé par `id`.
  Quand tu ajoutes un projet ou une carte dans `data.js`, ajoute sa traduction dans `data.en.js`
  avec le même `id`. S'il manque une traduction, le texte français s'affiche.
- **Parcours** : les entrées de `timeline` dans `data.en.js` sont dans le même ordre que dans `data.js`.
- **Textes de l'interface** (menus, boutons, titres) : dictionnaire `STRINGS` dans `js/i18n.js`.
