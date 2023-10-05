import React from "react";
import { RootState, useDispatch, useSelector } from "@/redux";
import { setUserInfo } from "@/redux/modules/home";

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.home);
  const onClick = () => {
    console.log("执行");
    dispatch(setUserInfo({ age: 1, name: "Home", email: "2095034789@qq.com" }));
  };
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
  );
};

export default Home;
