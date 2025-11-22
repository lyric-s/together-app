# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## How to properly name commits 

### `<prefix>: <JIRA-1> <commit message>`

`prefix` is **meant to be replaced** by one of the expected prefixes which can be found in the section below, it is **mandatory** to put one. 

`JIRA-1` is an example **meant to be replaced** by the actual ticket name, in capital letters, related to the work being done on the branch. \
If the branch you are committing on is **not linked** to a JIRA ticket, just write the message; otherwise, you **must** include the ticket name. 

`commit message` is **meant to be replaced** and must have **no capital letters**. It should be no more than a **short, but clear, sentence**.

## Expected prefixes

### `feat:`
Introduces a **new feature**.

### `fix:`
A **bug fix**.

### `build:`
Changes that affect the **build system or external dependencies**.

### `chore:`
Routine tasks that **don’t affect source or test code** (e.g., maintenance, cleanup).

### `ci:`
Changes to **continuous integration configuration** (CI scripts, workflows).

### `docs:`
Documentation-only changes.

### `style:`
Code changes that **don’t affect meaning** (formatting, whitespace, semicolons).

### `refactor:`
Code changes that **neither fix bugs nor add features** (structural improvements).

### `perf:`
Code changes that **improve performance**.

### `test:`
Adding or modifying **tests**.

### `revert:`
Reverts a previous commit.

## Breaking Changes

### **BREAKING CHANGE:** (footer)
A footer indicating a **breaking API change** → major SemVer bump.

### **! after type**
Alternative breaking-change notation:  
Example: `feat!: change API behavior` 

[source: conventional commits organization website](https://www.conventionalcommits.org/en/v1.0.0/#specification)
