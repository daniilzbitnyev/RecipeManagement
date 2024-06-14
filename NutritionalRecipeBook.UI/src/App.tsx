import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import routes from '@router';
import authStore from '@stores/authStore';
import { Paths } from '@utils/constants';

import Login from 'components/login/Login';
import NotFound from 'components/notFound/NotFound';
import Registration from 'components/registration/Registration';

const App = observer(() => {
  const [isAuth, setIsAuth] = useState<boolean>(authStore.getIsAuth()); 

  useEffect(() => {
    const authChangeHandler = () => {
      setIsAuth(authStore.getIsAuth());
    };

    authStore.subscribe(authChangeHandler); 

    return () => {
      authStore.unsubscribe(authChangeHandler);
    };
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <Routes>
        <Route path="/" element={<Navigate to={Paths.REGISTRATION} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {isAuth ? (
          routes.map(({ name, path, Component }, index) => (
            <Route key={name + index} path={path} element={<Component />} />
          ))
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
      </Routes>
    </div>
  );
});

export default App;
