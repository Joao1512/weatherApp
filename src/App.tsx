import { Menu } from './components/menu';
import { ThemeProvide } from './contexts/ThemeProvide';
import { useTheme } from './hooks/useTheme';
import { Home } from './pages/home';
import './style/global.scss'
function App() {
  const { themeContext } = useTheme()
  console.log(themeContext);
  
  return (
    <body style={themeContext === 'dark' ? {backgroundColor:`#081217`} : {backgroundColor: `#e6f9f8`}}>
          <Menu></Menu>
          <Home></Home>
    </body>
  );
}

export default App;
