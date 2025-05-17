package tree_sitter_modulemap_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_modulemap "github.com/aaron-212/tree-sitter-modulemap/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_modulemap.Language())
	if language == nil {
		t.Errorf("Error loading ModuleMap grammar")
	}
}
