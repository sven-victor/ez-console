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
import { LuPanelRight, LuPanelRightDashed, LuExternalLink, LuBookOpenText } from "react-icons/lu";

import { useRequest } from 'ahooks';
import { App, Button, Dropdown, Flex, Radio, Space, Spin, Tag } from 'antd';
import { createStyles, useThemeMode } from 'antd-style';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { normalizeCallAIOptions, useAI, type CallAIArgument, type RegisteredClientTool } from '@/contexts/AIContext';
import classNames from 'classnames';
import { MessageStatus } from '@ant-design/x-sdk/es/x-chat';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';
import type { BubbleItemType, Info } from '@ant-design/x/es/bubble/interface';
import { HITLCard } from '@/components/HITLCard';

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
      .x-markdown-light pre .ant-codeHighlighter .ant-codeHighlighter-code pre{
        background-color: #f5f5f5;
        code{
          background-color: #f5f5f5;
        }
      }
      .ant-bubble-content > .x-markdown > pre{
        margin-top: 16px;
        margin-bottom: 11px;
        code{
          padding: 0px;
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
  hitlCards?: API.HITLCard[];
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
  hitl_decisions?: API.HITLDecision[];
}

interface HITLSubmitState {
  messageId: string | number;
  toolCallId: string;
  optionId: string;
}

function normalizeHITLCard(value: unknown): API.HITLCard | undefined {
  if (value == null || typeof value !== 'object') {
    return undefined;
  }
  const raw = value as Record<string, unknown>;
  if (typeof raw.tool_call_id !== 'string' || raw.tool_call_id === '') {
    return undefined;
  }
  if (raw.kind !== 'approval' && raw.kind !== 'choice') {
    return undefined;
  }
  if (raw.status !== 'pending' && raw.status !== 'decided' && raw.status !== 'abandoned') {
    return undefined;
  }
  if (typeof raw.title !== 'string' || typeof raw.tool_name !== 'string' || !Array.isArray(raw.options)) {
    return undefined;
  }
  const options: API.HITLOption[] = [];
  for (const item of raw.options) {
    if (item == null || typeof item !== 'object') {
      continue;
    }
    const option = item as Record<string, unknown>;
    if (typeof option.id !== 'string' || typeof option.label !== 'string') {
      continue;
    }
    options.push({
      id: option.id,
      label: option.label,
      description: typeof option.description === 'string' ? option.description : '',
      primary: option.primary === true,
    });
  }
  let args = '';
  if (typeof raw.arguments === 'string') {
    args = raw.arguments;
  } else if (raw.arguments != null) {
    try {
      args = JSON.stringify(raw.arguments);
    } catch {
      args = '';
    }
  }
  return {
    tool_call_id: raw.tool_call_id,
    kind: raw.kind,
    title: raw.title,
    tool_name: raw.tool_name,
    arguments: args,
    options,
    status: raw.status,
    selected_option_id: typeof raw.selected_option_id === 'string' ? raw.selected_option_id : '',
  };
}

/** Session metadata is typed as `true` because swag emits a map; read hitl_cards from the runtime object. */
function hitlCardsFromMetadata(metadata: API.AIChatMessage['metadata']): API.HITLCard[] | undefined {
  const value = metadata as unknown;
  if (value == null || typeof value !== 'object') {
    return undefined;
  }
  const raw = (value as { hitl_cards?: unknown }).hitl_cards;
  if (!Array.isArray(raw)) {
    return undefined;
  }
  const cards: API.HITLCard[] = [];
  for (const item of raw) {
    const card = normalizeHITLCard(item);
    if (card) {
      cards.push(card);
    }
  }
  return cards.length > 0 ? cards : undefined;
}

function hasPendingHITLCards(cards: API.HITLCard[] | undefined): boolean {
  return !!cards?.some((card) => card.status === 'pending');
}

/**
 * Auto browser tools that were interrupted beside pending cards.
 * Approval and ui_choose calls stay on the cards; decided cards do not replay tools.
 */
function pendingAutoClientToolCalls(
  toolCalls: API.AIToolCall[] | null | undefined,
  cards: API.HITLCard[],
): ClientToolPendingCall[] | undefined {
  if (!hasPendingHITLCards(cards)) {
    return undefined;
  }
  const cardIDs = new Set(cards.map((card) => card.tool_call_id));
  const calls: ClientToolPendingCall[] = [];
  for (const call of toolCalls ?? []) {
    const name = call?.function?.name;
    if (!call?.id || !name || !name.startsWith('ui_') || name === 'ui_choose' || cardIDs.has(call.id)) {
      continue;
    }
    calls.push({
      id: call.id,
      name,
      arguments: typeof call.function.arguments === 'string' ? call.function.arguments : '',
    });
  }
  return calls.length > 0 ? calls : undefined;
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
    let chunkJson: API.ChatStreamEvent;
    try {
      chunkJson = JSON.parse(chunk.data) as API.ChatStreamEvent;
    } catch {
      // Incomplete SSE frame (e.g. connection closed mid-chunk) — keep current message.
      return {
        ...originMessage,
        content: originMessage?.content || '',
        role: 'assistant',
        status,
      } as ChatMessage;
    }
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
          pendingClientToolCalls: chunkJson.client_tool_calls,
          messageId: chunkJson.message_id,
          status,
        } as ChatMessage;
      case 'hitl_pending':
        return {
          ...originMessage,
          content: content || '',
          role: 'assistant',
          pendingClientToolCalls: chunkJson.client_tool_calls,
          hitlCards: chunkJson.hitl_cards,
          messageId: chunkJson.message_id,
          status,
        } as ChatMessage;
      default:
        return {
          ...originMessage,
          content: content || originMessage?.content || '',
          role: 'assistant',
          messageId: chunkJson.message_id || originMessage?.messageId,
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
                const { sessionId } = (options.params ?? {}) as Partial<ChatStreamInput>;
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
  return <code className="ant-highlightCode-code">
    <CodeHighlighter lang={lang}>{children}</CodeHighlighter>
  </code>;
};


const ChatContext = React.createContext<{
  onReload?: ReturnType<typeof useXChat>['onReload'];
  setMessage?: ReturnType<typeof useXChat<ChatStreamMessage, ChatStreamMessage, ChatStreamInput, ChatStreamOutput>>['setMessage'];
}>({});

interface SelectedSkillOption {
  type: 'domain' | 'skill';
  value: string;
}

function normalizeStringList(values: string[] | undefined): string[] {
  if (!values || values.length === 0) {
    return [];
  }
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of values) {
    const value = raw.trim();
    if (!value || seen.has(value)) {
      continue;
    }
    seen.add(value);
    result.push(value);
  }
  return result;
}

