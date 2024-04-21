

export const phoneRule = [
    { 
        required: true, 
        message: 'Please enter Shop phone' 
    },
    {
        pattern: /^[2-57-9]\d{7}$/,
        message: 'Phone number must be 8 digits and start with 2, 4, 5, 7, or 9'
    }
];
export const nameRule = 