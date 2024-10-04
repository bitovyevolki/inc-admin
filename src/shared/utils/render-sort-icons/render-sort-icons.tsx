import s from './render-sort-icons.module.scss'

export const renderSortIcon = <T,>(column: T, sortBy: string, sortDirection: 'asc' | 'desc') => {
  if (sortBy === column) {
    return (
      <div className={s.sortIcons}>
        {sortDirection === 'asc' ? (
          <span className={`${s.sortIcon} ${s.active}`}></span>
        ) : (
          <span className={`${s.sortIcon} ${s.active} ${s.desc}`}></span>
        )}
      </div>
    )
  }

  return (
    <div className={s.sortIcons}>
      <span className={s.smallIcon}></span>
      <span className={`${s.smallIcon} ${s.desc}`}></span>
    </div>
  )
}
