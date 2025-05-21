export default function You () {
  const url = new URL(window.location.href)
  const usp = url.pathname.split('/you/') // usp: url splitted
  const page = usp?.[1]
  
  return (
    <span>you-page: {page}</span>
  )
}
