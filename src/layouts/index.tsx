import { ReactNode } from 'react'
import AuthGuard from 'src/guards/AuthGuard'

interface Props {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  return <AuthGuard>{children}</AuthGuard>
}
export default AppLayout
