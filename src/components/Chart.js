import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CanvasJSChart } from 'canvasjs-react-charts';


const ChartContainer = styled.div`
  height: 100%;
  border: 3px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.borderRadius};
`;

const Chart = ({ chartCoin }) => {
  // set state for candlestick data 
  const [candleData, setCandleData] = useState([]);
  const [coinName, setCoinName] = useState('');


  const formatResponseData = (data) => {
    return data.map(candle => {
      const candleDate = new Date(candle[0]);
      return {
        dateTime: candleDate,
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4]
      }
    })
  }


  useEffect(() => {
    const fetchCoinCandles = async () => {
      if (chartCoin.length > 0) {
        let url = `https://api.coingecko.com/api/v3/coins/${chartCoin}/ohlc?vs_currency=usd&days=1`;
        let response = await axios(url);
        setCandleData(formatResponseData(response.data));
        setCoinName(chartCoin);
        //console.log(candleData);
      }
    };
    fetchCoinCandles();
  }, [chartCoin])


  return (
    <ChartContainer>
      <p>{chartCoin.length < 1 ? 'Add coin to view chart' : chartCoin}</p>
      {chartCoin.length > 0 && <CanvasJSChart
        options={{
          legend: {
            verticalAlign: 'top'
          },
          axisY: {
            prefix: '$',
            minimum: Math.min(...candleData.map(candle => candle.low)) / 1.05,
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true
            }
          },
          data: [
            {
              showInLegend: true,
              name: 'Coin Price in USD last 24hr',
              type: 'candlestick',
              //risingColor: 'green',
              //color: '#ff6666',
              dataPoints: candleData.map(candle => ({
                x: candle.dateTime,
                y: [
                  candle.open,
                  candle.high,
                  candle.low,
                  candle.close
                ]
              }))
            }
          ]
        }}
      />}
    </ChartContainer>
  )
}

export default Chart
