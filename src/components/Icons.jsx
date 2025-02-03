export function IconHome ({ active = false }) {
  if (active) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        height='24'
        viewBox='0 0 24 24'
        width='24'
        focusable='false'
        aria-hidden='true'
        style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}
      >
        <path
          clipRule='evenodd'
          d='M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z'
          fillRule='evenodd'
        />
      </svg>
    )
  } else {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        height='24'
        viewBox='0 0 24 24'
        width='24'
        focusable='false'
        aria-hidden='true'
        style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}
      >
        <path
          clipRule='evenodd'
          d='M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5h-5v-7h-3v7h-5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146ZM18.5 9.621l-6.5-6.5-6.5 6.5V19.5H9V13a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v6.5h3.5V9.621Z'
          fillRule='evenodd'
        />
      </svg>
    )
  }
}

export function IconVerified () {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      focusable='false'
      ariaHidden='true'
      style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}
    >
      <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z' />
    </svg>
  )
}
