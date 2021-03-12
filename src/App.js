import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Navbar from './components/Navbar'
import TrendingCoins from './components/TrendingCoins'
// import Sidebar from './components/Sidebar'
// import Chart from './components/Chart'

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

function App() {

  const [colorTheme, setColorTheme] = useState('light')

  return (
    <ThemeProvider theme={themes[colorTheme]}>
      <Navbar theme={colorTheme} setColorTheme={setColorTheme} />
      <TrendingCoins theme={colorTheme} />
      {/* <div className='row'>
        <div className='ml-3 p-1 col-sm-3 col-md-3 col-lg-3 sidebar-col'>
          <Sidebar />
        </div>
        <div className='ml-3 p-1 col-sm-8 col-md-8 col-lg-8 chart-col'>
          <Chart />
        </div>
      </div> */}
    </ThemeProvider>
  );
}

export default App;
