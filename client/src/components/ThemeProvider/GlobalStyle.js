import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  body {
    color: ${props => props.theme.text};
    font-family: 'Lato', 'Open Sans', 'PingFangTC', 'Arial', 'Heiti TC', 'Microsoft Jhenghei', sans-serif;
  }
`;

export default GlobalStyle;