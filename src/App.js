import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import TrendingCoins from './components/TrendingCoins';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';


const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 3fr;
  grid-gap: 6px;
  min-height: 400px;
  padding: 0;
  margin: ${props => props.theme.marginSpacing};

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const LightTheme = {
  themeColor: 'light',
  pageBackground: 'white',
  titleColor: '#37474f',
  borderColor: '#37474f',
  borderRadius: '5px',
  marginSpacing: '4px',
  transitionTime: 'all .5s ease',
}

const DarkTheme = {
  themeColor: 'dark',
  pageBackground: '#37474f',
  titleColor: '#dee4e7',
  borderColor: '#000',
  borderRadius: '5px',
  marginSpacing: '4px',
  transitionTime: 'all .5s ease',
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}


// api for searchable coins (~ 439 coin id's and names)
const searchableCoinsUrl = 'https://api.coingecko.com/api/v3/exchanges/binance/tickers';
const pageLimit = 100;

function App() {

  // handles the color theme
  const [colorTheme, setColorTheme] = useState('light')
  // searchable coins 
  const [searchableCoins, setSearchableCoins] = useState([]);
  // user search term
  const [userSearchTerm, setUserSearchTerm] = useState('');
  // results from user search
  const [userSearchResults, setUserSearchResults] = useState([]);


  // get coin name and symbol from fetchSearchableCoins
  const extractSearchableCoinNames = (coinData) => {
    return coinData
      .filter(coin => coin.target === 'USDT')
      .map(coin => {
        return { 'abbr': coin.base, 'id': coin.coin_id }
      })
  }

  // fetch a page of coins 
  const fetchCoinPage = async (pageNum) => {
    let url = searchableCoinsUrl + `?page=${pageNum}&limit=${pageLimit}`;
    console.log(url);
    let response = await axios(url);
    return extractSearchableCoinNames(response.data.tickers);
  }

  // fetch all coins
  const fetchAllCoins = async (pageNum = 1) => {
    console.log('retrieving data for page: ', pageNum);
    const coins = await fetchCoinPage(pageNum);
    if (coins.length > 0) {
      return coins.concat(await fetchAllCoins(pageNum + 1));
    } else {
      return coins;
    }
  }

  useEffect(() => {
    const fetchSearchableCoins = async (pageNum = 1) => {
      let results = await fetchAllCoins();
      console.log(results);
    };
    fetchSearchableCoins();
  }, [])





  // // get coin name and symbol from fetchSearchableCoins
  // const extractSearchableCoinNames = (coinData) => {
  //   return coinData
  //     .filter(coin => coin.target === 'USDT')
  //     .map(coin => {
  //       return { 'abbr': coin.base, 'id': coin.coin_id }
  //     })
  // }

  // useEffect(() => {
  //   const fetchSearchableCoins = async () => {
  //     let response = await axios(searchableCoinsUrl);
  //     setSearchableCoins(extractSearchableCoinNames(response.data.tickers));
  //   };
  //   // get searchable coins ~ 100
  //   fetchSearchableCoins();
  // }, [])


  // search handler function for searching coins on sidebar
  const searchHandler = (userInput) => {
    setUserSearchTerm(userInput);

    if (searchableCoins.length > 0 && userSearchTerm !== '') {
      const newSearchList = searchableCoins.filter((coin) => {
        return Object.values(coin)
          .join(' ')
          .toLowerCase()
          .includes(userInput.toLowerCase())
      })
      setUserSearchResults(newSearchList);
    } else {
      setUserSearchResults(searchableCoins);
    }
  }


  return (
    <ThemeProvider theme={themes[colorTheme]}>
      <Navbar theme={colorTheme} setColorTheme={setColorTheme} />
      <TrendingCoins theme={colorTheme} />
      {/* <ContentContainer>
        <Sidebar
          userSearchResults={userSearchResults}
          userSearchTerm={userSearchTerm}
          searchHandler={searchHandler}
        />
        <Chart />
      </ContentContainer> */}
    </ThemeProvider>
  );
}

export default App;
