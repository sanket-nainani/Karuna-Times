import React, { useContext, useState } from 'react';
import ActiveLink from './ActiveLink';
import sidebarList from '../constants/menu';
import sample from '../../../public/static/images/default.png';
import appContext from '../../../Context/appContext';

const Sidebar = () => {
  const [openedSubmenu, setOpenedSubmenu] = useState(null);

  const {
    state: {
      sideBar: { isSideBarOpen }
    },
    dispatch
  } = useContext(appContext);

  function handleBackdropClick() {
    dispatch({ type: 'toggleSidebar' });
  }

  function showHideSubmenu(name) {
    setOpenedSubmenu(openedSubmenu !== name ? name : null);
  }

  function renderSidebarContent() {
    return sidebarList().map(item => {
      if (item.hideItem === true) {
        return null;
      }

      if (item.hasSubMenu && item.hasSubMenu.length) {
        return (
          <div key={item.name} role="presentation" className="sidebarItem" onClick={() => showHideSubmenu(item.name)}>
            <div className="sidebarItemStyle">
              <span className={item.icon} />
              <span className="text-dark">{item.name}</span>
            </div>
            {openedSubmenu === item.name && (
              <div className="submenu">
                {item.hasSubMenu.map(subItem => {
                  if (subItem.hideItem === true) {
                    return null;
                  }
                  if (subItem.component) {
                    return <subItem.component key={subItem.name} item={subItem} onClick={handleBackdropClick} />;
                  }
                  if (subItem.directLink) {
                    return (
                      <a href={subItem.to} key={subItem.name} className="sidebarItem">
                        <div className="sidebarItemStyle">
                          <span className="text-dark">{subItem.name}</span>
                        </div>
                      </a>
                    );
                  }
                  return (
                    <ActiveLink key={subItem.name} href={subItem.to} className="sidebarItem" onClick={handleBackdropClick}>
                      <div className="sidebarItemStyle">
                        <span className="text-dark">{subItem.name}</span>
                      </div>
                    </ActiveLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      if (item.directLink) {
        return (
          <a
            href={item.to}
            key={item.name}
            target={item.directExternalLink && '_blank'}
            rel={item.directExternalLink && 'noreferrer'}
            className="sidebarItem"
          >
            <div className="sidebarItemStyle">
              <span className={item.icon} />
              <span className="text-dark">{item.name}</span>
            </div>
          </a>
        );
      }

      if (item.component) {
        return <item.component key={item.name} item={item} onClick={handleBackdropClick} />;
      }

      return (
        <ActiveLink
          key={item.name}
          href={item.to}
          className="sidebarItem"
          onClick={handleBackdropClick}
          directLink={item.directLink}
        >
          <div className="sidebarItemStyle">
            <span className={item.icon} />
            <span className="text-dark">{item.name}</span>
          </div>
        </ActiveLink>
      );
    });
  }

  return (
    <div className={`sidebar ${isSideBarOpen ? 'open' : ''} transition`}>
      <div className="backdrop" role="presentation" onClick={() => dispatch({ type: 'toggleSidebar' })} />
      <div className="content">
        <div className="sidebarContent">
          <div className="sidebarBanner">
            <div className="sidebarBg" />
            <img src={sample} alt={process.env.NEXT_PUBLIC_APP_NAME} className="logo-img" />
          </div>
          <div className="menu-list">{renderSidebarContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
