# FEDET Épicerie Solidaire – Application Mobile

## 📌 Présentation / Overview

**FR**  
Cette application mobile fait partie du projet **FEDET Épicerie Solidaire**, développé pour la **Fédération des Étudiants Toulonnais (FEDET)**.  
Elle permet aux étudiants de créer un compte, enregistrer leur carte étudiante, générer un QR Code personnel et participer à des distributions alimentaires.  
Elle est développée avec **Ionic 7** et **Angular 19**, et déployée sur **Android**, **iOS** et **PWA**.

**EN**  
This mobile application is part of the **FEDET Épicerie Solidaire** project, developed for the **Fédération des Étudiants Toulonnais (FEDET)**.  
It allows students to create an account, register their student card, generate a personal QR code, and participate in food distributions.  
Built with **Ionic 7** and **Angular 19**, deployed on **Android**, **iOS**, and as a **PWA**.

---

## 🛠️ Stack Technique / Tech Stack

- **Ionic 7**
- **Angular 19**
- **Capacitor**
- **Node.js 20** + **npm**
- **JWT Authentication**
- **ESLint / Prettier** pour la qualité du code
- **Karma / Jasmine** pour les tests unitaires

---

## 🚀 Installation & Lancement / Installation & Run

### **Prérequis / Requirements**

- Node.js 20
- npm
- Ionic CLI installé globalement :
  ```bash
  npm install -g @ionic/cli
  ```

### **Lancement en développement / Run in Development**

```bash
# Cloner le dépôt / Clone the repository
git clone https://github.com/Imparfa/fedet-epicerie-app.git
cd fedet-epicerie-app

# Installer les dépendances / Install dependencies
npm install

# Lancer l'app / Start the app
ionic serve
```

L’application sera accessible dans le navigateur par défaut, et le rechargement à chaud sera activé.

---

## ⚙️ Configuration / Configuration

La configuration de l’URL de l’API et autres paramètres se fait via les fichiers d’environnement Angular :

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Exemple :

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};
```

---

## 📱 Build Mobile / Mobile Build

### Android

```bash
ionic build
npx cap sync android
npx cap open android
```

### iOS

```bash
ionic build
npx cap sync ios
npx cap open ios
```

---

## 📚 Fonctionnalités / Features

**Étudiants / Students**

- Création et connexion de compte
- Enregistrement carte étudiante
- Génération et affichage de QR Code unique
- Historique des collectes
- Choix du moyen de paiement

**Administrateurs / Administrators**

- Scan QR Codes
- Validation des passages
- Gestion des utilisateurs et points de distribution
- Consultation de statistiques

---

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm run test
```

- **Karma / Jasmine** pour les tests unitaires
- **ESLint** pour la qualité du code

---

## 🔗 Projet Associé / Related Project

- **API Java Spring Boot** : [fedet-epicerie-api](https://github.com/Imparfa/fedet-epicerie-api)

---

## 🤝 Contribution / Contributing

1. Forkez le projet
2. Créez une branche (`feature/ma-fonctionnalite`)
3. Committez vos modifications
4. Poussez la branche
5. Ouvrez une Pull Request

---

## 📄 Licence

© 2025 FEDET – Tous droits réservés / All rights reserved
