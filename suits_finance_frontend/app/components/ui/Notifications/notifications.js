const notifications = [
    {
        "type": "MissingFields",
        "title": "Please fill in the required fields",
        "message": "Both the email and password fields are required to log in.",
        "icon": "XCircleIcon",
    },
    {
        "type": "InvalidCredentials",
        "title": "Invalid credentials",
        "message": "The email or password you entered is incorrect.",
        "icon": "XCircleIcon",
    },
    {
        "type": "InvalidEmail",
        "title": "Invalid email",
        "message": "The email you entered is not valid.",
        "icon": "XCircleIcon",
    },
    {
        "type": "MissingEmail",
        "title": "Missing email",
        "message": "The email field is required to send a password reset link.",
        "icon": "XCircleIcon",
    },
    {
        "type": "MissingPassword",
        "title": "Missing password",
        "message": "The password field is required to reset your password.",
        "icon": "XCircleIcon",
    },
    {
        "type": "CopiedToClipboard",
        "title": "Copied to clipboard",
        "message": "The trade hash has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "EntryLevelCopied",
        "title": "Entry level copied",
        "message": "The entry level has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "StoplossLevelCopied",
        "title": "Stoploss level copied",
        "message": "The stoploss level has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "TP1LevelCopied",
        "title": "TP1 level copied",
        "message": "The TP1 level has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "TP2LevelCopied",
        "title": "TP2 level copied",
        "message": "The TP2 level has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "TP3LevelCopied",
        "title": "TP3 level copied",
        "message": "The TP3 level has been copied to your clipboard.",
        "icon": "ClipboardDocumentCheckIcon"
    },
    {
        "type": "EmailDoesNotExist",
        "title": "Email does not exist",
        "message": "The email you entered does not exist.",
        "icon": "XCircleIcon",
    },
    {
        "type": "PasswordTooShort",
        "title": "Password too short",
        "message": "Please use a password that's at least 8 characters long.",
        "icon": "XCircleIcon",
    },
    {
        "type": "EmailAlreadyExists",
        "title": "Email already exists",
        "message": "The email you entered is already in use by another account.",
        "icon": "XCircleIcon",
    },
    {
        "type": "InvalidStrategyName",
        "title": "Unfitting strategy name",
        "message": "We recommend using a name without any profanity or offensive language.",
        "icon": "XCircleIcon",
    },
    {
        "type": "BlankStrategyName",
        "title": "Blank strategy name",
        "message": "To differentiate your strategies, please give your strategy a name.",
        "icon": "XCircleIcon",
    },
    {
        "type": "InvalidCharactersInStrategyName",
        "title": "Invalid characters in strategy name",
        "message": "Please use only letters, numbers, hyphens, and underscores.",
        "icon": "XCircleIcon",
    },
    {
        "type": "StrategyNameTooLong",
        "title": "Strategy name too long",
        "message": "Please use a name that is less than 100 characters.",
        "icon": "XCircleIcon",
    },
    {
        "type": "OnlyImageFilesAllowed",
        "title": "Only image files allowed",
        "message": "Please use a file with the extension .jpg, .jpeg, or .png.",
        "icon": "XCircleIcon",
    },
    {
        "type": "DateCannotBeEmpty",
        "title": "Date cannot be empty",
        "message": "Please select a date for your trade.",
        "icon": "XCircleIcon",
    },
    {
        "type": "EntryCannotBeEmpty",
        "title": "Entry cannot be empty",
        "message": "Please enter an entry price for your trade.",
        "icon": "XCircleIcon",
    },
    {
        "type": "StopLossCannotBeEmpty",
        "title": "Stop loss cannot be empty",
        "message": "Please enter a stop loss price for your trade.",
        "icon": "XCircleIcon",
    },
    {
        "type": "TakeProfitCannotBeEmpty",
        "title": "Take profit cannot be empty",
        "message": "Please enter at least one take profit price for your trade.",
        "icon": "XCircleIcon",
    },
    {
        "type": "NumberCannotBeNegative",
        "title": "Number cannot be negative",
        "message": "The number you entered cannot be negative, please check your input carefully and enter a positive number.",
        "icon": "XCircleIcon",
    }
]

export default notifications;