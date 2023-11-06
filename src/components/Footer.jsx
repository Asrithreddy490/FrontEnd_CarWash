import "./Footer.css";
 
const Footer = () => {
    return (
      <footer className="bg-dark text-white text-center p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>On Demand Car Wash</h3>
              <p>Can Repair or wash any car</p>
            </div>
            <div className="col-md-6">
              <h4>Contact Information</h4>
              <address>
                <strong>Reddy Car Wash</strong><br />
                123 Main Street<br />
                Bangalore, India<br />
                Phone: (123) 456-7890<br />
                Email: Reddy_Car_Wash@example.com
              </address>
            </div>
          </div>
        </div>
        <div className="mt-2">
            &copy; <strong>2023</strong> On Demand Car Wash System. All rights reserved.
        </div>
      </footer>
    );
  };
 
export default Footer;