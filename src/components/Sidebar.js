import { useRef } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  height: 100%;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};

  @media screen and (max-width: 600px) {
    margin-bottom: 4px;
  }
`;

const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.input`
  margin: 18px 4px;
  padding: 4px 6px;
  width: 90%;
  max-width: 200px;
  font-size: 16px;
  outline: none;
  border: 1px solid ${props => props.theme.borderColor}; 
  border-radius: ${props => props.theme.borderRadius};
  color: #37474f;
`;



const Sidebar = ({ userSearchResults, userSearchTerm, searchHandler }) => {

  const userInput = useRef('');

  // reads user search input on change and passes back to App.js
  const getUserSearch = () => {
    searchHandler(userInput.current.value);
  }

  return (
    <SidebarContainer>
      <SearchBarContainer>
        <SearchBar
          ref={userInput}
          type='text'
          placeholder='Search coins...'
          value={userSearchTerm}
          onChange={getUserSearch}
        />
      </SearchBarContainer>
      {userSearchResults.length < 1 ? 'Coin not found' :
        userSearchResults.map((coin) => {
          return (
            <div key={coin.abbr}>
              {coin.name}
            </div>
          )
        })}
    </SidebarContainer>
  )
}

export default Sidebar
