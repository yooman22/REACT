import axios, { AxiosResponse } from 'axios'

export type Terms = {
  id: string
  name: string
  content: string
  required: boolean
  link: string
  checked: boolean
}

export interface GetTerms {
  terms: Terms[]
}
export const signUpTerms = (): Promise<Terms[]> =>
  axios.get<GetTerms>('/api/terms/sign-up').then((response) => response.data.terms)
