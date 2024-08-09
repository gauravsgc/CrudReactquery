import React from 'react'
import Table from 'react-bootstrap/Table';
import { Navigate, useNavigate } from 'react-router-dom';
export default function ShowData({data,deleteMutation}) {
    console.log(data);
    // console.log(deleteMutation);
    let navigate=useNavigate();
  return (
    <div>
       <Table striped bordered hover size="sm">
      <thead>
        <tr>
         
          <th>Username</th>
          <th>Userpassword</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.Data.map(e=><tr key={e.username}><td>{e.username}</td>
        <td> {e.userpass}</td>
        <td>
        <button onClick={()=>{navigate(`/edit/${e.username}`)}}>
           
           
            Edit 
            </button>
            </td>
            <td>
            <button onClick={()=>{deleteMutation.mutate(e.username)}}>Delete</button>
            </td></tr>)}
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
    </div>
  )
}
