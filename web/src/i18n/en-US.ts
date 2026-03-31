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
    fetchOAuthProvidersError: 'Failed to fetch OAuth providers',
    fetchSiteConfigError: 'Failed to fetch site config: {{error}}',
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
    tasks: 'Tasks',
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
    authorization: 'Authorization Management',
    authorization_roles: 'Roles',
    authorization_roles_roles: 'Roles',
    authorization_roles_roleCreate: 'Create Role',
    authorization_roles_roleUpdate: 'Role Update',
    authorization_users: 'Users',
    authorization_users_users: 'Users',
    authorization_users_userCreate: 'User Create',
    authorization_users_userDetail: 'User Detail',
    authorization_users_userUpdate: 'User Update',
    authorization_serviceAccounts: 'Service Accounts',
    authorization_serviceAccounts_serviceAccounts: 'Service Accounts',
    authorization_serviceAccounts_serviceAccountDetail: 'Service Account Detail',
    system: 'System',
    system_settings: 'System Settings',
    system_settings_settings: 'System Settings',
    system_settings_organizationDetail: 'Organization Detail',
    system_settings_skillEditor: 'Skill Editor',
    system_settings_skillPreview: 'Skill Preview',
    system_settings_aiTraceViewer: 'AI Trace',
    system_audit: 'Audit Log',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Setting',
    tasks: 'Tasks',
    taskSchedules: 'Task Schedules',
    tasks_taskList: 'Task List',
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