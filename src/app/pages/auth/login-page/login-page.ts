import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, validateStandardSchema } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { authEvents } from '@mogtrade/app/store/auth/events';
import { AuthStore } from '@mogtrade/app/store/auth/store';
import { PasswordInput } from '@mogtrade/components/password-input/password-input';
import { AuthService } from '@mogtrade/sdk/auth';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideLoader } from '@ng-icons/lucide';
import { injectDispatch } from '@ngrx/signals/events';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmAlert, HlmAlertDescription, HlmAlertTitle } from '@spartan-ng/helm/alert';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardFooter,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmField, HlmFieldError, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { lastValueFrom } from 'rxjs';
import z from 'zod';

const LoginModel = z.object({
  email: z
    .string()
    .trim()
    .nonempty('This field is required')
    .pipe(z.email('Invalid email address')),
  password: z.string().trim().nonempty('This field is required'),
});
type LoginModel = z.infer<typeof LoginModel>;

@Component({
  selector: 'tm-login-page',
  imports: [
    HlmCardHeader,
    HlmCardContent,
    HlmButton,
    HlmCardTitle,
    HlmAlert,
    HlmAlertTitle,
    HlmAlertDescription,
    HlmLabel,
    HlmInput,
    NgIcon,
    HlmSpinner,
    HlmCardFooter,
    HlmFieldError,
    HlmFieldLabel,
    FormRoot,
    PasswordInput,
    FormField,
    HlmField,
  ],
  viewProviders: [
    provideIcons({
      lucideLoader,
      lucideAlertCircle,
    }),
  ],
  hostDirectives: [HlmCard],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly dispatch = injectDispatch(authEvents);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly store = inject(AuthStore);
  protected readonly authService = inject(AuthService);
  protected readonly loginData = signal<LoginModel>({ email: '', password: '' });
  protected readonly flowStep = signal(0);
  protected readonly form = form(
    this.loginData,
    (paths) => {
      validateStandardSchema(paths, LoginModel);
    },
    {
      submission: {
        onInvalid: () => {
          this.flowStep.set(1);
          this.form.password().focusBoundControl({ focusVisible: true });
        },
        action: async (field) => {
          try {
            const { accessToken, refreshToken } = await lastValueFrom(
              this.authService.credentialSignIn(field().value()),
            );
            this.store.storeAccessToken(accessToken);
            this.store.updatePrincipal(accessToken);
            this.store.storeRefreshToken(refreshToken);

            const redirect = decodeURIComponent(this.route.snapshot.queryParams['continue'] ?? '/');
            this.router.navigateByUrl(redirect);
          } catch (e) {
            const err = e as HttpErrorResponse;
            return { kind: 'submissionError', message: err.error?.error ?? err.message };
          }
          return;
        },
      },
    },
  );
}
