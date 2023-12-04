import Swal from "sweetalert2";
import useAuth from "../../Route/useAuth";


const AddClass = () => {
    const {user}= useAuth();
    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const photo = form.photo.value;
        const instructorName = form.instructorName.value;
        const className = form.className.value;
        const instructorEmail = form.instructorEmail.value;
        const price = form.price.value;
        const availableSeats = form.availableSeats.value;
        const details = form.details.value;
        const add = { photo,  instructorName, className, instructorEmail, price, availableSeats, details,}
        
        fetch('https://summer-camp-school-server-beige.vercel.app/addClass', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(add)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Added Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset();
                }
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200 w-[1000px]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div className="card-body w-[500px]">
                        <h2 className="text-3xl font-semibold text-orange-950">Add A Class</h2>
                        <form onSubmit={handleAddClass} >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <input type="text" name="className" placeholder="Class Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Name</span>
                                </label>
                                <input type="text" name="instructorName" defaultValue={user?.displayName} readOnly  placeholder="instructor Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Email</span>
                                </label>
                                <input type="email" name="instructorEmail" defaultValue={user?.email} readOnly placeholder="Instructor Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="text" name="price" placeholder="Price" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Available Seats</span>
                                </label>
                                <input type="text" name="availableSeats" placeholder="Available Seats" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Details</span>
                                </label>
                                <input type="text" name="details" placeholder="Details" className="input input-bordered" />
                            </div>
                            <div className="form-control w-1/2 mx-auto mt-6">
                                <button className="btn btn-neutral">Add A Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddClass;