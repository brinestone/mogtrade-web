import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
  selector: 'mt-markets',
  imports: [RouterOutlet, HlmTabsImports],
  templateUrl: './markets.layout.html',
  styleUrl: './markets.layout.scss',
})
export class MarketsLayout {}
