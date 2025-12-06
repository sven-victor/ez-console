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
  models: {
    name: 'Name',
    provider: 'Provider',
    modelId: 'Model ID',
    status: 'Status',
    description: 'Description',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    create: 'Create AI Model',
    edit: 'Edit AI Model',
    test: 'Test Connection',
    setDefault: 'Set as Default',
    defaultModel: 'Default Model',
    searchPlaceholder: 'Search AI models...',
    namePlaceholder: 'Enter model name',
    descriptionPlaceholder: 'Enter model description',
    providerPlaceholder: 'Select provider',
    apiKeyPlaceholder: 'Enter API key',
    apiKeyPlaceholderEdit: 'Leave empty to keep current API key',
    baseUrlPlaceholder: 'Optional: Custom API endpoint',
    setAsDefault: 'Set as default model',
    nameRequired: 'Please enter model name',
    providerRequired: 'Please select provider',
    modelIdRequired: 'Please enter model ID',
    apiKeyRequired: 'Please enter API key',
    fetchFailed: 'Failed to fetch AI models',
    createSuccess: 'AI model created successfully',
    createFailed: 'Failed to create AI model',
    updateSuccess: 'AI model updated successfully',
    updateFailed: 'Failed to update AI model',
    deleteSuccess: 'AI model deleted successfully',
    deleteFailed: 'Failed to delete AI model',
    testSuccess: 'AI model connection test successful',
    testFailed: 'AI model connection test failed',
    setDefaultSuccess: 'Default AI model set successfully',
    setDefaultFailed: 'Failed to set default AI model',
    deleteConfirm: 'Are you sure you want to delete this AI model?',
  },
  chat: {
    openAssistant: 'Open AI Assistant',
    newConversation: 'New Conversation',
    defaultConversationTitle: 'New Conversation',
    deleteConversationFailed: 'Failed to delete conversation.',
    requestInProgress: 'Request is in progress, please wait for the request to complete.',
    today: 'Today',
    renameConversation: 'Rename',
    inputPlaceholder: 'Please input your message',
    regenerateTitle: 'Regenerate Title',
    generatingTitle: 'Generating title...',
    titleGenerated: 'Title generated successfully',
    titleGenerationFailed: 'Failed to generate title',
  },
};
