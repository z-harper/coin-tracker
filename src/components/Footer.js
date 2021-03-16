import styled from 'styled-components';

const FooterContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 50px;
padding: 0 4px;
margin: 8px 4px;
background-color: ${props => props.theme.pageBackground};
border: 3px solid ${props => props.theme.borderColor};
border-radius: ${props => props.theme.borderRadius};
color: ${props => props.theme.titleColor};
transition: ${props => props.theme.transitionTime}; 
`;


const Footer = () => {
  return (
    <FooterContainer>
      <h3>Powered by CoinGecko API</h3>
    </FooterContainer>
  )
}

export default Footer
