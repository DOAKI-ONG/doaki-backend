export function checkCpf(cpf: string): boolean {
  let cpfIncomplete = cpf.slice(0, 9);
  let verifyPass = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  let verifyPass2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let verifyDigit1 = 0;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum = sum + parseInt(cpfIncomplete[i]) * verifyPass[i];
  }
  sum = sum % 11;
  verifyDigit1 = sum < 2 ? 0 : 11 - sum;
  cpfIncomplete = cpfIncomplete + verifyDigit1;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum = sum + parseInt(cpfIncomplete[i]) * verifyPass2[i];
  }
  sum = sum % 11;
  let verifyDigit2 = sum < 2 ? 0 : 11 - sum;
  if (verifyDigit1 === parseInt(cpf[9]) && verifyDigit2 === parseInt(cpf[10])) {
    return true;
  }
  return false;
}
