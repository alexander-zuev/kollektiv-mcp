export const oauthSuccessPage = (data: { teamName: string }) => `
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="bg-surface border border-border rounded-lg shadow-md p-8">
        <div class="mb-6 text-center">
          <div class="text-6xl mb-4">✅</div>
          <h2 class="text-2xl font-bold text-foreground mb-2">Installation Successful!</h2>
          <p class="text-muted-foreground">Claude Code Portable has been installed to <span class="font-semibold text-foreground">${data.teamName}</span> workspace</p>
        </div>
        
        <div class="bg-muted border border-border rounded-lg p-6 mb-6">
          <h3 class="text-lg font-medium text-foreground mb-4 text-center">What's next?</h3>
          <div class="space-y-2 text-sm text-muted-foreground text-left">
            <p>1. Claude Code Portable bot in your Apps</p>
            <p>2. Send a direct message or click "New Chat"</p>
            <p>3. Code with Claude Code on the go!</p>
          </div>
        </div>
        
        <div class="text-center">
          <a href="slack://open" class="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-medium rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
            Open Slack
          </a>
        </div>
      </div>
    </div>
  </div>
`;

export const oauthErrorPage = (message: string) => `
  <div class="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div class="bg-surface border border-border rounded-lg shadow-md p-8">
        <div class="mb-6">
          <div class="text-6xl mb-4">❌</div>
          <h2 class="text-2xl font-bold text-foreground mb-2">Installation Failed</h2>
          <div class="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <p class="text-destructive">${message}</p>
          </div>
          <p class="text-muted-foreground">Please try installing again or contact support if the issue persists.</p>
        </div>
        
        <a href="/slack/install" class="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-medium rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors">
          Try Again
        </a>
      </div>
    </div>
  </div>
`;