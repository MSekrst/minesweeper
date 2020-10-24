import React from 'react'
import { Link } from 'react-router-dom'

import './error.css'

export const ErrorScreen = React.memo(({ error, errorCode }: { error?: Error; errorCode?: number }) => {
  return (
    <div className="error-page">
      <h1>
        Something went wrong{' '}
        <span role="img" aria-label="disappointed">
          😞
        </span>
      </h1>

      {errorCode && <h3>Code: {errorCode}</h3>}

      {error && <h3>{error}</h3>}

      <Link to="/">Return to home page</Link>
    </div>
  )
})
