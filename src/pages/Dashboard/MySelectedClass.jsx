
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../Route/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySelectedClass = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    
    const {  data: classes = [], refetch } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/selected?email=${user?.email}`)
            return res.data;
        },
    })

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
                    fetch(`https://summer-camp-school-server-beige.vercel.app/selected/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Deleted successfully!',
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

    if (loading) {
        return <div className="text-center py-60 w-full ">
            <h1 className="text-2xl font-bold text-black">loading<span className="text-warning">.....</span></h1>
            <progress className="progress progress-warning mt-4 mx-auto w-1/4"></progress>
        </div>
    }
    return (
        <div>
            <Helmet>
                <title>Instrument Of Percussion | Dashboard | My Selected Classes</title>
            </Helmet>
            <h1 className='text-2xl font-bold lg:text-5xl text-center lg:my-8 my-3'>My Selected Classes</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto w-[900px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Available Seats</th>
                            <th>Make Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="  p-40">
                        {
                            classes.map((classData, index) => <tr className="rounded-md" key={classData._id}>
                                <td>{(index + 1)}</td>
                                <td>
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={classData.img} />
                                    </div>
                                </td>
                                <td>{classData.className}</td>
                                <td className="text-center">{classData.price}</td>
                                <td className="text-center">{classData.availableSeats}</td>
                                <th><Link className="text-4xl text-black">PAY</Link></th>
                                <th><button onClick={()=>handleDelete (classData._id)} className="btn btn-sm btn-error text-white"> Delete</button></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;