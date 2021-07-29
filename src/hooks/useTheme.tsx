import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvide";

export function useTheme() {
    let value = useContext(ThemeContext)
    return value
}