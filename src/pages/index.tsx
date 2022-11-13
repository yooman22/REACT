// libraries
import React from 'react'
import AppLayout from 'src/layouts'
// import styles from '../styles/Form.module.scss'
//containers
import MainPage from 'src/pages/main'

import sFrom from '../styles/Form.module.scss'

export default function HomePage() {
  return <MainPage />
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}
