# microfrontends-poc

Microfrontends POC using Webpack Modules Federation.

## How to run

Install the dependencies
```bash
yarn
```
Run the applications in development mode
```bash
yarn dev
```

The `packages` dir contains three applications. <br/>
The main **application-a** responsible for loading others in runtime.  <br/>
Descriptors for remote micro-applications can be loaded separately <br/>
and can serve as a contract interface between applications. <br/>
To simplify the example descriptors presented in `appDescriptors.js` file  <br/>
The libs used in the main application (such as `react`, `react-dom`) shared with other apps, <br/>
but every app can use its own lib version if needed.  <br/>
