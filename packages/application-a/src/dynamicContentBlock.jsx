import React from "react";

import { appDescriptors } from './appDescriptors';

const loadedApps = [];

function loadComponent(scope, moduleName) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__("default");

        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(moduleName);
        const Module = factory();
        return Module;
    };
}

const useDynamicScript = (args) => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!args.downloadURL || loadedApps.indexOf(args.downloadURL) !== -1) {
            return;
        }

        const element = document.createElement("script");

        element.src = args.downloadURL;
        element.type = "text/javascript";
        element.async = true;

        setReady(false);
        setFailed(false);

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.downloadURL}`);
            loadedApps.push(args.downloadURL);
            setReady(true);
        };

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.downloadURL}`);
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            console.log(`Dynamic Script Removed: ${args.downloadURL}`);
            document.head.removeChild(element);
        };
    }, [args.downloadURL]);

    return {
        ready,
        failed,
    };
};

function ComponentLoader(props) {
    if (!props.descriptor) {
        return <h2>No active app</h2>;
    }

    const {
        downloadURL,
        scope,
        moduleName,
    } = props.descriptor;
    const { ready, failed } = useDynamicScript({
        downloadURL: downloadURL,
    });

    if (!ready) {
        return <h2>Loading dynamic script: {downloadURL}</h2>;
    }

    if (failed) {
        return <h2>Failed to load dynamic script: {downloadURL}</h2>;
    }

    const Component = React.lazy(loadComponent(scope, moduleName));

    return (
        <React.Suspense fallback="Loading Wrapper">
            <Component message="There is a message from Application A! Please just show it!" />
        </React.Suspense>
    );
}

function DynamicContentBlock() {
    const [activeApp, setActiveApp] = React.useState(undefined);

    return (
        <div
            style={{
                fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            }}
        >
            <h1>Dynamic System Host</h1>
            <h2>App 1</h2>
            <p>
                The Dynamic System will take advantage Module Federation{" "}
                <strong>remotes</strong> and <strong>exposes</strong>. It will no load
                components that have been loaded already.
            </p>
            {appDescriptors.map((descriptor) => (
                <button key={descriptor.name} onClick={() => setActiveApp(descriptor)}>
                    {descriptor.title}
                </button>
            ))}
            <div style={{ marginTop: "2em" }}>
                <ComponentLoader descriptor={activeApp} />
            </div>
        </div>
    );
}

export default DynamicContentBlock;
