import formatCurrency from '../scripts/utils/money.js'

//*Test suite:
describe('Test suite: formatCurrency', () => {
  //It is a test created by Jasmine to test the formatCurrency function.
  it('Convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('Works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
})