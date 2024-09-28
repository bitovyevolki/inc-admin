import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useParamsHook = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = (newParams: Record<string, number | string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, String(value))
    })

    return params.toString()
  }

  const changeQueryHandler = (newParams: Record<string, number | string>) => {
    const queryString = createQueryString(newParams)

    router.push(`${pathname}?${queryString}`)
  }

  return { changeQueryHandler, searchParams }
}
