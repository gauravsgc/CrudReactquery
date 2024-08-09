//update post:--
export async function CreateData(values){
    // console.log(JSON.stringify(`${values.name}${values.pass}`));
    const response=await fetch(
        `http://localhost:8000/home`,
       
        
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ username:`${values.name}` ,userpass:`${values.pass}`}),
          });
       
       
   
    return response.json();
}

//fetch Post:--
export async function fetchPosts(pageNum){
    const response=await fetch(
        `http://localhost:8000/home?limit=1&page=${pageNum}`
        //http://localhost:8000/home
        ///?_limit=10&_page=${pageNum}
        
    )
    return response.json();
}


export async function deletePosts(username){
    console.log(username);
    
    const response=await fetch(
        `http://localhost:8000/home/${username}`,
        ///?_limit=10&_page=${pageNum}
        {method:'DELETE'}
    )
    return response.json();
}


export async function getPosts(username){
    console.log(username);
    
    const response=await fetch(
        `http://localhost:8000/home/${username}`,
        ///?_limit=10&_page=${pageNum}
        {method:'GET'}
    )
    return response.json();

    
}


//update post:--
export async function updateData(values){
    console.log(values);
    
    console.log(`http://localhost:8000/home/${values.name}/${values.pass}`);
    const response=await fetch(
        `http://localhost:8000/home/${values.name}/${values.pass}`,
        ///?_limit=10&_page=${pageNum}
        {method:'PATCH'}
    )
    return response.json();
}