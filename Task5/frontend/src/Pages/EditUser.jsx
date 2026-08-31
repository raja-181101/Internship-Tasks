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

    useEffect(() =>{
        fetch(`http://localhost:8081/api/users/${id}`)
            .then(response => {
                if(!response.ok){
                    throw new Error("Couldn't Fetch the user!");
                }
                return response.json();
            }).then(data => {
                setFormData(data);
        }).catch(error=>{
            console.error(error);
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
            navigate("/user");
        }).catch(error=>{
            console.error("error creating user",error);
        });
    }

    return(
        <UserForm formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  buttonText={"Update"}
        />
    );
}
export default EditUser;