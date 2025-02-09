import 'cypress-xpath';

describe('Rate Calculator Test', () => {
  beforeEach(() => {
    cy.viewport(1280, 720) // Set viewport size
    cy.visit('https://pos.com.my/send/ratecalculator')
  })

  it('Fills the form and captures screenshots', () => {
    // Ensure calculator wrapper is visible before interacting
    cy.get('.calculator-wrapper').scrollIntoView()
      .should('have.class', 'calculator-wrapper w-full bg-[#F2EBFF] py-12')

    cy.wait(6000) // wait for 4 seconds

    // Enter Postcode input field
    cy.xpath('//*[@id="contentBody"]/div/app-static-layout/app-rate-calculator-v2/div/div[3]/div[1]/div[1]/div[3]/div/input', { timeout: 10000 })
      .should('be.visible')
      .should('be.enabled') // Ensure input is not disabled or read-only
      .clear({ force: true }) // Force clearing if needed
      .type('35600', { force: true }) // Force typing if needed
      .should('have.value', '35600');

    // Select drop-down Country menu for Country : India
    cy.get('[name="country"]')
      .clear({ force: true }) // Ensure the input field is cleared
      .type('India', { force: true }) // Use type for autocomplete input
      .should('have.value', 'India');

    // Select the option from the list
    cy.get('mat-option').contains('India - IN').click({ force: true });

    // Enter Weight input field with value 1
    cy.xpath('//*[@id="contentBody"]/div/app-static-layout/app-rate-calculator-v2/div/div[3]/div[1]/div[3]/div/div[2]/div[1]/input', { timeout: 10000 })
      .should('be.visible')
      .should('be.enabled') // Ensure input is not disabled or read-only
      .clear({ force: true }) // Force clearing if needed
      .type('1', { force: true }) // Force typing if needed
      .should('have.value', '1');

    // Click on the Calculate button
    cy.get('.justify-end > .no-underline')
      .should('contain', 'Calculate')
      .click({ force: true }); // Use force: true to bypass the covering element

    // Capture the screenshot of the Quote comparison
    cy.xpath('//*[@id="contentBody"]/div/app-static-layout/app-rate-calculator-v2/div/div[4]/div/div[1]/h1', { timeout: 10000 })
      .scrollIntoView() // Ensure the element is in view
      .wait(2000) // wait for 2 seconds
    cy.screenshot('Your Quote', { capture: 'viewport' });

  });
});