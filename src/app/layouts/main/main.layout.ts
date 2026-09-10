import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@mogtrade/app/store/auth/store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis, lucideLogOut, lucideSettings } from '@ng-icons/lucide';
import { HlmAvatar, HlmAvatarFallback } from '@spartan-ng/helm/avatar';
import {
  HlmDropdownMenu,
  HlmDropdownMenuItem,
  HlmDropdownMenuSeparator,
  HlmDropdownMenuTrigger,
} from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'tm-main',
  viewProviders: [
    provideIcons({
      lucideSettings,
      lucideEllipsis,
      lucideLogOut,
    }),
  ],
  imports: [
    RouterOutlet,
    HlmSidebarImports,
    NgIcon,
    HlmAvatar,
    HlmAvatarFallback,
    HlmDropdownMenu,
    HlmDropdownMenuSeparator,
    HlmDropdownMenuTrigger,
    HlmDropdownMenuItem,
  ],
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.scss',
})
export class MainLayout {
  protected readonly principal = inject(AuthStore).principal;
  protected readonly footerItems = [
    { label: 'Settings', icon: 'lucideSettings', route: 'settings' },
  ];
  protected logout() {}
}
