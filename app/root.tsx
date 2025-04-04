import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import Header from './components/Header/Header'
import { useEffect, useRef, type ChangeEvent } from 'react'
import { AsideMenu } from './components/home/AsideMenu'
import { AsideMenuMini } from './components/home/AsideMenuMini'
import { useLocationStore } from './stores/useLocationStore'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png' }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const asideInputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const updateLocation = useLocationStore((state) => state.updateLocation)

  function handleAsideInput (event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    window.localStorage.setItem('asideDefaultOpened', checked.toString())
  }

  useEffect(() => {
    const opened = window.localStorage.getItem('asideDefaultOpened')
    if (asideInputRef.current) asideInputRef.current.checked = opened === 'true'
  }, [])

  useEffect(() => {
    console.log('location', location)
    updateLocation(location)
  }, [location])

  return (
    <html lang='es' className='[scrollbar-color:darkgray_transparent]'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>YouTube</title>
        <meta name='description' content='Clon de YouTube hecho con React Router v7' />
        <Meta />
        <Links />
      </head>
      <body>
        <input
          id='checkbox-home-aside-menu'
          type='checkbox'
          className='
            [&:checked~main>#asideMenu]:left-[0px] [&:not(:checked)~main>#asideMenu]:-left-[240px]
            [&:checked~main>#closeAsideMenu]:left-[240px] [&:not(:checked)~main>#closeAsideMenu]:-left-[100vw]
            ml:[&:not(:checked)~main>#homeNav]:w-[calc(100%-72px)] ml:[&:not(:checked)~main>#homeVideos]:w-[calc(100%-72px)]
          '
          hidden
          ref={asideInputRef}
          onInput={handleAsideInput}
        />
        <Header />
        <main id='main' className='h-fit max-w-full w-full overflow-hidden z-0 pt-14'>
          <AsideMenu />
          <AsideMenuMini />
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
