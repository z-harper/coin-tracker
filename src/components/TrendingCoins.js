import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CoinCard from './CoinCard'

const Page = styled.div`
  margin: 8px 4px 8px 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  background-color: ${props => props.theme.pageBackground};
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
  transition: ${props => props.theme.transitionTime}; 
`;

const Title = styled.h3`
  padding: 2px 0;
  margin: 0;
  text-align: center;
  text-decoration: underline;
  font-size: 24px;
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 
`;

const CoinsGridContainer = styled.div`
  border: 3px solid red;
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 3px;
`;



const trendingCoinsUrl = 'https://api.coingecko.com/api/v3/search/trending';

const TrendingCoins = ({ theme }) => {

  const [coins, setCoins] = useState([]);

  // add trending price and % change to each trending coin
  const combineTrendingData = (coins, prices) => {
    for (let i = 0; i < coins.length; i++) {
      Object.keys(prices.data).forEach((key) => {
        if (key === coins[i].item.id) {
          coins[i].item.price = prices.data[key].usd;
          coins[i].item.percentChange = prices.data[key].usd_24h_change;
        }
      })
    }
    return coins;
  }


  useEffect(() => {
    const fetchTopTrending = async () => {
      // get trending coins
      let response = await axios(trendingCoinsUrl);
      const trendingCoins = response.data.coins;

      // get the prices of those trending coins
      let coinIDs = trendingCoins.map(coin => coin.item.id).join('%2C');
      const coinPriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIDs}&vs_currencies=usd&include_24hr_change=true`;
      const trendingPrices = await axios(coinPriceUrl);

      // add trending price and % change to each trending coin
      setCoins(combineTrendingData(trendingCoins, trendingPrices));
    };
    fetchTopTrending();
  }, [])


  return (
    <Page>
      <Title>Top Trending Coins <small>(24hr)</small></Title>
      <CoinsGridContainer>
        {coins.length < 1 ? 'Loading...'
          : coins.map((coin) => <CoinCard theme={theme} key={coin.item.id} coin={coin.item} />)}
      </CoinsGridContainer>
    </Page>
  )
}

export default TrendingCoins
