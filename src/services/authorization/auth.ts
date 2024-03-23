export async function recoveryPassword(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/auth/recovery-password`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        'Desculpe, não encontramos um usuário com esse endereço de email em nosso sistema.',
      );
    }

    throw new Error(
      'Ocorreu um erro inesperado ao recuperar senha. Tente novamente mais tarde ou, se o erro persistir, contacte o suporte.',
    );
  }

  return response.json();
}

export async function resetPassword(data: {
  password: string;
  token: string | null;
}) {
  const { password, token } = data;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/auth/reset-password`,
    {
      method: 'POST',
      body: JSON.stringify({
        password,
        token,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Este link de recuperação inspirou ou é inválido.');
    }

    throw new Error(
      'Ocorreu um erro inesperado ao redefinir a senha. Tente novamente mais tarde ou, se o erro persistir, contacte o suporte.',
    );
  }

  return response.json();
}
