@webTests
Feature: Simple Web Feature

  @webTest
  Scenario: web simple test
    Given I go to "https://perfecto.io"
    Then I wait "15" seconds for element with xpath "//*[@label='dummy_element']" to exist
