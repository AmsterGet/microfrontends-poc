import React from 'react';
import ReactDOM from 'react-dom';

export default function SayHelloFromC({ message }) {
  return (
      <>
        <h1>Hello from Application C!</h1>
        <h2>React version {React.version}. React DOM version {ReactDOM.version}</h2>
        <h2>{message}</h2>
      </>
  );
}
