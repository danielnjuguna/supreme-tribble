import React from 'react'

function Spinner() {
  return (
    <span class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-600 rounded-full mr-2" role="status" aria-label="loading">
        <span class="sr-only">Loading...</span>
    </span>
  )
}

export default Spinner