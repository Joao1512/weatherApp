import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import './index.scss'
export function Menu() {
    const [theme, setTheme] = useState('light')
    const {setThemeContext } = useTheme()
    function handleThemeClick(e: any) {
        e.value === 'dark' ? setTheme('light') : setTheme('dark')    
        setThemeContext(e.value)
    }
    return (
        <>
            <div className="menu">
                <div className="container">
                    <div className="brand">MyWeather</div>
                    <div className="menu-items">
                        <div className="item">
                            <input type="checkbox" name="checkbox" value={theme} onClick={e => handleThemeClick(e.target)} className="switch"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}