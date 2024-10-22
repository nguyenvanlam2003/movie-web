import Footer from "@components/Footer";
import Header from "@components/Header";
// import HeaderLogined from "@components/HeaderLogined";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <Header />
            {/* <HeaderLogined /> */}
            <Outlet />
            <Footer />
        </div>
    );
};
export default Root;
