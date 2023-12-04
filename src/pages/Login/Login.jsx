import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                Swal.fire({
                    title: 'User Login Successfully',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff url(/images/trees.png)',
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                })
                navigate(from, { replace: true });

            })
    }

    const handleValidateCaptcha = (e) => {
        const use_captcha_value = e.target.value;
        if (validateCaptcha(use_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }
    return (
        <>
            <Helmet>
                <title>Instrument Of Percussion || Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the text captcha above" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-neutral" type="submit" value="Login" />
                            </div>
                            <p><small>New Here?<Link to="/registration">Create an account</Link></small></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;