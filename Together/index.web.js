// index.web.js
import { AppRegistry } from 'react-native';
import App from './App'; // Ton fichier App.js ou App.tsx
import { name as appName } from './app.json';

// Registre l'application pour qu'elle fonctionne sur le web
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
