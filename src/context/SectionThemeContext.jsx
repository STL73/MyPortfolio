import { createContext } from "react"

const SectionThemeContext = createContext("dark")

const SectionThemeProvider = ({ theme, children }) => {
  return <SectionThemeContext.Provider value={theme}>{children}</SectionThemeContext.Provider>
}

export { SectionThemeProvider }
