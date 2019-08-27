import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { colors } from './constants';

function ThemeProviderComponent({ children }) {
  return (
    <ThemeProvider
      theme={{
        ...colors,
      }}
    >
      <React.Fragment>
        <GlobalStyle />
        {children}
      </React.Fragment>
    </ThemeProvider>
  );
}

export default ThemeProviderComponent;
