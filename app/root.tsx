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
import { useEffect, useRef, type ChangeEvent } from 'react'
import { AsideMenu } from './components/Home/AsideMenu'
import { useUserStore } from './stores/useUserStore'
import { user as testUser } from './lib/mocks'
import VideoCardFallback from './components/VideoCardFallback'
import { Footer } from './components/Footer'
import { Devices } from './components/test/devices'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png' },
  { rel: 'preload', href: '/Roboto.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
]

export function Layout({ children }: { children: React.ReactNode }) {
  const asideInputRef = useRef<HTMLInputElement>(null)
  const setUser = useUserStore(state => state.setUser)

  function handleAsideInput (event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    window.localStorage.setItem('asideDefaultOpened', checked.toString())
  }

  useEffect(() => {
    const opened = window.localStorage.getItem('asideDefaultOpened')
    if (asideInputRef.current) asideInputRef.current.checked = opened === 'true'
    setUser(testUser)

    detectDeviceType()
  }, [])

  function detectDeviceType() {
    const ua = navigator.userAgent
    const body = document.body
  
    // Eliminar todas las clases relevantes de una vez.
    body.classList.remove('is-mobile-ua', 'is-tablet-ua', 'is-laptop-ua')
  
    // Expresiones regulares precompiladas para mayor eficiencia
    const mobileRegex = /(Mobi|Android(?!.*Nexus 7)|iPhone|iPod|Windows Phone|BlackBerry|Symbian|IEMobile|Opera Mini|Fennec|webOS|hpwos|avantgo|bada|blazer|compal|elaine|hiptop|kindle|lge|maemo|midp|mmp|netfront|palm|phone|plucker|pocket|psp|series60|treo|up\.browser|up\.link|vodafone|wap|windows ce|xda|xiino)/i
    const tabletRegex = /(iPad|Android(?!.*mobile)|Kindle|Playbook|Silk|Tablet|hpw|webos|Nexus 7)/i
  
    if (mobileRegex.test(ua) && !/iPad/i.test(ua)) {
      body.classList.add('is-mobile-ua') // Dispositivo móvil
    } else if (tabletRegex.test(ua)) {
      body.classList.add('is-tablet-ua') // Tableta
    } else {
      body.classList.add('is-laptop-ua') // Laptop/Desktop
    }
  }

  return (
    <html lang='es' className='[scrollbar-color:darkgray_transparent] [scrollbar-width:thin] sm:[scrollbar-width:initial] min-w-[248px]'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>YouTube</title>
        <meta name='description' content='Clon de YouTube hecho con React Router v7' />
        <Meta />
        <Links />
      </head>
      <body className='h-full w-full min-h-fit hidden not-mobile:flex flex-col items-center'>
        <input
          id='checkbox-home-aside-menu'
          type='checkbox'
          className='
            [&:checked~main>#asideMenu]:left-[0px] [&:not(:checked)~main>#asideMenu]:-left-[240px]
            [&:checked~main>#closeAsideMenu]:bg-[#0006] [&:not(:checked)~main>#closeAsideMenu]:bg-transparent [&:checked~main>#closeAsideMenu]:left-0
            not-mobile:ml:[&:not(:checked)~main>#homeNav]:w-[calc(100%-72px)]
            ml:[&:not(:checked)~main>#homeNav]:w-full
            ml:[&:checked~main>:is(#home,#homeNav)]:w-navbar
            mobile:[&~main>:is(#home,#homeNav)]:w-full
            ml:[&~main>*:not(#asideMenu,#aside-menu-mini,#aside-menu-tablet,#closeAsideMenu)]:absolute
            ml:[&~main>*:not(#asideMenu,#aside-menu-mini,#aside-menu-tablet,#closeAsideMenu)]:right-0
            ml:[&~main>*:not(#asideMenu,#aside-menu-mini,#aside-menu-tablet,#closeAsideMenu)]:[transition:width_250ms_ease]
            sm:[&~main>*:not(#asideMenu,#aside-menu-mini,#aside-menu-tablet,#closeAsideMenu,#watch)]:w-[calc(100%-72px)]
          '
          hidden
          ref={asideInputRef}
          onInput={handleAsideInput}
        />
        <Header />
        {/* <Devices /> */}
        <main id='main' className='h-full max-w-full min-h-fit max-h-full w-full overflow-hidden pt-14'>
          <AsideMenu />
          {children}
        </main>
        <Footer />
        
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export async function loader ({ request }: { request: Request }) {
  return { url: new URL(request.url) }
}

export function HydrateFallback ({ loaderData: { url } }: Route.ComponentProps) {
  const { pathname } = url
  return (
    <section
      id='hydrateFallback'
      className='absolute top-28 right-0 [transition:width_250ms_ease] flex h-[calc(100%-112px)] w-full ml:w-navbar'
      hidden={pathname !== '/'}
    >
      <div className='h-fit w-full max-w-full grid grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] sm:p-6 ms:gap-4 justify-center items-start'>
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
      </div>
    </section>
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
