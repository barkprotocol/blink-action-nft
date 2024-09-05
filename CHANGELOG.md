# Changelog

## [Unreleased]

### Added
- **Token Support**:
  - Added support for transferring SPL tokens: USDC and BARK.
  - Included wrapped SOL as a supported token.
  - Added `TOKEN_MINT_ADDRESSES` and `CURRENCY_ICONS` constants for token mint addresses and currency icons.

### Changed
- **Payment Logic**:
  - Refactored payment processing logic to handle SPL tokens in addition to SOL.
  - Updated `POST` request handling in `actions/payments/route.ts` to manage SOL, USDC, and BARK transactions.
  - Enhanced transaction creation to support both SOL transfers and SPL token transfers, including creating associated token accounts if necessary.

- **Validation**:
  - Updated `validate.ts` to support multiple currencies and validate SPL token transactions.
  - Added support for validating token types and amounts.

- **Error Handling**:
  - Refactored `errorHandler.ts` to standardize error responses and improve logging.
  - Created a centralized `handleError` function to manage errors and format responses.

### Fixed
- **General Fixes**:
  - Fixed potential issues with default payment address and amount handling in `const.ts`.
  - Improved error messages and validation checks for better clarity.

### Deprecated
- **Old Logic**:
  - Removed outdated payment logic that only supported SOL transfers.

### Security
- **Improved Security**:
  - Added validation to ensure that the payment amount is not too small for rent-exempt accounts.
  - Ensured that token transfers comply with the required decimal precision.

## [v1.0.0] - YYYY-MM-DD

- Initial release with basic SOL transfer functionality.
