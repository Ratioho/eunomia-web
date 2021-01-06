import React, { useState } from 'react'
import styled from 'styled-components'

const TabTask = () => {
  return (
    <React.Fragment>
      <h2>Task Tab</h2>
      <h4>Category</h4>
      <ul>
        <li>Work</li>
        <li>Fit</li>
        <li>Course</li>
        <li>Hobby</li>
      </ul>
      <h4>Tasks</h4>
      <ul>
        <li>App develop</li>
        <li>Calculus Stream Tutorial</li>
      </ul>
      <h4>Deadline/OKR</h4>
      <ul>
        <li>Java Assignments</li>
        <li>Art History Readings</li>
      </ul>
    </React.Fragment>
    

  )
}

export default TabTask