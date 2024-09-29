import { ReactNode, useState } from 'react'

import Cookies from 'js-cookie'
import router from 'next/router'

import { Header } from '../header/Header'
import { Sidebar } from '../sidebar/Sidebar'

type Props = {
  children: ReactNode
  withSidebar?: boolean
}

type Language = 'en' | 'ru'

export const Layout = ({ children, withSidebar = false }: Props) => {
  const isAuthenticated = true
  const initialLanguage = Cookies.get('next-language') || 'ru'
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage as Language)

  const onLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'ru') {
      setSelectedLanguage(lang)
      Cookies.set('next-language', lang)
      router.reload()
    }
  }

  return (
    <>
      <Header
        isAuth={isAuthenticated}
        onLanguageChange={onLanguageChange}
        selectedLanguage={selectedLanguage}
        signInSrc={'/auth/sign-in'}
        signUpSrc={'/auth/sign-up'}
        title={'Inctagram'}
      />
      <main>
        {withSidebar ? (
          <div style={{ display: 'flex' }}>
            <Sidebar />
            {children}
          </div>
        ) : (
          children
        )}
      </main>
    </>
  )
}
