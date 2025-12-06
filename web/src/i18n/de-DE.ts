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
    subtitle: 'Melden Sie sich bei Ihrem Konto an',
    username: 'Benutzername',
    password: 'Passwort',
    login: 'Anmelden',
    remember: 'Angemeldet bleiben',
    forgotPassword: 'Passwort vergessen?',
    noAccount: 'Kein Konto? Jetzt registrieren',
    error: 'Anmeldung fehlgeschlagen: {{error}}',
    oauthError: 'OAuth-Anmeldung fehlgeschlagen: {{error}}',
    usernameRequired: 'Bitte geben Sie Ihren Benutzernamen ein!',
    passwordRequired: 'Bitte geben Sie Ihr Passwort ein!',
    or: 'Oder',
    continueWith: 'Weiter mit {{provider}}',
    mfaTips: {
      email: 'Sie haben die E-Mail-basierte MFA aktiviert. Bitte geben Sie das entsprechende Einmalpasswort ein.',
      totp: 'Sie haben die MFA per E-Mail aktiviert. Bitte geben Sie das Einmalpasswort ein, das Sie erhalten haben.',
    },
  },
  register: {
    subtitle: 'Ein neues Konto erstellen',
    username: 'Benutzername',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    submit: 'Registrieren',
    haveAccount: 'Haben Sie bereits ein Konto? Anmelden',
    success: 'Registrierung erfolgreich, bitte anmelden',
    error: 'Registrierung fehlgeschlagen, bitte versuchen Sie es später erneut',
    passwordNotMatch: 'Die beiden Passwörter stimmen nicht überein',
    usernameRequired: 'Bitte geben Sie Ihren Benutzernamen ein!',
    usernameMinLength: 'Benutzername muss mindestens 3 Zeichen lang sein',
    fullNameRequired: 'Bitte geben Sie Ihren vollständigen Namen ein!',
    emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein!',
    emailInvalid: 'Ungültiges E-Mail-Format!',
    passwordRequired: 'Bitte geben Sie Ihr Passwort ein!',
    passwordMinLength: 'Passwort muss mindestens 6 Zeichen lang sein',
    confirmPasswordRequired: 'Bitte bestätigen Sie Ihr Passwort!',
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Willkommen zurück, {{name}}',
  },

  system: {
    settings: 'Systemeinstellungen',
    password: {
      minLength: 'Minimale Passwortlänge',
      complexity: 'Passwortkomplexität',
      expiration: 'Passwortablauf',
    },
    mfa: {
      title: 'Multi-Faktor-Authentifizierung',
      totp: 'TOTP-Authentifizierung',
      email: 'E-Mail-Authentifizierung',
    },
    user: {
      autoDisable: 'Inaktive Benutzer automatisch deaktivieren',
    },
  },
  menu: {
    authorization: {
      users: 'Benutzer',
      roles: 'Rolle',
      serviceAccounts: 'Dienstkonto',
      authorization: 'Berechtigungsverwaltung',
    },
    settings: 'Einstellung',
    dashboard: 'Dashboard',
    system: {
      settings: 'Systemeinstellungen',
      audit: 'Audit-Protokoll',
      system: 'Systemverwaltung',
    },
    console: 'Konsole',
  },
  breadcrumbs: {
    "authorization.users": 'Benutzer',
    "authorization.roles": 'Rolle',
    authorization: 'Berechtigungsverwaltung',
    settings: 'Einstellung',
    dashboard: 'Dashboard',
    profile: 'Profil',
    system: 'System',
    "system.settings": 'Systemeinstellungen',
    "system.audit": 'Audit-Protokoll',
    "authorization.serviceAccounts": 'Dienstkonto',
  },
  error: {
    notFound: 'Entschuldigung, die von Ihnen besuchte Seite existiert nicht.',
    forbidden: 'Entschuldigung, Sie sind nicht berechtigt, auf diese Seite zuzugreifen.',
    backHome: 'Zurück zur Startseite',
  },
  common: {
    save: 'Speichern',
    updateSuccess: 'Update erfolgreich',
    updateFailed: 'Update fehlgeschlagen',
    fetchFailed: 'Daten konnten nicht abgerufen werden',
    operationFailed: 'Vorgang fehlgeschlagen',
    done: 'Fertig',
    verify: 'Überprüfen',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
  },
}; 