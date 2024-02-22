import { Link, useLocation } from 'react-router-dom'
import { SIDEBARITEMS } from '../Sidebar/items'
import { useTranslation } from 'react-i18next'
import logo from "../../../shared/assets/icons/sidebar/logo.svg"
interface ISidebarItemsProps {
  collapseSidebar: boolean
}


const SidebarItems: React.FC<ISidebarItemsProps> = ({ collapseSidebar }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation('sidebar')

  return (
    <div className="sidebar-items">
      <div className='header-sidebar'>
        <img className='logo' src={logo}   alt="" />
        <div className='icon' ><svg className="rightIcon" focusable="false" aria-hidden="true" viewBox="0 0 20 20" data-testid="ChevronLeftIcon"><path stroke-width='1'   d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg></div>
      </div>
      <span className='admin'>Admin</span>
      {SIDEBARITEMS?.map((route, index) => {
        return (
          <Link
            to={route?.link}
            key={index}
            className={`item ${pathname === route?.link && 'active'}`}
          >
            <div
              className={`link-icon-stroke-color ${
                pathname === route?.link && 'link-icon-stroke-color-active'
              }`}
            >
              {route?.icon}
            </div>
            {!collapseSidebar ? t(`sidebar.${route?.label.toLowerCase()}`).toUpperCase() : null}
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarItems
