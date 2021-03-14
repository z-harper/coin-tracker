import { useState, useEffect } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  height: 100%;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.pageBackground};
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 

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
  border-bottom: 2px solid ${props => props.theme.themeColor === 'light' ? '#37474f' : '#fff'};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const DropdownSelection = styled.input`
  width: 100%;
  margin-right: 4px;
  border-radius: 5px;
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

const AddedCoinsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 4px;
  background-color: ${props => props.theme.pageBackground};
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 
`;

const AddedCoin = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 2fr 4fr 3fr 1fr 1fr;
  padding: 2px 0;
  align-items: center;
  grid-gap: 3px;
  border-bottom: 1px solid ${props => props.theme.themeColor === 'light' ? '#37474f' : '#fff'};
`;



const formatPrice = (price) => {
  let priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  return priceFormatted
}


const Sidebar = ({ coins, coinsClicked, addCoin }) => {

  // dropdown open or closed
  const [open, setOpen] = useState(false);
  // store user search
  const [userSearch, setUserSearch] = useState('');

  // filter coins based on user search
  const filter = (coins) => {
    if (userSearch.length > 1) {
      return coins.filter(coin => {
        return Object.values(coin)
          .join(' ')
          .toLowerCase()
          .includes(userSearch.toLowerCase());
      })
    } else {
      return coins;
    }
  }

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
          {open && filter(coins).map(coin => {
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
      <AddedCoinsContainer>
        {coinsClicked.length > 0 && coinsClicked.map(coin => {
          return (
            <AddedCoin key={coin.id}>
              <img src={coin.image} alt={coin.name} width='20px' height='20px' />
              <span>{coin.abbr}</span>
              <span style={{ textAlign: 'right' }}>{formatPrice(coin.price)}</span>
              <span style={{ color: coin.percentChange > 0 ? 'green' : 'red', textAlign: 'right' }}>{coin.percentChange.toFixed(2)}%</span>
              <span style={{ cursor: 'pointer' }}>📈</span>
              <span style={{ cursor: 'pointer' }}>❌</span>
            </AddedCoin>
          )
        })}
      </AddedCoinsContainer>
    </SidebarContainer>
  )
}

export default Sidebar
