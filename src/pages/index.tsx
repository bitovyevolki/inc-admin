import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'
import { Button } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import { RouterPaths } from '../shared/config/router.paths'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = (props: any) => {
  return (
    <div {...props}>
      login
      <div>
        <Link href={RouterPaths.USERS}>
          <Button>to users</Button>
        </Link>
      </div>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage
