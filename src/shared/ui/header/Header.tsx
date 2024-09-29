import { Button, IOption, Select, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Header.module.scss'

import { FlagRussia, FlagUnitedKingdom } from '../../assets/icons'

export type LanguageType = 'en' | 'ru'

export type HeaderProps = {
  isAuth: boolean
  onLanguageChange: (value: string) => void
  selectedLanguage?: LanguageType
  signInSrc?: string
  signUpSrc?: string
  title: string
}

const options: IOption[] = [
  {
    label: (
      <div className={s.selectItem}>
        <FlagRussia height={20} width={20} />
        <Typography variant={'body1'}>{'Russian'}</Typography>
      </div>
    ),
    value: 'ru',
  },
  {
    label: (
      <div className={s.selectItem}>
        <FlagUnitedKingdom height={20} width={20} />
        <Typography variant={'body1'}>{'English'}</Typography>
      </div>
    ),
    value: 'en',
  },
]

export const Header = ({
  isAuth,
  onLanguageChange,
  selectedLanguage,
  signInSrc,
  signUpSrc,
  title,
}: HeaderProps) => {
  console.log(selectedLanguage)

  return isAuth ? (
    <div className={s.header}>
      <Link className={s.nounderline} href={'/'}>
        <Typography variant={'h1'}>{title}</Typography>
      </Link>
      <div className={s.actions}>
        <Select
          onChange={onLanguageChange}
          options={options}
          value={selectedLanguage || 'ru'}
          variant={'large'}
        />
      </div>
    </div>
  ) : (
    <div className={s.header}>
      <Typography variant={'h1'}>{title}</Typography>
      <div className={s.actions}>
        <Select
          onChange={onLanguageChange}
          options={options}
          value={selectedLanguage || 'ru'}
          variant={'large'}
        />
        <Typography as={'a'} className={s.loginButton} href={signInSrc} variant={'link1'}>
          {'Login'}
        </Typography>
        <Button as={'a'} href={signUpSrc} variant={'primary'}>
          {'Sign Up'}
        </Button>
      </div>
    </div>
  )
}
