import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://summer-camp-school-server-beige.vercel.app/users/instructor')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <div className=" py-5 px-4">
            <Helmet>
                <title>Instrument Of Percussion | Instructors</title>
            </Helmet>
            <h1 className="text-2xl font-serif font-bold text-center">Here Are All The Instructors</h1>
            <div className="divider"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 space-y-4">
                {
                    users.map(user => <div className="card w-96 bg-base-100 shadow-xl py-5" key={user._id}>
                        <figure><img className="w-[320px] h-[200px]" src={user.photo} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title lg:font-bold lg:text-2xl">{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Instructors;