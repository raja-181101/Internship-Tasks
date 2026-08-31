import TaskSection from "../Components/TaskSection.jsx";
import RegistrationSection from "../Components/RegistrationSection.jsx";
import DetailsSection from "../Components/DetailsSection.jsx";
import Footer from "../Components/Footer.jsx";

function Home(){
    return(
        <>
            <TaskSection />
            <RegistrationSection />
            <DetailsSection />
            <Footer />
        </>
    );
}
export default Home;