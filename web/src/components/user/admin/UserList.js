import React, { Fragment } from "react";
import _ from 'underscore'
import { Filter, List, Datagrid, EditButton, BulkDeleteButton, EmailField, TextInput, TextField, ArrayField } from 'react-admin';



const UserBulkActionButtons = props => (
  <Fragment>
    
    <BulkDeleteButton {...props} />
  </Fragment>
);

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <TextInput label='Email' source='email' />
    <TextInput label='Name' source='name' />
    
  </Filter>
);

export const UserList = ({ permissions, ...props }) => (
  <List {...props}
    bulkActionButtons={<UserBulkActionButtons/>}
    filters={<UserFilter/>}
  >
    <Datagrid rowClick="show">
 
    <EmailField source='email'/>
    <TextField source='name' />
    <TextField source='roles' />
    
      {permissions && _.intersection(permissions, ['admin']).length > 0 ?  <EditButton/> : null}
      
    </Datagrid>
  </List>
);
