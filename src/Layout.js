import Footer from "./components/Footer";
import Navbar from "./components/dashbord/Navbar";

function Layout({ children }) {
    return (
      <div>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    );
  }
   
  export default Layout;