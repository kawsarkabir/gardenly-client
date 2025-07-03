export function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Include at least 1 uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Include at least 1 lowercase letter.';
  if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]/.test(password))
    return 'Include at least 1 special character.';
  return 'valid';
}
