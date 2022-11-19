// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { Checkbox, FormControlLabel, FormGroup, FormControlLabelProps } from '@mui/material'
import { ChangeEvent } from 'react'

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string
  value: boolean
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
            return <Checkbox {...field} checked={value} onChange={onChange} />
          }}
        />
      }
      {...other}
    />
  )
}
this
// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string
  options: {
    label: string
    value: any
    required: boolean
  }[]
}

export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option]

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        )
      }}
    />
  )
}
