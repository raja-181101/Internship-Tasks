function UserForm({
                      formData,
                      handleChange,
                      handleSubmit,
                      buttonText,
                      showPasswordFields = false,
                      password,
                      setPassword,
                      confirmPassword,
                      setConfirmPassword,
                      showPassword,
                      setShowPassword,
                      showConfirmPassword,
                      setShowConfirmPassword,
                      passwordRules,
                      strength

                  }) {
    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
                <label>Name <span className={"required-star"}>*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name"/>
            </div>

            <div className="form-group">
                <label>Email <span className={"required-star"}>*</span></label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>

            <div className="form-group">
                <label>Age <span className={"required-star"}>*</span></label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                />
            </div>

            <div className="form-group">
                <label>Gender <span className={"required-star"}>*</span></label>
                <div className="gender-options">
                    <label className="gender-option">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                        />
                        Male
                    </label>

                    <label className="gender-option">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>City <span className={"required-star"}>*</span></label>
                <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                </select>
            </div>

            {showPasswordFields && (
                <div className="password-section">
                    <div className="form-group">
                        <label>Password <span className={"required-star"}>*</span></label>
                        <div className="password-box">
                            <input type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    placeholder={"Enter Your Password"}
                                    autoComplete={"new-password"}/>
                            <i className={showPassword ? "bi bi-eye-slash eye-icon" : "bi bi-eye eye-icon"}
                                onClick={()=>
                                    setShowPassword(!showPassword)
                                }/>
                        </div>
                    </div>
                    <div className="strength-bar">
                        <div className={`strength-fill strength-${strength}`}
                        style={{width:`${strength * 20}%`}}/>
                    </div>
                    <p className="strength-message">
                        {
                            password.length ===0 ? ""
                                :strength <=2 ? "Weak Password"
                                :strength <=4 ? "Medium Password" : "Strong Password"
                        }
                    </p>
                    <div className="password-rules">
                        <PasswordRule valid={passwordRules.length} text="Minimum of 8 Characters"/>
                        <PasswordRule valid={passwordRules.uppercase} text="At Least one UpperCase Letter"/>
                        <PasswordRule valid={passwordRules.lowercase} text="At Least one LowerCase Letter"/>
                        <PasswordRule valid={passwordRules.number} text="At Least one Number Required"/>
                        <PasswordRule valid={passwordRules.special} text="At Least one Special Character"/>

                    </div>

                    <div className="form-group">
                        <label>Confirm Password <span className={"required-star"}>*</span></label>
                        <div className="password-box">
                            <input type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={event =>
                                        setConfirmPassword(event.target.value)}
                                    placeholder="Confirm Your Password"
                                    autoComplete="new-password"/>

                            <i className={showConfirmPassword ? "bi bi-eye-slash eye-icon" : "bi bi-eye eye-icon"}
                               onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>
                        </div>
                        {
                            confirmPassword.length > 0 && (
                                <p className={password === confirmPassword ? "password-match" : "password-not-match"}>
                                    {
                                        password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"
                                    }
                                </p>
                            )
                        }
                    </div>
                </div>
            )}

            <button type="submit" className="register-button">
                {buttonText}
            </button>
        </form>
    );
}
function PasswordRule({valid, text}){
    return(
        <p className={valid ? "valid-rule":"invalid-rule"}>
            {valid ? "✓" : "✗"}{text}
        </p>
    );
}

export default UserForm;