import React from 'react'
import { RootState, useDispatch, useSelector } from '@/redux'
import { setUserInfo } from '@/redux/modules/home'
import { testApi } from '@/api/modules/login'

const Home = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.home)
  const onClick = () => {
    console.log('执行')
    getTestData()

  }
  const getTestData = async () => {
    const res = await testApi()
    // @ts-ignore
    const { data } = res
    console.log(data.data, '<-------------')
    dispatch(setUserInfo({ age: data.data.age, name: data.data.name, email: data.data.email }))
  }
  console.log(process.env.NODE_ENV)
  return (
    <div>
      <div>Home组件</div>
      <button onClick={onClick}>赋值</button>
      {userInfo && (
        <>
          <div>name：{userInfo.name}</div>
          <div>age：{userInfo.age}</div>
          <div>email：{userInfo.email}</div>
        </>
      )}
    </div>
  )
}

export default Home
