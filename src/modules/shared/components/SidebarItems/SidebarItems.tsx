import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIDEBARITEMS } from '../Sidebar/items';
import { useTranslation } from 'react-i18next';
import logo from '../../../shared/assets/icons/sidebar/logo.svg';
import miniLogo from '../../../shared/assets/icons/sidebar/petit-logo.svg';
import { useAnimation } from '../../layout/MainLayout/context/animationContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ISidebarItemsProps {
  collapseSidebar: boolean;
}

const SidebarItems: React.FC<ISidebarItemsProps> = ({ collapseSidebar }) => {
  const { toggleAnimation, isAnimating } = useAnimation();
  // console.log(isAnimating)

  const { pathname } = useLocation();
  const { t } = useTranslation('sidebar');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeParent, setActiveParent] = useState<string | null>(null);

  const handleToggleExpand = (label: string) => {
    if (expandedItems.includes(label)) {
      setExpandedItems(expandedItems.filter((item) => item !== label));
    } else {
      setExpandedItems([...expandedItems, label]);
    }
  };

  

  const Current_User= useSelector((state: RootState) => state.auth.user?.role.toUpperCase()) || "vendor";
  console.log("role in all" , Current_User)


  return (
    <div className="sidebar-items">
      <div className="header-sidebar">
        <img
          className={` ${isAnimating ? 'miniLogo' : 'logo'}`}
          src={isAnimating ? miniLogo : logo}
          alt=""
        />
        <div
          className={`icon ${isAnimating ? 'animate_icon' : ''}  `}
          onClick={toggleAnimation}
        >
          <svg
            className="rightIcon"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 20 20"
            data-testid="ChevronLeftIcon"
          >
            <path
              strokeWidth="1"
              d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            ></path>
          </svg>
        </div>
      </div>
      <span className={`${isAnimating ? 'hidden-admin' : ''} admin`}>
        {Current_User}
      </span>
      {SIDEBARITEMS?.map((route, index) => {
        const isExpanded = expandedItems.includes(route?.label);
        const routeLink = route.link
        const path = pathname
        const currentLabel = activeParent?.split('/')[2]?.toLowerCase();
        const roles = route.roles;
        return roles?.includes(Current_User) ? (
          <React.Fragment key={index}>
            <Link
              to={route?.link}
              onClick={() => handleToggleExpand(route?.label)}
              className={`item   ${routeLink === path && 'active'}   `}
            >
              <div className="item-left">
                <div
                  className={` link-icon-stroke-color  ${
                    routeLink ===path &&
                    'link-icon-stroke-color-active'
                  }`}
                >
                  {route?.icon}
                </div>
                <p
                  className={`${isAnimating ? 'hidden' : ''}  ${
                    routeLink === path && 'active'
                  } item-label `}
                >
                  {!collapseSidebar ? t(`${route?.label}`) : null}
                </p>
              </div>
        
            </Link>
            {/*<div
              className={`${isExpanded ? 'children_expanded' : 'children'}  `}
            >
              {isExpanded &&
                route.children &&
                route.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    to={child.link}
                    className={`child-item ${
                      pathname === child.link && 'active'
                    } `}
                    onClick={() => handleChildClick(child.link)}
                  >
                    <div
                      className={`${
                        pathname === child.link
                          ? 'icon-child-active'
                          : 'icon-child'
                      }`}
                    ></div>
                    {!collapseSidebar ? t(`${child.label} `) : null}
                  </Link>
                ))}
                    </div>*/}
          </React.Fragment>
        ) : null;
      })}
    </div>
  );
};
export default SidebarItems;
