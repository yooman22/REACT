import * as Yup from 'yup'
import { useState } from 'react'
// next
import NextLink from 'next/link'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// routes

import { PATH_AUTH } from 'src/routes'
import Iconify from 'src/components/common/Iconify'
import { RHFTextField, RHFCheckbox, FormProvider } from 'src/components/hook-form'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string
  password: string
  remember: boolean
  afterSubmit?: string
}

export default function LoginForm() {
  const { login } = useAuth()

  const isMountedRef = useIsMountedRef()

  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식을 확인해주세요 ').required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해 주세요.'),
  })

  const defaultValues = {
    email: 'demo@github.com',
    password: 'demo123',
    remember: true,
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      console.error(error)

      reset()

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message })
      }
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  )
}
