import * as Yup from 'yup'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Stack, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import { FormProvider, RHFCheckbox, RHFMultiCheckbox, RHFTextField } from 'src/components/hook-form'
import StrongText from '../common/StrongText'
import getValidationSchema from 'src/utils/getValidationSchema'

// types
import { Terms } from 'src/apis/terms'

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string
  password: string
  confirmPassword: string
  afterSubmit?: string
}

interface RegisterFormProps {
  serverLayout: { item: Terms[] | undefined }
}

export default function RegisterForm({ serverLayout }: RegisterFormProps) {
  const { register } = useAuth()

  const customFields = [
    {
      name: 'phoneNumber',
      label: 'phone number',
      validationType: 'string',
      required: true,
      type: 'text',
      value: '7878787878',
      values: [],
      validations: [
        {
          type: 'required',
          params: ['Required'],
        },
      ],
    },
  ]

  const extraSchema = getValidationSchema(customFields)

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('이메일 형식을 확인해주세요.').required('Email 입력이 필요합니다.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 일치시켜 주세요.'),
  })
  // .concat(extraSchema)

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  })

  const isMountedRef = useIsMountedRef()

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register(data.email, data.password, data.confirmPassword)
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
        <StrongText title={'이메일'} />
        <RHFTextField name="email" label="이메일" />
        <StrongText title={'비밀번호'} />
        <RHFTextField name="password" label="비밀번호" type={'password'} />
        <RHFTextField name="confirmPassword" label="확인" type={'password'} />
        <Stack style={{ border: '1px' }}>
          <StrongText title={'약관'} />
          <RHFCheckbox name="isDefault" label="전체 동의" sx={{ mt: 1 }} value={false} />
          {serverLayout.item?.map((term) => (
            <RHFCheckbox
              name={term.name}
              key={term.id}
              label={term.content}
              sx={{ mt: 1 }}
              value={false}
            />
          ))}
          <RHFMultiCheckbox name="isDefault1" options={[]} />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          회원가입
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
