import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useParamsHook = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryStringHandler = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }

  const changeQueryHandler = (name: string, value: number | string) => {
    router.push(pathname + '?' + createQueryStringHandler(name, String(value)))
  }

  return { changeQueryHandler, searchParams }
}
