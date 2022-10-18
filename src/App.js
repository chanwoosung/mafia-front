import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { socket, SocketContext } from './service/socket';
import useRandomId from './hooks/useRandomID';
import { ROUTE_PATH, SOCKET_EVENT } from './constant/constant';
import {Route, Routes} from 'react-router-dom'
import { AccountContextContainer } from './context/account';
import { QueryClient, QueryClientProvider } from 'react-query';

const Home = lazy(()=> import('./pages/Home'))
const Lobby = lazy(()=> import('./pages/Lobby'))
const Room = lazy(()=> import('./pages/Room'))

function App() {
  const {ipID:ip} = useRandomId();
  const queryClient = new QueryClient();
  
  
  return (
    <div className="App min-h-[100vh]">
      <SocketContext.Provider value={{socket,ip}}>
        <QueryClientProvider client={queryClient}>
          <AccountContextContainer>
            <Suspense>
              <Routes>
                <Route path={ROUTE_PATH.HOME} element={<Home />}>
                  <Route path={ROUTE_PATH.LOBBY} element={<Lobby />}>
                  </Route>
                  <Route path={ROUTE_PATH.ROOM} element={<Room />} />
                  <Route path='*' element={<div>error</div>} />
                </Route>
              </Routes>
            </Suspense>
          </AccountContextContainer>
        </QueryClientProvider>
      </SocketContext.Provider>
    </div>
  );
}


export default App;
