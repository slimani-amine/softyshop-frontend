import { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import {  useAnimation } from './context/animationContext'
import { isAsExpression } from 'typescript'
interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {isAnimating} = useAnimation();

  const [showSidebar, setShowSidebar] = useState(false)
  const [collapseSidebar, setCollapseSidebar] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent | React.MouseEvent) => {
      if (!menuRef?.current?.contains(e?.target as Node)) {
        setShowSidebar(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (

    <div className="main-layout">
      <div
        className={`main-layout-sidebar ${showSidebar ? 'main-layout-toggle-mobile-sidebar' : ''}  `}
      >
        <Sidebar collapseSidebar={collapseSidebar} />
      </div>
  
      {showSidebar ? <span className="main-layout-shadow"></span> : null}
  
      <div className={`main-layout-content ${showSidebar ? 'main-layout-disable-events' : ''} ${isAnimating ? '' : ""}`}>
        <div className="main-layout-navbar">
          <Navbar
            setShowSidebar={setShowSidebar}
            setCollapseSidebar={setCollapseSidebar}
            collapseSidebar={collapseSidebar}
          />
        </div>
   
        <div className={`main-layout-outlet ${isAnimating?"main-layout-outlet-animate":""}`}>{children}</div>
      </div>
    </div>
  
  )
}

export default MainLayout
