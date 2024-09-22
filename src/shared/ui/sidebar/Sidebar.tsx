import React, { ForwardRefExoticComponent, RefAttributes, type SVGProps } from 'react'

import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Sidebar.module.scss'

import { PaymentsIcon, PostsIcon, StatisticsIcon, UserIcon } from '../../assets/icons'
import { RouterPaths } from '../../config/router.paths'

interface ILink {
  path: string
  svg: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: string
}

export const Sidebar = () => {
  const sidebarLinks: ILink[] = [
    { path: RouterPaths.USERS, svg: UserIcon, title: 'Users list' },
    { path: RouterPaths.STATISTICS, svg: StatisticsIcon, title: 'Statistics' },
    { path: RouterPaths.PAYMENTS, svg: PaymentsIcon, title: 'Payments list' },
    { path: RouterPaths.POSTS, svg: PostsIcon, title: 'Posts list' },
  ]

  return (
    <>
      <nav className={s.sidebar}>
        {sidebarLinks.map((l, ind) => (
          <Link className={s.link} href={l.path} key={l.path + '-' + ind}>
            <l.svg />
            <Typography variant={'h4'}>{l.title}</Typography>
          </Link>
        ))}
      </nav>
    </>
  )
}
