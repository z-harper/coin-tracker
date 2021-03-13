import { useState, useRef, useEffect } from 'react';
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
  border: 1px solid red;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownSelection = styled.div`

`;

const DropdownArrow = styled.div`

`;

const DropdownOptions = styled.div`
  width: 100%;
  max-height: 195px;
  position: absolute;
  overflow-y: auto;
  top: 100%;
  background-color: #fff;
  z-index: 1000;
`;

const Option = styled.div`
  display: block;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`;



const Sidebar = ({ coins, coinsClicked, addCoin, searchKeyword }) => {

  // dropdown open or closed
  const [open, setOpen] = useState(false);
  // search input
  const searchInput = useRef('');

  // when escape key clicked, close dropdown menu
  const closeMenu = (e) => {
    if (e.keyCode === 27) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeMenu);
    return () => document.removeEventListener('keydown', closeMenu);
  }, []);

  return (
    <SidebarContainer>
      <DropdownContainer>
        <DropdownControl onClick={() => setOpen(!open)}>
          <DropdownSelection>
            <input
              type='text'
              placeholder='Search coin...'
              ref={searchInput}
              onChange={() => { searchKeyword(searchInput.current.value) }}
            />
          </DropdownSelection>
          <DropdownArrow>{open ? '🔼' : '🔽'}</DropdownArrow>
        </DropdownControl>
        <DropdownOptions>
          {open && coins.map(coin => {
            return (
              <Option
                key={coin.id}
                onClick={() => { addCoin(coin); setOpen(false) }}
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
