import ReactStars from "react-rating-stars-component";
import { HiOutlineThumbUp, HiOutlineShare } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";


const Review = () => {
    return (
        <div className="mx-auto p-6">
            <h2 className="text-xl font-bold">People's Reviews   </h2>
            <p>5 Rating <ReactStars
                count={5}
                size={24}
                color= "rgb(231, 101,15)"
            />
                3 Reviews</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="bg-slate-700 rounded-3xl p-8 font-bold text-white">
                    <h2 className=" gap-3">Sultana Forhad
                        <ReactStars
                            count={5}
                            size={24}
                            color="rgb(231, 101, 15)"
                        />
                    </h2>
                    <p>Best for learning instrument</p>
                    <span className="flex gap-3 text-cyan-600">
                        <HiOutlineThumbUp /> <HiOutlineShare /> <span className="text-red-700"><AiFillHeart /></span>
                    </span>
                </div>
                <div className="bg-slate-700 rounded-3xl p-8 font-bold text-white">
                    <h2 className=" gap-3">Aymana Mubashara
                        <ReactStars
                            count={5}
                            size={24}
                            color="rgb(231, 101, 15) "
                        />
                    </h2>
                    <p>Teachers are very friendly</p>
                    <span className="flex gap-3 text-cyan-600">
                        <HiOutlineThumbUp /> <HiOutlineShare /> <span className="text-red-700"><AiFillHeart /></span>
                    </span>
                </div>
                <div className="bg-slate-700 rounded-3xl p-8 font-bold text-white">
                    <h2 className=" gap-3">Mominul Haque
                        <ReactStars
                            count={5}
                            size={24}
                            color="rgb(231, 101, 15) "
                        />
                    </h2>
                    <p>Excellent learning musical instrument</p>
                    <span className="flex gap-3 text-cyan-600">
                        <HiOutlineThumbUp /> <HiOutlineShare /> <span className="text-red-700"><AiFillHeart /></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Review;