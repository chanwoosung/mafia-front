import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { socket, SocketContext } from './service/socket';
import useRandomId from './hooks/useRandomID';
import { ROUTE_PATH, SOCKET_EVENT } from './constant/constant';
import {Route, Routes} from 'react-router-dom'

const Home = lazy(()=> import('./pages/Home'))
const Login = lazy(()=> import('./pages/Login'))

function App() {
  const {ipID:nickname} = useRandomId()
  useEffect(()=>{
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
    if(nickname===undefined) {
      return;
    }
    return () => {
      if (socket.readyState === 1) { 
        console.log('Left')
          socket.emit('disconnect', {reason:'test'});
          socket.close();
      }
    };
  },[nickname])
  return (
    <div className="App min-h-[100vh]">
      <SocketContext.Provider value={socket}>
        <Suspense>
          <Routes>
            <Route path={ROUTE_PATH.LOGIN} index element={<Login nickname={Login} />}>
            </Route>
            <Route path={ROUTE_PATH.HOME} element={<Home nickname={nickname} />}>
            </Route>
            <Route path='*' element={<div>error</div>} />
          </Routes>
        </Suspense>
      </SocketContext.Provider>
    </div>
  );
}


export default App;
