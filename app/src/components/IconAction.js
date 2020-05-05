import React from 'react'
import { IconButton, Tooltip, Badge } from '@material-ui/core'

export default function IconAction({ Icon, label, ...props }) {
  const Wrapper = 'badgeContent' in props ? Badge : IconButton

  return (
    <Tooltip title={label}>
      <span>
        <Wrapper aria-label={label} {...props}>
          <Icon />
        </Wrapper>
      </span>
    </Tooltip>
  )
}
