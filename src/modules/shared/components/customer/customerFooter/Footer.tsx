import LogoDarkmode from '../../../assets/icons/customerLayout/Footer/logo-darkmode.svg';
import facebook from '../../../assets/icons/customerLayout/Footer/facebook.svg';
import google from '../../../assets/icons/customerLayout/Footer/google.svg';
import instagram from '../../../assets/icons/customerLayout/Footer/instagram.svg';
import youtube from '../../../assets/icons/customerLayout/Footer/youtube.svg';
import twitter from '../../../assets/icons/customerLayout/Footer/twitter.svg';

import googlePlay from '../../../assets/images/customerLayout/google-play.png';
import appStore from '../../../assets/images/customerLayout/app-store.png';

function Footer() {
  return (
    <div className="footer">
      <div className="column first-column">
        <img className="logo" src={LogoDarkmode} alt="" />
        <p className="column-text first-column-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui iusto
          dolore provident suscipit tempore nam deserunt debitis labore illo
          necessitatibus aliquid.
        </p>
        <div className="stores-imgs google-play">
          <img src={googlePlay} alt="" />
        </div>
        <div className="stores-imgs">
          <img src={appStore} alt="" />
        </div>
      </div>
      <div className="column second-column">
        <h6 className="column-title">About us</h6>
        <ul>
          <li className="column-text">Careers</li>
          <li className="column-text">Our Stores</li>
          <li className="column-text">Our Cares</li>
          <li className="column-text">Terms & Conditions</li>
          <li className="column-text">Privacy Policy</li>
        </ul>
      </div>
      <div className="column third-column">
        <h6 className="column-title">Customer care</h6>
        <ul>
          <li className="column-text">Help center</li>
          <li className="column-text">Track your order</li>
          <li className="column-text">Corporate & Bulk purchasing</li>
          <li className="column-text">Returns and Refunds</li>
        </ul>
      </div>
      <div className="column fourth-column">
        <h6 className="column-title">contact us</h6>
        <ul>
          <li className="column-text">
            70 Washington Square South, New York, NY 10012,
            <br /> United States
          </li>
          <li className="column-text">Email: uilib.help@gmail.com</li>
          <li className="column-text phone-number">Phone: +1 1123 456 780</li>
        </ul>
        <div className="footer-icons">
          <img src={facebook} className="social-media-icons" alt="" />
          <img src={twitter} className="social-media-icons" alt="" />
          <img src={youtube} className="social-media-icons" alt="" />
          <img src={google} className="social-media-icons" alt="" />
          <img src={instagram} className="social-media-icons" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
