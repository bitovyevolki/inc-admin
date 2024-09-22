import { ReactNode, useState } from 'react'

import { Header } from '../header/Header'
import { Sidebar } from '../sidebar/Sidebar'

type Props = {
  children: ReactNode
  withSidebar?: boolean
}

type Language = 'en' | 'ru'

export const Layout = ({ children, withSidebar = false }: Props) => {
  const isAuthenticated = true

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')

  //   const initialLanguage = Cookies.get('next-language') || 'ru'
  //   const onLanguageChange = (lang: string) => {
  //     if (lang === 'en' || lang === 'ru') {
  //       setSelectedLanguage(lang)
  //       Cookies.set('next-language', lang)
  //       router.reload()
  //     }
  //   }

  return (
    <>
      <Header
        isAuth={isAuthenticated}
        onLanguageChange={() => {}}
        selectedLanguage={selectedLanguage}
        signInSrc={'/auth/sign-in'}
        signUpSrc={'/auth/sign-up'}
        title={'Inctagram'}
      />
      <main>
        {withSidebar ? (
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '40px' }}>{children}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </>
  )
}
