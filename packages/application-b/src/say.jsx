import React from 'react';
import ReactDOM from 'react-dom';

export default function SayHelloFromB2() {
    return (
        <>
            <h1>Hello from Application B 2!</h1>
            <h2>React version {React.version}. React DOM version {ReactDOM.version}</h2>
        </>
    )
}
