import React from 'react'
import Checkbox from './Checkbox'
import { withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'Data Entry',
  component: Checkbox,
  decorators: [withKnobs],
}

const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
]

export const checkbox = () => {
  const handleChange = e => {
    console.log(e.target.checked)
  }

  const handleGroupChange = values => {
    console.log(values)
  }
  return (
    <>
      <Checkbox onChange={handleChange} name="agree" title={<span style={{ color: '#16a085' }}>약관 동의</span>}>
        약관에 동의합니다.
      </Checkbox>
      <br />
      <br />

      <Checkbox.Group
        title={<span style={{ color: '#16a085' }}>과일 종류</span>}
        options={options}
        defaultValue={['Pear']}
        onChange={handleGroupChange}
      />
    </>
  )
}
