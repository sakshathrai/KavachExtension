import React, { useState } from 'react';
import Graph from '../components/graph'


function Analysis() {
  const [graphValues, setGraphValues] = useState([10, 20, 30, 40, 50, 60, 70]);
  return (
    <Graph values={graphValues} />
  )
}

export default Analysis