export const menuData = {
  menuItems: [
    { 
      id: "О Проекте", 
      label: "О Проекте", 
      href: "/", 
      subLinks: [
        {id: 'aksil', label: 'Акселераторы', href: '/'},
        {id: 'prod', label: 'Prod Studio', href: '/'},
        {id: 'cafe', label: 'Tech Cafe', href: '/'},
        {id: 'genlab', label: '3D Gen Lab', href: '/'},
        {id: 'smi', label: 'СМИ', href: '/'},
        {id: 'news', label: 'Новости', href: '/'},
      ] 
    },
    { 
      id: "Для Участников", 
      label: "Для Участников", 
      href: "/",
      subLinks: [
        {id: 'before-participants', label: 'Предыдушие Участники', href: '/'},
        {id: 'participants', label: 'Стать Участником', href: '/'},
      ]  
    },
    { 
      id: "Для Спонсоров", 
      label: "Для Спонсоров", 
      href: "/",
      subLinks: [
        {id: 'sponsor', label: 'Спонсоры', href: '/sponsor'},
        {id: 'become-sponsor', label: 'Стать Спонсором', href: '/become-sponsor'},
      ]  },
    { 
      id: "Афиша", 
      label: "Афиша", 
      href: "/events",
    },
    { 
      id: "Контакты", 
      label: "Контакты", 
      href: "/contact", 
    }
  ],
};
