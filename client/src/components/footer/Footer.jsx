import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Airports</li>
          <li className="fListItem">Hotels</li>
        </ul>
        <ul className="fList">
        <li className="fListItem">Villas</li>
            <li className="fListItem">Resorts</li>
            <li className="fListItem">Apartments</li>
            <li className="fListItem">Motels</li>
            <li className="fListItem">Cottages</li>
        </ul>
        <ul className="fList">
        <li className="fListItem">Car Rental</li>
            <li className="fListItem">Airport Taxi Rental</li>
            <li className="fListItem">Flight Finder</li>
            <li className="fListItem">Restaurant Reservations</li>
            <li className="fListItem">Hotel Booking</li>
        </ul>
        <ul className="fList">
        <li className="fListItem">About Us</li>
            <li className="fListItem">Customer Service</li>
            <li className="fListItem">Contact Us</li>
            <li className="fListItem">Terms & Conditions</li>
            <li className="fListItem">FAQs</li>
        </ul>
        
      </div>
      <div className="fText">Copyright © 2024 TravelBee</div>
    </div>
  );
};

export default Footer;
