import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
  route('/', 'routes/home.tsx'),
  route('/shorts', 'routes/shorts.tsx'),
  route('/watch', 'routes/watch.tsx'),
  route('/404', 'routes/404.tsx'),
  route('/channel', 'routes/channel.tsx'),
  route('/explore', 'routes/explore.tsx'),
  route('/tv', 'routes/tv.tsx'),
  route('/you/:page', 'routes/you.tsx'),
  route('/results', 'routes/results.tsx'),
  route('/about_this_project/', 'routes/about_this_project.tsx')
] satisfies RouteConfig
