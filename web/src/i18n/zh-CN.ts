export default {
  login: {
    subtitle: '登录您的账户',
    username: '用户名',
    password: '密码',
    login: '登录',
    remember: '记住我',
    forgotPassword: '忘记密码？',
    noAccount: '没有账户？立即注册',
    error: '登录失败: {{error}}',
    oauthError: 'OAuth2.0登录失败: {{error}}',
    usernameRequired: '请输入用户名!',
    passwordRequired: '请输入密码!',
    or: '或',
    continueWith: '继续使用{{provider}}登录',
    mfaTips: {
      email: '您已启用基于邮箱的MFA，请输入您收到的一次性密码。',
      totp: '您已启用基于TOTP的MFA，请输入对应的一次性密码。',
    },
  },
  register: {
    subtitle: '创建新账户',
    username: '用户名',
    fullName: '姓名',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    submit: '注册',
    haveAccount: '已有账户？立即登录',
    success: '注册成功，请登录',
    error: '注册失败，请稍后再试',
    passwordNotMatch: '两次输入的密码不一致',
    usernameRequired: '请输入用户名!',
    usernameMinLength: '用户名至少3个字符',
    fullNameRequired: '请输入姓名!',
    emailRequired: '请输入邮箱!',
    emailInvalid: '邮箱格式不正确!',
    passwordRequired: '请输入密码!',
    passwordMinLength: '密码至少6个字符',
    confirmPasswordRequired: '请确认密码!',
  },
  dashboard: {
    title: '仪表盘',
    welcome: '欢迎回来，{{name}}',
  },
  system: {
    settings: '系统设置',
    password: {
      minLength: '密码最小长度',
      complexity: '密码复杂度',
      expiration: '密码过期时间',
    },
    mfa: {
      title: '多因素认证',
      totp: 'TOTP认证',
      email: '邮箱认证',
    },
    user: {
      autoDisable: '不活跃用户自动禁用',
    },
  },
  menu: {
    authorization: {
      users: '用户',
      roles: '角色',
      serviceAccounts: '服务账户',
      authorization: '授权管理',
    },
    system: {
      system: '系统管理',
      settings: '系统设置',
      audit: '审计日志',
    },
    console: '控制台',
    settings: '设置',
    dashboard: '仪表盘',
    profile: '个人中心',
    workbenches: '工作台',
    home: '首页',
    audit: '审计',
  },
  breadcrumbs: {
    "authorization.users": '用户',
    "authorization.roles": '角色',
    authorization: '授权管理',
    "system.settings": '系统设置',
    "system.audit": '审计日志',
    system: '系统管理',
    settings: '设置',
    dashboard: '仪表盘',
    profile: '个人中心',
    "authorization.serviceAccounts": '服务账户',
  },
  error: {
    notFound: '抱歉，您访问的页面不存在。',
    forbidden: '抱歉，您没有权限访问此页面。',
    backHome: '返回首页',
  },
  common: {
    save: '保存',
    updateSuccess: '更新成功',
    updateFailed: '更新失败',
    fetchFailed: '获取数据失败',
    operationFailed: '操作失败',
    done: '完成',
    verify: '验证',
    confirm: '确认',
    cancel: '取消',
  },
}; 