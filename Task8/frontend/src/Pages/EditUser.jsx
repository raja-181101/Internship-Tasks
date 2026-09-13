import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";
import {authFetch} from "../utils/api.js";

function EditUser(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        age:"",
        gender:"",
        city:""
    });
    const [loading,setLoading]= useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");


    useEffect(() =>{
        fetch(`http://localhost:8081/api/users/${id}`,{headers:{"Authorization":`Bearer ${token}`}})
            .then(response => {
                if (response.status === 403) {
                    throw new Error("You are not allowed to edit this user");
                }
                if (response.status === 401) {throw new Error("Please login again");
                }
                if (!response.ok) {throw new Error("Couldn't fetch the user");
                }
                return response.json();
            }).then(data => {
                setFormData({ name: data.name,
                                    email: data.email,
                                    age: data.age,
                                    gender: data.gender,
                                    city: data.city
                                    });
                setLoading(false);
        }).catch(error=>{
            console.error(error);
            setError("Unable to Load user Details");
            setLoading(false);
        });
    },[id]);

    function handleChange(event){
        const {name,value} = event.target;

        setFormData({
            ...formData,
            [name]:value
        });
    }
    function handleSubmit(event){
        event.preventDefault();
        authFetch(`http://localhost:8081/api/users/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                ...formData,age:Number(formData.age)
            })
        }).then(response=>{
            if (response.status === 403) {throw new Error("You are not allowed to update this user");
            }
            if (!response.ok) {throw new Error("Couldn't update the user");
            }

            return response.json();
        }).then(data=>{
            console.log("User Updated",data)
            navigate("/user",{replace:true});
        }).catch(error=>{
            console.error("error creating user",error);
        });
    }
    if (loading){
        return (
            <section className="edit-page">
                <div className="edit-status">
                    Loading user details...
                </div>
            </section>
        );
    }
    if (error) {
        return (
            <section className="edit-page">
                <div className="edit-status">
                    {error}
                </div>
            </section>
        );
    }

    return(
        <section className="edit-page">
            <div className="edit-container">
                <div className="edit-card">
                    <div className="edit-heading">
                        <span className="section-label">UPDATE USER</span>
                        <h1>Edit User Details</h1>
                        <p>Update the information below. Changes will be sent to the Spring Boot REST API.</p>
                    </div>
                    <UserForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        buttonText="Update User"
                    />
                    <button
                        type="button"
                        className="cancel-edit-button"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
}
export default EditUser;