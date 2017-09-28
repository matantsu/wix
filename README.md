## Wix Task Solution

# Features:
- React
- TypeScript
- Webpack
- Redux
- [Semantic-ui](http://semantic-ui.com) for the good looks
- Mobile friendly
- Written in a very functional style
- Pagination
- [redux-thunk](https://github.com/gaearon/redux-thunk) for side-effects (reddit api request)
- reddit.js

# Files Overview:
- `app.tsx` - Defines the entry point to the app and connects the redux store to the `Main` component.
- `effects.ts` - Defines the side-effecting(non-pure) operations we do in the app. 
  Each operation returns a thunk that is passed to `dispatch` to be handled by the `redux-thunk` middleware.
- `store.ts` - Defines the business logic of the app through the types, actions, and reducer. Exposes the store to be consumed by the     rest of the app.
- `views.tsx` - Defines the different components as functions on the current state.

## Usage

Note: Run commands from the root folder of the cloned repository.

To build the project from the command-line:

* Install [Node.js](https://nodejs.org/)
* `npm install`
* `npm run build`

To view the app in the browser:

* `npm install -g local-http-server`
* `ws -d public`
* Open [http://localhost:8080/](http://localhost:8080/) in your browser of choice.

To develop using Visual Studio Code:

* Install [Visual Studio Code](https://code.visualstudio.com/).
* Open the root folder of the cloned repository.
* The `tasks.json` file is configured to run the TypeScript compiler in watch mode. Press Cmd+Shift+B on Mac or Ctrl+Shift+B on Windows or Linux to start the watcher.

To instantly view changes in the browser while developing:

* Run `npm run dev` in a terminal. This will start both `webpack` in watch mode and `local-http-server`. Hint: Visual Studio Code contains a built-in terminal.
