import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIDEBARITEMS } from '../Sidebar/items';
import { useTranslation } from 'react-i18next';
import logo from "../../../shared/assets/icons/sidebar/logo.svg";
import miniLogo from "../../../shared/assets/icons/sidebar/petit-logo.svg"
import { useAnimation } from '../../layout/MainLayout/context/animationContext';
interface ISidebarItemsProps {
  collapseSidebar: boolean;
}

const SidebarItems: React.FC<ISidebarItemsProps> = ({ collapseSidebar }) => {
  const { toggleAnimation , isAnimating } = useAnimation();
  console.log(isAnimating)

  const { pathname } = useLocation();
  const { t } = useTranslation('sidebar');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeChild, setActiveChild] = useState<string | null>(null);

  const handleToggleExpand = (link: string) => {
    setExpandedItems(expandedItems.includes(link)
      ? expandedItems.filter(item => item !== link)
      : [...expandedItems, link]
    );
  };

  const handleChildClick = (link: string) => {
    setActiveChild(link);
  };

  return (
    <div className="sidebar-items">
      <div className='header-sidebar'>
        <img className={` ${isAnimating? "miniLogo" : "logo"}`} src={isAnimating? miniLogo : logo} alt="" />
        <div className={`icon ${isAnimating ? "animate_icon" : ""}  `} onClick={toggleAnimation} ><svg className="rightIcon" focusable="false" aria-hidden="true" viewBox="0 0 20 20" data-testid="ChevronLeftIcon"><path stroke-width='1' d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></div>
      </div>
      <span className={`${isAnimating ? "hidden-admin":""} admin`}>Admin</span>
      {SIDEBARITEMS?.map((route, index) => {
        const isExpanded = expandedItems.includes(route?.link);
        return (
          <React.Fragment key={index}>
            <Link
              to={route?.link}
              onClick={() => handleToggleExpand(route?.link)}
            
              className={`item ${pathname === route?.link && 'active'}`}
            >
              <div className='item-left'>
                <div
                  className={`link-icon-stroke-color ${
                    pathname === route?.link && 'link-icon-stroke-color-active'
                  }`}
                >
                  {route?.icon}
                </div>
                <p  className={`${isAnimating ? "hidden" :"" } ${pathname === route?.link && 'active'} item-label `}>{!collapseSidebar ? t(`${route?.label.toLowerCase().toUpperCase()}`) : null}</p>
              </div>  
              <div className={`expendIcon ${isExpanded ? "rotate-expendIcon" : ''}`}>
                <svg  className={` ${isAnimating ? 'hidden-icon' : "  "}`}  focusable="false"  aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronRightIcon"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
              </div >
                


            </Link>
            <div className={`${isExpanded? "children_expanded" : "children"} `}>
            {isExpanded && route.children && (
                route.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    to={child.link}
                    className={`child-item ${pathname === child.link && 'active'} ${child.link === activeChild ? 'active-child' : ''}`}
                    onClick={() => handleChildClick(child.link)}
                  >

                    <div className={`${child.link===activeChild?"icon-child-active" : "icon-child" }  `}></div>
                    {!collapseSidebar ? t(`${child.label.toLowerCase().toLocaleUpperCase()}`) : null}
                  </Link>
                ))
          
            )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SidebarItems;
