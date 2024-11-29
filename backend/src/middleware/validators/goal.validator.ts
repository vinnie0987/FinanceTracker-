const createBody = {
    title: {
      notEmpty: {
        errorMessage: "Title cannot be empty",
      },
      isLength: {
        options: { min: 5, max: 50 },
        errorMessage: "Title must be between 5 and 50 characters",
      },
      isString: {
        errorMessage: "Title must be a string",
      },
      escape: true,
    },
  
    targetAmount: {
      notEmpty: {
        errorMessage: "Target amount cannot be empty",
      },
      isNumeric: {
        errorMessage: "Target amount must be a number",
      },
      custom: {
        options: (value: number) => value > 0,
        errorMessage: "Target amount must be greater than 0",
      },
    },
  
    dueDate: {
      notEmpty: {
        errorMessage: "Due date cannot be empty",
      },
      isISO8601: {
        errorMessage: "Due date must be a valid date",
      },
    },
  
    userId: {
      notEmpty: {
        errorMessage: "User ID cannot be empty",
      },
      isUUID: {
        errorMessage: "User ID must be a valid UUID",
      },
    },
  };
  
  const putBody = {
    savedAmount: {
      notEmpty: {
        errorMessage: "Saved amount cannot be empty",
      },
      isNumeric: {
        errorMessage: "Saved amount must be a number",
      },
      custom: {
        options: (value: number) => value >= 0,
        errorMessage: "Saved amount must be zero or greater",
      },
    },
  };
  
  const patchBody = {
    title: {
      optional: true,
      isLength: {
        options: { min: 5, max: 50 },
        errorMessage: "Title must be between 5 and 50 characters",
      },
      isString: {
        errorMessage: "Title must be a string",
      },
      escape: true,
    },
    targetAmount: {
      optional: true,
      isNumeric: {
        errorMessage: "Target amount must be a number",
      },
      custom: {
        options: (value: number) => value > 0,
        errorMessage: "Target amount must be greater than 0",
      },
    },
    dueDate: {
      optional: true,
      isISO8601: {
        errorMessage: "Due date must be a valid date",
      },
    },
  };
  
  const putParams = {
    id: {
      escape: true,
      isNumeric: {
        errorMessage: "ID must be a valid number",
      },
      custom: {
        options: (value: number) => value > 0,
        errorMessage: "ID must be greater than 0",
      },
    },
  };
  
  const patchParams = {
    id: {
      escape: true,
      isNumeric: {
        errorMessage: "ID must be a valid number",
      },
      custom: {
        options: (value: number) => value > 0,
        errorMessage: "ID must be greater than 0",
      },
    },
  };
  
  const deleteParams = {
    id: {
      escape: true,
      isNumeric: {
        errorMessage: "ID must be a valid number",
      },
      custom: {
        options: (value: number) => value > 0,
        errorMessage: "ID must be greater than 0",
      },
    },
  };
  
  export default {
    create: {
      body: createBody,
    },
    put: {
      body: putBody,
      params: putParams,
    },
    patch: {
      body: patchBody,
      params: patchParams,
    },
    delete: {
      params: deleteParams,
    },
  };
  