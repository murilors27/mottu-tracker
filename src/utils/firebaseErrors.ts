export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-email":
      return "E-mail inválido. Verifique e tente novamente.";
    case "auth/user-not-found":
      return "Usuário não encontrado. Crie uma conta antes de entrar.";
    case "auth/wrong-password":
      return "Senha incorreta. Tente novamente.";
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos. Verifique seus dados.";
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso. Tente outro.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/missing-password":
      return "Digite a senha para continuar.";
    case "auth/unknown":
      return "Erro desconhecido ao tentar entrar. Verifique seus dados.";
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
}
