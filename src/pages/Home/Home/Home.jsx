import { Helmet } from "react-helmet-async";
import TopSliderSection from "../TopSliderSection/TopSliderSection";
import Review from "../../ExtraSection/Review";
import PopularInstructors from "./PopularInstructors";
import Classes from "../../Classes/Classes";

const Home = () => {
    return (
        <div>
             <Helmet>
                <title>Instrument Of Percussion | Home</title>
            </Helmet>
            <TopSliderSection></TopSliderSection>
            <PopularInstructors></PopularInstructors>
            <Review></Review>
            <Classes></Classes>
        </div>
    );
};

export default Home;