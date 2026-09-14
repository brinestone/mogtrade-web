import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { authEvents } from '@mogtrade/app/store/auth/events';
import { AuthStore } from '@mogtrade/app/store/auth/store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCandlestickChart,
  lucideChartLine,
  lucideEllipsis,
  lucideLogOut,
  lucideSettings,
  lucideTable,
} from '@ng-icons/lucide';
import { injectDispatch } from '@ngrx/signals/events';
import { HlmAvatar, HlmAvatarFallback, HlmAvatarImage } from '@spartan-ng/helm/avatar';
import {
  HlmDropdownMenu,
  HlmDropdownMenuItem,
  HlmDropdownMenuSeparator,
  HlmDropdownMenuTrigger,
} from '@spartan-ng/helm/dropdown-menu';
import {
  HlmSidebarImports,
  HlmSidebarService,
  provideHlmSidebarConfig,
} from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'tm-main',
  viewProviders: [
    provideIcons({
      lucideSettings,
      lucideEllipsis,
      lucideLogOut,
      lucideChartLine,
      lucideCandlestickChart,
    }),
  ],
  providers: [
    provideHlmSidebarConfig({
      defaultOpen: false,
    }),
  ],
  imports: [
    HlmSidebarImports,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgIcon,
    HlmAvatar,
    HlmAvatarFallback,
    HlmDropdownMenu,
    NgClass,
    HlmDropdownMenuSeparator,
    HlmDropdownMenuTrigger,
    HlmDropdownMenuItem,
    HlmAvatarImage,
  ],
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.scss',
})
export class MainLayout {
  protected readonly sidebarService = inject(HlmSidebarService);
  protected readonly principal = inject(AuthStore).principal;
  protected readonly menuItems = [
    { label: 'Markets', icon: 'lucideChartLine', path: '/console/markets' },
    { label: 'Trade', path: '/console/markets/trade', icon: 'lucideCandlestickChart' },
  ];
  protected readonly footerItems = [
    { label: 'Settings', icon: 'lucideSettings', route: 'settings' },
  ];
  protected signOut = injectDispatch(authEvents).signOut;
}
