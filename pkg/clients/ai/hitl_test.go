package ai

import "testing"

func TestClassifyHITL(t *testing.T) {
	cat := HITLCatalog{
		"mcp3_delete_user": {Mode: HITLCardApproval, Title: "Delete this user?"},
	}
	cases := []struct {
		name string
		want HITLClass
	}{
		{"ui_choose", HITLClassChoice},
		{"ui_navigate", HITLClassClientAuto},
		{"mcp3_delete_user", HITLClassApproval},
		{"utils1_now", HITLClassNone},
	}
	for _, tc := range cases {
		if got := ClassifyHITL(tc.name, cat); got != tc.want {
			t.Fatalf("%s: got %s want %s", tc.name, got, tc.want)
		}
	}
}

func TestDefaultHITLModeIsAutoReject(t *testing.T) {
	var opts ChatCompletionOptions
	if opts.HITLMode != "" && opts.HITLMode != HITLModeAutoReject {
		t.Fatalf("zero options must mean auto-reject, got %q", opts.HITLMode)
	}
	if ResolveHITLMode(opts.HITLMode) != HITLModeAutoReject {
		t.Fatal("ResolveHITLMode zero value")
	}
}

func TestDefaultHITLOptionsIncludesReject(t *testing.T) {
	opts := DefaultHITLOptions(HITLCardApproval)
	if len(opts) != 2 || opts[0].ID != HITLOptionApprove || opts[1].ID != HITLOptionReject {
		t.Fatalf("%#v", opts)
	}
}
