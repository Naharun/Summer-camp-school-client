import { useEffect, useState } from "react";

const PopularInstructors = () => {
    const [instructors, setInstructor] = useState([]);
    useEffect(()=>{
        fetch('https://summer-camp-school-server-beige.vercel.app/users/instructor')
        .then(res=>res.json())
        .then(data=>setInstructor(data))
    },[] );

    return (
        <div className=" py-5 px-4">
            <h1 className="text-3xl font-bold font-serif text-center">Our Popular Instructors</h1>
            <hr />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 space-y-4">
                {
                    instructors.map(instructor => <div className="card w-96 bg-base-100 shadow-xl py-5" key={instructor._id}>
                        <figure><img className="w-[320px] h-[200px]" src={instructor.photo} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{instructor.name}</h2>
                            <p className="text-slate-800">Email: {instructor.email}</p>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default PopularInstructors;