import XCTest
import SwiftTreeSitter
import TreeSitterModulemap

final class TreeSitterModulemapTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_modulemap())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading ModuleMap grammar")
    }
}
