import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  //change the hardcoded values after backend integration
  public unreadNotifications: number = 3;

  constructor(private router: Router) { }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  public editProfile(): void {
    console.log("edit profile");
  }

  public onNotificationsClick(): void {
    console.log('Notifications clicked');
  }

  public onNotificationClick(): void {
    console.log('Notification clicked');
    
  }
}
