import PropTypes from 'prop-types';
import styled from 'styled-components';


const CoinContainer = styled.div`
  padding-top: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
`;

const PriceData = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`;

const CoinImg = styled.img`
  height: 50px;
  width: 50px;
  padding-left: 4px;
`;

const CoinLink = styled.a`
  margin-left: 8px;
  text-decoration: underline;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 
  //border: 1px solid red;
`;

const CoinPrice = styled.div`
  padding-left: 4px;
  color: ${props => props.theme.titleColor};
`;

const CoinPercent = styled.div`
  padding-left: 4px;
  color: ${props => props.theme.titleColor};
`;


const formatPrice = (price) => {
  let priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  return priceFormatted
}

const formatPercent = (percentChange) => {
  if (percentChange > 0) {
    return `${percentChange.toFixed(2)}% 🚀`;
  } else {
    return `${percentChange.toFixed(2)}% 🚑`;
  }
}


const CoinCard = ({ theme, coin }) => {

  const createLink = () => {
    const baseUrl = 'https://www.coingecko.com/en/coins/';
    const coinName = coin.name.replace(/\s+/g, '-').toLowerCase();
    return baseUrl + coinName;
  }

  return (
    <CoinContainer>
      <PriceData>
        <CoinImg src={coin.large} alt={coin.name} />
        <div>
          <CoinPrice>{formatPrice(coin.price)}</CoinPrice>
          <CoinPercent>{formatPercent(coin.percentChange)}</CoinPercent>
        </div>
      </PriceData>
      <CoinLink href={createLink()} target='_blank' rel='noopener noreferrer'>{coin.symbol}</CoinLink>
    </CoinContainer>
  )
}

CoinCard.propTypes = {
  coin: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    percentChange: PropTypes.number.isRequired,
  }),
}

export default CoinCard
