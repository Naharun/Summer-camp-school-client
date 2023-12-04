import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photo }
                        fetch('https://summer-camp-school-server-beige.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'User Created Successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                    })
                                    setUser(loggedUser)
                                    reset();
                                    navigate('/');
                                }
                            })
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Instrument Of Percussion || Registration</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Registration now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-700">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })}  placeholder="photo url" className="input input-bordered" />
                                {errors.name && <span className="text-red-700">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}/

                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one upper case, one lower case, one number and one special characters</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="text" {...register("confirm password", { required: true })} name="confirm password" placeholder="confirm password" className="input input-bordered" />
                                {errors.name && <span className="text-red-700">Confirm Password is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-neutral" type="submit" value="registration" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;