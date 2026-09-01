import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

function User(){
   const[users,setUsers] = useState([]);
   const [loading,setLoading] = useState(true);
   const [error,setError]=useState("");

   useEffect(()=>{
       fetch("http://localhost:8081/api/users")
           .then(response=>{
               if (!response.ok){
                   throw new Error("Http Error: "+response.status);
               }
               return response.json()})
           .then(data=>{setUsers(data); setLoading(false)})
           .catch(error => {console.error("error fetching data",error);
               setError("Unable to Load Users");
               setLoading(false)});
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
    if (loading) {
        return (
            <div className="users-page">
                <p className="users-status">
                    Loading users...
                </p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="users-page">
                <p className="users-status">
                    {error}
                </p>
            </div>
        );
    }
    const columns = [[], [], []];

    users.forEach((user, index) => {
        columns[index % 3].push(user);
    });

   return (

       <section className={"users-page"}>
           <div className={"container"}>
               <div className={"users-heading"}>
                   <span className={"section-label"}>
                       Registered Users
                   </span>
                   <h1>User Directory</h1>
                   <p>Hover over a user card to see additional registration details.</p>
               </div>
               {users.length===0 ? (
                   <div className={"no-users"}>
                       <h3>
                           No Users Found
                       </h3>
                       <p>Register a User to see them here</p>
                       <Link to={"/register"} className={"custom-button"}>Register User</Link>
                   </div>
               ):(<div className="users-columns">
                       {columns.map((column, columnIndex) => (
                           <div className="users-column" key={columnIndex}>
                               {column.map((user) => (
                                   <div className="user-card" key={user.id}>
                                       <div className="user-main">
                                           <div className="user-avatar">{user.name.charAt(0).toUpperCase()}
                                           </div>
                                           <h2>{user.name}</h2>
                                           <p className="user-email">{user.email}</p>
                                       </div>
                                       <div className="user-extra">
                                           <div className="user-detail">
                                               <span>Age</span>
                                               <strong>{user.age}</strong>
                                           </div>
                                           <div className="user-detail">
                                               <span>Gender</span>
                                               <strong>{user.gender}</strong>
                                           </div>
                                           <div className="user-detail">
                                               <span>City</span>
                                               <strong>{user.city}</strong>
                                           </div>
                                           <div className="user-actions">
                                               <Link to={`/user/${user.id}/edit`} className="edit-button">
                                                   Edit
                                               </Link>
                                               <button className="delete-button" onClick={() => deleteUser(user.id)}>
                                                   Delete
                                               </button>
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       ))}
                   </div>
               )}
           </div>
       </section>



   );
}
export default User;