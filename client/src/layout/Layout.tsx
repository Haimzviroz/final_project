import  { ReactNode } from 'react'
import Header from './header/Header'
import Main from './main/Main'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main children={children}  />
    </>
  )
}

export default Layout
