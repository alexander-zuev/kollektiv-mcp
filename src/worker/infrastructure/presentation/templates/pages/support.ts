import { logo } from '../components/logo';

export const supportPage = () => `
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-border">
      <div class="container mx-auto px-6 py-4">
        <a href="/">
          ${logo('left')}
        </a>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 container mx-auto px-6 py-12 max-w-3xl">
      <h2>Support</h2>
      
      <div class="mt-8 p-8 bg-muted rounded-lg text-center">
        <div class="mb-4">
          <i class="ph-hammer ph-3x text-muted-foreground"></i>
        </div>
        <h3 class="mb-4">🚧 Under Construction</h3>
        <p class="text-muted-foreground">
          You'll be able to submit support requests when we launch.
        </p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border mt-12">
      <div class="container mx-auto px-6 py-8 text-center">
        <div class="flex justify-center gap-6">
          <a href="/" class="hover:text-foreground transition-colors">Home</a>
          <a href="/privacy" class="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
`;