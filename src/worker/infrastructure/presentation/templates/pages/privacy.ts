import { logo } from '../components/logo';

export const privacyPage = () => `
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
      <h2>Privacy Policy</h2>
      
      <p class="text-muted-foreground mb-8">
        Last updated: ${new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <section class="space-y-6">
        <div>
          <h3>Company Information</h3>
          <p>
            This service is operated by Kollektiv LLC, located at:<br/>
            701 Tillery Street Unit 12-2874<br/>
            Austin, TX 78702
          </p>
        </div>

        <div>
          <h3>Data Collection</h3>
          <p>We collect minimal data to provide our service:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Email addresses - solely for launch notifications and service updates</li>
            <li>Repository access tokens - securely stored and used only to provide the service</li>
            <li>API keys - encrypted and used exclusively for your Claude Code sessions</li>
          </ul>
        </div>

        <div>
          <h3>Data Usage</h3>
          <p>Your data is used strictly for:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Providing Claude Code Portable services</li>
            <li>Sending launch announcements and essential service updates</li>
            <li>Technical support when requested</li>
          </ul>
        </div>

        <div>
          <h3>Data Security</h3>
          <p>We implement industry-standard security measures:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>All tokens and API keys are encrypted at rest</li>
            <li>Secure HTTPS connections for all data transfers</li>
            <li>Access restricted to essential personnel only</li>
            <li>Regular security audits and updates</li>
          </ul>
        </div>

        <div>
          <h3>Data Sharing</h3>
          <p>
            We do not sell, trade, or share your personal information with third parties, except as required by law or with your explicit consent.
          </p>
        </div>

        <div>
          <h3>Data Retention</h3>
          <p>
            Repository tokens and API keys are retained only while your service is active. You may request deletion at any time by contacting support.
          </p>
        </div>

        <div>
          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of non-essential communications</li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            For privacy concerns or data requests, please visit our <a href="/support" class="text-accent hover:underline">support page</a>.
          </p>
        </div>
      </section>
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