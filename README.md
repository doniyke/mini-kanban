# 3d-aim-trainer-coding-test-mini-kanban
>This project is to : Create a minimal Kanban board on which users can create, view and move tickets between columns and interract with an API

## Setup on Local Device

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### To setup project on your local device for test run, please follow the process below:

>1. Clone or Download project repository into your local system via cli/terminal or any of the avialable github options
>2. Navigate to project cloned directory on your local system from your termimal
>3. Install npm to get complete project dependencies using the command below

### Project setup and dependencies installation
```
npm install
```

### Local Database Setup Information
> Note: JSON Server was used on this project to create a local database. All tickets are stored in this local database as the fake backend, therefore project will not run properly if database is not setup.

>You can setup and run the JSON server using the details below:
#### Install JSON Server from terminal using the command below
```
npm install -g json-server
```
#### Open terminal in project root and run the command below to start the server:
```
json-server --watch db.json
```
>The current url and port address for JSON Server on this project is : http://localhost:3000. If you are running JSON Server on a different port please change and upadte the port from the main.js file.

> For more details on JSON Server setup visit :(https://github.com/typicode/json-server)


### To Run Project, Compile and Hot-Reload for Development: Open New Terminal In Root Of The Project And Run The Command Below

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
