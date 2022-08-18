// /// <reference types="cypress" />

const fourthPage = require("../pageObjects/fourth.page")


describe('Testing functionality of methods "click" and "dblClick" on first part app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/example-4')
    })
  
    it('Shoul text of  field "Selected Item" changed after dblclick by element of options list', () => {
        cy.get('.box-1-list-item')
            .first()
            .dblclick()

        cy.get('span[data-cy="box-1-selected-name"]')
            .should('have.text', 'Option One')

        cy.get('.box-1-list-item')
            .last()
            .dblclick()

        cy.get('span[data-cy="box-1-selected-name"]')
            .should('have.text', 'Option Three')
    })
    it('Shoul highlight element of options list after click by that element', () => {
        cy.get('.box-1-list-item')
            .first()
            .click()
            .should('have.class', 'lgSOuT')

        cy.get('.box-1-list-item:nth-child(2)')
            .last()
            .click()
            .should('have.class', 'lgSOuT')
    });
  
})

describe('Testing functionality of methods "check" and "uncheck" on second part app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/example-4')
      })
    it('should counter of active checkboxes correctly changed after check and uncheck checkboxes', function () {
        const fourthPage = require("../pageObjects/fourth.page")
        fourthPage
            .get(fourthPage.optionOneCheckbox)
            .check()
        fourthPage
            .getActiveCheckboxesCounter()
            .should('have.text',1)


        fourthPage
            .get(fourthPage.optionTwoCheckbox)
            .check()
        fourthPage  
            .getActiveCheckboxesCounter()
            .should('have.text',2)


        fourthPage
            .get(fourthPage.optionThreeCheckbox)
            .check()
        fourthPage
            .getActiveCheckboxesCounter()
            .should('have.text',3)


        fourthPage
            .get(fourthPage.optionOneCheckbox)
            .uncheck()
        fourthPage
            .get(fourthPage.optionTwoCheckbox)
            .uncheck()
        fourthPage
            .get(fourthPage.optionThreeCheckbox)
            .uncheck()
        fourthPage
            .getActiveCheckboxesCounter()
            .should('have.text',0)
    });
});

describe('Testing functionality of adding cy.commands and method "select" on third part app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/example-4')
      })
    it('should text of selected item value changed after selecting another value', function () {
        cy.selectValueTwo()
        cy.getSelectedValue()
            .should('have.text','Option Two')


        cy.selectValueOne()
        cy.getSelectedValue()
            .should('have.text','Option One')


        cy.selectValueThree()
        cy.getSelectedValue()
            .should('have.text','Option Three')
    })
})


describe('Testing functionality method "trigger" on fourth part app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/example-4')
      })
    it('should text of selected item value changed after mouse hover to another value', function () {
        fourthPage
            .get(fourthPage.optionOneTrigger)
            .trigger('mouseover')
        fourthPage
            .getActiveTriggeredItem()
            .should('have.text','Option One')


        fourthPage
            .get(fourthPage.optionTwoTrigger)
            .trigger('mouseover')
        fourthPage
            .getActiveTriggeredItem()
            .should('have.text','Option Two')


        fourthPage
            .get(fourthPage.optionThreeTrigger)
            .trigger('mouseover')
        fourthPage
            .getActiveTriggeredItem()
            .should('have.text','Option Three')

    })
})