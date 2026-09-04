import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {logout} from "../utils/auth.js";
import {authFetch} from "../utils/api.js";

function User(){
   const[users,setUsers] = useState([]);
   const [loading,setLoading] = useState(true);
   const [error,setError]=useState("");
   const role = localStorage.getItem("role");
   const navigate = useNavigate();

   useEffect(()=>{
       const token = localStorage.getItem("token");
       const role = localStorage.getItem("role");
       const userId = localStorage.getItem("userId");
       if (role === "ADMIN") {
           authFetch("http://localhost:8081/api/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load users");
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false)
            }).catch(error=>{console.error("Unable to fetch data",error);
                setError("Unable to fetch error");
                setLoading(false)});

    } else {
           authFetch(`http://localhost:8081/api/users/${userId}`)
               .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load user");
                }
                return response.json();
            })
            .then(data => {
                setUsers([data]);
                setLoading(false);
            }).catch(error=>{console.error("Unable to fetch data",error);
            setLoading(false);
            setError("Unable to fetch data")})
    }

},[]);

    const handleLogout = () => {
        logout();
        navigate("/", {replace: true});
    };

   function deleteUser(id){
       const confirmed = window.confirm("Do you want to delete this user?");
       if (!confirmed) {
           return;
       }
       authFetch(`http://localhost:8081/api/users/${id}`, {method: "DELETE"})
           .then(response => {
               if (!response.ok) {
                   throw new Error("Failed to delete the user!");}
               if (role === "USER") {
                   logout();
                   navigate("/login", {replace: true});
               } else {
                   setUsers(prevUsers => prevUsers.filter(
                           user => user.id !== id
                       )
                   );
               }
           })
           .catch(error => {
               console.error(error);
           });
   }
   function moveToLogin(){
       navigate("/login",{replace:true});
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
                <p className="users-status">{error}</p>
                <button className="custom-button" onClick={moveToLogin}>Login</button>
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
                       <p>There are currently No Users available</p>

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
                                           <div className="user-detail">
                                               <span>Role</span>
                                               <strong>{user.role}</strong>
                                           </div>
                                           <div className="user-actions">
                                               <Link to={`/user/${user.id}/edit`} className="edit-button">
                                                   Edit
                                               </Link>
                                               <button className="delete-button" onClick={() => deleteUser(user.id)}>
                                                   Delete
                                               </button>
                                               {role === "USER" && (<button className="edit-button" onClick={handleLogout}>
                                                       Logout
                                                   </button>
                                               )}
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