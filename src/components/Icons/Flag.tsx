import React from 'react'

export const Flag = React.memo(({ size = 18, fill = 'tomato' }: { size?: number; fill?: string }) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" fill={fill} />
    </svg>
  )
})
