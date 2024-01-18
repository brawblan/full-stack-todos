export interface AuthData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
  expires_in: string;
  provider_token?: string;
  provider_refresh_token?: string;
}