export interface AIChatProps {
  bubble?: {
    contentRender?: (content: string, info: Info, onSendMessage: (val: string) => void) => React.ReactNode;
    footerRender?: ((message: MessageInfo<ChatStreamMessage>, info: Info, onSendMessage: (val: string) => void) => React.ReactNode);
    components?: {
      [tagName: string]: React.ComponentType<ComponentProps & { onSendMessage: (val: string) => void }> | keyof JSX.IntrinsicElements;
    };
  };
  /** Custom AI float button icon; overrides the default blinking robot when provided. */
  floatButtonIcon?: React.ReactNode;
  /**
   * Host-level system prompts merged into every chat request as
   * ephemeral_system_prompts (not persisted). Registered app-wide via
   * `registerGlobalAI`; sent after the layout's route prompt and before
   * page-level prompts from registerPageAI.
   */
  ephemeralSystemPrompts?: string[];
  /**
   * Host-level client tools available on every page (names must start with
   * "ui_"). Registered app-wide via `registerGlobalAI`; a page tool with the
   * same name overrides a host tool.
   */
  clientTools?: RegisteredClientTool[];
  /**
   * Skill domains selected when the chat opens. When omitted, the client
   * sends domains as an empty list.
   */
  defaultSkillDomains?: string[];
}

interface ChatListProps {
  bubble: AIChatProps['bubble'];
  messages?: MessageInfo<ChatStreamMessage>[];
  loading?: boolean;
  layout?: 'classic' | 'sidebar' | 'float-sidebar';
  onSendMessage: (val: string) => void;
  hitlSubmitting?: HITLSubmitState | null;
  onHITLSelect?: (messageId: string | number, toolCallId: string, optionId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  bubble = {},
  messages,
  loading,
  layout = 'classic',
  onSendMessage,
  hitlSubmitting,
  onHITLSelect,
}) => {
  const { styles } = useStyle();
  const { isDarkMode } = useThemeMode();

  const components: XMarkdownProps['components'] = useMemo(() => {
    if (!bubble.components) return { code: Code, };

    const result: XMarkdownProps['components'] = {};

    for (const key in bubble.components) {
      const Comp = bubble.components[key];

      if (typeof Comp === "string") {
        result[key] = Comp;
        continue;
      }

      result[key] = (props: ComponentProps) => {
        return (
          <Comp
            {...props}
            onSendMessage={onSendMessage}
          />
        );
      };
    }

    return result;
  }, [onSendMessage, bubble.components]);

  const {
    contentRender = (content: string) => {
      if (!content) {
        return null;
      }
      return (
        <XMarkdown
          paragraphTag="div"
          content={content}
          className={isDarkMode ? 'x-markdown-dark' : 'x-markdown-light'}
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

  const bubbleMessages: BubbleListProps['items'] = useMemo(() => {
    return (messages || []).map((i) => ({
      ...i.message,
      key: i.id,
      // An approval turn can have cards and no assistant text. Hide the empty content shell.
      ...(!i.message.content && i.message.hitlCards?.length ? {
        variant: 'borderless' as const,
        styles: { content: { display: 'none' } },
      } : {}),
      contentRender: contentRender,
      footer: (_: string, info: Info) => {
        const extra = footerRender?.(i, info, onSendMessage);
        const cards = i.message.hitlCards;
        if (!cards?.length) {
          return extra;
        }
        return (
          <Flex vertical gap={8}>
            {extra || null}
            {cards.map((card) => (
              <HITLCard
                key={card.tool_call_id}
                card={card}
                submittingOptionId={
                  hitlSubmitting?.messageId === i.id && hitlSubmitting.toolCallId === card.tool_call_id
                    ? hitlSubmitting.optionId
                    : undefined
                }
                disabled={
                  hitlSubmitting?.messageId === i.id
                  && hitlSubmitting.toolCallId !== card.tool_call_id
                }
                onSelect={
                  card.status === 'pending'
                    ? (optionId) => onHITLSelect?.(i.id, card.tool_call_id, optionId)
                    : undefined
                }
              />
            ))}
          </Flex>
        );
      },
    } as BubbleItemType & Pick<ChatStreamMessage, 'hitlCards'>)).filter((i) => i.content || i.hitlCards?.length);
  }, [messages, contentRender, footerRender, onSendMessage, hitlSubmitting, onHITLSelect]);

  return (
    <div className={styles.chatList}>
      <Spin spinning={loading}>
        <Bubble.List
          items={bubbleMessages}
          style={{
            height: '100%',
            paddingInline: layout === 'classic' ? 'calc(calc(100% - 700px) /2)' : '20px'
          }}
          // @ts-expect-error Bubble.List roles typing is incomplete for this usage
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
}

export const AIChat: React.FC<AIChatProps> = ({
  bubble = {},
  ephemeralSystemPrompts: hostEphemeralSystemPrompts,
  clientTools: hostClientTools,
  defaultSkillDomains,
}) => {
  const {
    layout,
    setVisible,
    setLayout,
    onCallAI,
    activeConversationKey: defaultActiveConversationKey,
    setActiveConversationKey: setDefaultActiveConversationKey,
    conversations: rawConversations,
    fetchConversationsLoading,
    getEphemeralSystemPrompts,
    getClientTools,
    registerGlobalAI,
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

  const { message: messageApi } = App.useApp();

  const [inputValue, setInputValue] = useState('');
  const [skillsVisible, setSkillsVisible] = useState(false);
  const defaultSkillDomainsKey = defaultSkillDomains?.join('\0') ?? '';
  const normalizedDefaultDomains = useMemo(
    () => normalizeStringList(defaultSkillDomainsKey ? defaultSkillDomainsKey.split('\0') : []),
    [defaultSkillDomainsKey],
  );
  // Host-level prompts and tools (from App `aiChatProps`) join the global AI
  // registration so they reach every request together with page context.
  const hostPromptsKey = hostEphemeralSystemPrompts?.join('\0') ?? '';
  const normalizedHostPrompts = useMemo(
    () => normalizeStringList(hostPromptsKey ? hostPromptsKey.split('\0') : []),
    [hostPromptsKey],
  );
  useEffect(() => {
    if (normalizedHostPrompts.length === 0 && !hostClientTools?.length) {
      return;
    }
    return registerGlobalAI({
      ephemeralSystemPrompts: normalizedHostPrompts,
      tools: hostClientTools,
    });
  }, [normalizedHostPrompts, hostClientTools, registerGlobalAI]);
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkillOption[]>(() =>
    normalizedDefaultDomains.map((value) => ({ type: 'domain', value })),
  );

  useEffect(() => {
    setSelectedSkills((current) => {
      const skills = current.filter((item) => item.type === 'skill');
      return [
        ...normalizedDefaultDomains.map((value) => ({ type: 'domain' as const, value })),
        ...skills,
      ];
    });
  }, [normalizedDefaultDomains]);

  const { data: domainsData } = useRequest(() => api.system.listSkillDomains());
  const { data: skillsListData } = useRequest(() =>
    api.system.listSkills({ current: 1, page_size: 500 })
  );

  const allSkills: { skillType: 'domain' | 'skill'; key: string; label: React.ReactNode }[] = useMemo(() => {
    return [
      ...((domainsData as unknown as string[]) ?? []).map((d) => {
        return {
          skillType: 'domain' as 'domain' | 'skill',
          key: d,
          label: <><Tag>{t('chat.skillDomain', { defaultValue: 'Skill domain' })}</Tag>{d}</>
        };
      }),
      ...(skillsListData?.data ?? []).map((s) => ({
        skillType: 'skill' as 'domain' | 'skill',
        key: s.id,
        label: <><Tag>{t('chat.skill', { defaultValue: 'Skill' })}</Tag>{s.name}</>,
      })),
    ]
  }, [skillsListData, domainsData])

  // Message buffer to be sent. domains is set when this turn overrides the selection.
  const [messageBuffer, setMessageBuffer] = useState<{ message: string; sessionId: string; domains?: string[] }>();


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
  const buildChatRequestFields = useCallback((): Pick<ChatStreamInput, 'domains' | 'skill_ids' | 'ephemeral_system_prompts' | 'client_tools'> => {
    const fields: Pick<ChatStreamInput, 'domains' | 'skill_ids' | 'ephemeral_system_prompts' | 'client_tools'> = {
      domains: selectedSkills.filter((s) => s.type === 'domain').map((s) => s.value),
      skill_ids: selectedSkills.filter((s) => s.type === 'skill').map((s) => s.value),
    };
    // Read page context synchronously from the AI context: a handler in this
    // turn (e.g. ui_navigate) may have changed the page, and the new page's
    // prompts and tools must reach the model on the follow-up request rather
    // than the pre-navigation snapshot captured in this closure.
    const prompts = normalizeStringList(getEphemeralSystemPrompts());
    if (prompts.length > 0) {
      fields.ephemeral_system_prompts = prompts;
    }
    const currentTools = getClientTools();
    if (currentTools.length > 0) {
      fields.client_tools = currentTools.map(t => ({
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      }));
    }
    return fields;
  }, [selectedSkills, getEphemeralSystemPrompts, getClientTools]);

  const pendingHandoffRef = useRef<ClientToolPendingCall[] | null>(null);
  const autoToolStashRef = useRef<{ calls: ClientToolPendingCall[]; promise: Promise<ClientToolResultPayload[]> } | null>(null);
  const hitlResumeLockRef = useRef(false);
  const hitlResumeSawRequestRef = useRef(false);
  const hitlResumeTargetRef = useRef<{ messageId: string | number; decisionIDs: string[] } | null>(null);
  const [hitlSubmitting, setHitlSubmitting] = useState<HITLSubmitState | null>(null);

  const executeAutoClientTools = useCallback(async (pendingCalls: ClientToolPendingCall[]) => {
    const results: ClientToolResultPayload[] = [];
    // Resolve handlers from the tool set that was active when the model made
    // the calls; later calls in the same batch still see this snapshot.
    const toolsAtHandoff = getClientTools();
    for (const call of pendingCalls) {
      // Choice cards are resumed with hitl_decisions. Never invoke ui_choose here.
      if (call.name === 'ui_choose') {
        continue;
      }
      const tool = toolsAtHandoff.find(t => t.name === call.name);
      if (!tool) {
        results.push({
          tool_call_id: call.id,
          content: JSON.stringify({
            error: `Client tool "${call.name}" is not available on the current page`,
            available_tools: toolsAtHandoff.map(t => t.name),
          }),
        });
        continue;
      }
      try {
        const result = await Promise.resolve(tool.handler(call.arguments));
        // The backend rejects empty tool results; normalize to a minimal JSON object.
        results.push({ tool_call_id: call.id, content: result?.trim() ? result : JSON.stringify({ ok: true }) });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        results.push({
          tool_call_id: call.id,
          content: JSON.stringify({ error: message }),
        });
      }
    }
    return results;
  }, [getClientTools]);

  const ensureAutoToolStash = useCallback((calls: ClientToolPendingCall[]) => {
    const existing = autoToolStashRef.current;
    if (existing && existing.calls === calls) {
      return existing.promise;
    }
    const promise = executeAutoClientTools(calls);
    autoToolStashRef.current = { calls, promise };
    return promise;
  }, [executeAutoClientTools]);

  const handleClientToolHandoff = useCallback(async (pendingCalls: ClientToolPendingCall[]) => {
    const runnable = pendingCalls.filter((call) => call.name !== 'ui_choose');
    if (runnable.length === 0) {
      return;
    }
    const results = await executeAutoClientTools(pendingCalls);
    onRequest({
      content: '',
      client_tool_results: results,
      ...buildChatRequestFields(),
    });
  }, [executeAutoClientTools, onRequest, buildChatRequestFields]);

  const resumeHITL = useCallback(async (
    messageId: string | number,
    calls: ClientToolPendingCall[] | undefined,
    decisions: API.HITLDecision[],
  ) => {
    if (hitlResumeLockRef.current) {
      return;
    }
    hitlResumeLockRef.current = true;
    let committed = false;
    try {
      let results: ClientToolResultPayload[] = [];
      if (calls?.length) {
        results = await ensureAutoToolStash(calls);
      }
      // Mark the choice on this conversation's store before the follow-up stream starts.
      setMessage(messageId, (origin) => ({
        message: {
          ...origin.message,
          hitlCards: origin.message.hitlCards?.map((card) => {
            const decision = decisions.find((item) => item.tool_call_id === card.tool_call_id);
            if (!decision || card.status !== 'pending') {
              return card;
            }
            return { ...card, status: 'decided' as const, selected_option_id: decision.option_id };
          }),
        },
      }));
      committed = true;
      hitlResumeTargetRef.current = {
        messageId,
        decisionIDs: decisions.map((decision) => decision.tool_call_id),
      };
      onRequest({
        content: '',
        ...(results.length > 0 ? { client_tool_results: results } : {}),
        hitl_decisions: decisions,
        ...buildChatRequestFields(),
      });
    } catch {
      hitlResumeTargetRef.current = null;
      if (committed) {
        setMessage(messageId, (origin) => ({
          message: {
            ...origin.message,
            hitlCards: origin.message.hitlCards?.map((card) => (
              decisions.some((item) => item.tool_call_id === card.tool_call_id) && card.status === 'decided'
                ? { ...card, status: 'pending' as const }
                : card
            )),
          },
        }));
      }
      hitlResumeLockRef.current = false;
      setHitlSubmitting(null);
    }
  }, [ensureAutoToolStash, onRequest, buildChatRequestFields, setMessage]);

  const abandonPendingHITLCards = useCallback(() => {
    setHitlSubmitting(null);
    setMessages((current) => {
      let changed = false;
      const next = current.map((item) => {
        const cards = item.message.hitlCards;
        if (!cards?.some((card) => card.status === 'pending')) {
          return item;
        }
        changed = true;
        return {
          ...item,
          message: {
            ...item.message,
            hitlCards: cards.map((card) => (
              card.status === 'pending' ? { ...card, status: 'abandoned' as const } : card
            )),
          },
        };
      });
      return changed ? next : current;
    });
  }, [setMessages]);

  const handleHITLSelect = useCallback((messageId: string | number, toolCallId: string, optionId: string) => {
    if (hitlSubmitting || hitlResumeLockRef.current) {
      return;
    }
    const current = messages?.find((item) => item.id === messageId);
    const cards = current?.message.hitlCards;
    if (!current || !cards) {
      return;
    }
    const target = cards.find((card) => card.tool_call_id === toolCallId);
    if (!target || target.status !== 'pending') {
      return;
    }
    const nextCards = cards.map((card) => (
      card.tool_call_id === toolCallId ? { ...card, selected_option_id: optionId } : card
    ));
    const pending = nextCards.filter((card) => card.status === 'pending');
    const ready = pending.length > 0 && pending.every((card) => card.selected_option_id);
    if (!ready) {
      setMessage(messageId, {
        message: { ...current.message, hitlCards: nextCards },
      });
      return;
    }
    const decisions: API.HITLDecision[] = pending.map((card) => ({
      tool_call_id: card.tool_call_id,
      option_id: card.selected_option_id,
    }));
    setMessage(messageId, {
      message: { ...current.message, hitlCards: nextCards },
    });
    setHitlSubmitting({ messageId, toolCallId, optionId });
    void resumeHITL(messageId, current.message.pendingClientToolCalls, decisions);
  }, [hitlSubmitting, messages, setMessage, resumeHITL]);

  useEffect(() => {
    pendingHandoffRef.current = null;
    autoToolStashRef.current = null;
    hitlResumeLockRef.current = false;
    hitlResumeSawRequestRef.current = false;
    hitlResumeTargetRef.current = null;
    setHitlSubmitting(null);
  }, [activeConversationKey]);

  // The lock is taken before stashed auto-tool results resolve, while isRequesting is still false.
  // Drop the button spinner once that resume request is actually in flight, and release the lock when it ends.
  useEffect(() => {
    if (!hitlResumeLockRef.current) {
      return;
    }
    if (isRequesting) {
      hitlResumeSawRequestRef.current = true;
      setHitlSubmitting(null);
      return;
    }
    if (!hitlResumeSawRequestRef.current) {
      return;
    }
    hitlResumeSawRequestRef.current = false;
    hitlResumeLockRef.current = false;
  }, [isRequesting]);

  // onRequest returns before the follow-up stream finishes. Roll the choice back if that stream fails
  // so the buttons stay available. A successful terminal message drops the watch.
  useEffect(() => {
    const target = hitlResumeTargetRef.current;
    if (!target || !messages?.length) {
      return;
    }
    const cardIndex = messages.findIndex((item) => item.id === target.messageId);
    if (cardIndex < 0) {
      return;
    }
    const assistant = [...messages.slice(cardIndex + 1)].reverse().find((item) => item.message.role === 'assistant');
    if (!assistant || assistant.status === 'loading' || assistant.status === 'updating' || assistant.status === 'local') {
      return;
    }
    hitlResumeTargetRef.current = null;
    const failed = assistant.status === 'error' || Boolean(assistant.message.error);
    if (!failed) {
      return;
    }
    hitlResumeLockRef.current = false;
    hitlResumeSawRequestRef.current = false;
    setHitlSubmitting(null);
    setMessage(target.messageId, (origin) => ({
      message: {
        ...origin.message,
        hitlCards: origin.message.hitlCards?.map((card) => (
          target.decisionIDs.includes(card.tool_call_id) && card.status === 'decided'
            ? { ...card, status: 'pending' as const, selected_option_id: '' }
            : card
        )),
      },
    }));
  }, [messages, setMessage]);

  // Auto-run browser tools immediately when nothing is waiting on a card.
  // When cards are still pending, stash those results and wait for every selection.
  useEffect(() => {
    if (isRequesting || !messages?.length) {
      return;
    }
    const lastMsg = messages[messages.length - 1];
    const calls = lastMsg?.message?.pendingClientToolCalls;
    if (calls?.length) {
      if (pendingHandoffRef.current === calls) {
        return;
      }
      pendingHandoffRef.current = calls;
      if (hasPendingHITLCards(lastMsg.message.hitlCards)) {
        void ensureAutoToolStash(calls);
        return;
      }
      void handleClientToolHandoff(calls);
      return;
    }
    pendingHandoffRef.current = null;
  }, [isRequesting, messages, ensureAutoToolStash, handleClientToolHandoff]);

  const onSubmit = (val: string) => {
    if (!val || hitlSubmitting) return;

    if (!activeConversationKey) {
      createNewConversation(val);
      return;
    }
    abandonPendingHITLCards();
    onRequest({
      content: val,
      ...buildChatRequestFields(),
    });
  };

  const { run: fetchConversation, loading: fetchConversationLoading } = useRequest(async (sessionId: string) => {
    return await api.ai.getChatSession({ sessionId });
  }, {
    manual: true,
    onError: () => {
      messageApi.error(t('chat.fetchConversationFailed', { defaultValue: 'Failed to fetch conversation' }));
    },
    onSuccess: (data) => {
      if (messages && messages.length > 0 && (messages[messages.length - 1].status === 'loading' || messages.length > data.messages.length)) {
        return
      }

      const chatMessages: MessageInfo<ChatStreamMessage>[] = [];
      let buffer: MessageInfo<ChatStreamMessage> = { id: '', message: { content: '', role: 'assistant' }, status: 'success' };
      const flushAssistant = () => {
        if (buffer.message.content.length === 0 && !buffer.message.hitlCards?.length) {
          return;
        }
        chatMessages.push({
          id: buffer.id,
          message: {
            content: buffer.message.content,
            role: buffer.message.role,
            ...(buffer.message.hitlCards?.length ? { hitlCards: buffer.message.hitlCards } : {}),
            ...(hasPendingHITLCards(buffer.message.hitlCards) && buffer.message.pendingClientToolCalls?.length
              ? { pendingClientToolCalls: buffer.message.pendingClientToolCalls }
              : {}),
          },
          status: buffer.status,
        });
      };
      for (const item of data.messages) {
        switch (item.role) {
          case 'assistant':
            buffer.status = (item.status === 'completed' && buffer.status === 'success') ? 'success' : 'error';
            buffer.message.role = 'assistant';
            if (buffer.id !== item.id && item.content) {
              buffer.message.content = item.content;
            }
            buffer.id = item.id;
            {
              const cards = hitlCardsFromMetadata(item.metadata);
              if (cards?.length) {
                buffer.message.hitlCards = [...(buffer.message.hitlCards ?? []), ...cards];
                const autoCalls = pendingAutoClientToolCalls(item.tool_calls, cards);
                if (autoCalls?.length) {
                  buffer.message.pendingClientToolCalls = [
                    ...(buffer.message.pendingClientToolCalls ?? []),
                    ...autoCalls,
                  ];
                }
              }
            }
            break;
          case 'user':
            if (buffer.message.content.length > 0 || buffer.message.hitlCards?.length) {
              flushAssistant();
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
      flushAssistant();
      setMessages(chatMessages);
    }
  });
  const { run: createNewConversation, loading: createNewConversationLoading } = useRequest(async (message?: string, messages?: API.SimpleChatMessage[], anonymous: boolean = false, domains?: string[]) => {
    const session = await api.ai.createChatSession({
      title: t('chat.defaultConversationTitle'),
      model_id: '',
      messages: messages || [],
      anonymous,
    });
    return { session, message, domains };
  }, {
    manual: true,
    onError: () => {
      messageApi.error(t('chat.createConversationFailed', { defaultValue: 'Failed to create conversation' }));
    },
    onSuccess: ({ session, message, domains }) => {
      addConversation(convertConversation(session), 'prepend');
      setActiveConversationKey(session.id);
      if (message) {
        setMessageBuffer({ message, sessionId: session.id, domains });
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
      const { message: msg, domains } = messageBuffer;
      setTimeout(() => {
        abandonPendingHITLCards();
        onRequest({
          content: msg,
          ...buildChatRequestFields(),
          ...(domains !== undefined ? { domains } : {}),
        });
      }, 1000)
      setMessageBuffer(undefined);
    }
  }, [activeConversationKey, messageBuffer, buildChatRequestFields, abandonPendingHITLCards])

  useEffect(() => {
    if (activeConversationKey) {
      const storagedMessages = getMessages(activeConversationKey);
      if (storagedMessages && storagedMessages.length > 0) {
        return
      }
      fetchConversation(activeConversationKey);
    }
  }, [activeConversationKey])


  const handleCallAIRef = useRef<(message: string, options?: CallAIArgument) => void>(() => { });
  handleCallAIRef.current = (message: string, rawOptions?: CallAIArgument) => {
    const options = normalizeCallAIOptions(rawOptions);
    const domains = options.domains !== undefined ? normalizeStringList(options.domains) : undefined;
    if (domains !== undefined) {
      setSelectedSkills((current) => [
        ...domains.map((value) => ({ type: 'domain' as const, value })),
        ...current.filter((item) => item.type === 'skill'),
      ]);
    }
    if (options.newSession === false && activeConversationKey) {
      if (hitlSubmitting) {
        return;
      }
      abandonPendingHITLCards();
      onRequest({
        content: message,
        ...buildChatRequestFields(),
        ...(domains !== undefined ? { domains } : {}),
      });
      return;
    }
    createNewConversation(message, options.messages, true, domains);
  };

  useEffect(() => {
    if (!onCallAI) {
      return;
    }
    onCallAI((message, options) => {
      handleCallAIRef.current(message, options);
    });
  }, [onCallAI])

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

  const chatSender = (
    <>
      <Space direction="vertical" style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
        <Sender
          footer={(actionNode) => {
            return <Flex justify="space-between" align="center">
              <Flex gap="small" align="center">
                <Dropdown
                  open={skillsVisible}
                  onOpenChange={(nextOpen, info) => {
                    if (info.source === 'trigger' || nextOpen) {
                      setSkillsVisible(nextOpen);
                    }
                  }}
                  menu={{
                    selectedKeys: selectedSkills.map((s) => s.value),
                    onClick: (info) => {
                      const option = allSkills.find((s) => s.key === info.key);
                      setSelectedSkills((ori) => {
                        if (ori.some((s) => s.value === info.key)) {
                          return ori.filter((s) => s.value !== info.key);
                        } else {
                          return [...ori, { type: option?.skillType || 'skill', value: info.key }];
                        }
                      });
                    },
                    items: allSkills.map((s) => ({
                      label: s.label,
                      key: s.key,
                    })),
                  }}
                >
                  <Sender.Switch value={false} icon={<LuBookOpenText />}>
                    {t('chat.skill', { defaultValue: 'Skills' })}{' '}
                    ({selectedSkills.length > 0 ? t('chat.skillsSelected', { defaultValue: '{{count}} selected', count: selectedSkills.length }) : t('chat.skillsOptional', { defaultValue: 'optional' })})
                  </Sender.Switch>
                </Dropdown>
              </Flex>
              <Flex align="center">
                {actionNode}
              </Flex>
            </Flex>
          }}
          suffix={false}
          value={inputValue}
          onSubmit={async () => {
            onSubmit(inputValue.trim());
            setInputValue('');
          }}
          onChange={setInputValue}
          onCancel={() => { abort() }}
          loading={isRequesting || hitlSubmitting !== null}
          className={classNames(styles.sender, 'chat-sender')}
          placeholder={t('chat.inputPlaceholder')}
        />
      </Space>
    </>
  );

  // ==================== Render =================
  return (
    <XProvider>
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
              label: <LuExternalLink style={{ transform: 'scaleX(-1)' }} />,
              value: 'classic',
            }, {
              label: <LuPanelRightDashed />,
              value: 'sidebar',
            }, {
              label: <LuPanelRight />,
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
            <ChatList
              bubble={bubble}
              messages={messages}
              loading={fetchConversationLoading || createNewConversationLoading}
              layout={layout}
              onSendMessage={onSubmit}
              hitlSubmitting={hitlSubmitting}
              onHITLSelect={handleHITLSelect}
            />
            {chatSender}
          </div>
        </div>
      </ChatContext.Provider>
    </XProvider >
  );
};

export default AIChat;