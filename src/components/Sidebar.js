import { useState, useEffect } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  height: 100%;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};

  @media screen and (max-width: 600px) {
    margin-bottom: 4px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownControl = styled.div`
  padding: 4px;
  margin: auto;
  border-bottom: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownSelection = styled.input`
  border: none;
  outline: none;
  padding: 4px;
`;

const DropdownArrow = styled.div`

`;

const DropdownOptions = styled.div`
  width: 100%;
  max-height: 195px;
  position: absolute;
  overflow-y: auto;
  top: 100%;
  background-color: #999;
  z-index: 1000;
`;

const Option = styled.div`
  display: block;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`;



const Sidebar = ({ coins, coinsClicked, addCoin }) => {

  // dropdown open or closed
  const [open, setOpen] = useState(false);
  // store user search
  const [userSearch, setUserSearch] = useState('');

  // when escape key clicked, close dropdown menu, reset userSearch
  const closeMenu = (e) => {
    if (e.keyCode === 27) {
      setOpen(false);
      setUserSearch('');
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeMenu);
    return () => document.removeEventListener('keydown', closeMenu);
  }, []);

  console.log(userSearch);

  return (
    <SidebarContainer>
      <DropdownContainer>
        <DropdownControl onClick={() => setOpen(!open)}>
          <DropdownSelection
            type='text'
            placeholder='Search coin...'
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <DropdownArrow>{open ? '🔼' : '🔽'}</DropdownArrow>
        </DropdownControl>
        <DropdownOptions>
          {open && coins.map(coin => {
            return (
              <Option
                key={coin.id}
                onClick={() => {
                  addCoin(coin);
                  setOpen(false);
                  setUserSearch('');
                }}
              >
                {coin.abbr}
              </Option>
            )
          })}
        </DropdownOptions>
      </DropdownContainer>
      {coinsClicked.length > 0 && coinsClicked.map(coin => {
        return (
          <div key={coin.id}>
            {coin.abbr}
          </div>
        )
      })}
    </SidebarContainer>
  )
}

export default Sidebar
