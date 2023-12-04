import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import {  FaHome, FaUsers, FaWallet, } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
    const [isAdmin]= useAdmin();
    const [isInstructor]=useInstructor();
    return (
        <>
            <Helmet>
                <title>Instrument Of Percussion | Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side bg-transparent ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 ">
                    {
                            isAdmin ? <>
                                <li><NavLink to="/"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="manageClasses">Manage Classes</NavLink></li>
                                <li><NavLink to="allUsers"><FaUsers></FaUsers> All Users</NavLink></li>
                            </> : isInstructor ? <>
                                <li><NavLink to="myClass">My Classes</NavLink></li>
                                <li><NavLink to="addClass">Add A Class</NavLink></li>
                            </> : <> <li><NavLink to="mySelectedClass">My Selected Class</NavLink></li>
                                <li><NavLink to="paymentHistory"><FaWallet></FaWallet> Payment History</NavLink></li> </>
                        }
                        <div className="divider"></div>
                        <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
                        <li><NavLink to="/classes"> Classes</NavLink></li>
                        <li><NavLink to="/instructor">Instructors</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashboard;