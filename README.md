# Whattodo!

### Web Application that uses Supabase as backend/REST API

To run the application, you must first install the dependencies:

```bash
$ npm install # or pnpm install or yarn install
```

Second, you must create an environment variable (.env) file that contains your Supabase credentials. The file configuration should be as follows:

```bash
VITE_SUPABASE_URL=xxxx
VITE_SUPABASE_ANON_KEY=xxxx
```

In development mode, you must type the command in the project root:

```bash
$ npm run dev # or pnpm run dev or yarn run dev
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

To build the application and eventually deploy it, you must type the command in the project root:

```bash
$ npm run build # or pnpm run build or yarn run build
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Version Desktop of the application ("desktop" branch of the repository)

Screenshot:

<img src="https://user-images.githubusercontent.com/68773736/234257566-19ae83ab-ea83-4736-9816-e367cc75798d.png" width="75%">

To run the application, you must first install the dependencies:

```bash
$ npm install # or pnpm install or yarn install
```

In development mode, you must type the command in the project root:

```bash
$ npm run tauri dev # or pnpm tauri dev or yarn tauri dev
```

To build the application and eventually deploy it, you must type the command in the project root:

```bash
$ npm run build # or pnpm tauri build or yarn tauri build
```

The executables will be generated in the path "./src-tauri/target/release/bundle/" of the project.
