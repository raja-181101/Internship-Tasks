import {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserForm from "../Components/UserForm.jsx";

function Register(){
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        age:"",
        gender:"",
        city:""
    });

    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const passwordRules={
        length:password.length>=8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const strength = Object.values(passwordRules).filter(Boolean).length;

    function handleChange(event){
        const {name,value} = event.target;
        setFormData(prev=>({
            ...prev,
            [name]: value
        }));
        setErrors(prev=>({
            ...prev,
            [name]:""
        }));
    }

    function handleSubmit(event){
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const strongPassword = Object.values(passwordRules).every(Boolean);

        if (!strongPassword){
            alert("Please Enter the Strong Password!");
            return;
        }
        if (password !== confirmPassword){
            alert("Password do not Match!");
            return;
        }

        fetch("http://localhost:8081/api/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                ...formData,age:Number(formData.age)
            })
        }).then(response=>{
            if (!response.ok){
                throw new Error("Http Error");
            }
            return response.json();
        }).then(data=>{
            console.log("User Created",data)
            navigate("/user",{replace:true});
        }).catch(error=>{
            console.error("error creating user",error);
        });
    }

    function validateForm() {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must contain at least 2 characters";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formData.age) {
            newErrors.age = "Age is required";
        }
        else if (Number(formData.age) < 18 || Number(formData.age) > 100) {
            newErrors.age = "Age must be between 18 and 100";
        }
        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
        }
        if (!formData.city) {
            newErrors.city = "Please select a city";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return(
        <section className="register-page">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-heading">
                        <span className="section-label">REGISTRATION</span>
                        <h1>Create Your Account</h1>
                        <p>Enter your information below. The data will be sent to our Spring Boot REST API.</p>
                    </div>
                    <UserForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        buttonText="Register"
                        errors={errors}
                        showPasswordFields = {true}
                        password = {password}
                        setPassword = {setPassword}
                        confirmPassword = {confirmPassword}
                        setConfirmPassword = {setConfirmPassword}
                        showPassword = {showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword = {showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                        passwordRules = {passwordRules}
                        strength = {strength}
                    />
                </div>
            </div>
        </section>
    );
}
export default Register;