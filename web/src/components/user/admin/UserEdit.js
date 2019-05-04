import React from "react";

import { Edit, SimpleForm,  TextInput, ArrayInput, SimpleFormIterator, SelectArrayInput  } from 'react-admin';



export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
    
    <TextInput source='email' type='email'/>
      <TextInput source='name' />
      
                    <SelectArrayInput label='roles' source='roles' choices={[
                        {id: 'admin', name: 'admin'},{id: 'manager', name: 'manager'},{id: 'user', name: 'user'}
                    ]} />
                    
      
    
      
    </SimpleForm>
  </Edit>
);
