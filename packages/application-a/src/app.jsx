import React from 'react';
import ReactDOM from 'react-dom';

import DynamicContentBlock from './dynamicContentBlock';

export default function SayHelloFromA() {
  return (
      <>
        <h1>Hello from Application A!</h1>
        <h2>React version {React.version}. React DOM version {ReactDOM.version}</h2>
        <DynamicContentBlock />
      </>
  );
};
