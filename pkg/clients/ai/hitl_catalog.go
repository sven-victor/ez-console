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
		for _, name := range lister.ApprovalToolNames() {
			if name == "" {
				continue
			}
			cat[fmt.Sprintf("%s_%s", key, name)] = HITLSpec{Mode: HITLCardApproval}
		}
	}
	cat[UIChooseToolName] = HITLSpec{Mode: HITLCardChoice}
	return cat, nil
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
