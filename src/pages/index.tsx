// libraries
import React from 'react'
import AppLayout from 'src/layouts'
import styles from '../styles/Form.module.scss'
//containers
import MainPage from 'src/pages/main'

export default function HomePage() {
  return (
    <div>
      <span className={styles.form_strong}>
        <strong>ss</strong>
      </span>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}
