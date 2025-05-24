export function AsideRight ({ cinemaModeActive }: { cinemaModeActive?: boolean }) {
  return (
    <aside className={`${cinemaModeActive ? '[grid-row:2]': '[grid-row:1/-1]'} [grid-column:2] h-[min(100%,1500px)] max-h-full w-full flex items-end bg-red-700 rounded-xl transition-all`}>
      asdf
    </aside>
  )
}
