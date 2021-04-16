import { Component, OnInit } from '@angular/core';
import { sidebarLinks } from '../../data/sidebar-links.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarLinks = sidebarLinks;
  constructor() { }

  ngOnInit(): void {
  }

}
