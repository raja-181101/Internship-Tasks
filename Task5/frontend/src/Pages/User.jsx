import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

function User(){
   const[users,setUsers] = useState([]);
   useEffect(()=>{
       fetch("http://localhost:8081/api/users")
           .then(response=>{
               if (!response.ok){
                   throw new Error("Http Error: "+response.status);
               }
               return response.json()})
           .then(data=>{setUsers(data)})
           .catch(error => {console.error("error fetching data",error);});
   },[]);

   function deleteUser(id){
       const confirmed = window.confirm("Do you want to delete this user?");
       if (!confirmed){
           return;
       }
       fetch(`http://localhost:8081/api/users/${id}`,{
           method:"DELETE"
       }).then(response => {
           if (!response.ok){
               throw new Error("Failed to delete the user!");
           }
           setUsers(users.filter(
               user => user.id !== id
           ));
       }).catch(error => {
           console.error(error);
       });
   }

   return (
       <div>
           <h1>Registered User</h1>
           {users.length === 0?(
               <p>No Users Found</p>
           ):(
               users.map(user =>(
                   <div key = {user.id}>
                       <h3>{user.name}</h3>
                       <p>Email: {user.email}</p>
                       <p>Age: {user.age}</p>
                       <p>Gender: {user.gender}</p>
                       <p>City: {user.city}</p>
                       <Link to={`/user/${user.id}/edit`}>
                           <button>Edit</button>
                       </Link>
                       <button onClick={() => deleteUser(user.id)}>Delete</button>
                       <hr/>
                   </div>
               ))
           )
           }
       </div>
   );
}
export default User;