import React from 'react'
import Rate from './'

export default {
  title: 'Data Entry',
  component: Rate,
}

export const rate = () => {
  return (
    <>
      {/* <Rate count={5} /> */}
      <Rate count={5} defaultValue={4} disabled />
      <br />
      <Rate count={5} />
    </>
  )
}
