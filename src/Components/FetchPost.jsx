import React, { useState,useEffect } from 'react'

import {
    useQuery,
    useQueryClient,
    useMutation
  } from '@tanstack/react-query'
  import { fetchPosts,deletePosts } from './api'

  
import ShowData from './ShowData';
export default function FetchPost() {
    const [currentpage,setcurrentpage]=useState(1);
    const [maxpage,setmaxpage]=useState(10);
    const queryClient=useQueryClient();
     //prefetching for pagination:--
     useEffect(()=>{
        const nextPage=currentpage+1;
        queryClient.prefetchQuery({
        
        queryKey:["posts",nextPage],
        queryFn:()=>fetchPosts(nextPage),
        
        });
        
        },[currentpage,queryClient]);
      //end prefetching for pagination:--

      //delete data:--
      const deleteMutation=useMutation({
        mutationFn: (username) => 
          
            deletePosts( username),
        // deleteMutation.reset();
        // window.location.reload();
        onError:(err)=>{
  console.log({status:'error',err});
        }  ,
        onSuccess:()=>{
  // alert('data deleted');
  queryClient.invalidateQueries();
          }
        }
     )
      //end of delete data
    const {data,isError,isLoading} = useQuery({

        //we have keep
             // keepPreviousData : true
        
          queryKey:  ['posts',currentpage],
          
            queryFn: ()=>fetchPosts(currentpage),//pagination
          //   staleTime:2000//2sec
          })
         
  
  
         console.log(data?.total);
        // setmaxpage(data?.total||0);
  if (isLoading) return <h1>loading....</h1>
  if(isError) return <h1>oops something went wrong</h1>
  return (
    <div>
      <ShowData data={data}  deleteMutation={deleteMutation} />
      <div style={{display:'flex',justifyContent:'space-between',marginTop:'30px'}}>
     <div className="item1"><button onClick={()=>
      {setcurrentpage(prev=>prev-1)}}
      disabled={currentpage<=1}
      // style={{display:  1===currentpage? 'none' : 'block'} }
      >previousPage</button></div>
     <div className="item2">Page{currentpage}</div>
     {/* {maxpage} */}
     <div className="item3"><button onClick={()=>
      {setcurrentpage(prev=>prev+1)}}
     disabled={currentpage>=maxpage}
      // style={{display:  maxpage===currentpage? 'none' : 'block'} }
      >NextPage</button></div>
    </div>
     
    </div>
  )
}
