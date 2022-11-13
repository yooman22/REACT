import sFrom from 'src/styles/Form.module.scss'
interface Props {
  title: string
}

const StrongText = ({ title }: Props) => {
  return (
    <span>
      <strong className={`${sFrom.strong}`}>{title}</strong>
    </span>
  )
}

export default StrongText
