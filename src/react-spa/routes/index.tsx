import {createFileRoute} from '@tanstack/react-router';
import AppDashboard from "@/pages/DashboardPage";

//
// const searchSchema = z.object({
//   redirect: z.string().optional(),
// });

// function Home() {
//     const {search} = useLocation();
//     const navigate = useNavigate();
//     const [loginModalOpen, setLoginModalOpen] = useState(false);
//
//     useEffect(() => {
//         if (search.redirect) {
//             setLoginModalOpen(true);
//             navigate({
//                 to: '/',
//                 search: {}, // Clear search params
//                 replace: true, // Don't add to browser history
//             });
//         }
//     }, [search.redirect, navigate]);
//
//     return (
//         <LandingLayout>
//             {/* Header */}
//             <Header/>
//             {/* Main Content */}
//             <main className="flex flex-1 flex-col">
//                 {/* Hero Section */}
//                 <section
//                     id="hero"
//                     className="section-padding flex flex-col items-center gap-xl text-center"
//                 >
//                     {/* Hero Badge */}
//                     <div
//                         className="inline-flex animate-in items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent duration-700 fade-in slide-in-from-bottom-4">
//                         <HandCoinsIcon className="h-4 w-4"/>
//                         Save money with automated price tracking
//                     </div>
//
//                     {/* Hero Content */}
//                     <div
//                         className="max-w-3xl animate-in flex flex-col gap-lg delay-100 duration-700 fade-in slide-in-from-bottom-4">
//                         <h1 className="text-balance">
//                             Personal price tracker for the{' '}
//                             <span className="font-bold text-accent">entire internet</span>
//                         </h1>
//                         <p className="text-xl leading-relaxed text-muted-foreground">
//                             Automated price tracking for any product on (almost) any site. Get
//                             instant
//                             notifications when prices drop.
//                         </p>
//                     </div>
//
//                     {/* CTA Button */}
//                     <div className="flex flex-col w-full justify-center items-center gap-sm pt-4">
//                         <Button size="xl" className="gap-2 max-w-md w-full text-xl font-semibold"
//                                 asChild>
//                             <Link to={'/dashboard'} className={'hover:no-underline'}>
//                                 {' '}
//                                 Start saving
//                             </Link>
//                         </Button>
//                         <small className={'text-muted-foreground'}>Try it out for free</small>
//                     </div>
//
//                     {/*Key features*/}
//                     <div className="max-w-2xl bg-surface rounded-2xl border p-8 backdrop-blur-sm">
//                         <div className="flex flex-col md:flex-row gap-lg md:justify-between">
//                             <div className="flex flex-col items-center text-center gap-sm">
//                                 <span className="text-2xl">🏪</span>
//                                 <p className="text-sm font-bold">1000+ stores supported</p>
//                             </div>
//
//                             <div className="flex flex-col items-center text-center gap-sm">
//                                 <span className="text-2xl">🔔</span>
//                                 <p className="text-sm font-bold">Instant alerts</p>
//                             </div>
//
//                             <div className="flex flex-col items-center text-center gap-sm">
//                                 <span className="text-2xl">⚡</span>
//                                 <p className="text-sm font-bold">1 minute setup</p>
//                             </div>
//
//                             <div className="flex flex-col items-center text-center gap-sm">
//                                 <span className="text-2xl">📅</span>
//                                 <p className="text-sm font-bold">Daily monitoring</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/*Powered by*/}
//                     <div className={'flex w-full justify-center'}>
//                         <div className={'flex items-center gap-sm'}>
//                             <span className="text-4xl">🔥</span>
//                             <div className={'flex flex-col'}>
//                                 <p className={'font-semibold'}>Powered by Firecrawl</p>
//                                 <p className={'text-muted-foreground'}>#1 AI web crawler</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//
//                 {/* Features Section */}
//                 <section id="demo" className="section-padding flex flex-col gap-12">
//                     <div className="flex flex-col gap-md text-center">
//                         <h2 className="flex items-center justify-center gap-2">
//                             {/*<BrainIcon className="h-6 w-6 text-accent" />*/}
//                             Smart Savings
//                         </h2>
//                         <p className="mx-auto max-w-2xl text-muted-foreground">
//                             Everything you need to never overpay again
//                         </p>
//                     </div>
//
//                     {/* Feature Grid */}
//                     <div className="grid gap-xl md:grid-cols-3 cursor-pointer">
//                         <div
//                             className="group bg-surface hover:bg-surface-hover flex flex-col gap-md rounded-xl border card-padding">
//                             <div
//                                 className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
//                                 <BellIcon className="h-6 w-6"/>
//                             </div>
//                             <div className="flex flex-col gap-sm">
//                                 <h3 className="font-semibold">Instant Notifications</h3>
//                                 <p className="text-sm leading-relaxed text-muted-foreground">
//                                     Get notified the moment prices drop on your tracked products.
//                                 </p>
//                             </div>
//                         </div>
//
//                         <div
//                             className="group bg-surface/50 hover:bg-surface-hover flex flex-col gap-md rounded-xl border card-padding">
//                             <div
//                                 className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
//                                 <StorefrontIcon className="h-6 w-6"/>
//                             </div>
//                             <div className="flex flex-col gap-sm">
//                                 <h3 className="font-semibold">Universal Tracking</h3>
//                                 <p className="text-sm leading-relaxed text-muted-foreground">
//                                     Track prices across thousands of websites and retailers.
//                                 </p>
//                             </div>
//                         </div>
//
//                         <div
//                             className="group bg-surface/50 hover:bg-surface-hover flex flex-col gap-md rounded-xl border card-padding">
//                             <div
//                                 className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
//                                 <CodeIcon className="h-6 w-6"/>
//                             </div>
//                             <div className="flex flex-col gap-sm">
//                                 <h3 className="font-semibold">No code, no problem</h3>
//                                 <p className="text-sm leading-relaxed text-muted-foreground">
//                                     Setup in 1 minute, no coding required
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//
//                 {/* Pricing Section */}
//                 <section id="pricing" className="section-padding flex flex-col gap-12">
//                     <div
//                         className="animate-in flex flex-col gap-md text-center duration-700 fade-in slide-in-from-bottom-4">
//                         <h2 className="flex items-center justify-center gap-2">
//                             {/*<CreditCardIcon className="h-6 w-6 text-accent" />*/}
//                             Pricing
//                         </h2>
//                         <p className="text-muted-foreground">Simple, transparent pricing</p>
//                     </div>
//
//                     {/* Pricing Cards */}
//                     <div className="mx-auto max-w-4xl">
//                         <div className="grid gap-lg md:grid-cols-2">
//                             {/* Free Plan Card */}
//                             <div>
//                                 <div
//                                     className="bg-surface relative overflow-hidden rounded-2xl border text-center h-full">
//                                     <div className="flex flex-col gap-xl p-8 h-full">
//                                         {/* Pricing Header */}
//                                         <div className="flex flex-col gap-sm">
//                                             <h3>$0/month</h3>
//                                             <p className="text-muted-foreground">Free Plan</p>
//                                         </div>
//
//                                         {/* Features List */}
//                                         <div className="flex flex-col gap-md flex-1">
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🎯</span>
//                                                 <p>Track up to 3 products</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🏪</span>
//                                                 <p>Basic store coverage</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">⏰</span>
//                                                 <p>Daily price checks</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🔔</span>
//                                                 <p>Instant email notifications</p>
//                                             </div>
//                                         </div>
//
//                                         {/* CTA Button */}
//                                         <Button asChild size="lg"
//                                                 className="w-full gap-2 text-lg font-semibold">
//                                             <Link to={'/dashboard'}
//                                                   className={'hover:no-underline'}>
//                                                 Get started for free
//                                             </Link>
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Pro Plan Card */}
//                             <div className="scale-y-105">
//                                 <div
//                                     className="relative overflow-hidden rounded-2xl border text-center h-full bg-[var(--green-2)] border-[var(--green-6)] shadow-[0_10px_15px_-3px_var(--green-4)]">
//                                     <div className="flex flex-col gap-xl p-8 h-full">
//                                         {/* Pricing Header */}
//                                         <div
//                                             className="flex flex-col gap-sm justify-center items-center">
//                                             <Badge variant={'success'}>Coming soon</Badge>
//                                             <h3>$25/month</h3>
//                                             <p className="text-muted-foreground">Pro Plan</p>
//                                         </div>
//
//                                         {/* Features List */}
//                                         <div className="flex flex-col gap-md flex-1">
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🚀</span>
//                                                 <p>Track up to 25 products</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🏪</span>
//                                                 <p>Much wider store coverage</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">⏰</span>
//                                                 <p>More frequent price checks</p>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <span className="text-xl">🔔</span>
//                                                 <p>Email, SMS, Discord, Telegram</p>
//                                             </div>
//                                         </div>
//
//                                         {/* Waitlist Form */}
//                                         <WaitlistForm/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//
//             {/* Footer */}
//             <Footer/>
//             <SignInModal open={loginModalOpen} onOpenChange={setLoginModalOpen}/>
//         </LandingLayout>
//     );
// }

export const Route = createFileRoute('/')({
    // validateSearch: zodValidator(searchSchema),
    // component: Home,
    component: AppDashboard,
});