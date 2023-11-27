import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/dashbord/Home'
import AddUserComponent from './components/userComponent/AddUserComponent';
import AddWasherComponent from './components/washerComponent/AddWasherComponent';
import ListUsers from './components/userComponent/ListUsers';
import ListWashPack from './components/washpackComponent/ListWashPack';
import ListWasher from './components/washerComponent/ListWasher';
import AddWashPackComponent from './components/washpackComponent/AddWashPackComponent';
import Login from './components/dashbord/Login';
import UserProfile from './components/userComponent/UserProfile';
import UserHome from './components/userComponent/UserHome';
import ListWashPackForUser from './components/washpackComponent/ListWashPackForUser';
import UserDashBoard from './components/userComponent/UserDashBoard';
import AddWashPacktoUser from './components/userComponent/AddWashPacktoUser';
import GetWashPackById from './components/washpackComponent/GetWashPackById';
import About from './components/dashbord/About';
import ContactUs from './components/dashbord/ContactUs';
import AdminLogin from "./components/adminComponent/AdminLogin"
import AdminUserPage from './components/pages/AdminUserPage';
import AdminWasherPage from './components/pages/AdminWasherPage';
import AdminWashPackPage from './components/pages/AdminWashPackPage';
import ViewUserDetails from './components/userComponent/ViewUserDetails';
import WasherHome from './components/washerComponent/WasherHome';
import AdminHome from './components/adminComponent/AdminHome';
import WasherProfile from './components/washerComponent/WasherProfile';
import NotFound from './components/dashbord/NotFound';
import Layout from './Layout';
import AddWasherToWashpack from './components/washpackComponent/AddWasherToWashpack';
import WasherDetails from './components/washerComponent/WasherDetails';
import Payment from './components/payment/Payment ';
import UserForWasher from './components/washerComponent/UserForWasher';


function App() {
  
  return (
    <div>
      
      <Router>
 
      <div className='container'>
        <Routes>
          {/* http://localhost:3000/ */}

          {/* //----------------------dashboard routes-------------------------------------\\ */}
          <Route path="/" element={<Layout>{<Home/>}</Layout>} exact/>
          <Route path="/login" element={<Layout><Login/></Layout>} exact/>
          <Route path="/admin/login" element={<Layout><AdminLogin/></Layout>} exact/>
          <Route path='/about' element={<Layout><About/></Layout>} exact/>
          <Route path='/contact-us' element={<Layout><ContactUs/></Layout>} exact/>
          {/* //----------------------dashboard routes-------------------------------------\\ */}

          

          
          {/* //----------------------user routes-------------------------------------\\ */}
          <Route path="/listUsers" element={<Layout><ListUsers/></Layout>} exact/>
          <Route path="/adduser" element={<Layout><AddUserComponent/></Layout>} exact/>
          <Route path="/updateUser/:id" element={<Layout><AddUserComponent/></Layout>} exact/>
          <Route path="/addWashPackToUser/:id" element={<Layout><AddWashPacktoUser/></Layout>} exact/>
          <Route path="/viewDetailsById/:id" element={<Layout><ViewUserDetails/></Layout>} exact/>
          <Route path="/userHome/:id" element={<Layout><UserHome/></Layout>} exact/>
          <Route path="/userDashboard" element={<Layout><UserDashBoard/></Layout>} exact/>
          <Route path='/user/Profile/:id' element={<Layout><UserProfile/></Layout>} exact/>
          <Route path='/user/washPack/:id' element={<Layout><GetWashPackById/></Layout>} exact/>
          <Route path="/listOfWashpacksForUser" element={<Layout><ListWashPackForUser/></Layout>} exact/>
          {/* //----------------------user routes-------------------------------------\\ */}


          {/* //----------------------washer routes-------------------------------------\\ */}
          <Route path="/washerHome/:id" element={<Layout><WasherHome/></Layout>} exact/>
          <Route path="/washer/Profil/:id" element={<Layout><WasherProfile/></Layout>} exact/>
          <Route path="/washerDetails/:id" element={<Layout><WasherDetails/></Layout>} exact/>
          <Route path="/addWasher" element={<Layout><AddWasherComponent/></Layout>} exact/>
          <Route path="/listWasher" element={<Layout><ListWasher/></Layout>} exact/>
          <Route path="/updateWasher/:id" element={<Layout><AddWasherComponent/></Layout>} exact/>
          <Route path="/userForWasher/:id/:washPackName" element={<Layout><UserForWasher/></Layout>} exact/>
          {/* //----------------------washer routes-------------------------------------\\ */}


          {/* //----------------------washpack routes-------------------------------------\\ */}
          <Route path="/listwashpack" element={<Layout><ListWashPack/></Layout>} exact/>
          <Route path="/addWashpack" element={<Layout><AddWashPackComponent/></Layout>} exact/>
          <Route path="/updateWashpack/:id" element={<Layout><AddWashPackComponent/></Layout>} exact/>
          <Route path="/addWasherToWashpack/:id" element={<Layout><AddWasherToWashpack/></Layout>} exact/>
          {/* //----------------------washpack routes-------------------------------------\\ */}

          {/* //----------------------admin routes-------------------------------------\\ */}
          <Route path="/adminHome" Component={AdminHome}/>
          <Route path="/admin/listUser" Component={AdminUserPage}/>
          <Route path="/admin/listWashers" Component={AdminWasherPage}/>
          <Route path="/admin/ListWashPack" Component={AdminWashPackPage}/>
          {/* //----------------------admin routes-------------------------------------\\ */}


          <Route path="payment" Component={Payment}/>
          <Route path="*" element={<NotFound />} />
          
        </Routes>
        </div>
        
       {/* <Footer/> */}
      </Router>
      
      
    </div>
  );
}

export default App;
