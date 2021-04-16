import { SidebarLink } from "../../../models/sidebar.models";

export const sidebarLinks: SidebarLink[] = [{
    icon: 'assets/icons/home.svg',
    activeIcon: 'assets/icons/active-home.svg',
    route: 'inicio',
    text: 'Inicio'
},{
    icon: 'assets/icons/crow.svg',
    activeIcon: 'assets/icons/active-crow.svg',
    route: 'users',
    text: 'Usuarios'
},{
    icon: 'assets/task.png',
    activeIcon: 'assets/active-task.png',
    route: 'tasks',
    text: 'Tareas'
}]