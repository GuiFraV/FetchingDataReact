# README

## Description du Projet

Ce projet est une application React simple qui utilise l'API `https://jsonplaceholder.typicode.com/` pour récupérer et afficher des posts. Il illustre comment gérer la récupération de données asynchrone, la gestion des erreurs, et la pagination dans une application React.

## Mise en place du mécanisme de contrôle de concurrence avec `useRef`

Dans ce projet, j'utilise `useRef` pour maintenir une référence à un `AbortController`, qui est utilisé pour annuler les requêtes HTTP précédentes chaque fois qu'une nouvelle requête est initiée. Ceci est un exemple d'un mécanisme de contrôle de concurrence qui assure que seulement la requête la plus récente est traitée, évitant ainsi les conditions de course qui pourraient survenir si les requêtes étaient traitées dans un ordre imprévisible.

Voici comment cela fonctionne :

1. Une référence à un `AbortController` est créée et stockée dans `abortControllerRef` avec `useRef`.
```javascript
   const abortControllerRef = useRef<AbortController | null>(null);
```

2. Dans le `useEffect` qui déclenche la récupération des données, l'AbortController courant est annulé (s'il existe) et un nouveau AbortController est créé chaque fois que la fonction `fetchPosts` est appelée.
```javascript
   abortControllerRef.current?.abort();
   abortControllerRef.current = new AbortController();
```

3.Lors de l'envoi de la requête HTTP avec `fetch`, le signal de l'`AbortController` courant est passé en option à `fetch`, permettant ainsi d'annuler la requête si nécessaire.
```javascript
   const response = await fetch(`${BASE_URL}posts?page=${page}`, {
   signal: abortControllerRef.current?.signal,
   });
```

4. Si une erreur AbortError est attrapée dans le bloc `catch`, cela signifie que la requête a été annulée et rien d'autre n'est fait.

```javascript
   if (e.name === "AbortError") {
   console.log('Aborted');
   return;
   }
```

Ce mécanisme assure que si l'utilisateur change de page avant que la requête HTTP précédente ne soit terminée, cette requête est annulée, évitant ainsi une condition de course où les données de la requête précédente pourraient écraser les données de la requête courante.

## Démarrage du Projet

Pour démarrer le projet, suivez les étapes suivantes :

1. Clonez le dépôt dans votre machine locale.
2. Naviguez vers le dossier du projet via la ligne de commande.
3. Installez les dépendances avec la commande `npm install`.
4. Démarrez l'application avec la commande `npm start`.
5. Ouvrez votre navigateur et accédez à `http://localhost:5173` pour voir l'application en action. 

## Structure du Code

Le code est structuré autour du composant principal `App`, qui gère l'état des posts, le chargement, les erreurs et la pagination. J'utilise `useState` pour gérer l'état, `useEffect` pour déclencher la récupération des données, et `useRef` pour maintenir une référence à l'`AbortController` utilisé pour le contrôle de concurrence.
