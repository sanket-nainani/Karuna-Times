const SidebarList = () => {
  return [
    {
      to: '/hospitals',
      icon: 'icon icon-stopwatch',
      name: 'Hospitals'
    },
    {
      to: '/main',
      icon: 'icon icon-home',
      name: 'Main',
      hideItem: true
    },
    {
      to: '/settings',
      icon: 'icon icon-settings',
      name: 'Settings',
      hasSubMenu: [
        {
          to: '/item1',
          name: 'Item 1'
        },
        {
          to: '/privacypolicy',
          name: 'Privacy Policy'
        }
      ].filter(item => item)
    },
    {
      to: '/contact',
      icon: 'icon icon-contact',
      name: 'Contact',
      directLink: false
    }
  ].filter(item => item);
};

export default SidebarList;
