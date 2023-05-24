import React from 'react'

const PlusCircle = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <circle cx='12' cy='12' r='10'></circle>
    <line x1='12' y1='8' x2='12' y2='16'></line>
    <line x1='8' y1='12' x2='16' y2='12'></line>
  </svg>
)

const MinusCircle = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <circle cx='12' cy='12' r='10'></circle>
    <line x1='8' y1='12' x2='16' y2='12'></line>
  </svg>
)

const UploadCloud = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21' />
    <path d='M16 16l-4-4-4 4' />
  </svg>
)

export { PlusCircle, MinusCircle, UploadCloud }
