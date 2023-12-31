import Navbar from './navbar';
import '../maincss/Allcom.css';

export default function Home() {

  return (
    <div className='alltcom'>
      <div className='comnavview'>
      <div className='nav'>
      <Navbar />
      </div>
      </div>
      <div className='mainabout'>
        <div className='innercom'>
        <div className="aboutweb"><h2>About</h2></div>  
        </div>
      </div>
    </div>
  );
}
