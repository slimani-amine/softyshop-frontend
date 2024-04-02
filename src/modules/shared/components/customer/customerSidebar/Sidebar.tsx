import CheckedItem from './components/CheckedItem';
import fiveStars from '../../../assets/icons/customerLayout/Sidebar/5-stars.png';
import fourStars from '../../../assets/icons/customerLayout/Sidebar/4-stars.png';
import threeStars from '../../../assets/icons/customerLayout/Sidebar/3-stars.png';
import twoStars from '../../../assets/icons/customerLayout/Sidebar/2-stars.png';
import oneStar from '../../../assets/icons/customerLayout/Sidebar/1-stars.png';

function Sidebar() {
  return (
    <div className="sidebar-customer">
      <div className="categories sidebar-chunk">
        <h5 className="categories-title sidebar-chunk-title">Categories</h5>
        <ul className="list categories-list">
          <li>
            <a href="#">Bath Preparations</a>
          </li>
          <li>
            <a href="#">Eye Makeup Preparation</a>
          </li>
          <li>
            <a href="#">Fragrence</a>
          </li>
          <li>
            <a href="#">Hair Preparations</a>
          </li>
        </ul>
      </div>
      <div className="sidebar-chunk price">
        <div className="sidebar-chunk-title">Price Range</div>
        <div className="price-body">
          <input placeholder="0" type="number" />
          <p>-</p>
          <input placeholder="250" type="number" />
        </div>
      </div>
      <div className="sidebar-chunk">
        <div className="sidebar-chunk-title">Brands</div>
        <CheckedItem>Mac</CheckedItem>
        <CheckedItem>Karts</CheckedItem>
        <CheckedItem>Baals</CheckedItem>
        <CheckedItem>Buks</CheckedItem>
        <CheckedItem>Luasis</CheckedItem>
      </div>
      <div className="sidebar-chunk">
        <CheckedItem>On Sale</CheckedItem>
        <CheckedItem>In stock</CheckedItem>
        <CheckedItem>Featured</CheckedItem>
      </div>
      <div className="sidebar-chunk">
        <div className="sidebar-chunk-title">Ratings</div>
        <CheckedItem>
          <img src={fiveStars} alt="" />
        </CheckedItem>
        <CheckedItem>
          <img src={fourStars} alt="" />
        </CheckedItem>
        <CheckedItem>
          <img src={threeStars} alt="" />
        </CheckedItem>
        <CheckedItem>
          <img src={twoStars} alt="" />
        </CheckedItem>
        <CheckedItem>
          <img src={oneStar} alt="" />
        </CheckedItem>
      </div>
      <div className="sidebar-chunk colors-chunk">
        <div className="sidebar-chunk-title">Colors</div>
        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color orange"></div>
          <div className="color green"></div>
          <div className="color aqua"></div>
          <div className="color purple"></div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
