import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import Header from './components/Header/Header'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png' }
]

export function Layout({ children }: { children: React.ReactNode }) {
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
      <body className='h-fit'>
        <Header />
        <main id='main' className='h-fit max-w-full w-full overflow-hidden z-0 pt-14'>
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
