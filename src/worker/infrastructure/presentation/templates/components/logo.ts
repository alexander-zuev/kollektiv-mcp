export const logo = (align: 'center' | 'left' = 'center') => `
  <div class="flex ${align === 'center' ? 'justify-center' : ''} items-center gap-3">
    <div class="p-1 bg-muted border border-border rounded-md flex items-center justify-center">
      <i class="ph ph-terminal-window text-2xl text-foreground"></i>
    </div>
    <span class="font-mono font-bold text-foreground">Claude Code Portable</span>
  </div>
`;