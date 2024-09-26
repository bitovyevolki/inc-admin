import s from './RoundLoader.scss'

interface IProps {
  variant: 'large' | 'small'
}

export const RoundLoader = ({ variant }: IProps) => {
  return <span className={`${s.loader} ${variant === 'large' ? s.large : s.small}`}></span>
}
