// libraries
import React from 'react'
import AppLayout from 'src/layouts'

//containers
import MainPage from 'src/pages/main'

export default function HomePage() {
  return <MainPage />
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}
