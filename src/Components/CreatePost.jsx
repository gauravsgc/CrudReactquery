

import React from 'react';
import { useFormik } from 'formik';
import { CreateData } from './api';
import {
    useQuery,
    useQueryClient,
    useMutation
  } from '@tanstack/react-query'
// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.pass) {
    errors.pass = 'Required';
  } else if (values.pass.length > 20) {
    errors.pass = 'Must be 20 characters or less';
  }

 
  return errors;
};








export default function CreatePost() {
    const queryClient=useQueryClient();
    const CreateMutation=useMutation({
        mutationFn:(values)=>CreateData(values),
        onError:(err)=>{
            console.log({status:'error',err});
                  }  ,
                  onSuccess:()=>{
            //  alert('data inserted');
            
            formik.values.name=''
            formik.values.pass=''
                    }
        //reset:--
    })
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: '',
      pass: '',
     
    },
    validate,

    onSubmit: async(values) => {
   
    
      console.log(values.name,values.pass);
   
    CreateMutation.mutate(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">username</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}

      <label htmlFor="pass">Password</label>
      <input
        id="pass"
        name="pass"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.pass}
      />
      {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}

     <br />

      <button type="Create">Create</button>
      {CreateMutation.isPending&&<p>inserting the post..</p>}
      {CreateMutation.isError&&<p>{CreateMutation.error.toString()}</p>}
      {CreateMutation.isSuccess&&<p>Created data successfully</p>}
    </form>
  );
};



 // MyForm.js



 