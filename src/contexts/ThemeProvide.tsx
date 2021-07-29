import { useEffect } from "react";
import { ReactNode, createContext, useState } from "react";

export const ThemeContext = createContext({} as TypeThemeContext)

type TypeProps = {
    children: ReactNode,
}

type TypeThemeContext = {
    themeContext: string,
    setThemeContext: Function,
}

export function ThemeProvide(props:TypeProps) {
    const [themeContext, setThemeContext] = useState<string>('')

    useEffect(() => {
        setThemeContext('dark')
    }, [])
    
    return (
        <ThemeContext.Provider value={{themeContext, setThemeContext}}>
            {props.children}
        </ThemeContext.Provider>
    )
}