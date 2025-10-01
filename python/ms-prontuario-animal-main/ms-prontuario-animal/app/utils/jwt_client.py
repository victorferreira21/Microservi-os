import requests
import os


# Pega a URL do serviço de autenticação no .env
AUTH_VALIDATE_URL = os.getenv("AUTH_VALIDATE_URL")


def verify_token_with_auth_service(token: str):
    """
    Envia o token para o serviço de autenticação do professor
    e retorna True/False ou dados básicos.
    """

    if not AUTH_VALIDATE_URL:
        raise RuntimeError("AUTH_VALIDATE_URL não configurada no .env")

    headers = {"Authorization": token}  # token puro, sem 'Bearer'

    try:
        response = requests.get(AUTH_VALIDATE_URL, headers=headers)

        if response.status_code == 204:
            # Token válido (o serviço retorna só 204 No Content)
            return {"valid": True, "token": token}

        elif response.status_code == 401:
            # Token inválido ou expirado
            return None

        else:
            # Qualquer outro erro inesperado
            raise RuntimeError(
                f"Erro inesperado na validação: {response.status_code} - {response.text}"
            )

    except requests.RequestException as e:
        raise RuntimeError(f"Erro de conexão com serviço de autenticação: {e}")
