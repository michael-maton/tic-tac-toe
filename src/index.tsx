import React, { ReactElement } from 'react';
import { Text, AppBootstrap } from '@components';

export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <Text
        onPress={() => {
          alert('hello');
        }}
        style={{ fontSize: 25 }}
      >
        Hello World!
      </Text>
    </AppBootstrap>
  );
}
