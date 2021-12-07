export const appDescriptors = [
    {
        name: 'Extension name 1',
        downloadURL: "http://localhost:3002/lib_app.js",
        scope: "library_app",
        moduleName: "./SayHelloFromB",
        title: 'Load App 2 Component 1 Message',
    },
    {
        name: 'Extension name 2',
        downloadURL: "http://localhost:3002/lib_app.js",
        scope: "library_app",
        moduleName: "./SayHelloFromB2",
        title: 'Load App 2 Component 2 Message',
    },
    {
        name: 'Extension name 3',
        downloadURL: "http://localhost:3003/component_app.js",
        scope: "component_app",
        moduleName: "./SayHelloFromC",
        title: 'Load App 3 Message',
    },
];
