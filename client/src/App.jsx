import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { DarkModeContextProvider } from './context/darkModeContext';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Post from './pages/Post';
import Create from './pages/Create';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserPosts from './pages/UserPosts';
import MeUsers from './pages/MeUsers';
import MeSettings from './pages/MeSettings';
import ProtectedRoutes from './ui/ProtectedRoutes';

const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: 0,
          },
     },
});

const App = () => {
     return (
          <>
               <QueryClientProvider client={queryClient}>
                    <DarkModeContextProvider>
                         <ReactQueryDevtools />
                         <BrowserRouter>
                              <Routes>
                                   <Route
                                        element={
                                             <ProtectedRoutes>
                                                  <AppLayout />
                                             </ProtectedRoutes>
                                        }
                                   >
                                        <Route path='/' element={<Home />} />
                                        <Route
                                             path='/create-post'
                                             element={<Create />}
                                        />
                                        <Route
                                             path='/post/:id'
                                             element={<Post />}
                                        />
                                        <Route path='/me' element={<Profile />}>
                                             <Route
                                                  index
                                                  element={
                                                       <Navigate
                                                            to='/me/posts'
                                                            replace
                                                       />
                                                  }
                                             />
                                             <Route
                                                  path='posts'
                                                  element={<UserPosts />}
                                             />
                                             <Route
                                                  path='users'
                                                  element={<MeUsers />}
                                             />
                                             <Route
                                                  path='settings'
                                                  element={<MeSettings />}
                                             />
                                        </Route>
                                   </Route>
                                   <Route
                                        path='/sign-up'
                                        element={<SignUp />}
                                   />
                                   <Route path='/login' element={<Login />} />
                              </Routes>
                         </BrowserRouter>
                    </DarkModeContextProvider>
               </QueryClientProvider>

               <Toaster
                    position='top-center'
                    reverseOrder={false}
                    gutter={4}
                    toastOptions={{
                         duration: 7000,
                         style: {
                              fontSize: '13px',
                         },

                         success: {
                              theme: {
                                   primary: 'white',
                              },
                         },

                         error: {
                              theme: {
                                   primary: 'red',
                              },
                         },
                    }}
               />
          </>
     );
};

export default App;
