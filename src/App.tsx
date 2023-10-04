import React, { Suspense, lazy, useState } from 'react'

const PreFetchDemo = lazy(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /* webpackPrefetch: true */
    '@/components/PreFetchDemo'
))
const PreloadDemo = lazy(() => import(
    /* webpackChunkName: "PreloadDemo" */
    /* webpackPreload: true */
    '@/components/PreloadDemo'
))
// import './app.less'

export const App = () => {
    const [show, setShow] = useState(false)
    const onClick = () => {
        setShow(!show)
    }
    return (
        <>
            <h2 onClick={onClick}>展示</h2>
            {show && (
                <>
                    <Suspense fallback={null}>
                        <PreFetchDemo />
                    </Suspense>
                    <Suspense fallback={null}>
                        <PreloadDemo />
                    </Suspense>
                </>
            )}
        </>
    )
}