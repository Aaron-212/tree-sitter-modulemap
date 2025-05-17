; highlights.scm for the “modulemap” grammar

;; Basic tokens
(comment) @comment
(string_literal) @string
(integer_literal) @number
(identifier) @identifier
(module_declaration (module_id) @label)

;; Keywords
(module_declaration_keyword) @keyword

[
  "requires"
  "header"
  "private"
  "textual"
  "umbrella"
  "exclude"
  "export"
  "export_as"
  "use"
  "link"
  "framework"
  "config_macros"
  "explicit"
  "extern"
  "conflict"
] @keyword

;; Attributes
(attribute
  "[" @punctuation.bracket
  (identifier) @attribute
  "]" @punctuation.bracket)

(header_attribute [
  "size"
  "mtime"
  ] @attribute)

;; Operators & punctuation
"!" @operator
"*" @operator

[
  "." ","
] @punctuation.delimiter

[
  "{" "}" "[" "]"
] @punctuation.bracket
