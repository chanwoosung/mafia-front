import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { socket, SocketContext } from './service/socket';
import useRandomId from './hooks/useRandomID';
import { ROUTE_PATH, SOCKET_EVENT } from './constant/constant';
import {Route, Routes} from 'react-router-dom'
import { AccountContextContainer } from './context/account';

const Home = lazy(()=> import('./pages/Home'))
const Login = lazy(()=> import('./pages/Login'))
const Lobby = lazy(()=> import('./pages/Lobby'))

function App() {
  const {ipID:ip} = useRandomId()
  
  useEffect(()=>{
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { ip });
    if(ip===undefined) {
      return;
    }
    return () => {
      if (socket.readyState === 1) { 
          socket.emit('disconnect', {reason:'test'});
          socket.close();
      }
    };
  },[ip])
  useEffect(() => {

  },[]);
  return (
    <div className="App min-h-[100vh]">
      <SocketContext.Provider value={{socket,ip}}>
        <AccountContextContainer>
          <Suspense>
            <Routes>
              <Route path={ROUTE_PATH.LOGIN} index element={<Login nickname={Login} />}>
              </Route>
              <Route path={ROUTE_PATH.HOME} element={<Home />}>
              </Route>
              <Route path={ROUTE_PATH.LOBBY} element={<Lobby />}>
              </Route>
              <Route path='*' element={<div>error</div>} />
            </Routes>
          </Suspense>
        </AccountContextContainer>
      </SocketContext.Provider>
    </div>
  );
}


export default App;
