import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
  route('/', 'routes/home.tsx'),
  route('/shorts/', 'routes/shorts.tsx'),
  route('/watch/', 'routes/watch.tsx'),
  route('/404', 'routes/404.tsx'),
  route('/:channel', 'routes/channel.tsx')
] satisfies RouteConfig
