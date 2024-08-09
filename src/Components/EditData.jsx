
import React ,{useEffect} from 'react';
import { useFormik } from 'formik';
import { updateData, getPosts } from './api';
import {
    useQuery,
    useQueryClient,
    useMutation
  } from '@tanstack/react-query'
// import { useParams } from 'react-router-dom';
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


export default function EditData() {
    const queryClient=useQueryClient();
    const updateMutation=useMutation({
        mutationFn:(values)=>updateData(values)
    })
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
   
    
      console.log("hello",values.name,values.pass);
   
    updateMutation.mutate(values);
    },
  });

//   let { username } = useParams();
//   console.log(username);
  
//  const {data,isError,isLoading} = useQuery({

//         //we have keep
//              // keepPreviousData : true
        
//           queryKey:  ['posts'],
          
//             queryFn: ()=>getPosts(`${username}`),//pagination
//           //   staleTime:2000//2sec
//           })
         
    
    
//           console.log(data?.data[0].username);
//           console.log(data?.data[0].userpass);
//           if(data?.data[0].username&&data?.data[0].userpass){
//             formik.values.name=data.data[0].username;
//             // formik.values.pass=data.data[0].username;
//           }
//         // setmaxpage(data?.total||0);
//     if (isLoading) return <h1>loading....</h1>
//     if(isError) return <h1>oops something went wrong</h1>

    

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

      <button type="Create">update</button>
      {updateMutation.isPending&&<p>updating the post..</p>}
      {updateMutation.isError&&<p>{updateMutation.error.toString()}</p>}
      {updateMutation.isSuccess&&<p>Updated data successfully</p>}
    </form>
  );
};



 // MyForm.js



 