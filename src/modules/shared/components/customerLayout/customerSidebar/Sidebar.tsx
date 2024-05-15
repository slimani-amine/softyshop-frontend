import CheckedItem from './components/CheckedItem';
import fiveStars from '../../../assets/icons/customerLayout/Sidebar/5-stars.png';
import fourStars from '../../../assets/icons/customerLayout/Sidebar/4-stars.png';
import threeStars from '../../../assets/icons/customerLayout/Sidebar/3-stars.png';
import twoStars from '../../../assets/icons/customerLayout/Sidebar/2-stars.png';
import oneStar from '../../../assets/icons/customerLayout/Sidebar/1-stars.png';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { useEffect } from 'react';
import { getBrands } from '../data/brandThunk';
import { getCategories } from '../data/categoryThunk';
import { brandType, categoryType } from '../data/dataTypes';

function Sidebar() {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brand.brands);
  const sortedBrands = brands
    .slice()
    .sort((a: categoryType, b: categoryType) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      else return 0;
    });
  const categories = useAppSelector((state) => state.category.categories);
  const sortedCategories = categories
    .slice()
    .sort((a: categoryType, b: categoryType) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      else return 0;
    });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch, getBrands]);

  return (
    <div className="sidebar-customer">
      <div className="categories sidebar-chunk">
        <h5 className="categories-title sidebar-chunk-title">Categories</h5>
        <ul className="list categories-list">
          {sortedCategories.map((category: categoryType, index: number) => (
            <li key={index} id={category.id.toString()}>
              <p>{category.name}</p>
            </li>
          ))}
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
      <div className="sidebar-chunk brands-list">
        <div className="sidebar-chunk-title">Publishing Companies</div>
        {sortedBrands.map((brand: brandType, index) => (
          <CheckedItem key={index}>{brand.name}</CheckedItem>
        ))}
      </div>
      <div className="sidebar-chunk">
        <CheckedItem>On Sale</CheckedItem>
        <CheckedItem>In stock</CheckedItem>
      </div>
      <div className="sidebar-chunk ratings-chunk">
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
      {/* <div className="sidebar-chunk colors-chunk">
        <div className="sidebar-chunk-title">Colors</div>
        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color orange"></div>
          <div className="color green"></div>
          <div className="color aqua"></div>
          <div className="color purple"></div>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
