import {createFileRoute, Link} from '@tanstack/react-router';
import {LandingLayout} from '@/components/layouts';
import {ArrowLeftIcon} from '@phosphor-icons/react';

export const Route = createFileRoute('/legal/terms')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <LandingLayout>
            {/* Header */}
            <header className="section-padding">
                <div className="container-responsive flex flex-col items-center gap-md">
                    <Link
                        to="/"
                        className="flex items-center gap-sm text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeftIcon className="h-4 w-4"/>
                        Back to Home
                    </Link>

                    {/* Page Title */}
                    <h1 className="text-3xl font-bold">Terms of Service</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="section-padding container-max-w-4xl flex-1">
                <article className="flex flex-col gap-lg">
                    {/* Last Updated */}
                    <div className="text-sm text-muted-foreground">Last updated: June 25, 2025</div>

                    {/* Introduction */}
                    <section className="flex flex-col gap-sm">
                        <p>
                            Welcome to Sensr, operated by Kollektiv LLC ("Company", "we", "us", or
                            "our"). These
                            Terms of Service ("Terms") govern your use of our automated price
                            tracking service. By
                            accessing or using Sensr, you agree to be bound by these Terms.
                        </p>
                    </section>

                    {/* Section 1: Service Description */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">1. Service Description</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">What We Provide</h3>
                            <p>
                                Sensr provides automated price tracking services for products across
                                various online
                                retailers. Our service monitors price changes and sends
                                notifications when specified
                                conditions are met. The service is currently in beta and offered
                                free of charge.
                            </p>

                            <h3 className="text-xl font-medium">Beta Status</h3>
                            <p>
                                Our service is currently in beta testing. Features may change, be
                                discontinued, or
                                experience interruptions without notice. We make no guarantees about
                                service
                                availability, reliability, or data accuracy during this beta period.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Important Disclaimers */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">2. Important Disclaimers</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">No Responsibility for Price
                                Accuracy</h3>
                            <p>
                                <strong>
                                    WE ARE NOT RESPONSIBLE FOR THE ACCURACY OF PRICE INFORMATION OR
                                    MEASUREMENTS.
                                </strong>{' '}
                                Price data is scraped from third-party websites and may be outdated,
                                incorrect, or
                                incomplete. You should always verify prices directly with retailers
                                before making
                                purchase decisions.
                            </p>

                            <h3 className="text-xl font-medium">No Financial Advice</h3>
                            <p>
                                Our service provides information only and does not constitute
                                financial, investment,
                                or purchasing advice. All purchase decisions are your sole
                                responsibility.
                            </p>

                            <h3 className="text-xl font-medium">Third-Party Content</h3>
                            <p>
                                We scrape data from third-party websites. We have no control over
                                and are not
                                responsible for the accuracy, availability, or content of these
                                external sites.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Acceptable Use */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">3. Acceptable Use</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">Prohibited Activities</h3>
                            <p>You agree NOT to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Use the service for any illegal or unauthorized purpose</li>
                                <li>Attempt to circumvent any limitations or restrictions on your
                                    account
                                </li>
                                <li>Interfere with or disrupt the service or servers</li>
                                <li>Use automated means to access the service beyond normal usage
                                </li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Harass, threaten, or harm others</li>
                                <li>Impersonate any person or entity</li>
                            </ul>

                            <h3 className="text-xl font-medium">Responsible Use</h3>
                            <p>
                                You agree to use our service responsibly and in compliance with all
                                applicable laws
                                and regulations.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: User Responsibilities */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">4. Your Responsibilities</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">Account Security</h3>
                            <p>
                                You are solely responsible for maintaining the confidentiality of
                                your account
                                credentials and for all activities under your account.
                            </p>

                            <h3 className="text-xl font-medium">Accurate Information</h3>
                            <p>
                                You agree to provide accurate and complete information when creating
                                your account
                                and to keep this information updated.
                            </p>

                            <h3 className="text-xl font-medium">Compliance</h3>
                            <p>
                                You are responsible for ensuring your use of the service complies
                                with all
                                applicable laws and regulations in your jurisdiction.
                            </p>
                        </div>
                    </section>

                    {/* Section 5: Payment Terms */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">5. Payment Terms</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">Current Free Beta</h3>
                            <p>
                                During the beta period, our service is provided free of charge. This
                                may change when
                                we exit beta.
                            </p>

                            <h3 className="text-xl font-medium">Future Paid Plans</h3>
                            <p>
                                We reserve the right to introduce paid subscription plans in the
                                future. Payment
                                processing will be handled through Stripe. We will provide advance
                                notice before
                                implementing any charges.
                            </p>
                        </div>
                    </section>

                    {/* Section 6: Limitation of Liability */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
                        <div className="flex flex-col gap-sm">
                            <h3 className="text-xl font-medium">No Warranties</h3>
                            <p>
                                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
                                EXPRESS OR IMPLIED,
                                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
                                FOR A PARTICULAR
                                PURPOSE, OR NON-INFRINGEMENT.
                            </p>

                            <h3 className="text-xl font-medium">Limitation of Damages</h3>
                            <p>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
                                ANY INDIRECT,
                                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                                BUT NOT LIMITED
                                TO LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES,
                                REGARDLESS OF THE THEORY
                                OF LIABILITY.
                            </p>

                            <h3 className="text-xl font-medium">Maximum Liability</h3>
                            <p>
                                Our total liability to you for any claims related to the service
                                shall not exceed
                                the amount you paid us in the twelve months preceding the claim
                                (currently $0 during
                                beta).
                            </p>
                        </div>
                    </section>

                    {/* Section 7: Termination */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">7. Termination</h2>
                        <div className="flex flex-col gap-sm">
                            <p>
                                We may suspend or terminate your access to the service at any time,
                                with or without
                                notice, for violation of these Terms or applicable laws. You may
                                delete your account
                                at any time through your account settings.
                            </p>

                            <p>
                                Upon termination, your right to use the service will cease
                                immediately, and we may
                                delete your account data.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Privacy */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">8. Privacy</h2>
                        <div className="flex flex-col gap-sm">
                            <p>
                                Your privacy is important to us. Please review our{' '}
                                <Link to="/legal/privacy" className="text-accent hover:underline">
                                    Privacy Policy
                                </Link>{' '}
                                to understand how we collect, use, and protect your information.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Changes to Terms */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">9. Changes to These Terms</h2>
                        <div className="flex flex-col gap-sm">
                            <p>
                                We may update these Terms from time to time. Material changes will
                                be posted on this
                                page with an updated "Last updated" date. Your continued use of the
                                service after
                                changes constitutes acceptance of the new Terms.
                            </p>
                        </div>
                    </section>

                    {/* Section 10: Governing Law */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">10. Governing Law</h2>
                        <div className="flex flex-col gap-sm">
                            <p>
                                These Terms are governed by the laws of the State of Wyoming, United
                                States, without
                                regard to conflict of law principles. Any disputes shall be resolved
                                in the courts
                                of Wyoming.
                            </p>
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="flex flex-col gap-md">
                        <h2 className="text-2xl font-semibold">11. Contact Information</h2>
                        <div className="flex flex-col gap-sm">
                            <p>If you have any questions about these Terms, please contact us
                                at:</p>
                            <p>
                                <strong>Email:</strong> hello@sensr.dev
                                <br/>
                                <strong>Company:</strong> Kollektiv LLC
                                <br/>
                                <strong>Address:</strong> 701 Tillery Street Unit 12, 2874, Austin,
                                TX 78702
                            </p>
                        </div>
                    </section>
                </article>
            </main>
        </LandingLayout>
    );
}