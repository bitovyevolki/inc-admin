import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import s from './signInForm.module.scss'
import { SignInFormData, signInSchema } from '../model/schema/signInSchema'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../api/signIn.service'

export const SignInForm = () => {
  const t = useTranslations('Signin')
  const router = useRouter()
  const [login, { data, loading, error }] = useMutation(SIGN_IN)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInFormData> = async data => {
    try {
      await login({ variables: { email: data.email, password: data.password } })
      router.push('/users')
    } catch (error) {
      console.log(error)
      setError('root', { message: 'Login failed' })
    }
  }

  if (loading) {
    return <RoundLoader variant={'large'} />
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography variant={'h2'}>{t('title')}</Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input}>
            <FormInput control={control} label={`${t('email')}`} name={'email'} />
          </div>
          <div className={s.input}>
            <FormInput
              control={control}
              label={`${t('password')}`}
              name={'password'}
              type={'password'}
            />
            {errors.root && (
              <Typography className={s.error} variant={'caption'}>
                {errors.root.message}
              </Typography>
            )}
          </div>
          <div className={s.buttons}>
            <Button fullWidth type={'submit'} variant={'primary'}>
              {t('signin')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
