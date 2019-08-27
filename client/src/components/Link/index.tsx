import React from 'react';
import styled, { css } from 'styled-components';
import { Link as InternalLink } from 'react-router-dom';
import { clickableStyle } from '../../constants/styles';

const linkStyle = css`
  color: inherit;

  ${props =>
    clickableStyle({
      color: props.theme.blue,
    })}
`;

const ExternalLink = styled.a`
  ${linkStyle}
`;

const StyledInternalLink = styled(InternalLink)`
  ${linkStyle}
`;

function Link({
  to = '',
  target = '_blank',
  children,
  className,
}: {
  to: string;
  target?: string;
  children?: JSX.Element | string;
  className?: string;
}) {
  if (to.match(/https?:\/\//)) {
    return (
      <ExternalLink
        data-testid={'external-link'}
        className={className}
        href={to}
        rel="noopener noreferrer"
        target={target}
      >
        {children}
      </ExternalLink>
    );
  }
  return (
    <StyledInternalLink
      data-testid={'internal-link'}
      className={className}
      to={to}
    >
      {children}
    </StyledInternalLink>
  );
}

export default Link;
