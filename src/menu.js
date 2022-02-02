const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Single View',
        path: 'singleview',
        icon : 'icon-grid',
        translate: 'sidebar.nav.SINGLEVIEW'
    },
    {
        name: 'Menu',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.MENU',
        label: { value: 1, color: 'info' },
        submenu: [{
            name: 'Submenu',
            translate: 'sidebar.nav.SUBMENU',
            path: 'submenu'
        }]
    },
    {
        name: 'Parametrización',
        icon: 'icon-doc',
        translate: 'sidebar.nav.parametrizacion.usuarios',
        submenu: [
        {
            name: 'Registros de Impuestos',
            path: '/impuestos',
            translate: 'sidebar.nav.parametrizacion.impuestos'
        },
        {
            name: 'Tipo de Medidas',
            path: '/medidas',
            translate: 'sidebar.nav.parametrizacion.medidas'
        },
        {
            name: 'Tipo Proceso',
            path: '/tipo_proceso',
            translate: 'sidebar.nav.parametrizacion.tipo_proceso'
        },
        {
            name: 'Cautelar Entidad',
            path: '/cautelar_entidad',
            translate: 'sidebar.nav.parametrizacion.cautelar_entidad'
        },
       
    ]
     }
];

export default Menu;