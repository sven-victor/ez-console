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
    subtitle: 'Sign in to your account',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    remember: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: 'No account? Register now',
    error: 'Login failed: {{error}}',
    oauthError: 'OAuth login failed: {{error}}',
    usernameRequired: 'Please input your username!',
    passwordRequired: 'Please input your password!',
    or: 'Or',
    continueWith: 'Continue with {{provider}}',
    mfaTips: {
      email: 'You have enabled email-based MFA, please enter the corresponding one-time password.',
      totp: 'You have enabled MFA based on email. Please enter the one-time password you received.',
    },
  },
  register: {
    subtitle: 'Create a new account',
    username: 'Username',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register',
    haveAccount: 'Already have an account? Sign in',
    success: 'Registration successful, please login',
    error: 'Registration failed, please try again later',
    passwordNotMatch: 'The two passwords do not match',
    usernameRequired: 'Please input your username!',
    usernameMinLength: 'Username must be at least 3 characters',
    fullNameRequired: 'Please input your full name!',
    emailRequired: 'Please input your email!',
    emailInvalid: 'Invalid email format!',
    passwordRequired: 'Please input your password!',
    passwordMinLength: 'Password must be at least 6 characters',
    confirmPasswordRequired: 'Please confirm your password!',
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back, {{name}}',
  },

  system: {
    settings: 'System Settings',
    password: {
      minLength: 'Minimum Password Length',
      complexity: 'Password Complexity',
      expiration: 'Password Expiration',
    },
    mfa: {
      title: 'Multi-Factor Authentication',
      totp: 'TOTP Authentication',
      email: 'Email Authentication',
    },
    user: {
      autoDisable: 'Auto Disable Inactive Users',
    },
  },
  menu: {
    authorization: {
      users: 'User',
      roles: 'Role',
      serviceAccounts: 'Service Account',
      authorization: 'Authorization Management',
    },
    settings: 'Setting',
    dashboard: 'Dashboard',
    system: {
      settings: 'System Settings',
      audit: 'Audit Log',
      system: 'System Management',
    },
    console: 'Console',
  },
  breadcrumbs: {
    "authorization.users": 'User',
    "authorization.roles": 'Role',
    authorization: 'Authorization Management',
    settings: 'Setting',
    dashboard: 'Dashboard',
    profile: 'Profile',
    system: 'System',
    "system.settings": 'System Settings',
    "system.audit": 'Audit Log',
    "authorization.serviceAccounts": 'Service Account',
  },
  error: {
    notFound: 'Sorry, the page you visited does not exist.',
    forbidden: 'Sorry, you are not authorized to access this page.',
    backHome: 'Back to Home',
  },
  common: {
    save: 'Save',
    updateSuccess: 'Update successful',
    updateFailed: 'Update failed',
    fetchFailed: 'Failed to fetch data',
    operationFailed: 'Operation failed',
    done: 'Done',
    verify: 'Verify',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
}; 