# Front-end questionnaire de satisfaction Va'a

## Pré-requis

- Git
- Node.js v20 ou supérieur
- NPM

## Installation

````shell
git clone git@github.com:BaptisteGrauer/questionnaire-vaa-front.git
cd questionnaire-vaa-front
npm install
````

## Serveur local

Pour lancer le site sur l'ordinateur
````shell
npm run dev
````

## Déployer sur serveur de prod

````shell
npm run build
npm run start
````

Pour rendre accessible le site via un nom de domaine, créez un reverse proxy du nom de domaine ver ``localhost:3000`` sur le serveur de prod.


## Variables d'environnement

Dans le fichier ``.env``, changer avec l'URL du back-end pour que le front puisse s'y connecter.

````
NEXT_PUBLIC_API_URL=https://localhost:8000/
````

Dans le cas d'un déploiement en production, créer le fichier ``.env.production`` et copier le contenu ci-dessus avec l'URL du back-end de production.