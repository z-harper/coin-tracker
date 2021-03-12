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

const TrendingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 3px;
`;



const trendingCoinsUrl = 'https://api.coingecko.com/api/v3/search/trending';

const TrendingCoins = ({ theme }) => {

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(trendingCoinsUrl);
      setCoins(response.data.coins);
    };
    fetchData();
  }, [])

  return (
    <Page>
      <Title>Top Trending Coins <small>(24hr)</small></Title>
      <TrendingContainer>
        {coins.length < 0 ? 'Loading...'
          : coins.map((coin) => <CoinCard theme={theme} key={coin.item.id} coin={coin.item} />)}
      </TrendingContainer>
    </Page>
  )
}

export default TrendingCoins
