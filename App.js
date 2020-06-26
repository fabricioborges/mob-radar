import React from 'react';
import { StatusBar } from 'react-native';

import Main from './src/pages/Main';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0ef065" />
      <Main/>
    </>
  );
}
