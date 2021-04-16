import { SidebarLink } from "../../../models/sidebar.models";

export const sidebarLinks: SidebarLink[] = [{
    icon: 'assets/icons/home.svg',
    activeIcon: 'assets/icons/active-home.svg',
    route: 'inicio',
    text: 'Inicio'
},{
    icon: 'assets/icons/crow.svg',
    activeIcon: 'assets/icons/active-crow.svg',
    route: 'usuarios',
    text: 'Usuarios'
},{
    icon: 'assets/icons/task.svg',
    activeIcon: 'assets/icons/active-task.svg',
    route: 'tasks',
    text: 'Tareas'
}]