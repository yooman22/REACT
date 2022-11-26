export type LoadingState = {
  isLoading: boolean
}
export type LoadingContextType = {
  isLoading: boolean
  setLoading: (isLoading: boolean) => Promise<void>
}
