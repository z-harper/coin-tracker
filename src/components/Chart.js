import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 100%;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
`;

const Chart = () => {
  return (
    <ChartContainer>
      Chart area
    </ChartContainer>
  )
}

export default Chart
