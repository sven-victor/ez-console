package ai

import (
	"context"
	"testing"

	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

type approvalListToolset struct {
	names []string
	tools []openai.Tool
}

func (a approvalListToolset) ApprovalToolNames() []string { return a.names }
func (a approvalListToolset) GetName() string             { return "approval-list" }
func (a approvalListToolset) GetDescription() string      { return "" }
func (a approvalListToolset) Validate() error             { return nil }
func (a approvalListToolset) Test(context.Context) error  { return nil }
func (a approvalListToolset) Call(context.Context, string, string) (string, error) {
	return "", nil
}
func (a approvalListToolset) ListTools(context.Context) ([]openai.Tool, error) {
	return a.tools, nil
}

func TestBuildHITLCatalogPrefixesLogicalNames(t *testing.T) {
	ts := toolset.ToolSets{
		"mcp3": approvalListToolset{
			names: []string{"delete_user"},
			tools: []openai.Tool{{Type: openai.ToolTypeFunction, Function: &openai.FunctionDefinition{Name: "delete_user"}}},
		},
	}
	cat, err := BuildHITLCatalog(context.Background(), ts)
	if err != nil {
		t.Fatal(err)
	}
	if cat["mcp3_delete_user"].Mode != HITLCardApproval {
		t.Fatalf("%#v", cat)
	}
	if cat[UIChooseToolName].Mode != HITLCardChoice {
		t.Fatal("ui_choose missing")
	}
}

func TestBuildHITLCatalogUnwrapsBindingAware(t *testing.T) {
	inner := approvalListToolset{
		names: []string{"delete_user"},
		tools: []openai.Tool{{Type: openai.ToolTypeFunction, Function: &openai.FunctionDefinition{Name: "delete_user"}}},
	}
	ts := toolset.ToolSets{
		"mcp3": toolset.NewBindingAwareToolSet(inner, "res", "mcp"),
	}
	cat, err := BuildHITLCatalog(context.Background(), ts)
	if err != nil {
		t.Fatal(err)
	}
	if cat["mcp3_delete_user"].Mode != HITLCardApproval {
		t.Fatalf("%#v", cat)
	}
}

func TestMCPToolSetApprovalToolNames(t *testing.T) {
	raw := `{"endpoint":"http://example","protocol":"http","approval_tools":["delete_user",""]}`
	inst, err := (&MCPToolSetFactory{}).CreateToolSet(raw)
	if err != nil {
		t.Fatal(err)
	}
	lister, ok := inst.(ApprovalToolLister)
	if !ok {
		t.Fatalf("%T does not list approval tools", inst)
	}
	names := lister.ApprovalToolNames()
	if len(names) != 1 || names[0] != "delete_user" {
		t.Fatalf("%#v", names)
	}
}
