// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { Checkbox, FormControlLabel, FormGroup, FormControlLabelProps } from '@mui/material'
import { Fragment } from 'react'
// styles
import sFrom from 'src/styles/Form.module.scss'
// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string
}

export function RHFCheckbox({ name, value, onChange, ...other }: RHFCheckboxProps) {
  const { control } = useFormContext()
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return <Checkbox {...field} checked={field.value} onChange={(e) => {}} />
          }}
        />
      }
      {...other}
    />
  )
}

interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string
  options: {
    id: string
    label: string
    value: any
    required: boolean
    link: string
    checked: boolean
    name: string
  }[]
}
export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option]
        return (
          <FormGroup>
            {options.map((option) => (
              <Fragment key={option.id}>
                <FormControlLabel
                  control={
                    <>
                      <Checkbox
                        checked={field.value.includes(option.value)}
                        onChange={() => field.onChange(onSelected(option.value))}
                      />
                    </>
                  }
                  label={option.label}
                  {...other}
                />
                {option.required && error?.message && (
                  <p className={`${sFrom.muiFormHelperText_root} ${sFrom.mui_error}`}>
                    {error?.message}
                  </p>
                )}
              </Fragment>
            ))}
          </FormGroup>
        )
      }}
    />
  )
}
// ----------------------------------------------------------------------

// interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
//   name: string
//   options: {
//     label: string
//     value: any
//     required: boolean
//   }[]
// }

// export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
//   const { control } = useFormContext()

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const onSelected = (option: string) =>
//           field.value.includes(option)
//             ? field.value.filter((value: string) => value !== option)
//             : [...field.value, option]

//         return (
//           <FormGroup>
//             {options.map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 control={
//                   <Checkbox
//                     checked={field.value.includes(option.value)}
//                     onChange={() => field.onChange(onSelected(option.value))}
//                   />
//                 }
//                 label={option.label}
//                 {...other}
//               />
//             ))}
//           </FormGroup>
//         )
//       }}
//     />
//   )
// }
