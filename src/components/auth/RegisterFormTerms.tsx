import { ArrowCircleRightTwoTone } from '@mui/icons-material'
import { FormGroup, IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery } from 'react-query'
import { signUpTerms, Terms } from 'src/apis/terms'
import StrongText from '../common/StrongText'
import { RHFCheckbox } from '../hook-form'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Link from 'next/link'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

interface Props {
  terms: Terms[] | undefined
  handleChange: ((event: SyntheticEvent<Element, Event>) => void) | undefined
}
export default function RegisterFormTerms({ terms, handleChange }: Props) {
  const requiredStyle = {
    fontWeight: 'bold',
  }

  return (
    <Stack style={{ border: '1px' }}>
      <FormGroup>
        <StrongText title={'약관'} />
        <RHFCheckbox
          onChange={handleChange}
          name="allCheck"
          label="전체 동의"
          sx={{ mt: 1 }}
          value={false}
        />
        {terms?.map((term) => (
          <Box key={term.id}>
            <RHFCheckbox
              name={term.name}
              value={term.checked}
              onChange={handleChange}
              label={
                <Typography style={{ ...(term.required && requiredStyle) }}>
                  {term.content}
                </Typography>
              }
            />
            <Link href={`${term.link}`} target="_blank">
              <a target="_blank">
                <ArrowForwardIosIcon style={{ fontSize: '16px' }} />
              </a>
            </Link>
          </Box>
        ))}
      </FormGroup>
    </Stack>
  )
}
