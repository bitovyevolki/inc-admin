import { SubmitHandler, useForm } from 'react-hook-form'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Button, Card, FormInput, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import s from './signInForm.module.scss'
import { SignInFormData, signInSchema } from '../model/schema/signInSchema'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useSignInMutation } from '../../service/auth.service';
// import { SignInResponseError } from '../../service/auth.types';

export const SignInForm = () => {
  // Uncomment the following lines if you have a mutation hook
  // const [signIn, { isLoading }] = useSignInMutation();
  const t = useTranslations('Signin')
  const router = useRouter()

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
      // Uncomment the following line if you have a sign-in mutation
      // await signIn(data).unwrap();
      // Redirect on successful sign-in
      //   router.push(RouterPaths.PERSONAL_INFO)
    } catch (error) {
      // Uncomment this if you are handling sign-in errors
      // const err = error as SignInResponseError;
      // setError('root', { message: err.data.messages });
    }
  }

  // if (isLoading) {
  //   return <RoundLoader variant={'large'} />;
  // }

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
