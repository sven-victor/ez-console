package ai

const (
	HITLModeInteractive HITLMode = "interactive"
	HITLModeAutoReject  HITLMode = "auto_reject"

	HITLCardApproval HITLCardKind = "approval"
	HITLCardChoice   HITLCardKind = "choice"

	HITLStatusPending   HITLCardStatus = "pending"
	HITLStatusDecided   HITLCardStatus = "decided"
	HITLStatusAbandoned HITLCardStatus = "abandoned"

	HITLOptionApprove = "approve"
	HITLOptionReject  = "reject"

	HITLClassNone       HITLClass = ""
	HITLClassApproval   HITLClass = "approval"
	HITLClassChoice     HITLClass = "choice"
	HITLClassClientAuto HITLClass = "client_auto"

	UIChooseToolName = "ui_choose"
)

type HITLMode string
type HITLCardKind string
type HITLCardStatus string
type HITLClass string

type HITLOption struct {
	ID          string `json:"id"`
	Label       string `json:"label"`
	Description string `json:"description,omitempty"`
	Primary     bool   `json:"primary,omitempty"`
}

type HITLCard struct {
	ToolCallID       string         `json:"tool_call_id"`
	Kind             HITLCardKind   `json:"kind"`
	Title            string         `json:"title"`
	Description      string         `json:"description,omitempty"`
	ToolName         string         `json:"tool_name"`
	Arguments        string         `json:"arguments"`
	Options          []HITLOption   `json:"options"`
	Status           HITLCardStatus `json:"status"`
	SelectedOptionID string         `json:"selected_option_id,omitempty"`
}

type HITLDecision struct {
	ToolCallID string `json:"tool_call_id"`
	OptionID   string `json:"option_id"`
}

type HITLSpec struct {
	Mode    HITLCardKind
	Title   string
	Options []HITLOption
}

type HITLCatalog map[string]HITLSpec

func ResolveHITLMode(mode HITLMode) HITLMode {
	if mode == HITLModeInteractive {
		return HITLModeInteractive
	}
	return HITLModeAutoReject
}

func DefaultHITLOptions(kind HITLCardKind) []HITLOption {
	if kind == HITLCardApproval {
		return []HITLOption{
			{ID: HITLOptionApprove, Label: "Execute", Primary: true},
			{ID: HITLOptionReject, Label: "Don't execute"},
		}
	}
	return []HITLOption{{ID: HITLOptionReject, Label: "Don't execute"}}
}

func ClassifyHITL(name string, catalog HITLCatalog) HITLClass {
	if name == UIChooseToolName {
		return HITLClassChoice
	}
	if spec, ok := catalog[name]; ok && spec.Mode == HITLCardApproval {
		return HITLClassApproval
	}
	if len(name) >= len(ClientToolPrefix) && name[:len(ClientToolPrefix)] == ClientToolPrefix {
		return HITLClassClientAuto
	}
	return HITLClassNone
}

func WithChatHITLMode(mode HITLMode) WithChatOptions {
	return func(options *ChatCompletionOptions) { options.HITLMode = mode }
}

func WithChatHITLCatalog(catalog HITLCatalog) WithChatOptions {
	return func(options *ChatCompletionOptions) { options.HITLCatalog = catalog }
}
