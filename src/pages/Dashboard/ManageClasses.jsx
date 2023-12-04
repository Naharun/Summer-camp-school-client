import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Route/useAuth";

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const { loading } = useAuth();
    useEffect(() => {
        fetch('https://summer-camp-school-server-beige.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])
    if (loading) {
        return <div className="text-center py-60 ">
            <h1 className="text-2xl font-bold text-black">Loading<span className="text-secondary">.....</span></h1>
            <progress className="progress progress-secondary mt-4 mx-auto w-1/4"></progress>
        </div>
    }

    const handleFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;
        console.log(feedback);
    }

    return (
        <div>
            <Helmet>
                <title>Instrument Of Percussion | Dashboard | Manage Classes</title>
            </Helmet>
            <h1 className='text-xl lg:text-5xl font-bold font-serif text-center lg:my-8 my-3'>Added New Classes</h1>
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
                    <tbody className="bg-stone-800 text-white p-44">
                        {
                            classes.map((classData, index) => <tr className="rounded-md" key={classData._id}>
                                <td>{(index + 1)}</td>
                                <td>
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={classData.photo} />
                                    </div>
                                </td>
                                <td>{classData.className}</td>
                                <td>{classData.instructorEmail}</td>
                                <td> Role {classData.instructorEmail}</td>
                                <th>
                                    <div className="flex space-x-5">
                                        <button className="btn btn-warning">Approve</button>
                                        <button className="btn btn-error" onClick={() => window.my_modal_5.showModal(classData._id)}>Delete</button>
                                    </div>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <form method="dialog" onSubmit={handleFeedback} className="modal-box">
                        <h3 className="font-bold text-lg">Your Feedback!</h3>
                        <textarea name="feedback" className="textarea textarea-bordered w-full mt-6" placeholder="Write Your Feedback"></textarea>
                        <div className="modal-action">
                            <button className="btn">Close</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default ManageClasses;