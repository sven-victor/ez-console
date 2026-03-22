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

import api from '@/service/api';
import {
  BlockOutlined,
  BorderRightOutlined,
  CloseOutlined,
  DeleteOutlined,
  HistoryOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Bubble,
  BubbleListProps,
  Conversations,
  Sender,
  XProvider,
  CodeHighlighter,
  Mermaid,
} from '@ant-design/x';
import { AbstractChatProvider, TransformMessage, useXChat, XRequest, XRequestOptions } from '@ant-design/x-sdk';
import { useXConversations, type MessageInfo } from '@ant-design/x-sdk';
import { type ComponentProps, XMarkdown, XMarkdownProps } from '@ant-design/x-markdown';

import { useRequest } from 'ahooks';
import { Button, Dropdown, Radio, Select, Space, Spin, Tag, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { theme } from 'antd';
import { useAI } from '@/contexts/AIContext';
import { BaseOptionType } from 'antd/es/select';
import { isArray } from 'lodash-es';
import classNames from 'classnames';
import { MessageStatus } from '@ant-design/x-sdk/es/x-chat';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';

const useStyle = createStyles(({ token, css }) => {
  return {
    siderLayout: css`
      width: 100%;
      height: calc(100vh - 60px);
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
    `,
    classicLayout: css`
      width: 100%;
      height: 70vh;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
    `,
    sider: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
    logo: css`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
    conversationsSpin: css`
      height: 100%;
      overflow-y: auto;
    `,
    conversations: css`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
    siderFooter: css`
      border-top: 1px solid ${token.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${token.paddingLG}px;
      gap: 16px;
    `,
    chatPrompt: css`
      .ant-prompts-label {
        color: #000000e0 !important;
      }
      .ant-prompts-desc {
        color: #000000a6 !important;
        width: 100%;
      }
      .ant-prompts-icon {
        color: #000000a6 !important;
      }
    `,
    chatList: css`
      flex: 1;
      overflow: auto;
      .ant-spin-nested-loading{
        height: 100%;
        .ant-spin-container{
          height: 100%;
        }
      }
      .ant-bubble-list{
        .ant-bubble.ant-bubble-start{
          padding-inline-end: 10%;
        }
      }
      .ant-bubble-end{
        .ant-bubble-content{
          background-color: rgb(22 119 255 / 15%);
        }
      }
      .ant-bubble-list-autoscroll{
        flex-direction: column-reverse;
      }
      .ant-bubble-content-updating {
        background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
        background-size: 200% 2px;
        background-repeat: no-repeat;
        background-position: 0% 100%;
        animation: loading-line 2s linear infinite;
      }

      @keyframes loading-line {
        from {
          background-position: 0% 100%;
        }
        to {
          background-position: 100% 100%;
        }
      }
    `,
    loadingMessage: css`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
    placeholder: css`
      padding-top: 32px;
    `,

    skillsSelect: css`
      width: 100%;
      max-width: min(95%, 700px);
      margin: 0 20px;
    `,
    sender: css`
      width: 100%;
      max-width: min(90%, 700px);
      margin: 0 auto;
    `,
    speechButton: css`
      font-size: 18px;
      color: ${token.colorText} !important;
    `,
    senderPrompt: css`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${token.colorText};
    `,
  };
});

interface ClientToolPendingCall {
  id: string;
  name: string;
  arguments: string;
}

interface ChatStreamMessage extends Pick<API.ChatStreamEvent, 'content' | 'role'> {
  error?: string;
  pendingClientToolCalls?: ClientToolPendingCall[];
  messageId?: string;
  status?: MessageStatus;
}

interface ClientToolSchema {
  name: string;
  description: string;
  parameters: unknown;
}

interface ClientToolResultPayload {
  tool_call_id: string;
  content: string;
}

interface ChatStreamInput {
  content: string;
  sessionId: string;
  domains?: string[];
  skill_ids?: string[];
  ephemeral_system_prompts?: string[];
  client_tools?: ClientToolSchema[];
  client_tool_results?: ClientToolResultPayload[];
}

interface ChatStreamOutput {
  data: string;
}

class ChatError extends Error {
  buffer: string[];
  constructor(message: string, buffer: string[]) {
    super(message);
    this.buffer = buffer;
  }
}

function isAbortError(error: unknown): boolean {
  if (error == null || typeof error !== 'object') {
    return false;
  }
  const e = error as { name?: string; message?: string };
  if (e.name === 'AbortError') {
    return true;
  }
  const msg = typeof e.message === 'string' ? e.message : '';
  return /aborted/i.test(msg) || /BodyStreamBuffer/i.test(msg);
}


class AIProvider<
  ChatMessage extends ChatStreamMessage = ChatStreamMessage,
  Input extends ChatStreamInput = ChatStreamInput,
  Output extends ChatStreamOutput = ChatStreamOutput,
> extends AbstractChatProvider<ChatMessage, Input, Output> {
  transformParams(requestParams: Partial<Input>, options: XRequestOptions<Input, Output>): Input {
    if (typeof requestParams !== 'object') {
      throw new Error('requestParams must be an object');
    }
    return {
      ...(options?.params || {}),
      ...(requestParams || {}),
    } as Input;
  }
  transformLocalMessage({ content }: Partial<Input>): ChatMessage {
    return {
      content: content,
      role: 'user',
    } as ChatMessage;
  }
  transformMessage(info: TransformMessage<ChatMessage, Output>): ChatMessage {
    const { originMessage, chunk, status } = info || {};
    if (!chunk) {
      return {
        ...originMessage,
        content: originMessage?.content || '',
        role: 'assistant',
        status,
      } as ChatMessage;
    }
    const chunkJson = JSON.parse(chunk.data) as API.ChatStreamEvent;
    const content = chunkJson.message_id === originMessage?.messageId ?
      `${originMessage?.content || ''}${chunkJson.content || ''}` :
      chunkJson.content || '';
    switch (chunkJson.event_type) {
      case 'tool_call':
      case 'content':
        return {
          ...originMessage,
          content: content,
          role: 'assistant',
          messageId: chunkJson.message_id,
          status,
        } as ChatMessage;
      case 'error':
        return {
          ...originMessage,
          content: content,
          role: 'assistant',
          error: chunkJson.content,
          messageId: chunkJson.message_id,
          status,
        } as ChatMessage;
      case 'client_tool_pending':
        return {
          ...originMessage,
          content: content || '',
          role: 'assistant',
          pendingClientToolCalls: (chunkJson as any).client_tool_calls as ClientToolPendingCall[],
          messageId: chunkJson.message_id,
          status,
        } as ChatMessage;
    }

  }
}

const providerCaches = new Map<string, AIProvider>();

const providerFactory = (conversationKey: string) => {
  if (!providerCaches.get(conversationKey)) {
    providerCaches.set(
      conversationKey,
      new AIProvider({
        request: XRequest<ChatStreamInput, ChatStreamOutput>(
          `/api/ai/chat/sessions/${conversationKey}`,
          {
            manual: true,
            middlewares:
            {
              onRequest: async (baseURL, options) => {
                const orgID = localStorage.getItem('orgID');
                const { sessionId } = options.params as any;
                const headers = {
                  ...options.headers,
                  'Accept-Language': localStorage.getItem('i18nextLng') || 'en-US',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  ...(orgID ? { 'X-Scope-OrgID': orgID } : {}),
                };

                return [sessionId ? `/api/ai/chat/sessions/${sessionId}` : baseURL, { ...options, headers }];
              },
            }
            ,
          },
        ),
      }),
    );
  }
  return providerCaches.get(conversationKey);
};

const Code: React.FC<ComponentProps> = (props) => {
  const { className, children } = props;
  const lang = className?.match(/language-(\w+)/)?.[1] || '';

  if (typeof children !== 'string') return null;
  if (lang === 'mermaid') {
    return <Mermaid>{children}</Mermaid>;
  }
  return <CodeHighlighter lang={lang}>{children}</CodeHighlighter>;
};

export const useMarkdownTheme = () => {
  const token = theme.useToken();

  const isLightMode = React.useMemo(() => {
    return token?.theme?.id === 0;
  }, [token]);

  const className = React.useMemo(() => {
    return isLightMode ? 'x-markdown-light' : 'x-markdown-dark';
  }, [isLightMode]);

  return [className];
};

const ChatContext = React.createContext<{
  onReload?: ReturnType<typeof useXChat>['onReload'];
  setMessage?: ReturnType<typeof useXChat<ChatStreamMessage, ChatStreamMessage, ChatStreamInput, ChatStreamOutput>>['setMessage'];
}>({});

interface SelectedSkillOption {
  type: 'domain' | 'skill';
  value: string;
}

export interface AIChatProps {
  bubble?: {
    contentRender?: (content: string) => React.ReactNode;
    footerRender?: (message: MessageInfo<ChatStreamMessage>) => React.ReactNode;
    components?: XMarkdownProps['components'];
  }
}

export const AIChat: React.FC<AIChatProps> = ({
  bubble = {},
}) => {

  const {
    components = { code: Code, },
    contentRender = (content: string) => {
      return (
        <XMarkdown
          paragraphTag="div"
          content={content}
          className={className}
          components={components}
        />
      );
    },
    footerRender = ({ message }: MessageInfo<ChatStreamMessage>) => {
      if (message.error) {
        return (
          <div>
            <XMarkdown content={message.error} components={components} />
          </div>
        );
      }
      return undefined;
    },
  } = bubble;
  const {
    layout,
    setVisible,
    setLayout,
    onCallAI,
    activeConversationKey: defaultActiveConversationKey,
    setActiveConversationKey: setDefaultActiveConversationKey,
    conversations: rawConversations,
    fetchConversationsLoading,
    ephemeralSystemPrompts,
    clientTools,
  } = useAI();
  const { t } = useTranslation('ai');
  const { t: tCommon } = useTranslation('common');
  const { styles } = useStyle();


  const convertConversation = (conversation: API.AIChatSession) => {
    return {
      key: conversation.id,
      label: conversation.title,
      group: dayjs(conversation.start_time).isSame(dayjs(), 'day') ? t('chat.today') : dayjs(conversation.start_time).format('YYYY-MM-DD'),
    }
  }

  const {
    conversations,
    activeConversationKey,
    setActiveConversationKey,
    addConversation,
    setConversations,
    getConversation,
    setConversation,
    removeConversation,
    getMessages,
  } = useXConversations({
    defaultActiveConversationKey: defaultActiveConversationKey,
    defaultConversations: rawConversations?.map((conversation) => convertConversation(conversation)) || [],
  });

  useEffect(() => {
    setDefaultActiveConversationKey(activeConversationKey)
  }, [activeConversationKey])

  const [className] = useMarkdownTheme();
  const [messageApi, contextHolder] = message.useMessage();

  const [inputValue, setInputValue] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkillOption[]>([]);

  const { data: domainsData } = useRequest(() => api.system.listSkillDomains());
  const domainOptions = ((domainsData as string[]) ?? []).map((d) => {
    return {
      skillType: 'domain',
      value: d,
      label: <><Tag>{t('chat.skillDomain', { defaultValue: 'Skill domain' })}</Tag>{d}</>
    };
  });
  const { data: skillsListData } = useRequest(() =>
    api.system.listSkills({ current: 1, page_size: 500 })
  );
  const skillsList = (skillsListData as any)?.data ?? [];
  const skillOptions = skillsList.map((s: { id: string; name: string; domain?: string }) => ({
    skillType: 'skill',
    value: s.id,
    label: <><Tag>{t('chat.skill', { defaultValue: 'Skill' })}</Tag>{s.name}</>,
  }));

  // Message buffer to be sent
  const [messageBuffer, setMessageBuffer] = useState<{ message: string, sessionId: string }>();


  const { onRequest, messages, isRequesting, abort, onReload, setMessages, setMessage } = useXChat<ChatStreamMessage, ChatStreamMessage, ChatStreamInput, ChatStreamOutput>({
    provider: providerFactory(activeConversationKey), // every conversation has its own provider
    conversationKey: activeConversationKey,
    defaultMessages: [],
    requestPlaceholder: () => {
      return {
        content: tCommon('loading'),
        role: 'assistant',
      };
    },
    requestFallback: (_, { error }) => {
      if (isAbortError(error)) {
        return {
          content: '',
          role: 'assistant' as API.AIChatMessageRole,
        };
      }
      if (error instanceof ChatError) {
        return {
          content: error.buffer.join(''),
          role: 'assistant' as API.AIChatMessageRole,

          // TODO: show error in message list
          error: error.message,
        }
      }
      return {
        content: `${error}`,
        role: 'assistant' as API.AIChatMessageRole,
      }
    },
  });
  const buildPageAIFields = useCallback((): Pick<ChatStreamInput, 'ephemeral_system_prompts' | 'client_tools'> => {
    const fields: Pick<ChatStreamInput, 'ephemeral_system_prompts' | 'client_tools'> = {};
    if (ephemeralSystemPrompts.length > 0) {
      fields.ephemeral_system_prompts = ephemeralSystemPrompts;
    }
    if (clientTools.length > 0) {
      fields.client_tools = clientTools.map(t => ({
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      }));
    }
    return fields;
  }, [ephemeralSystemPrompts, clientTools]);

  const pendingHandoffRef = useRef<ClientToolPendingCall[] | null>(null);

  const handleClientToolHandoff = useCallback(async (pendingCalls: ClientToolPendingCall[]) => {
    const results: ClientToolResultPayload[] = [];
    for (const call of pendingCalls) {
      const tool = clientTools.find(t => t.name === call.name);
      if (!tool) {
        results.push({
          tool_call_id: call.id,
          content: JSON.stringify({ error: `Client tool handler not found for ${call.name}` }),
        });
        continue;
      }
      try {
        const result = await Promise.resolve(tool.handler(call.arguments));
        results.push({ tool_call_id: call.id, content: result });
      } catch (err: any) {
        results.push({
          tool_call_id: call.id,
          content: JSON.stringify({ error: err?.message || String(err) }),
        });
      }
    }
    onRequest({
      content: '',
      client_tool_results: results,
      ...buildPageAIFields(),
    });
  }, [clientTools, onRequest, buildPageAIFields]);

  // Watch for completed requests with pending client tool calls
  useEffect(() => {
    if (!isRequesting && messages && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.message?.pendingClientToolCalls?.length) {
        const calls = lastMsg.message.pendingClientToolCalls;
        if (pendingHandoffRef.current !== calls) {
          pendingHandoffRef.current = calls;
          handleClientToolHandoff(calls);
        }
      } else {
        pendingHandoffRef.current = null;
      }
    }
  }, [isRequesting, messages, handleClientToolHandoff]);

  const onSubmit = (val: string) => {
    if (!val) return;

    if (!activeConversationKey) {
      createNewConversation(val);
      return;
    }
    onRequest({
      content: val,
      domains: selectedSkills.filter((s) => s.type === 'domain').map((s) => s.value),
      skill_ids: selectedSkills.filter((s) => s.type === 'skill').map((s) => s.value),
      ...buildPageAIFields(),
    });
  };

  const { run: fetchConversation, loading: fetchConversationLoading } = useRequest(async (sessionId: string) => {
    return await api.ai.getChatSession({ sessionId });
  }, {
    manual: true,
    onError: () => {
      message.error(t('chat.fetchConversationFailed', { defaultValue: 'Failed to fetch conversation' }));
    },
    onSuccess: (data) => {
      if (messages && messages.length > 0 && (messages[messages.length - 1].status === 'loading' || messages.length > data.messages.length)) {
        return
      }

      const chatMessages: MessageInfo<ChatStreamMessage>[] = [];
      let buffer: MessageInfo<ChatStreamMessage> = { id: '', message: { content: '', role: 'assistant' }, status: 'success' };
      for (const item of data.messages) {
        switch (item.role) {
          case 'assistant':
            buffer.status = (item.status === 'completed' && buffer.status === 'success') ? 'success' : 'error';
            buffer.message.role = 'assistant';
            if (buffer.id !== item.id && item.content) {
              buffer.message.content = item.content;
            }
            buffer.id = item.id;
            break;
          case 'user':
            if (buffer.message.content.length > 0) {
              chatMessages.push({
                id: buffer.id,
                message: {
                  content: buffer.message.content,
                  role: buffer.message.role,
                },
                status: buffer.status,
              });
              buffer = { id: '', message: { content: '', role: 'assistant' }, status: 'success' };
            }
            chatMessages.push({
              id: item.id,
              message: {
                content: item.content,
                role: item.role,
              },
              status: (item.status === 'completed') ? 'success' : 'error',
            });
            break;
        }
      }
      if (buffer.message.content.length > 0) {
        chatMessages.push({
          id: buffer.id,
          message: {
            content: buffer.message.content,
            role: buffer.message.role,
          },
          status: buffer.status,
        });
      }
      setMessages(chatMessages);
    }
  });
  const { run: createNewConversation, loading: createNewConversationLoading } = useRequest(async (_message?: string, messages?: API.SimpleChatMessage[], anonymous: boolean = false) => {
    return await api.ai.createChatSession({
      title: t('chat.defaultConversationTitle'),
      model_id: '',
      messages: messages || [],
      anonymous,
    });
  }, {
    manual: true,
    onError: () => {
      message.error(t('chat.createConversationFailed', { defaultValue: 'Failed to create conversation' }));
    },
    onSuccess: (data, [message]) => {
      addConversation(convertConversation(data), 'prepend');
      setActiveConversationKey(data.id);
      if (message) {
        setMessageBuffer({ message, sessionId: data.id });
      }
    },
  });

  useEffect(() => {
    setConversations(rawConversations?.map((conversation) => convertConversation(conversation)) || []);
  }, [rawConversations])

  const { run: deleteConversation } = useRequest(async (sessionId: string) => {
    return await api.ai.deleteChatSession({ sessionId });
  }, {
    manual: true,
    onError(_, [sessionId]) {
      messageApi.error(t('chat.deleteConversationFailed', { defaultValue: 'Failed to delete conversation' }));
      const conversation = getConversation(sessionId);
      if (!conversation) return;
      setConversation(sessionId, { ...conversation, loading: false });
    },
    onSuccess(_, [sessionId]) {
      removeConversation(sessionId);
    }
  });

  const { run: regenerateTitle } = useRequest(async (sessionId: string) => {
    return api.ai.generateChatSessionTitle({ sessionId }, { title: '' });
  }, {
    manual: true,
    onSuccess: ({ title }, [sessionId]) => {
      const conversation = getConversation(sessionId);
      if (!conversation) return;
      setConversation(sessionId, { ...conversation, title: title, loading: false });
    },
    onError: (err, [sessionId]) => {
      messageApi.error(t('chat.titleGenerationFailed', { defaultValue: 'Failed to generate title: {{error}}', error: err.message || err }));
      const conversation = getConversation(sessionId);
      if (!conversation) return;
      setConversation(sessionId, { ...conversation, loading: false });
    }
  });

  useEffect(() => {
    if (activeConversationKey && messageBuffer?.sessionId === activeConversationKey) {
      const msg = messageBuffer.message;
      setTimeout(() => {
        onRequest({
          content: msg,
          ...buildPageAIFields(),
        });
      }, 1000)
      setMessageBuffer(undefined);
    }
  }, [activeConversationKey, messageBuffer, buildPageAIFields])

  useEffect(() => {
    if (activeConversationKey) {
      const storagedMessages = getMessages(activeConversationKey);
      if (storagedMessages && storagedMessages.length > 0) {
        return
      }
      fetchConversation(activeConversationKey);
    }
  }, [activeConversationKey])


  useEffect(() => {
    if (onCallAI && createNewConversation) {
      onCallAI((message, messages) => {
        createNewConversation(message, messages, true);
      });
    }
  }, [createNewConversation, onCallAI])

  // ==================== Nodes ====================
  const chatSider = (
    <div className={styles.sider}>
      <Button
        onClick={() => { createNewConversation() }}
        type="link"
        className={styles.addBtn}
        icon={<PlusOutlined />}
        loading={createNewConversationLoading}
      >
        {t('chat.newConversation', { defaultValue: 'New Conversation' })}
      </Button>
      <Spin spinning={fetchConversationsLoading} wrapperClassName={styles.conversationsSpin}>
        <Conversations
          items={conversations}
          activeKey={activeConversationKey}
          onActiveChange={async (val) => {
            if (!val) return;
            setActiveConversationKey(val);
          }}

          className={styles.conversations}
          groupable
          styles={{ item: { padding: '0 8px' } }}
          menu={(conversation) => ({
            items: [
              {
                label: t('chat.regenerateTitle'),
                key: 'regenerateTitle',
                icon: <ReloadOutlined />,
                onClick: () => {
                  setConversation(conversation.key, { ...conversation, loading: true });
                  regenerateTitle(conversation.key)
                },
              },
              {
                label: tCommon('delete'),
                key: 'delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  setConversation(conversation.key, { ...conversation, loading: true });
                  deleteConversation(conversation.key)
                },
              },
            ],
          })}
        />
      </Spin>
    </div>
  );

  const bubbleMessages: BubbleListProps['items'] = messages?.map((i) => ({
    ...i.message,
    key: i.id,
    contentRender: contentRender,
    footer: footerRender?.(i),
  })).filter((i) => i.content);

  const chatList = (
    <div className={styles.chatList}>
      <Spin spinning={fetchConversationLoading || createNewConversationLoading}>
        <Bubble.List
          items={bubbleMessages}
          style={{
            height: '100%',
            paddingInline: layout === 'classic' ? 'calc(calc(100% - 700px) /2)' : '20px'
          }}
          // @ts-ignore
          roles={{
            assistant: {
              placement: 'start',
              loadingRender: () => <Spin size="small" />,
            },
            user: {
              placement: 'end',
            },
          }}
          role={{
            assistant: {
              placement: 'start',
              loadingRender: () => <Spin size="small" />,
            },
            user: {
              placement: 'end',
            },
          }}
        />
      </Spin>
    </div>
  );
  const chatSender = (
    <>
      <Space direction="vertical" style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
        <Select<string[], (BaseOptionType & { skillType: 'domain' | 'skill' }) >
          mode="multiple"
          allowClear
          placeholder={t('chat.skillsPlaceholder', { defaultValue: 'Skills (optional)' })}
          value={selectedSkills.map((s) => s.value)}
          onChange={(_, option) => {
            if (isArray(option)) {
              setSelectedSkills(option.map((o) => ({ type: o.skillType, value: o.value })));
            } else if (option) {
              setSelectedSkills([{ type: option.skillType, value: option.value }]);
            } else {
              setSelectedSkills([]);
            }
          }}
          options={[
            ...(domainOptions),
            ...(skillOptions),
          ]}
          className={classNames(styles.skillsSelect, 'chat-skills-select')}
        />
        <Sender
          value={inputValue}
          onSubmit={async () => {
            onSubmit(inputValue.trim());
            setInputValue('');
          }}
          onChange={setInputValue}
          onCancel={() => { abort() }}
          loading={isRequesting}
          className={classNames(styles.sender, 'chat-sender')}
          placeholder={t('chat.inputPlaceholder')}
        />
      </Space>
    </>
  );

  // ==================== Render =================
  return (
    <XProvider>
      {contextHolder}
      <ChatContext.Provider value={{ onReload, setMessage }}>
        <div style={{ height: '50px', width: '100%', position: 'relative' }}>
          <Radio.Group
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            options={[{
              label: <BlockOutlined />,
              value: 'classic',
            }, {
              label: <BorderRightOutlined />,
              value: 'sidebar',
            }, {
              label: <BorderRightOutlined />,
              value: 'float-sidebar',
            }
            ]}
            optionType='button'
            onChange={(e) => setLayout(e.target.value)}
            value={layout}
          />

          <Space style={{ float: 'right', marginTop: 10 }} >
            <Button
              type='primary'
              onClick={() => { createNewConversation() }}
              loading={createNewConversationLoading}
              icon={<PlusOutlined />}
              style={{ display: layout === 'classic' ? 'none' : 'block' }}
            />
            <Dropdown
              menu={{
                items: conversations.map((conversation) => ({
                  label: conversation.label,
                  key: conversation.key,
                })),
                onClick: ({ key }) => {
                  setActiveConversationKey(key);
                }
              }}
              placement="bottomRight"
            >
              <Button icon={fetchConversationsLoading ? <Spin size="small" /> : <HistoryOutlined />} style={{ display: layout === 'classic' ? 'none' : 'block' }} />
            </Dropdown>
            <Button type='text' onClick={() => setVisible(false)}>
              <CloseOutlined />
            </Button>
          </Space>
        </div>
        <div className={layout === 'classic' ? styles.classicLayout : styles.siderLayout} style={{
          minWidth: layout === 'classic' ? '500px' : '400px'
        }}>
          {layout === 'classic' ? chatSider : null}
          <div className={styles.chat}>
            {chatList}
            {chatSender}
          </div>
        </div>
      </ChatContext.Provider>
    </XProvider >
  );
};

export default AIChat;