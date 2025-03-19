/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import { IconHome, IconShorts, IconSubscriptions } from '../Icons'

const path: '' | '/' = '/'

const itemsAside = [
  {
    sectionName: '',
    sectionType: '',
    elements: [
      { name: 'Principal', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
      { name: 'Shorts', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
      { name: 'Suscripciones', path: '/feed/subscriptions', Icon: ({ active = false }) => <IconSubscriptions active={active} /> }
    ]
  }
]

export function HomeAsideMenu () {
  return (
    <aside className='h-full w-full flex flex-col items-center [scrollbar-gutter:stable] px-3 gap-2'>
      {
        itemsAside.map(item => {
          return (
            <section key={crypto.randomUUID()} className='w-full h-fit flex flex-col border-b-[1px] border-[#3f3f3f] py-3 [&:checked+#homeAsideMenu]:[--left:0px]'>
              {
                item.elements.map((el) => {
                  return (
                    <Link to={el.path} key={crypto.randomUUID()} className={`${path === el.path ? 'actualPath bg-neutral-800 font-medium hover:bg-neutral-700' : 'hover:bg-neutral-800'} max-w-[204px] h-10 min-h-10 flex items-center gap-6 px-3 rounded-lg cursor-pointer active:bg-neutral-600`}>
                      <div className='h-6 aspect-square'>
                        <el.Icon active={path === el.path} />
                      </div>
                      <span className='text-sm text-nowrap overflow-ellipsis overflow-hidden'>{el.name}</span>
                    </Link>
                  )
                })
              }
            </section>
          )
        })
      }
      <section>
        <Link to='' className={`${path === '' ? 'bg-neutral-800' : ''} cursor-pointer hover:text-blue-500 transition-colors`}>Acerca de este proyecto</Link>
      </section>
    </aside>
  )
}
