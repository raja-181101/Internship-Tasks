import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";

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


    useEffect(() =>{
        fetch(`http://localhost:8081/api/users/${id}`)
            .then(response => {
                if(!response.ok){
                    throw new Error("Couldn't Fetch the user!");
                }
                return response.json();
            }).then(data => {
                setFormData(data);
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
        fetch(`http://localhost:8081/api/users/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                ...formData,age:Number(formData.age)
            })
        }).then(response=>{
            if (!response.ok){
                throw new Error("Couldn't get the User!!");
            }
            return response.json();
        }).then(data=>{
            console.log("User Updated",data)
            navigate(-1);
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