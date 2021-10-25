import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Footer from '../../components/Footer/Footer';



const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState('password');

    const isVisible = () => {
        if(visibility === 'password') {
            setVisibility('text');
        }
        else {
            setVisibility('password');
        }
    }

    const onSubmitHandler = (e) => {

    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                <div>X</div>
                <h1>Login</h1>

                <br />

                <div>유효성 검사 메시지</div>

                <br />

                <div>
                    <input 
                        type="email" 
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type={visibility}
                        value={password} 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={isVisible}>show</button>
                </div>

                <br />
                <div>Forgot your password?</div>
                <button onClick={onSubmitHandler}>Login</button>
                <button >Google</button>
                <button >Kakao</button>

                <br />

                <div>
                    <span>아직 회원이 아니신가요?</span>
                    <button>회원가입 하기</button>
                </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoginPage