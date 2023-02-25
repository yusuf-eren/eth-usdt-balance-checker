import { AddressValidationPipe } from './address-validation.pipe';

describe('AddressValidationPipe', () => {
  it('should be defined', () => {
    expect(new AddressValidationPipe()).toBeDefined();
  });

  it('should convert array to validated json object', () => {
    expect(
      new AddressValidationPipe().transform([
        '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        '123',
        {},
        1,
        [],
        '23q4523',
        '0xfeC4A115911A120FdEd09a025b32D51e965E1214',
      ]).invalidAddresses,
    ).toStrictEqual(['123', {}, 1, [], '23q4523']);
  });
});
