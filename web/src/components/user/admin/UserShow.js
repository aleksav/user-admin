
import React from "react";

import { Show, Datagrid, SimpleShowLayout, TextField, EmailField, ArrayField } from 'react-admin';

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
    
      <TextField source='username' />
      <EmailField source='email'/>
      <TextField source='name' />
      <TextField source='roles' />
      
    </SimpleShowLayout>
  </Show>
);
