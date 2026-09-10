import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'tm-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.layout.html',
  styleUrl: './auth.layout.scss',
})
export class AuthLayout {}
