export const DomainErrorMessages = {
  Order: {
    Empty: 'An order must contain at least one item',
    DuplicateItems: 'An order cannot contain duplicate items',
  },
  User: {
    InvalidCpf: (cpf: string) => `CPF "${cpf}" is invalid`,
    InvalidEmail: (email: string) => `E-mail "${email}" is invalid`,
    InvalidRole: (role: string) => `"${role}" is an invalid role`,
  },

  NonEncryptedString: (str: string) => `Non encrypted string "${str}"`,
  InvalidUuid: (uuid: string) => `Uuid "${uuid}" is invalid`,

  Number: {
    Negative: 'Value cannot be negative',
    NonInteger: 'Value must be an integer',
    NonNumeric: 'Value is not numeric',
    NonPositive: 'Value must be a positive number',
  },
  Date: {
    FutureDate: 'Datetime cannot be in the future',
    InvalidDate: 'Invalid datetime',
  },
} as const;
