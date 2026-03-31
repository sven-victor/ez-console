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
    subtitle: 'Inicia sesión en tu cuenta',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    login: 'Iniciar sesión',
    remember: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes cuenta? Regístrate ahora',
    error: 'Error de inicio de sesión: {{error}}',
    oauthError: 'Error de inicio de sesión de OAuth: {{error}}',
    usernameRequired: '¡Por favor, introduce tu nombre de usuario!',
    passwordRequired: '¡Por favor, introduce tu contraseña!',
    or: 'O',
    continueWith: 'Continuar con {{provider}}',
    fetchOAuthProvidersError: 'Error al obtener los proveedores de OAuth',
    fetchSiteConfigError: 'Error al obtener la configuración del sitio: {{error}}',
    mfaTips: {
      email: 'Has habilitado la MFA por correo electrónico. Introduce la contraseña de un solo uso correspondiente.',
      totp: 'Has habilitado la MFA por correo electrónico. Introduce la contraseña de un solo uso que has recibido.',
    },
  },
  register: {
    subtitle: 'Crear una nueva cuenta',
    username: 'Nombre de usuario',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    submit: 'Registrarse',
    haveAccount: '¿Ya tienes una cuenta? Iniciar sesión',
    success: 'Registro exitoso, por favor inicia sesión',
    error: 'Error en el registro, por favor inténtalo de nuevo más tarde',
    passwordNotMatch: 'Las dos contraseñas no coinciden',
    usernameRequired: '¡Por favor, introduce tu nombre de usuario!',
    usernameMinLength: 'El nombre de usuario debe tener al menos 3 caracteres',
    fullNameRequired: '¡Por favor, introduce tu nombre completo!',
    emailRequired: '¡Por favor, introduce tu correo electrónico!',
    emailInvalid: '¡Formato de correo electrónico no válido!',
    passwordRequired: '¡Por favor, introduce tu contraseña!',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
    confirmPasswordRequired: '¡Por favor, confirma tu contraseña!',
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Bienvenido de nuevo, {{name}}',
  },

  system: {
    settings: 'Ajustes del sistema',
    password: {
      minLength: 'Longitud mínima de la contraseña',
      complexity: 'Complejidad de la contraseña',
      expiration: 'Caducidad de la contraseña',
    },
    mfa: {
      title: 'Autenticación multifactor',
      totp: 'Autenticación TOTP',
      email: 'Autenticación por correo electrónico',
    },
    user: {
      autoDisable: 'Desactivar automáticamente usuarios inactivos',
    },
  },
  menu: {
    authorization: {
      users: 'Usuario',
      roles: 'Rol',
      serviceAccounts: 'Cuenta de servicio',
      authorization: 'Gestión de autorizaciones',
    },
    settings: 'Ajustes',
    dashboard: 'Dashboard',
    system: {
      settings: 'Ajustes del sistema',
      audit: 'Registro de auditoría',
      system: 'Gestión del sistema',
    },
    console: 'Consola',
  },
  breadcrumbs: {
    authorization: 'Gestión de autorizaciones',
    authorization_roles: 'Roles',
    authorization_roles_roles: 'Roles',
    authorization_roles_roleCreate: 'Crear rol',
    authorization_roles_roleUpdate: 'Editar rol',
    authorization_users: 'Usuarios',
    authorization_users_users: 'Usuarios',
    authorization_users_userCreate: 'Crear usuario',
    authorization_users_userDetail: 'Detalle de usuario',
    authorization_users_userUpdate: 'Editar usuario',
    authorization_serviceAccounts: 'Cuentas de servicio',
    authorization_serviceAccounts_serviceAccounts: 'Cuentas de servicio',
    authorization_serviceAccounts_serviceAccountDetail: 'Detalle de cuenta de servicio',
    system: 'Sistema',
    system_settings: 'Ajustes del sistema',
    system_settings_settings: 'Ajustes del sistema',
    system_settings_organizationDetail: 'Detalle de organización',
    system_settings_skillEditor: 'Editor de habilidad',
    system_settings_skillPreview: 'Vista previa de habilidad',
    system_settings_aiTraceViewer: 'Trazas de IA',
    system_audit: 'Registro de auditoría',
    dashboard: 'Dashboard',
    profile: 'Perfil',
    settings: 'Ajustes',
    tasks: 'Tareas',
    taskSchedules: 'Tareas programadas',
    tasks_taskList: 'Lista de tareas',
  },
  error: {
    notFound: 'Lo sentimos, la página que visitaste no existe.',
    forbidden: 'Lo sentimos, no estás autorizado para acceder a esta página.',
    backHome: 'Volver a inicio',
  },
  common: {
    save: 'Guardar',
    updateSuccess: 'Actualización exitosa',
    updateFailed: 'Actualización fallida',
    fetchFailed: 'Error al obtener los datos',
    operationFailed: 'Operación fallida',
    done: 'Hecho',
    verify: 'Verificar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
}; 