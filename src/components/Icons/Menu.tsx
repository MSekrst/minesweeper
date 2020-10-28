import React from 'react'

export const Menu = React.memo(({ size = 18, fill = 'black' }: { size?: number; fill?: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={size} height={size}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
})
