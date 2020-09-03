const apiUrl = '/api/management/v1';
const useradmApiUrl = `${apiUrl}/useradm`;

module.exports = {
  RECEIVED_QR_CODE: 'RECEIVED_QR_CODE',

  SUCCESSFULLY_LOGGED_IN: 'SUCCESSFULLY_LOGGED_IN',
  USER_LOGOUT: 'USER_LOGOUT',
  RECEIVED_USER_LIST: 'RECEIVED_USER_LIST',
  RECEIVED_USER: 'RECEIVED_USER',
  CREATED_USER: 'CREATED_USER',
  REMOVED_USER: 'REMOVED_USER',
  UPDATED_USER: 'UPDATED_USER',

  RECEIVED_ROLES: 'RECEIVED_ROLES',
  CREATED_ROLE: 'CREATED_ROLE',
  UPDATED_ROLE: 'UPDATED_ROLE',
  REMOVED_ROLE: 'REMOVED_ROLE',

  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_GLOBAL_SETTINGS: 'SET_GLOBAL_SETTINGS',
  SET_ORGANIZATION: 'SET_ORGANIZATION',
  SET_SHOW_HELP: 'SET_SHOW_HELP',
  SET_SHOW_ONBOARDING_HELP: 'SET_SHOW_ONBOARDING_HELP',
  SET_SHOW_ONBOARDING_HELP_DIALOG: 'SET_SHOW_ONBOARDING_HELP_DIALOG',
  SET_ONBOARDING_COMPLETE: 'SET_ONBOARDING_COMPLETE',
  SET_SHOW_CONNECT_DEVICE: 'SET_SHOW_CONNECT_DEVICE',
  SET_SHOW_CREATE_ARTIFACT: 'SET_SHOW_CREATE_ARTIFACT',
  SET_ONBOARDING_PROGRESS: 'SET_ONBOARDING_PROGRESS',
  SET_ONBOARDING_DEVICE_TYPE: 'SET_ONBOARDING_DEVICE_TYPE',
  SET_ONBOARDING_APPROACH: 'SET_ONBOARDING_APPROACH',
  SET_ONBOARDING_ARTIFACT_INCLUDED: 'SET_ONBOARDING_ARTIFACT_INCLUDED',

  emptyRole: { title: undefined, allowUserManagement: false, groups: [], description: '', editable: undefined, permissions: [] },
  rolesByName: {
    admin: 'RBAC_ROLE_PERMIT_ALL',
    readOnly: 'RBAC_ROLE_OBSERVER',
    ci: 'RBAC_ROLE_CI',
    userManagement: { action: 'http', object: { type: 'any', value: `${useradmApiUrl}/.*` } },
    deploymentCreation: { action: 'CREATE_DEPLOYMENT', object: { type: 'DEVICE_GROUP', value: undefined } },
    groupAccess: { action: 'VIEW_DEVICE', object: { type: 'DEVICE_GROUP', value: undefined } }
  },
  tenantadmUrl: `${apiUrl}/tenantadm`,
  useradmApiUrl
};
