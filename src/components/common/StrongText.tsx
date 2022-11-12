import styles from 'src/styles/Form.module.scss'
interface Props {
  title: string
}

const StrongText = ({ title }: Props) => {
  return (
    <span className={styles.form_strong}>
      <strong>{title}</strong>
    </span>
  )
}

export default StrongText
