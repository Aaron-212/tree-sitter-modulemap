/**
 * @file Modulemap grammar for Tree-sitter
 * @author Aaron Ruan <i@ar212.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "modulemap",

  extras: ($) => [/[\s+]/, $.comment],

  word: ($) => $.identifier,

  rules: {
    // Entry point
    document: ($) => repeat($.module_declaration),

    // module Foo [system] { ... }
    module_declaration: ($) =>
      seq(
        $.module_declaration_keyword,
        $.module_id,
        repeat($.attribute),
        $.block,
        repeat($.extern_module),
      ),
    module_declaration_keyword: (_) =>
      seq(optional("explicit"), optional("framework"), "module"),
    module_id: ($) => seq($.identifier, repeat(seq(".", $.identifier))),
    extern_module: ($) =>
      seq("extern", "module", $.module_id, $.string_literal),

    block: ($) => seq("{", repeat($._module_member), "}"),

    _module_member: ($) =>
      choice(
        $.module_declaration, // Nested module
        $.requires_declaration,
        $.header_declaration,
        $.umbrella_dir_declaration,
        $.export_declaration,
        $.export_as_declaration,
        $.use_declaration,
        $.link_declaration,
        $.config_macros_declaration,
        $.conflict_declaration,
      ),

    requires_declaration: ($) => seq("requires", $.feature_list),
    feature_list: ($) => seq($.feature, repeat(seq(",", $.feature))),
    feature: ($) => seq(optional("!"), $.identifier),

    header_declaration: ($) =>
      seq(
        $.header_keyword,
        $.string_literal,
        optional($.header_attribute_block),
      ),
    header_keyword: (_) =>
      choice(
        seq(optional("private"), optional("textual"), "header"),
        seq("umbrella", "header"),
        seq("exclude", "header"),
      ),
    header_attribute_block: ($) => seq("{", repeat($.header_attribute), "}"),
    header_attribute: ($) =>
      choice(seq("size", $.integer_literal), seq("mtime", $.integer_literal)),

    umbrella_dir_declaration: ($) => seq("umbrella", $.string_literal),

    export_declaration: ($) => seq("export", $.wildcard_module_id),
    wildcard_module_id: ($) =>
      choice($.identifier, seq($.identifier, ".", $.wildcard_module_id), "*"),

    export_as_declaration: ($) => seq("export_as", $.identifier),

    use_declaration: ($) => seq("use", $.module_id),

    link_declaration: ($) =>
      seq("link", optional("framework"), $.string_literal),

    config_macros_declaration: ($) =>
      seq("config_macros", repeat($.attribute), $.config_macro_list),
    config_macro_list: ($) => seq($.identifier, repeat(seq(",", $.identifier))),

    conflict_declaration: ($) =>
      seq("conflict", $.module_id, ",", $.string_literal),

    // Terminals

    identifier: (_) => token(/[_a-zA-Z][_a-zA-Z0-9]*/),

    attribute: ($) => seq("[", $.identifier, "]"),

    string_literal: (_) => seq('"', repeat(choice(/[^"\\\n]+/, /\\./)), '"'),
    integer_literal: (_) => token(/0[xX][0-9a-fA-F]+|[1-9][0-9]*/),

    comment: (_) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
