package ai

import (
	"context"
	"fmt"

	"github.com/sven-victor/ez-console/pkg/toolset"
)

// ApprovalToolLister is implemented by toolsets that declare logical tool names
// requiring an approval card. Names are logical, before the {mapKey}_ prefix.
type ApprovalToolLister interface {
	ApprovalToolNames() []string
}

// BuildHITLCatalog maps exposed tool names ({mapKey}_{logical}) to approval specs.
// ui_choose is always a choice card. BindingAwareToolSet is unwrapped so a wrapped
// MCP toolset still contributes its approval names.
func BuildHITLCatalog(ctx context.Context, ts toolset.ToolSets) (HITLCatalog, error) {
	_ = ctx
	cat := make(HITLCatalog, len(ts)+1)
	for key, set := range ts {
		lister := approvalLister(set)
		if lister == nil {
			continue
		}
		descs := toolDescriptionsByName(ctx, set)
		for _, name := range lister.ApprovalToolNames() {
			if name == "" {
				continue
			}
			exposed := fmt.Sprintf("%s_%s", key, name)
			cat[exposed] = HITLSpec{
				Mode:        HITLCardApproval,
				Description: firstNonEmpty(descs[name], descs[exposed]),
			}
		}
	}
	cat[UIChooseToolName] = HITLSpec{Mode: HITLCardChoice}
	return cat, nil
}

func toolDescriptionsByName(ctx context.Context, set toolset.ToolSet) map[string]string {
	out := map[string]string{}
	if set == nil {
		return out
	}
	tools, err := set.ListTools(ctx)
	if err != nil {
		return out
	}
	for _, tool := range tools {
		if tool.Function == nil || tool.Function.Name == "" || tool.Function.Description == "" {
			continue
		}
		out[tool.Function.Name] = tool.Function.Description
	}
	return out
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if value != "" {
			return value
		}
	}
	return ""
}

func approvalLister(set toolset.ToolSet) ApprovalToolLister {
	for set != nil {
		if lister, ok := set.(ApprovalToolLister); ok {
			return lister
		}
		wrapped, ok := set.(*toolset.BindingAwareToolSet)
		if !ok {
			return nil
		}
		set = wrapped.Inner
	}
	return nil
}
