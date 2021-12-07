import React from 'react';
import ReactDOM from 'react-dom';

export default function SayHelloFromB({ message }) {
  return (
      <>
        <h1>Hello from Application B!</h1>
        <h2>React version {React.version}. React DOM version {ReactDOM.version}</h2>
        <h2>{message}</h2>
      </>
  );
}
