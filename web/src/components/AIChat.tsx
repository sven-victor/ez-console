import api from '@/service/api';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Bubble,
  Conversations,
  Sender,
  XStream,
  useXAgent,
  useXChat,
} from '@ant-design/x';
import { MessageInfo } from '@ant-design/x/es/use-x-chat';
import { useRequest } from 'ahooks';
import { Button, Flex, Spin, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import markdownit from 'markdown-it';
import dayjs from 'dayjs';

const md = markdownit({ html: true, breaks: true });

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 500px;
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
      max-width: 700px;
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

type ChatMessage = Pick<API.ChatStreamEvent, 'content' | 'role'> & {
  error?: string;
}


class ChatError extends Error {
  buffer: string[];
  constructor(message: string, buffer: string[]) {
    super(message);
    this.buffer = buffer;
  }
}

const AIChat: React.FC = () => {
  const { t } = useTranslation('ai');
  const { t: tCommon } = useTranslation('common');
  const { styles } = useStyle();
  const abortController = useRef<AbortController | null>(null);

  // ==================== State ====================
  const [messageHistory, setMessageHistory] = useState<Record<string, MessageInfo<ChatMessage>[]>>({});

  const [conversations, setConversations] = useState<API.AIChatSession[]>([]);
  const [curConversation, setCurConversation] = useState<string>();

  const [inputValue, setInputValue] = useState('');


  /**
   * 🔔 Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.
   */

  // ==================== Runtime ====================
  const [agent] = useXAgent<ChatMessage, { message: ChatMessage, sessionId: string }, string>({
    request: async ({ message, sessionId }, { onSuccess, onUpdate, onError, onStream }) => {
      if (!sessionId) {
        return
      };
      const controller = new AbortController();
      const msgBuffer: {
        buffer: string[]
        messageID: string
      } = {
        buffer: [],
        messageID: '',
      }
      try {
        onStream?.(controller);
        const response = await api.ai.streamChat({ sessionId: sessionId }, {
          content: message.content,
        }, {
          signal: controller.signal,
          requestType: 'sse'
        });

        for await (const chunk of XStream({
          readableStream: response,
        })) {
          const chunkData = JSON.parse(chunk.data) as API.ChatStreamEvent
          if (chunkData.event_type === 'tool_call') {
            // TODO: handle tool call
          }
          if (chunkData.event_type === 'error') {
            onError(new ChatError(chunkData.content, msgBuffer.buffer))
            return
          }
          if (chunkData.event_type === 'content') {
            if (msgBuffer.messageID === '') {
              msgBuffer.messageID = chunkData.message_id;
            }
            if (msgBuffer.messageID !== chunkData.message_id) {
              // msgBuffer.buffer = [];
              msgBuffer.messageID = chunkData.message_id;
            }
            msgBuffer.buffer.push(chunkData.content);
            onUpdate(chunkData.content);
          }
        }
        onSuccess(msgBuffer.buffer);
      } catch (error) {
        onError(new ChatError(`${error}`, msgBuffer.buffer))
        controller.abort();
      }
    }
  });
  const loading = agent.isRequesting();

  const { loading: fetchConversationsLoading } = useRequest(async () => {
    const response = await api.ai.listChatSessions({ current: 1, page_size: 20, });
    setConversations(response.data);
  });

  const { run: createNewConversation, loading: createNewConversationLoading } = useRequest(async (_message?: string) => {
    return await api.ai.createChatSession({ title: t('chat.defaultConversationTitle'), model_id: '' });
  }, {
    manual: true,
    onSuccess: (data, [message]) => {
      setConversations((prev) => {
        return [{ ...data, loading: false }, ...prev];
      })
      setCurConversation(data.id);
      setMessages([]);
      if (message) {
        onRequest({
          stream: true,
          message: {
            role: 'user' as API.AIChatMessageRole,
            content: message,
          },
          sessionId: data.id,
        });
      }
    },
  });

  const { run: deleteConversation } = useRequest(async (sessionId: string) => {
    return await api.ai.deleteChatSession({ sessionId });
  }, {
    manual: true,
    onError(_, params) {
      message.error(t('chat.deleteConversationFailed'));
      setConversations((prev) => {
        return prev.map((item) => {
          if (item.id === params[0]) {
            return { ...item, loading: false };
          }
          return item;
        })
      })
    },
    onSuccess(_, params) {
      const newList = conversations.filter((item) => item.id !== params[0]);
      const newKey = newList?.[0]?.id;
      setConversations(newList);
      if (params[0] === curConversation) {
        setCurConversation(newKey)
      }
    }
  });

  const { run: fetchConversation, loading: fetchConversationLoading } = useRequest(async (sessionId: string) => {
    return await api.ai.getChatSession({ sessionId });
  }, {
    manual: true,
    onSuccess: (data, [sessionId]) => {
      setMessageHistory((prev) => {
        return {
          ...prev,
          [sessionId]: data.messages.filter((item) => item.role !== 'tool').map((item) => ({
            id: item.id,
            message: {
              content: item.content,
              role: item.role,
            },
            status: 'loading',
          })),
        }
      })
    }
  });


  const { onRequest, messages, setMessages, } = useXChat({
    agent,
    requestPlaceholder: () => {
      return {
        content: tCommon('loading'),
        role: 'assistant' as API.AIChatMessageRole,
      };
    },
    requestFallback: (_, { error }): ChatMessage => {
      console.log(error)
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
    resolveAbortController: (controller) => {
      abortController.current = controller;
    },
    transformMessage: (info) => {
      const { originMessage, chunk } = info || {};
      if (!chunk) {
        return {
          role: 'assistant' as API.AIChatMessageRole,
          content: originMessage?.content || '',
        };
      }

      const content = originMessage?.content || '';
      return {
        role: 'assistant' as API.AIChatMessageRole,
        content: content + chunk,
      };
    },
  });


  useEffect(() => {
    if (!curConversation) return;
    const messages = messageHistory[curConversation];
    if (messages) {
      setMessages(messages);
    } else {
      fetchConversation(curConversation);
    }
  }, [messageHistory, curConversation]);
  // ==================== Event ====================
  const onSubmit = (val: string) => {
    if (!val) return;

    if (loading) {
      message.error(t('chat.requestInProgress'));
      return;
    }
    if (!curConversation) {
      createNewConversation(val)
      return
    }
    onRequest({
      stream: true,
      message: {
        role: 'user' as API.AIChatMessageRole,
        content: val,
      },
      sessionId: curConversation,
    });
  };


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
          items={conversations.map((item) => ({
            key: item.id,
            label: item.title,
            group: dayjs(item.start_time).isSame(dayjs(), 'day') ? t('chat.today') : dayjs(item.start_time).format('YYYY-MM-DD'),
          }))}
          activeKey={curConversation}
          onActiveChange={async (val) => {
            if (!val) return;
            abortController.current?.abort();
            setCurConversation((ori) => {
              if (ori) {
                setMessageHistory((prev) => {
                  return {
                    ...prev,
                    [ori]: messages,
                  }
                })
              }
              return val
            });
          }}

          className={styles.conversations}
          groupable
          styles={{ item: { padding: '0 8px' } }}
          menu={(conversation) => ({
            items: [
              {
                label: t('chat.renameConversation'),
                key: 'rename',
                icon: <EditOutlined />,
              },
              {
                label: tCommon('delete'),
                key: 'delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => {
                  setConversations((prev) => {
                    return prev.map((item) => {
                      if (item.id === conversation.key) {
                        return { ...item, loading: true };
                      }
                      return item;
                    })
                  })
                  deleteConversation(conversation.key)

                },
              },
            ],
          })}
        />
      </Spin>
    </div>
  );

  const renderFooter = ({ message }: MessageInfo<ChatMessage>) => {
    if (message.error) {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: md.render(message.error) }} />
        </div>
      );
    }
    return undefined;
  }

  const chatList = (
    <div className={styles.chatList}>
      <Spin spinning={fetchConversationLoading}>
        <Bubble.List
          items={messages?.map((i) => ({
            ...i.message,
            messageRender: (content: string) => {
              return (
                <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />

              );
            },
            footer: renderFooter(i)
          }))}
          style={{ height: '100%', paddingInline: 'calc(calc(100% - 700px) /2)' }}
          roles={{
            assistant: {
              placement: 'start',
              loadingRender: () => <Spin size="small" />,
            },
            user: { placement: 'end' },
          }}
        />
      </Spin>
    </div>
  );
  const chatSender = (
    <>
      <Sender
        value={inputValue}
        onSubmit={() => {
          onSubmit(inputValue.trim());
          setInputValue('');
        }}
        onChange={setInputValue}
        onCancel={() => {
          abortController.current?.abort();
        }}
        loading={loading}
        className={styles.sender}
        allowSpeech
        actions={(_, info) => {
          const { SendButton, LoadingButton } = info.components;
          return (
            <Flex gap={4}>
              {loading ? <LoadingButton type="default" /> : <SendButton type="primary" />}
            </Flex>
          );
        }}
        placeholder={t('chat.inputPlaceholder')}
      />
    </>
  );

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      {chatSider}

      <div className={styles.chat}>
        {chatList}
        {chatSender}
      </div>
    </div>
  );
};

export default AIChat;