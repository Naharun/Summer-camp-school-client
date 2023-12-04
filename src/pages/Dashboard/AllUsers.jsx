import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../Route/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
    const { loading } = useAuth();
    const [axiosSecure]= useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('https://summer-camp-school-server-beige.vercel.app/users')
        return res.data;
    })

    if (loading) {
        return <div className="text-center py-60 bg-cyan-950">
            <h1 className="text-3xl font-bold text-white">loading<span className="text-warning">.....</span></h1>
            <progress className="progress progress-warning mt-4 mx-auto w-1/4"></progress>
        </div>
    }
    const handleMakeAdmin = user => {
        fetch(`https://summer-camp-school-server-beige.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };
    const handleMakeInstructor = user => {
        fetch(`https://summer-camp-school-server-beige.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };
    const handleDelete = id => {
        const proceed = Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (proceed) {
                    fetch(`https://summer-camp-school-server-beige.vercel.app/users/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Class data deleted successfully!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                refetch();
                            }
                        })
                }
            }
        })

    }

    return (
        <div>
            <Helmet>
                <title>Instrument Of Percussion | Dashboard | All Users</title>
            </Helmet>
            <h1 className='text-2xl text-center lg:text-5xl font-bold lg:my-8 my-3'>All Users</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr className="rounded-md" key={user._id}>
                                <td>{(index + 1)}</td>
                                <td>
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.photo} />
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role? user.role:"Student"}</td>
                                <td> <button disabled={user.role === "admin"} onClick={() => handleMakeAdmin(user)} className="btn  btn-info"> Make Admin</button></td>
                                <td>
                                     <button disabled={user.role === "instructor"} onClick={() => handleMakeInstructor(user)} className="btn  btn-accent"> Make Instructor</button>
                                </td>
                                <th><button onClick={() => handleDelete(user._id)} className="btn  btn-error text-white"> Delete</button></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;