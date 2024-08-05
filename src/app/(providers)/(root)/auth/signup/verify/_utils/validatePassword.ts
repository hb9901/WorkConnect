export const validatePassword = (password: string) => {
  const lengthRegex = /^.{1,8}$/;
  const letterRegex = /[A-Za-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+~`|}{[\]:;?/<>,.]/;

  if (!lengthRegex.test(password)) {
    return '비밀번호는 1자 이상 8자 이내여야 합니다.';
  }

  if (!letterRegex.test(password) && !numberRegex.test(password)) {
    return '비밀번호는 영문자와 숫자가 포함되어야 합니다';
  }

  if (!letterRegex.test(password)) {
    return '비밀번호는 영문자와 숫자가 포함되어야 합니다';
  }

  if (!numberRegex.test(password)) {
    return '비밀번호는 영문자와 숫자가 포함되어야 합니다';
  }

  if (specialCharRegex.test(password) && !letterRegex.test(password) && !numberRegex.test(password)) {
    return '비밀번호는 영문자와 숫자가 포함되어야 합니다';
  }

  return true;
};
