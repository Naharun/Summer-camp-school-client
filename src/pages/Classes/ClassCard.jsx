import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Route/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";


const ClassCard = ({ classData }) => {
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const {user} = useAuth();
    const { _id, photo, className, availableSeats, price, instructorName, instructorEmail, details } = classData;
    

    const handleSelectClass = (classData) => {
        if(user && user.email){
            const selectedClass = {selectedClassId: _id, photo,  className, availableSeats, price, instructorName, instructorEmail,details, email: user.email}
            fetch('https://summer-camp-school-server-beige.vercel.app/selected', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedClass)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
        else{
            Swal.fire({
                title: 'Please login',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {state: {from: location}})
                }
              })
        }
    }

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-2xl" >
                <figure className="h-1/2"><img className="w-full"  src={photo} alt="class" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{className}</h2>
                    <p>Instructor Name: <span className="font-medium">{instructorName}</span></p>
                    <p>Price: $ <span className="font-medium ">{price}</span></p>
                    <p>Available Seats: <span className="font-medium ">{availableSeats}</span></p>
                    <div className="card-actions justify-end">
                        <button onClick={()=> handleSelectClass (classData)}  className="btn btn-accent">Apply Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassCard;