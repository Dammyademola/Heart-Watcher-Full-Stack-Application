export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  

export const validatePassword = (password) => {
    
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    const hasUppercase = /[A-Z]/.test(password);
  
    const hasLowercase = /[a-z]/.test(password);
  
    const hasDigit = /\d/.test(password);
  
    const hasSpecialChar = specialChars.test(password);
  
    return (
      password.length >= 8 &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
};

