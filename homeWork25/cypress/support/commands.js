    Cypress.Commands.add('selectValueOne', () => {
        cy.xpath('//select[@data-cy="box-3-dropdown"]').select('Option One')
    })
    Cypress.Commands.add('selectValueTwo', () => {
        cy.xpath('//select[@data-cy="box-3-dropdown"]').select('Option Two')
    })
    Cypress.Commands.add('selectValueThree', () => {
        cy.xpath('//select[@data-cy="box-3-dropdown"]').select('Option Three')
    })
    Cypress.Commands.add('getSelectedValue', ()=>{
       return cy.xpath('//span[@data-cy="box-3-selected-name"]')
    })  
