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
  grid-template-columns: minmax(250px, 1fr) 3fr;
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
  const [colorTheme, setColorTheme] = useState('light');
  // searchable coins 
  const [searchableCoins, setSearchableCoins] = useState([]);
  // value clicked from dropdown
  const [coinsClicked, setCoinsClicked] = useState([]);

  // get coin name and symbol from fetchSearchableCoins
  const extractSearchableCoinNames = (coinData) => {
    return coinData
      .filter(coin => coin.target === 'USDT')
      .map(coin => {
        return { 'abbr': coin.base, 'id': coin.coin_id }
      })
  }

  // remove any duplicate coin id's
  const removeDuplicateCoins = (arr, comp) => {
    return arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
  }

  // fetch a page of coins 
  const fetchCoinPage = async (pageNum) => {
    let url = searchableCoinsUrl + `?page=${pageNum}&limit=${pageLimit}`;
    //console.log(url);
    let response = await axios(url);
    console.log(`response status for ${pageNum}: ${response.status}`)
    return extractSearchableCoinNames(response.data.tickers);
  }

  // fetch all coins
  const fetchAllCoins = async (pageNum = 1) => {
    //console.log('retrieving data for page: ', pageNum);
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
      setSearchableCoins(removeDuplicateCoins(results, 'id'));
    };
    fetchSearchableCoins();
  }, [])

  // add coin to search bar list 
  const addCoin = async (coin) => {
    //const addCoinUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&include_24hr_change=true`
    const addCoinUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
    // make api call to get coin logo, current price, ... 
    let response = await axios(addCoinUrl);
    response = response.data[0];
    // add price and percent change to coin
    coin.price = response.current_price;
    coin.percentChange = response.price_change_percentage_24h;
    coin.image = response.image;

    // add coin to sidebar
    setCoinsClicked([...coinsClicked, coin]);
    // remove coin from searchable list
    setSearchableCoins(searchableCoins.filter(prev => prev.id !== coin.id));
  }

  // remove coin from sidebar display
  const removeCoin = (coinID, coinAbbr) => {
    // add coin back to searchable coins
    setSearchableCoins([...searchableCoins, { abbr: coinAbbr, id: coinID }]);
    // remove displayed coin from navbar
    setCoinsClicked(coinsClicked.filter(prev => prev.id !== coinID));
  }


  return (
    <ThemeProvider theme={themes[colorTheme]}>
      <Navbar theme={colorTheme} setColorTheme={setColorTheme} />
      <TrendingCoins theme={colorTheme} />
      <ContentContainer>
        <Sidebar
          coins={searchableCoins}
          coinsClicked={coinsClicked}
          addCoin={addCoin}
          removeCoin={removeCoin}
        />
        <Chart />
      </ContentContainer>
    </ThemeProvider>
  );
}

export default App;
