/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default {
  login: {
    subtitle: 'Logga in på ditt konto',
    username: 'Användarnamn',
    password: 'Lösenord',
    login: 'Logga in',
    remember: 'Kom ihåg mig',
    forgotPassword: 'Glömt lösenord?',
    noAccount: 'Inget konto? Registrera dig nu',
    error: 'Inloggning misslyckades: {{error}}',
    oauthError: 'OAuth-inloggning misslyckades: {{error}}',
    usernameRequired: 'Vänligen ange ditt användarnamn!',
    passwordRequired: 'Vänligen ange ditt lösenord!',
    or: 'Eller',
    continueWith: 'Fortsätt med {{provider}}',
    fetchOAuthProvidersError: 'Det gick inte att hämta OAuth-leverantörer',
    fetchSiteConfigError: 'Det gick inte att hämta webbplatskonfiguration: {{error}}',
    mfaTips: {
      email: 'Du har aktiverat e-postbaserad MFA. Vänligen ange motsvarande engångslösenord.',
      totp: 'Du har aktiverat MFA baserad på e-post. Vänligen ange engångslösenordet du fick.',
    },
  },
  register: {
    subtitle: 'Skapa ett nytt konto',
    username: 'Användarnamn',
    fullName: 'Fullständigt namn',
    email: 'E-post',
    password: 'Lösenord',
    confirmPassword: 'Bekräfta lösenord',
    submit: 'Registrera',
    haveAccount: 'Har du redan ett konto? Logga in',
    success: 'Registreringen lyckades, vänligen logga in',
    error: 'Registreringen misslyckades, vänligen försök igen senare',
    passwordNotMatch: 'De två lösenorden matchar inte',
    usernameRequired: 'Vänligen ange ditt användarnamn!',
    usernameMinLength: 'Användarnamnet måste vara minst 3 tecken',
    fullNameRequired: 'Vänligen ange ditt fullständiga namn!',
    emailRequired: 'Vänligen ange din e-post!',
    emailInvalid: 'Ogiltigt e-postformat!',
    passwordRequired: 'Vänligen ange ditt lösenord!',
    passwordMinLength: 'Lösenordet måste vara minst 6 tecken',
    confirmPasswordRequired: 'Vänligen bekräfta ditt lösenord!',
  },
  dashboard: {
    title: 'Instrumentpanel',
    welcome: 'Välkommen tillbaka, {{name}}',
  },

  system: {
    settings: 'Systeminställningar',
    password: {
      minLength: 'Minsta lösenordslängd',
      complexity: 'Lösenordskomplexitet',
      expiration: 'Lösenordets giltighetstid',
    },
    mfa: {
      title: 'Multifaktorautentisering',
      totp: 'TOTP-autentisering',
      email: 'E-postautentisering',
    },
    user: {
      autoDisable: 'Inaktivera inaktiva användare automatiskt',
    },
  },
  menu: {
    authorization: {
      users: 'Användare',
      roles: 'Roll',
      serviceAccounts: 'Tjänstekonto',
      authorization: 'Auktoriseringshantering',
    },
    settings: 'Inställningar',
    dashboard: 'Instrumentpanel',
    system: {
      settings: 'Systeminställningar',
      audit: 'Granskningslogg',
      system: 'Systemhantering',
    },
    console: 'Konsol',
  },
  breadcrumbs: {
    "authorization.users": 'Användare',
    "authorization.roles": 'Roll',
    authorization: 'Auktoriseringshantering',
    settings: 'Inställningar',
    dashboard: 'Instrumentpanel',
    profile: 'Profil',
    system: 'System',
    "system.settings": 'Systeminställningar',
    "system.audit": 'Granskningslogg',
    "authorization.serviceAccounts": 'Tjänstekonto',
  },
  error: {
    notFound: 'Tyvärr, sidan du besökte finns inte.',
    forbidden: 'Tyvärr, du är inte behörig att komma åt den här sidan.',
    backHome: 'Tillbaka till startsidan',
  },
  common: {
    save: 'Spara',
    updateSuccess: 'Uppdateringen lyckades',
    updateFailed: 'Uppdateringen misslyckades',
    fetchFailed: 'Det gick inte att hämta data',
    operationFailed: 'Operationen misslyckades',
    done: 'Klar',
    verify: 'Verifiera',
    confirm: 'Bekräfta',
    cancel: 'Avbryt',
  },
}; 