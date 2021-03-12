import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 0 4px 0 4px;
  margin: ${props => props.theme.marginSpacing};
  background-color: ${props => props.theme.pageBackground};
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  transition: ${props => props.theme.transitionTime}; 
`;

const Title = styled.h1`
  font-size: 42px;
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 
`;

const ThemeToggler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: 50px;
  padding: 0 6px 0 6px;
  transition: ${props => props.theme.transitionTime}; 
`;

const ToggleBall = styled.div`
  position: absolute;
  left: ${props => props.theme.themeColor === 'light' ? '30px' : '3px'};
  width: 22px;
  height: 22px;
  border-radius: 50px;
  background-color: ${props => props.theme.pageBackground};
  border: 3px solid ${props => props.theme.borderColor};
  transition: ${props => props.theme.transitionTime}; 
`;


const Navbar = ({ setColorTheme }) => {

  return (
    <Page>
      <Title>Coin Tracker</Title>
      <ThemeToggler>
        <span onClick={() => setColorTheme('dark')}>🌜</span>
        <span onClick={() => setColorTheme('light')}>🌞</span>
        <ToggleBall></ToggleBall>
      </ThemeToggler>
    </Page>
  )
}

export default Navbar
