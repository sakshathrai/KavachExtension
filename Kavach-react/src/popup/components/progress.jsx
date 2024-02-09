import React from 'react'

function progressBar(props) {
  return (
<progress className="progress progress-success w-56" value={props.progVal} max="100"></progress>
  )
}

export default progressBar