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
  Conversations,
  Sender,
  XProvider,
} from '@ant-design/x';
import { AbstractChatProvider, TransformMessage, useXChat, XRequest, XRequestOptions } from '@ant-design/x-sdk';
import { useXConversations, type MessageInfo } from '@ant-design/x-sdk';
import { XMarkdown } from '@ant-design/x-markdown';

import { useRequest } from 'ahooks';
import { Button, Dropdown, Radio, Space, Spin, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { theme } from 'antd';
import { useAI } from '@/contexts/AIContext';

const useStyle = createStyles(({ token, css }) => {
  return {
    siderLayout: css`
      width: 100%;
      height: calc(100vh - 100px);
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
      .ant-bubble > .ant-bubble-content{
        max-width: 90%;
      }
      .ant-bubble[role=user] > .ant-bubble-content{
        background-color: rgb(22 119 255 / 15%);
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

interface ChatStreamMessage extends Pick<API.ChatStreamEvent, 'content' | 'role'> {
  error?: string;
}

interface ChatStreamInput {
  content: string;
  sessionId: string;
}

interface ChatStreamOutput {
  data: string;
};

class ChatError extends Error {
  buffer: string[];
  constructor(message: string, buffer: string[]) {
    super(message);
    this.buffer = buffer;
  }
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
    const { originMessage, chunk } = info || {};
    if (!chunk) {
      return {
        content: originMessage?.content || '',
        role: 'assistant',
      } as ChatMessage;
    }
    const chunkJson = JSON.parse(chunk.data) as API.ChatStreamEvent;
    console.log(chunkJson)
    const content = originMessage?.content || '';
    return {
      content: `${content || ''}${chunkJson.content || ''}`,
      role: 'assistant',
    } as ChatMessage;
  }
}

const providerCaches = new Map<string, AIProvider>();

const providerFactory = (conversationKey: string) => {
  console.log(conversationKey)
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

const AIChat: React.FC = () => {
  const { layout, setVisible, setLayout, onCallAI } = useAI()
  const { t } = useTranslation('ai');
  const { t: tCommon } = useTranslation('common');
  const { styles } = useStyle();
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
  } = useXConversations({});

  const [className] = useMarkdownTheme();
  const [messageApi, contextHolder] = message.useMessage();

  const [inputValue, setInputValue] = useState('');

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
    requestFallback: (_, { messageInfo, error }) => {
      console.log(messageInfo, error)
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
  const onSubmit = (val: string) => {
    if (!val) return;

    if (!activeConversationKey) {
      createNewConversation(val);
      return;
    }
    onRequest({
      content: val,
    });
  };

  const convertConversation = (conversation: API.AIChatSession) => {
    return {
      key: conversation.id,
      label: conversation.title,
      group: dayjs(conversation.start_time).isSame(dayjs(), 'day') ? t('chat.today') : dayjs(conversation.start_time).format('YYYY-MM-DD'),
    }
  }


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
      setMessages(data.messages.filter((item) => item.role !== 'tool').map((item) => ({
        id: item.id,
        message: {
          content: item.content,
          role: item.role,
        },
        status: 'success',
      })));
    }
  });
  const { run: createNewConversation, loading: createNewConversationLoading } = useRequest(async (_message?: string, messages?: API.SimpleChatMessage[]) => {
    return await api.ai.createChatSession({
      title: t('chat.defaultConversationTitle'),
      model_id: '',
      messages: messages || [],
    });
  }, {
    manual: true,
    onError: () => {
      message.error(t('chat.createConversationFailed', { defaultValue: 'Failed to create conversation' }));
    },
    onSuccess: (data, [message]) => {
      addConversation(convertConversation(data), 'prepend');
      if (message) {
        setMessageBuffer({ message, sessionId: data.id });
      }
      setActiveConversationKey(data.id);
    },
  });

  const { loading: fetchConversationsLoading, runAsync: fetchConversations } = useRequest(async () => {
    const response = await api.ai.listChatSessions({ current: 1, page_size: 20, });
    setConversations(response.data.map(convertConversation));
    if (response.data.length > 0 && !activeConversationKey) {
      setActiveConversationKey(response.data[0].id);
    }
  }, {
    onError: () => {
      message.error(t('chat.fetchConversationsFailed', { defaultValue: 'Failed to fetch conversations' }));
    },
    ready: !createNewConversationLoading,
    manual: layout !== 'classic',
  });

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
      messageApi.error(t('chat.titleGenerationFailed', { defaultValue: 'Failed to generate title' }));
      console.log(err)
      const conversation = getConversation(sessionId);
      if (!conversation) return;
      setConversation(sessionId, { ...conversation, loading: false });
    }
  });

  useEffect(() => {
    if (activeConversationKey && messageBuffer?.sessionId === activeConversationKey) {
      onRequest({
        content: messageBuffer.message,
      });

      setMessageBuffer(undefined);
    }
  }, [activeConversationKey, messageBuffer])

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
        createNewConversation(message, messages);
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

  const renderFooter = ({ message }: MessageInfo<ChatStreamMessage>) => {
    if (message.error) {
      return (
        <div>
          <XMarkdown content={message.error} />
        </div>
      );
    }
    return undefined;
  }
  console.log(messages)
  const chatList = (
    <div className={styles.chatList}>
      <Spin spinning={fetchConversationLoading || createNewConversationLoading}>
        <Bubble.List
          items={messages?.map((i) => ({
            ...i.message,
            key: i.id,
            messageRender: (content: string) => {
              return (
                <XMarkdown
                  paragraphTag="div"
                  content={content}
                  className={className}
                />
              );
            },
            footer: renderFooter(i)
          }))}
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
      <Sender
        value={inputValue}
        onSubmit={async () => {
          onSubmit(inputValue.trim());
          setInputValue('');
        }}
        onChange={setInputValue}
        onCancel={() => { abort() }}
        loading={isRequesting}
        className={styles.sender}
        placeholder={t('chat.inputPlaceholder')}
      />
    </>
  );

  // ==================== Render =================
  return (
    <XProvider>
      <ChatContext.Provider value={{ onReload, setMessage }}>
        {contextHolder}
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
              onOpenChange={(open) => {
                if (open && !fetchConversationsLoading) {
                  fetchConversations();
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