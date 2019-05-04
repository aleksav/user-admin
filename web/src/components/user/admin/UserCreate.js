
import React from 'react';
import { parse } from 'query-string';

import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, SelectArrayInput } from 'react-admin';

export const UserCreate = props => {
    
  

  return (
  <Create {...props}>
    <SimpleForm 
      redirect={props.basePath}
    >
      <TextInput source='username' />
      <TextInput source='password' />
      
                    <SelectArrayInput label='roles' source='roles' choices={[
                        {id: 'admin', name: 'admin'},{id: 'manager', name: 'manager'},{id: 'user', name: 'user'}
                    ]} />
                    
      <TextInput source='email' type='email'/>
      <TextInput source='name' />
      
    </SimpleForm>
  </Create>
  )
};
