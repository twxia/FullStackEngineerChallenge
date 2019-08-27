import { css } from 'styled-components';
import { darken } from 'polished';

export const clickableStyle = ({
  color,
  bgColor,
  borderColor,
}: {
  color?: string;
  bgColor?: string;
  borderColor?: string;
}) => css`
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  &:hover {
    ${color && `color: ${darken(0.05, color)}`};
    ${bgColor && `background-color: ${darken(0.05, bgColor)}`};
    ${borderColor && `border-color: ${darken(0.05, borderColor)}`};
  }
  &:active {
    ${color && `color: ${darken(0.05, color)}`};
    ${bgColor && `background-color: ${darken(0.05, bgColor)}`};
    ${borderColor && `border-color: ${darken(0.05, borderColor)}`};
  }
`;
