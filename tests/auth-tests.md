# Auth tests

Structured by endpoints since it's easier

GET /authorize

- success path: if we have a user + auth req
- unhappy path: if we don't have auth req
- error path: ?

POST /authorize

- happy path: if we have cookies -> redirect to 302
- unhappy path: redirect to 400
- error path:  -> catch validation error

  GET /auth/callback
- happy path: successfully parse the code
- unhappy path: redirect on error
- unhappy path: redirect to 500
  POST /confirm
- ?
  POST /login
- ?

Utils:

1. Cookies
2. authContext
    - happy path: given both oauth req + client info
    - unhappy path: throw AuthFlowError
3. Form
    - Form parsing
4. User
    - Happy path: user is returned
    - Unhappy path: user is null
    - Erro path: throw error

# Authentication Flow Test Proposal

Based on my review of your authentication flow and test pyramid, here are the most useful unit and
integration tests I recommend implementing first to ensure your auth flow is working correctly.

## Auth Flow Overview

Your authentication system uses Supabase and supports three login methods:

1. GitHub OAuth
2. Google OAuth
3. Magic Link (email OTP)

The flow consists of three main components:

- **Login**: User selects a login method and is redirected to the provider or sent a magic link
- **Callback**: After successful authentication, the code is exchanged for a session
- **Authorize**: User is presented with a consent screen to authorize the application

## Recommended Tests

### Unit Tests (5)

1. **Login Handler Form Parsing Test**
   ```typescript
   it('should correctly parse form data and identify login method', async () => {
     // Mock the context with different form data scenarios
     // Verify correct provider identification
   });
   ```

2. **OAuth URL Generation Test**
   ```typescript
   it('should generate correct OAuth URLs with proper redirect', async () => {
     // Mock Supabase client
     // Verify redirect URL contains correct callback path
   });
   ```

3. **Magic Link Generation Test**
   ```typescript
   it('should correctly handle magic link requests', async () => {
     // Mock Supabase OTP functionality
     // Verify email is correctly passed and confirmation screen is shown
   });
   ```

4. **Auth Callback Code Exchange Test**
   ```typescript
   it('should exchange code for session correctly', async () => {
     // Mock Supabase exchangeCodeForSession
     // Verify proper error handling and successful redirect
   });
   ```

5. **Authorize Handler Authentication Check Test**
   ```typescript
   it('should correctly identify authenticated vs unauthenticated users', async () => {
     // Mock getCurrentUser with different scenarios
     // Verify login screen shown for unauthenticated users
     // Verify consent screen shown for authenticated users
   });
   ```

### Integration Tests (3)

1. **Complete Login Flow Test**
   ```typescript
   it('should handle the complete login flow with OAuth provider', async () => {
     // Mock Supabase client but test real interactions between handlers
     // Simulate OAuth flow from login to callback to authorize
     // Verify correct redirects and session handling
   });
   ```

2. **Auth Context Persistence Test**
   ```typescript
   it('should maintain auth context throughout the flow', async () => {
     // Test cookie handling and state management
     // Verify OAuth request parameters are preserved
   });
   ```

3. **Consent Form Submission Test**
   ```typescript
   it('should correctly process consent decisions', async () => {
     // Test both approval and denial paths
     // Verify correct redirects with appropriate parameters
   });
   ```

## Cloudflare Workers Testing Considerations

Cloudflare Workers have specific considerations for testing:

1. **Environment Simulation**: You'll need to mock the Cloudflare environment variables and
   bindings.
2. **Request/Response Handling**: Workers have a specific request/response model that needs proper
   mocking.
3. **Cookies and Headers**: Special attention to cookie handling which is crucial for auth flows.

For Workers specifically, use the `@cloudflare/vitest-pool-workers` package which provides the
`SELF` import from `cloudflare:test` to interact with your worker in tests.

## Test Coverage Requirements

Cloudflare Workers don't have specific test coverage requirements imposed by the platform. However,
for auth flows, I recommend:

1. Prioritize testing the critical paths (login, callback, authorization)
2. Focus on edge cases in auth flows (expired tokens, invalid states, etc.)
3. Mock external dependencies (Supabase) but test the integration between your components

The test coverage should be pragmatic - focus on the most critical aspects of the auth flow rather
than trying to achieve 100% coverage. For auth flows specifically, aim for high coverage of the
authentication logic, error handling, and session management.

## Implementation Strategy

1. Start with unit tests for individual handlers
2. Add integration tests for the complete flow
3. Consider adding a few E2E tests for critical paths if needed

This approach will give you confidence in your auth flow while maintaining a balanced test pyramid.