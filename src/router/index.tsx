import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const Class = lazy(() => import('@/pages/Class'))
const PreFetchDemo = lazy(() => import('@/components/PreFetchDemo'))
const PreloadDemo = lazy(() => import('@/components/PreloadDemo'))

type RouteObject = {
  path: string;
  element?: React.ReactElement | React.FC;
  permissions?: string[];
  children?: RouteObject[];
};
// 全局路径
const globalRoutes: RouteObject[] = [
  {
    path: '/', // 路径
    element: <Home />,
    permissions: ['add'] // 权限
  }
]
// 主路由->后续接口中动态获取
const mainRoutes: RouteObject[] = [
  {
    path: '/class',
    permissions: ['add', 'edit'],
    children: [
      {
        path: '',
        element: <Class />
      },
      {
        path: 'prefetch',
        element: <PreFetchDemo />
      },
      {
        path: 'preload',
        element: <PreloadDemo />
      }
    ]
  }
]
// 路由错误重定向
const NotFound = () => {
  return <div>你所访问的页面不存在！</div>
}

const routes: RouteObject[] = globalRoutes.concat(mainRoutes)

// 路由路径处理
const transformRoutes = (routeList: RouteObject[]) => {
  return (
    <>
      {routeList.map((route: any) => {
        return route.children && route.children.length ? (
          <Route key={route.path} path={route.path} element={route.element}>
            {transformRoutes(route.children)}
          </Route>
        ) : (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          ></Route>
        )
      })}
    </>
  )
}
console.log('transformRoutes', transformRoutes(routes))

const RoutersConfig = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>{transformRoutes(routes)}</Routes>
    </Suspense>
  )
}

export default RoutersConfig
