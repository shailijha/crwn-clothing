import React from 'react';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            cpassword: ''
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password,cpassword} = this.state;

        if(password !== cpassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                cpassword: ''
            });

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {displayName, email, password,cpassword} = this.state;

        return(
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="displayName" 
                        value={displayName} 
                        handleChange={this.handleChange}
                        label="Display Name"
                        required 
                    />
                    <FormInput 
                        type="email" 
                        name="email" 
                        value={email} 
                        handleChange={this.handleChange}
                        label="Email"
                        required 
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        value={password} 
                        handleChange={this.handleChange}
                        label="Password"
                        required 
                    />
                    <FormInput 
                        type="password" 
                        name="cpassword" 
                        value={cpassword} 
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required 
                    />
                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        );
    }  
}

export default SignUp;