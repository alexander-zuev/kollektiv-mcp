from typing import Annotated
from uuid import UUID

from fastapi import Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from kollektiv.api.schemas.base import APIException, ErrorDetails
from kollektiv.infrastructure.auth.auth_service import AuthService
from kollektiv.infrastructure.clients.cloudflare_client import CloudflareClient
from kollektiv.infrastructure.clients.r2_client import R2Client
from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.clients.vectara_client import VectaraClient
from kollektiv.infrastructure.container import ServicesContainer
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.repository.docs_repo import DocumentsRepo
from kollektiv.infrastructure.settings import Settings
from kollektiv.services.document import DocumentService
from kollektiv.services.llm_agent import LLMAgent
from kollektiv.services.retrieval import RetrievalService
from kollektiv.shared.exceptions import AuthenticationError

logger = get_logger(__name__)

security = HTTPBearer(auto_error=False)


def get_services_container() -> ServicesContainer:
    """Returns the application container instance."""
    return ServicesContainer.get_instance()


def get_supabase_client(
    services_container: ServicesContainer = Depends(get_services_container),
) -> SupabaseClient:
    if services_container.supabase_client is None:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="Database client not initialized",
                details={"service": "supabase_client"},
            ),
        )
    return services_container.supabase_client


def get_auth_service(supabase_client: SupabaseClient = Depends(get_supabase_client)) -> AuthService:
    return AuthService(supabase_client=supabase_client)


async def get_user_id_from_jwt(
    token: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    auth_service: AuthService = Depends(get_auth_service),
) -> UUID:
    """
    Retrieve the user ID from a provided JWT.

    This function extracts the user ID from a JSON Web Token (JWT) that is securely
    passed as part of the authorization credentials. If the JWT is invalid or not
    provided, it raises an exception. The function utilizes an authentication
    service to resolve the user from the token, ensuring proper validation and
    authorization mechanisms are in place.

    Parameters:
    token: Annotated[HTTPAuthorizationCredentials, Depends(security)]
        The HTTP authorization credentials containing the JWT.
    auth_service: AuthService
        The instance of the authentication service used to resolve the user.

    Raises:
    APIException
        If the JWT is not provided or invalid.

    Returns:
    UUID
        The resolved user ID from the provided JWT.
    """
    if not token or not token.credentials:
        raise APIException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ErrorDetails(
                message="No JWT provided",
                details={"service": "get_user_from_jwt"},
            ),
        )
    jwt = token.credentials

    try:
        user = await auth_service.resolve_user(jwt)
        return UUID(user.user.id)
    except AuthenticationError as e:
        # No logging since it's done at the auth service level
        raise APIException(
            status_code=e.status_code,
            detail=ErrorDetails(
                message="Authentication error occurred",
                details={"service": "get_user_from_jwt", "code": e.error_code},
            ),
        ) from e


def get_vectara_client(services_container: ServicesContainer = Depends(get_services_container)) -> VectaraClient:
    """Returns an instance of vectara client"""
    if services_container.vectara_client is None:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="Database client not initialized",
                details={"service": "supabase_repository"},
            ),
        )
    return services_container.vectara_client


def get_settings_dep(services_container: ServicesContainer = Depends(get_services_container)) -> Settings:
    """Returns the application settings"""
    return services_container.settings


def get_llm_agent(services_container: ServicesContainer = Depends(get_services_container)) -> LLMAgent:
    if services_container.llm_agent is None:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="LLM agent not initialized",
                details={"service": "llm_agent"},
            ),
        )
    return services_container.llm_agent


def get_retrieval_service(
    vectara_client: VectaraClient = Depends(get_vectara_client),
    settings: Settings = Depends(get_settings_dep),
    llm_agent: LLMAgent = Depends(get_llm_agent),
) -> RetrievalService:
    """Returns an instance of query service which is request-scoped."""
    return RetrievalService(retrieval_client=vectara_client, settings=settings, llm_agent=llm_agent)


def get_documents_repo(
    supabase_client: SupabaseClient = Depends(get_supabase_client),
) -> DocumentsRepo:
    return DocumentsRepo(supabase_client=supabase_client)


def get_cloudflared_client(
    services_container: ServicesContainer = Depends(get_services_container),
) -> CloudflareClient:
    """Returns an instance of cloudflare client"""
    if services_container.cf_client is None:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="Cloudflare not initialized",
                details={"service": "cloudflared_client"},
            ),
        )
    return services_container.cf_client


def get_r2_client(
    services_container: ServicesContainer = Depends(get_services_container),
) -> R2Client:
    """Returns an instance of R2 client"""
    if services_container.r2_client is None:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="R2 client not initialized",
                details={"service": "r2_client"},
            ),
        )
    return services_container.r2_client


def get_document_service(
    settings: Settings = Depends(get_settings_dep),
    vector_storage_client: VectaraClient = Depends(get_vectara_client),
    postgres_client: SupabaseClient = Depends(get_supabase_client),
    documents_repo: DocumentsRepo = Depends(get_documents_repo),
    r2_client: R2Client = Depends(get_r2_client),
) -> DocumentService:
    """Returns an instance of document service which is request-scoped."""
    return DocumentService(
        settings=settings,
        vectara_client=vector_storage_client,
        supabase_client=postgres_client,
        documents_repo=documents_repo,
        r2_client=r2_client,
    )


GetCurrentUserFromHeader = Annotated[UUID, Depends(get_user_id_from_jwt)]
ContainerDep = Annotated[ServicesContainer, Depends(get_services_container)]
SupabaseClientDep = Annotated[SupabaseClient, Depends(get_supabase_client)]
VectaraClientDep = Annotated[VectaraClient, Depends(get_vectara_client)]
RetrievalServiceDep = Annotated[RetrievalService, Depends(get_retrieval_service)]
DocumentServiceDep = Annotated[DocumentService, Depends(get_document_service)]
DocumentsRepoDep = Annotated[DocumentsRepo, Depends(get_documents_repo)]
SettingsDep = Annotated[Settings, Depends(get_settings_dep)]
