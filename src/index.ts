import App from './App.js';
const env = 'prod';
const app = new App();
await app.run(env);
