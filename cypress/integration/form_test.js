//tests
describe('Tests', () => {
    beforeEach(() => {
        // Each test needs fresh state!
        // Never rely on state left over from previous tests
        // Every test should work in isolation (MUST)
        cy.visit('http://localhost:3000')
    })

    //Helpers to grab elements
    const name = () => cy.get('input[name=name]');
    const submitBtn = () => cy.get('button[id="order-button"]');

    it('sanity check to make sure tests work', () => {
        // 'it' is a test
        // expect is an assertion
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5); // Strict equality ===
        expect({}).not.to.equal({}); // Strict equality {} !== {}
        expect({}).to.eql({}); // not strict ==
    })

    it('the proper elements are showing', () => {
        name().should('exist');
        submitBtn().should('exist');
    })

    describe('Passing values', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost');
        })

        it('submit button starts out disabled', () => {
            submitBtn().should('be.disabled');
        })

        it('can type in the input', () => {
            name()
                .should('have.value', '')
                .type('Darrion White')
                .should('have.value', 'Darrion')
        })

    })
})