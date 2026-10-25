# Portfolio · Louis Morvan

Portfolio de Game Programmer en HTML / CSS / JS pur, sans framework, hébergé sur GitHub Pages.
La page d'accueil contient une **machine à sous** : chaque tirage de levier donne une carte
(compétence, projet ou info de profil), sans doublon, à collectionner sur `collection.html`.

## Structure

```
index.html        Accueil : machine à cartes + intro, projets, qui suis-je, parcours, contact
project.html      Page détaillée d'un projet
collection.html   Cartes obtenues / toutes les cartes
css/style.css     Styles (couleurs en variables dans :root)
js/data.js        TOUT le contenu du site (projets, parcours, liens)
js/site.js        Génère les pages à partir de data.js
js/cards.js       Cartes : tirage, sauvegarde, rendu, page Collection
js/slots.js       La machine à sous
js/theme.js       Mode jour / nuit
js/i18n.js        Langue FR / EN + textes fixes de l'interface
js/data.en.js     Traductions anglaises du contenu de data.js
js/bg.js          Fond animé
assets/           CV, images de couverture, logos des cartes
```
