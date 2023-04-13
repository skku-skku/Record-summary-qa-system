import React from "react";
import { RecoilRoot } from 'recoil';
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import MainCard from "./components/MainCard";

function App() {
  return (
    <div>
      <p>hello</p>
      {/* <MainCard title={'title'} date={'date'} context={'안녕하세요!'}/> */}
      <MainPage/>
    </div>
    // <HashRouter>
    //   <Route path="/mainpage" component={MainPage}/>
    // </HashRouter>
  );
}

export default App;
