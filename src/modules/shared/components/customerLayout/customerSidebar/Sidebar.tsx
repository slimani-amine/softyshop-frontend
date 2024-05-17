import CheckedItem from './components/CheckedItem';
import fiveStars from '../../../assets/icons/customerLayout/Sidebar/5-stars.png';
import fourStars from '../../../assets/icons/customerLayout/Sidebar/4-stars.png';
import threeStars from '../../../assets/icons/customerLayout/Sidebar/3-stars.png';
import twoStars from '../../../assets/icons/customerLayout/Sidebar/2-stars.png';
import oneStar from '../../../assets/icons/customerLayout/Sidebar/1-stars.png';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { useEffect, useState } from 'react';
import { getBrands } from '../data/brandThunk';
import { getCategories } from '../data/categoryThunk';
import { brandType, categoryType } from '../data/dataTypes';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Checkbox, ConfigProvider } from 'antd';

function Sidebar() {
  const [priceFloor, setPriceFloor] = useState<number | null>(null);
  const [priceCeiling, setPriceCeiling] = useState<number | null>(null);
  if (priceFloor == 0 || priceFloor == -1) setPriceFloor(null);
  if (priceCeiling == 0 || priceCeiling == -1) setPriceCeiling(null);

  console.log(priceFloor, priceCeiling);
  const [searchParams, setSearchParams] = useSearchParams();
  const category_id = searchParams.get('category_id');

  const [isOnSaleChecked, setIsOnSaleChecked] = useState(false);
  const [isInStockChecked, setIsInStockChecked] = useState(false);
  // const paramsObj = {
  //   priceCeiling: '',
  //   priceFloor: '',
  //   category_id: '',
  //   inStock: '',
  //   onSale: '',
  // };
  // delete paramsObj?.setSearchParams(new URLSearchParams(paramsObj));
  // console.log(paramsObj.toString());

  // const searchParams = new URLSearchParams(paramsObj);

  // if (priceFloor && priceCeiling)
  //   URLSearchParams.append(`${priceFloor}`, `${priceCeiling}`);
  // console.log(searchParams.toString());

  const { search } = useLocation();
  console.log(search);
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

  useEffect(
    () => {
      if (
        priceCeiling &&
        priceFloor &&
        category_id &&
        isInStockChecked &&
        isOnSaleChecked
      )
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
          category_id,
        });
      if (
        priceCeiling &&
        priceFloor &&
        !category_id &&
        isInStockChecked &&
        !isOnSaleChecked
      ) {
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
        });
      }
      if (
        priceCeiling &&
        priceFloor &&
        !category_id &&
        !isInStockChecked &&
        isOnSaleChecked
      ) {
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
        });
      }
      if (
        priceCeiling &&
        priceFloor &&
        !category_id &&
        isInStockChecked &&
        isOnSaleChecked
      ) {
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
        });
      }
      if (
        priceCeiling &&
        priceFloor &&
        category_id &&
        !isInStockChecked &&
        !isOnSaleChecked
      ) {
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
          category_id,
        });
      }
      if (
        priceCeiling &&
        priceFloor &&
        !category_id &&
        !isInStockChecked &&
        !isOnSaleChecked
      ) {
        setSearchParams({
          priceCeiling: priceCeiling.toString(),
          priceFloor: priceFloor.toString(),
        });
      }

      if (
        (category_id && isInStockChecked && !priceCeiling && !priceFloor) ||
        (category_id && isOnSaleChecked && !priceCeiling && !priceFloor)
      )
        setSearchParams({
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
          category_id,
        });
      if (
        (isInStockChecked || isOnSaleChecked) &&
        !category_id &&
        !priceCeiling &&
        !priceFloor
      )
        setSearchParams({
          inStock: isInStockChecked.toString(),
          onSale: isOnSaleChecked.toString(),
        });
      if (
        !isInStockChecked &&
        !isOnSaleChecked &&
        !priceCeiling &&
        !priceFloor &&
        category_id
      )
        setSearchParams({
          category_id,
        });
      if (
        !isInStockChecked &&
        !isOnSaleChecked &&
        !category_id &&
        !priceCeiling &&
        !priceFloor
      )
        setSearchParams({});
    },

    //
    [
      category_id,
      isInStockChecked,
      isOnSaleChecked,
      priceCeiling,
      priceFloor,
      search,
    ]
  );

  return (
    <div className="sidebar-customer">
      <div className="categories sidebar-chunk">
        <h5
          onClick={() => setSearchParams({})}
          className="categories-title sidebar-chunk-title"
        >
          All Categories
        </h5>
        <ul className="list categories-list">
          {sortedCategories.map((category: categoryType) => {
            const id = category.id.toString();
            function handleCategoryQuery(id: string) {
              setSearchParams({ category_id: id });
            }
            return (
              <li key={id} onClick={() => handleCategoryQuery(id)}>
                <p>{category.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebar-chunk price">
        <div className="sidebar-chunk-title">Price Range</div>
        <div className="price-body">
          <input
            placeholder="0"
            type="number"
            value={priceFloor ?? ''}
            onChange={(e) => setPriceFloor(+e.target.value)}
          />
          <p>-</p>
          <input
            placeholder="250"
            type="number"
            value={priceCeiling ?? ''}
            onChange={(e) => setPriceCeiling(+e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-chunk brands-list">
        <div className="sidebar-chunk-title">Publishing Companies</div>
        {sortedBrands.map((brand: brandType, index) => (
          <CheckedItem id={`brand ${brand.id}`} key={index}>
            {brand.name}
          </CheckedItem>
        ))}
      </div>
      <div className="sidebar-chunk">
        <div className="checked-item payment-method">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#0F3460',
              },
            }}
          >
            <Checkbox
              checked={isOnSaleChecked}
              onChange={() => {
                setIsOnSaleChecked(!isOnSaleChecked);
              }}
            />
          </ConfigProvider>{' '}
          On Sale
        </div>
        <div className="checked-item payment-method">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#0F3460',
              },
            }}
          >
            <Checkbox
              checked={isInStockChecked}
              onChange={() => {
                setIsInStockChecked(!isInStockChecked);
              }}
            />
          </ConfigProvider>{' '}
          In Stock
        </div>
      </div>
      <div className="sidebar-chunk ratings-chunk">
        <div className="sidebar-chunk-title">Ratings</div>
        <CheckedItem id="rating-5">
          <img src={fiveStars} alt="" />
        </CheckedItem>
        <CheckedItem id="rating-4">
          <img src={fourStars} alt="" />
        </CheckedItem>
        <CheckedItem id="rating-3">
          <img src={threeStars} alt="" />
        </CheckedItem>
        <CheckedItem id="rating-2">
          <img src={twoStars} alt="" />
        </CheckedItem>
        <CheckedItem id="rating-1">
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
