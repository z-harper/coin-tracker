import PropTypes from 'prop-types';
import styled from 'styled-components';


const CoinContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CoinImg = styled.img`
  height: 50px;
  width: 50px;
  padding-right: 8px;
`;

const CoinLink = styled.a`
  text-decoration: none;
  border: none;
  outline: none;
  font-weight: bold;
  color: ${props => props.theme.titleColor};
  transition: ${props => props.theme.transitionTime}; 

  &:hover {
    text-decoration: underline;
  }
`;


const CoinCard = ({ theme, coin }) => {

  const createLink = () => {
    const baseUrl = 'https://www.coingecko.com/en/coins/';
    const coinName = coin.name.replace(/\s+/g, '-').toLowerCase();
    return baseUrl + coinName;
  }

  return (
    <CoinContainer>
      <CoinImg src={coin.large} alt={coin.name} />
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
  }),
}

export default CoinCard
