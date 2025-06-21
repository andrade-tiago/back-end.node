export const ApplicationErrorMessages = {
  Products: {
    NotFoundById: (id: string) => `Product with id "${id}" not found`,
    NotFoundMany: 'One or more products not found',
  },
  User: {
    AlreadyDeleted: (id: string) => `User with id "${id}" already deleted`,
    Conflict: (email: string) => `User with email "${email}" already exists`,
    NotFoundById: (id: string) => `User with id "${id}" not found`,
  },

  Login: 'Incorrect e-mail or password (or both)',
} as const;
