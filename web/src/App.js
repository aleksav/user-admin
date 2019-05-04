
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from "react-router-dom";
import { Admin, Resource } from 'react-admin';
import createHistory from 'history/createHashHistory';
import _ from 'underscore'
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import createAdminStore from './createAdminStore';

// generated entity components:
import { UserCreate,UserList,UserEdit,UserShow, } from './components/user/admin'
import { entitiesReducer } from './views/app.reducer'

// generated custom components:


const history = createHistory();

const App = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
      entitiesReducer
    })}
  >
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    history={history}
    
    
    
    
    >

    {permissions => [
      <Resource name="user"  create={permissions && _.intersection(permissions, ['admin']).length > 0 ?  UserCreate : null}  list={permissions && _.intersection(permissions, ['admin']).length > 0 ?  UserList : null}  edit={permissions && _.intersection(permissions, ['admin']).length > 0 ?  UserEdit : null}  show={permissions && _.intersection(permissions, ['admin']).length > 0 ?  UserShow : null}  />
    ]}
  </Admin>
</Provider>
);

export default App;
