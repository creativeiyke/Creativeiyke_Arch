

import { Project, Step, Sector, BlogPost } from './types';

// Extend the Sector type locally for the constants to include theme colors
export interface ExtendedSector extends Sector {
  gradient: string;
}

const POST_CONTENT_1 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">EXECUTIVE BRIEF //</span> In the cacophony of the modern web, silence is a luxury. At CreativeIyke, we have observed a distinct shift in high-net-worth user behaviour: a migration away from cluttered, attention-seeking interfaces towards 'Obsidian' environments—digital spaces characterised by deep contrast, minimal noise, and intentional information architecture.</p>
  
  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Neuro-Aesthetics of Dark Mode</h3>
  <p class="mb-6">It is not merely a stylistic preference; it is biological. Ocular strain from high-luminance screens (white backgrounds) triggers cortisol release during prolonged exposure. For fintech dashboards and data-heavy SaaS platforms, where users spend upwards of six hours a day, this fatigue translates directly to churn. When we force the retina to process millions of photons of white light, we are effectively taxing the user's cognitive energy reserve. By inverting this relationship, we preserve their focus for the task at hand.</p>
  
  <p class="mb-6">Our design philosophy at CreativeIyke leverages "Cognitive Ease". By utilising true-black hex codes (#000000 to #050505) on OLED displays, we effectively turn off pixels, reducing the photonic energy hitting the retina. This creates a calming physiological response, allowing the user to focus purely on the logic and data presented. This "Pixel-Off" state also contributes to significant battery preservation on mobile devices, aligning user comfort with hardware efficiency.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Signal-to-Noise Ratio</h3>
  <p class="mb-6">We often tell our clients: "If everything is bold, nothing is." In our recent audit of a Tier-1 banking application, we reduced the colour palette by 60% and introduced neon signifiers solely for critical action states. The result? A 34% increase in transaction velocity. The modern interface suffers from a surplus of signifiers. Buttons, banners, badges, and pop-ups compete for a finite amount of user attention. By stripping this back to an "Obsidian" baseline, every splash of colour becomes a command.</p>

  <ul class="list-disc list-inside mb-8 text-white/70 space-y-2 ml-4">
    <li><strong>Visual Hierarchy:</strong> Using luminance rather than size to direct attention. A 10px glowing dot on a black background commands more attention than a huge grey button on a white background.</li>
    <li><strong>Negative Space:</strong> Treating emptiness as an active design element. In luxury aesthetics, space equates to status. We afford our data room to breathe.</li>
    <li><strong>Micro-Interactions:</strong> Subtle feedback loops that confirm intent without breaking immersion. The haptic feedback of a button press, the subtle glow of a hovered element.</li>
  </ul>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Luxury of Nothingness</h3>
  <p class="mb-6">In the physical world, minimalism is expensive. Empty space in a gallery, a clean desk in a corner office—these are symbols of control and power. We translate this status signal into the digital realm. A crowded interface implies a lack of priority; it suggests the business is desperate to show you everything at once. An "Obsidian" interface, conversely, suggests confidence. It presents only what is necessary, when it is necessary.</p>

  <p class="mb-6">We are seeing a trend where "Pro" tools are almost exclusively dark-themed. From Adobe's creative suite to Bloomberg Terminals, the tools of the trade are dark. Why? because professionals cannot afford the distraction of the frame. They need to see the work. CreativeIyke brings this "Pro" aesthetic to consumer-facing applications, elevating the perceived value of the product immediately upon load.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Biological Imperatives of the 24-Hour Cycle</h3>
  <p class="mb-6">Modern users operate in a 24-hour cycle. They check portfolios at 2 AM; they approve trades at 11 PM. High-luminance interfaces disrupt circadian rhythms by suppressing melatonin production via blue light spectrums. By default, our interfaces respect the user's biology. We employ "Midnight Logic" in our CSS—dynamic contrast adjustment that softens the harshness of pure white text against black backgrounds during evening hours, reducing the "halation" effect where text appears to vibrate.</p>

  <p class="mb-6">This level of detail—caring for the user's eyesight and sleep cycle—creates a subconscious bond of trust. The application feels "good" to use, even if the user cannot articulate the scientific reason why.</p>

  <p class="mb-6">The future of the web is not louder; it is deeper. It requires the confidence to strip away the superfluous. If you are ready to quiet the noise and amplify your signal, contact our strategy team at <span class="text-neon-blue">info@creativeiyke.com</span>.</p>
`;

const POST_CONTENT_2 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">ENGINEERING REPORT //</span> Speed is no longer a metric; it is the product. In 2024, the threshold for user patience dropped below 400 milliseconds. Beyond this point, the illusion of direct manipulation breaks, and the user remembers they are interacting with a machine. At CreativeIyke, we define this as the "Cognitive Threshold"—the moment where the tool becomes an obstacle.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Cost of the Loading Spinner</h3>
  <p class="mb-6">At CreativeIyke, we engineer for the "Millisecond Economy". Amazon famously discovered that every 100ms of latency cost them 1% in sales. In the Web3 and Fintech sectors we service, the stakes are higher. A delayed trade execution or a lagging portfolio visualisation doesn't just annoy the user—it erodes trust. A loading spinner is an admission of failure. It is the system telling the user, "I am thinking," when the user expects, "It is done."</p>
  
  <p class="mb-6">We have moved beyond traditional REST APIs. Our architecture now prioritises:</p>
  
  <ul class="list-disc list-inside mb-8 text-white/70 space-y-2 ml-4">
    <li><strong>Edge Computing:</strong> Pushing logic to the CDN level, processing requests physically closer to the user in London, New York, or Tokyo. We use Vercel Edge Functions and Cloudflare Workers to intercept requests before they ever hit a central server.</li>
    <li><strong>Optimistic UI:</strong> Updating the interface immediately while the server processes in the background. The perception of speed is as vital as the reality. When a user clicks "Buy," the UI should confirm "Bought" instantly, dealing with the handshake asynchronously.</li>
    <li><strong>WebAssembly (Rust):</strong> Offloading heavy computational tasks (cryptography, data parsing) from the main JavaScript thread to binary instruction formats. This allows web apps to run at near-native speeds.</li>
  </ul>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Psychology of Perceived Performance</h3>
  <p class="mb-6">Objective time and subjective time are different. A 500ms load time can feel instant if the layout is stable and skeleton screens are utilised correctly. Conversely, a 200ms load time can feel sluggish if the content jumps around (Cumulative Layout Shift). We engineer specifically for "Visual Stability". By pre-allocating DOM elements dimensions, we ensure the frame never shifts, creating a sense of solidity and reliability.</p>

  <p class="mb-6">We also utilise "Predictive Prefetching". Using simple AI models, we predict the user's next move. If their cursor hovers over the "Market" tab for more than 50ms, we begin fetching that data before they click. The result? Instant navigation. It feels like magic, but it is merely probability mathematics applied to network requests.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Case Study: Reducing TTI by 300%</h3>
  <p class="mb-6">For a recent algorithmic trading client, we rebuild their frontend stack. By discarding heavy frameworks in favour of a compiled, component-based architecture (Svelte/Rust), we reduced Time-To-Interactive (TTI) from 1.2s to 0.3s. The client reported a doubling of session duration within two weeks. Why? Because the tool stopped getting in the way of the thought process.</p>

  <p class="mb-6">We also implemented a "Stale-While-Revalidate" data strategy. The user always sees cached data instantly, which is then silently updated in the background. This eliminates the "blank screen" phase entirely. The user is never left staring at a void.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Infrastructure as Design</h3>
  <p class="mb-6">Designers often ignore infrastructure, and engineers often ignore aesthetics. At CreativeIyke, we view them as the same discipline. The server architecture dictates the user experience. You cannot design a seamless flow on a fragmented backend. This is why our "Solution-First" approach starts with the database schema, not the Figma file.</p>

  <p class="mb-6">Your infrastructure dictates your revenue ceiling. Do not let legacy code act as a drag coefficient on your growth. Reach out to <span class="text-neon-blue">info@creativeiyke.com</span> for a technical audit.</p>
`;

const POST_CONTENT_3 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">STRATEGIC VISION //</span> Artificial Intelligence is currently in its "Wild West" phase. Everyone has access to the models, but few know how to weave them into a coherent user experience. At CreativeIyke, we believe AI should be an invisible layer of utility, not a gimmick. The era of the "AI Wrapper"—thin interfaces slapped over ChatGPT—is over. The next phase is "Deep Integration".</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Beyond the Chatbot</h3>
  <p class="mb-6">The ubiquitous "Chat with us" bubble is a crude application of powerful technology. We are integrating Large Language Models (LLMs) directly into the business logic of applications. Imagine a CRM that doesn't just store customer data but actively predicts churn risk based on sentiment analysis of recent emails, or a logistics dashboard that verbally explains why a shipment is delayed.</p>
  
  <p class="mb-6">We call this "Contextual Intelligence". The AI understands the state of the application. It knows you are looking at Q3 Sales Data, so it doesn't offer to write a poem; it offers to calculate the variance from Q2. It offers relevant assistance without being prompted.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Generative UI (GenUI)</h3>
  <p class="mb-6">The static interface is dying. Why should a CEO and a Junior Developer see the same dashboard? Their needs are diametrically opposed. We are pioneering "Generative UI" systems where the layout itself adapts to the user's role and historical behaviour. The AI constructs the interface components in real-time.</p>

  <p class="mb-6">For the CEO, the AI renders high-level charts, summary tickers, and risk alerts. For the developer, it renders logs, commit histories, and API status flags. The data is the same; the presentation is synthetically curated. This is the ultimate form of personalisation—an interface that rewrites its own code to serve the user.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Ethics of Automation</h3>
  <p class="mb-6">With great power comes the responsibility of transparency. When we build AI-driven interfaces, we adhere to strict "Human-in-the-Loop" protocols. The user must always know when they are interacting with a synthetic agent, and they must always retain the final decision-making power. Trust is fragile. One hallucination can destroy a user's faith in the system.</p>

  <div class="p-6 border-l-2 border-neon-purple bg-white/5 my-8">
    <p class="font-mono text-sm text-neon-purple italic">"AI is the engine, but Design is the steering wheel. Without direction, power is useless."</p>
  </div>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Vector Databases & RAG</h3>
  <p class="mb-6">We utilise Retrieval-Augmented Generation (RAG) to ground our AI systems in truth. By connecting LLMs to your specific company data (stored in Vector Databases like Pinecone or Milvus), we ensure the AI isn't just making things up—it's citing your actual documents. This transforms the AI from a creative writer into an accurate analyst.</p>

  <p class="mb-6">We are currently deploying these systems for Legal Tech and Med Tech clients, where accuracy is paramount. The ability to query a million-page database in natural language and receive a cited answer in seconds is transforming these industries.</p>

  <p class="mb-6">We are currently deploying Generative UI systems that adapt the interface layout based on the user's historical behaviour. It is the ultimate form of personalisation. To discuss integrating these systems into your enterprise, email <span class="text-neon-blue">info@creativeiyke.com</span>.</p>
`;

const POST_CONTENT_4 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">INDUSTRY ANALYSIS //</span> The template economy is collapsing. For years, businesses relied on Squarespace, Wix, and generic WordPress themes to establish a digital presence. In 2024, these "cookie-cutter" sites have become a liability. They signal to the market that you are a commodity, not a competitor. When every SaaS startup uses the same "Linear-style" gradient landing page, the brand equity is diluted to zero.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Return to Bespoke</h3>
  <p class="mb-6">At CreativeIyke, we have seen a massive resurgence in demand for custom-coded solutions. Why? Because templates have a ceiling. You cannot optimise a generic block-builder for a complex specific user journey. You cannot achieve a 99/100 Google Lighthouse score with bloated plugin architectures. A template is designed to please everyone, which means it optimises for no one.</p>

  <p class="mb-6">Custom engineering allows for:</p>
  <ul class="list-disc list-inside mb-8 text-white/70 space-y-2 ml-4">
    <li><strong>Narrative Control:</strong> The scroll behaviour, the transitions, and the micro-interactions tell a specific story unique to your brand. We can control the physics of the page.</li>
    <li><strong>Security:</strong> Removing the attack vectors common in popular CMS plugins. A bespoke static site has almost zero surface area for SQL injection or malicious plugin exploits.</li>
    <li><strong>Scalability:</strong> Building a database structure that can handle 100 users today and 10 million tomorrow without refactoring.</li>
  </ul>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The SEO of Uniqueness</h3>
  <p class="mb-6">Search engines are becoming smarter. They can detect generic code structures. They reward unique, semantic HTML structures and high-performance metrics (Core Web Vitals). A bespoke site, hand-tuned for performance, signals quality to Google's crawlers. Furthermore, high-end aesthetics lead to longer "Dwell Time"—a key ranking factor. If users stay to play with your interactive WebGL background, Google assumes your content is valuable.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Craftsmanship as a Differentiator</h3>
  <p class="mb-6">In a world generated by AI, human craftsmanship is the ultimate luxury status symbol. A bespoke website shows your clients that you care about the details. It demonstrates resource capability and attention to quality. It is the digital equivalent of a tailored suit versus off-the-rack.</p>
  
  <p class="mb-6">We use tools like Three.js and React Fiber to create experiences that are literally impossible on builder platforms. Fluid simulations, 3D product configurators, physics-based interactions—these are the hallmarks of a market leader. They create "Brand Gravity", pulling users in through sheer visual intrigue.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Technical Debt of No-Code</h3>
  <p class="mb-6">No-Code tools are fantastic for MVPs (Minimum Viable Products). But they accrue "Technical Debt" rapidly. As soon as you need a feature the tool doesn't support, you are stuck hacking together workarounds. We often inherit projects where the client has hit the "No-Code Wall". Migrating them to a custom Next.js architecture usually solves their performance and logic issues overnight.</p>
  
  <p class="mb-6">If your brand has outgrown the template, it is time to build infrastructure that fits your ambition. Let us architect your future. Contact <span class="text-neon-blue">info@creativeiyke.com</span>.</p>
`;

const POST_CONTENT_5 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">WEB3 UX REPORT //</span> Blockchain technology suffers from a massive branding problem. It is perceived as cold, mathematical, and risky. The challenge for the next generation of DApps (Decentralised Applications) is to mask the complexity of the cryptography while exposing the benefits of the trustless ledger. The current standard of "Connect Wallet" followed by a raw hexadecimal hash is user-hostile.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Visualising the Invisible Chain</h3>
  <p class="mb-6">How do you visualise a "Smart Contract"? At CreativeIyke, we use abstract 3D visualisations and haptic feedback to make on-chain interactions feel tangible. When a transaction is confirmed, the interface shouldn't just display a green tick; it should "feel" substantial, utilising sound design and motion physics to convey the weight of the digital asset moving.</p>

  <p class="mb-6">We are heavily influenced by the concept of "Skeuomorphism 2.0"—not making digital objects look like leather or wood, but making them behave with the physics of real-world objects. Inertia, gravity, and collision. If a user swaps a token, the UI should reflect the exchange of mass.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Identity and Anonymity</h3>
  <p class="mb-6">Designing for Web3 requires respecting the user's desire for privacy. We champion "Zero-Knowledge" UI patterns, where the interface proves it knows the user's status without ever displaying or transmitting the raw private data. It is a delicate balance of convenience and security.</p>

  <p class="mb-6">We are exploring "Abstract Avatars"—generative identities based on wallet history. A user who holds mostly DeFi tokens might have a sharp, geometric avatar, while an NFT collector might have a fluid, organic one. This allows for social signalling without doxxing the real identity of the user.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Trustless Aesthetics</h3>
  <p class="mb-6">How do you design for "Trustlessness"? It's a paradox. You need the user to trust the interface enough to interact with the trustless protocol. We achieve this through "Radical Transparency". Our interfaces allow users to expand any transaction to see the raw code, the gas fees breakdown, and the contract audit status before they sign.</p>

  <p class="mb-6">We also implement "Human-Readable Transactions". Instead of asking the user to sign "0x7f...3a", we parse the contract data to say "You are swapping 500 USDC for 0.2 ETH". This simple translation layer prevents 90% of phishing attacks and user errors.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Wallet as Passport</h3>
  <p class="mb-6">The crypto wallet is becoming the universal login (SIWE - Sign In With Ethereum). We are designing systems where the website adapts based on the contents of the connected wallet. If the user holds a "VIP Pass" NFT, the site automatically unlocks premium sections and changes its colour scheme to gold. This is "Token-Gated Experience Design", and it is the future of membership sites.</p>

  <p class="mb-6">Whether you are building a DeFi protocol or an NFT marketplace, the interface is the bridge between the code and the community. Build a bridge they want to cross. <span class="text-neon-blue">info@creativeiyke.com</span>.</p>
`;

const POST_CONTENT_6 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">FUTURE TECH //</span> The era of the flat screen is drawing to a close. With the advent of the Apple Vision Pro and Meta's advanced optics, the web is about to gain a Z-axis. CreativeIyke is already preparing our clients' digital assets for this spatial shift. The desktop monitor and the smartphone screen are merely windows; spatial computing removes the frame entirely.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Responsive Design: The Next Dimension</h3>
  <p class="mb-6">Traditionally, "responsive" meant working on mobile and desktop. In 2025, responsive means adapting to 2D screens and 3D volumetric spaces. Your website needs to exist as a flat plane, but your products need to be ready to be pulled out of the screen and examined in the user's living room. We call this "Volumetric Responsiveness".</p>

  <p class="mb-6">We are currently implementing USDZ and glTF pipelines for our e-commerce clients. This means a user can seamlessly transition from browsing a catalogue to placing a photorealistic twin of the product on their desk. The asset must look as good in 3D as the photo did in 2D.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Spatial Typography</h3>
  <p class="mb-6">Text legibility in VR/AR presents unique challenges. We are experimenting with variable fonts that adjust their weight and contrast based on the user's distance and viewing angle in 3D space. It is a fundamental rethinking of typesetting rules that have existed since Gutenberg. In AR, text must contend with the real world behind it. We use adaptive blurring and dynamic contrast backplates to ensure readability against any background.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Gaze-Based Interaction</h3>
  <p class="mb-6">The mouse is a precision tool; the finger is a blunt instrument; the eye is a lightning-fast pointer. Designing for eye-tracking requires a different approach to "Hover" states. Elements must anticipate the gaze. We design buttons that "swell" slightly as the eye approaches them, confirming selection intent before the pinch-click occurs.</p>

  <p class="mb-6">This "Telepathic UI" feels magical, but it requires rigorous testing to avoid the "Midas Touch" problem, where the user accidentally activates everything they look at. We use "Dwell Time" and "Intent Confidence" algorithms to filter out casual glances from focused commands.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Infinite Canvas</h3>
  <p class="mb-6">In spatial computing, screen real estate is infinite. This frees us from the "Above the Fold" dogma. We can surround the user with data. Imagine a trading desk where the charts wrap around you in a 360-degree cylinder. Imagine an architecture portfolio where the user walks *through* the project rather than scrolling past it. This is the level of immersion we are building today.</p>

  <p class="mb-6">The transition will be jarring for those who are unprepared. We ensure your brand remains future-proof. Begin the spatial transition today: <span class="text-neon-blue">info@creativeiyke.com</span>.</p>
`;

const POST_CONTENT_7 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">FINTECH INSIGHT //</span> Trust is the currency of the future. In the volatile world of digital finance, users are increasingly skeptical. A sleek interface is no longer enough; the platform must exude reliability, transparency, and security at every pixel. We explore the psychological triggers that convert a skeptical visitor into a loyal depositor.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Psychology of Colour in Finance</h3>
  <p class="mb-6">Blue conveys stability; green conveys growth. But in the modern fintech landscape, these conventions are being challenged. We are seeing a rise in 'dark mode' financial apps that use neon accents to highlight critical data. This 'Obsidian' aesthetic is not just a trend; it's a strategic choice. Dark interfaces reduce eye strain during late-night trading sessions and create a sense of exclusivity and premium service.</p>

  <p class="mb-6">However, the use of red—traditionally a warning colour—must be handled with extreme care. In investment apps, a sea of red can induce panic selling. We advocate for neutralising loss indicators or using softer shades to prevent emotional decision-making. The goal is to keep the user rational, calm, and engaged, regardless of market conditions.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Micro-Interactions as Trust Signals</h3>
  <p class="mb-6">Trust is built in the details. When a user transfers money, the feedback loop must be instant and reassuring. A simple 'success' toast is insufficient. We design complex micro-interactions—a satisfying haptic click, a fluid animation of funds moving from A to B—to physically confirm the digital action. These subtle cues tell the user's subconscious that the system is robust and responsive.</p>

  <p class="mb-6">Loading states are another critical trust vector. A stagnant spinner implies uncertainty. We use 'skeleton screens' and progressive loading to show that the system is actively retrieving data. By visualizing the process, we reduce anxiety and maintain the user's confidence in the platform's integrity.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Radical Transparency</h3>
  <p class="mb-6">Hidden fees are the silent killers of fintech brands. We design interfaces that prioritize radical transparency. Every cost, every rate, and every condition is presented upfront in plain language. We use interactive tooltips and 'expand for details' patterns to provide depth without clutter. This approach not only complies with regulations but also disarms the user's defensive skepticism.</p>

  <p class="mb-6">In an era of deepfakes and scams, authenticity is paramount. We integrate biometric authentication flows that feel seamless rather than intrusive. FaceID and TouchID are not just security features; they are convenience features that reinforce the bond between the user and their financial data.</p>
`;

const POST_CONTENT_8 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">SAAS ENGINEERING //</span> Scaling a SaaS platform is a race against latency. As user bases grow, the database often becomes the primary bottleneck. We dissect the strategies for architecting a database layer that can handle millions of concurrent requests without compromising performance.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Read vs. Write Dilemma</h3>
  <p class="mb-6">Most SaaS applications are read-heavy. Users view dashboards, reports, and feeds far more often than they create new data. We utilise read replicas to distribute this load. By offloading read queries to secondary database instances, we ensure that the primary master node is free to handle critical write operations. This segregation is essential for maintaining snappy response times during peak usage.</p>

  <p class="mb-6">Caching is the first line of defense. We implement multi-layered caching strategies using Redis and Memcached. By storing frequently accessed data in memory, we bypass the database entirely for up to 90% of requests. This not only improves speed but also drastically reduces infrastructure costs.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Sharding: Breaking the Monolith</h3>
  <p class="mb-6">When a single database server can no longer hold the data, we turn to sharding. This involves horizontally partitioning the database across multiple servers. We shard based on tenant ID, ensuring that data for a specific customer always resides on the same physical node. This approach allows for infinite horizontal scaling but requires careful planning of the application logic to handle cross-shard queries.</p>

  <p class="mb-6">However, sharding introduces complexity. We use database middleware and proxy layers to abstract this complexity from the application code. The developers write standard SQL, and the infrastructure layer handles the routing to the correct shard. This separation of concerns is vital for maintainability.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Rise of NoSQL for Unstructured Data</h3>
  <p class="mb-6">Not all data fits neatly into rows and columns. For logging, analytics, and user activity feeds, we prefer NoSQL solutions like MongoDB or Cassandra. These databases offer flexible schemas and high write throughput, making them ideal for capturing the 'firehose' of data generated by modern SaaS applications.</p>

  <p class="mb-6">The future is polyglot persistence—using the right database for the right job. A single SaaS platform might use PostgreSQL for transactional data, Redis for caching, ElasticSearch for search, and S3 for object storage. Orchestrating these distinct systems into a cohesive whole is the core challenge of modern backend engineering.</p>
`;

const POST_CONTENT_9 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">AI COMPLIANCE //</span> Regulatory landscapes are shifting. With the introduction of the EU AI Act and similar frameworks globally, compliance is no longer a legal checkbox; it is a technical requirement. We explore how to build AI systems that are compliant by design, automating the governance process to keep pace with innovation.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Automated Governance Pipelines</h3>
  <p class="mb-6">Manual compliance checks are too slow for CI/CD workflows. We integrate compliance checks directly into the deployment pipeline. Every time a model is retrained or updated, it must pass a suite of automated tests for bias, fairness, and accuracy. If the model drifts beyond acceptable parameters, the deployment is automatically halted. This 'Compliance as Code' approach ensures that no non-compliant AI ever reaches production.</p>

  <p class="mb-6">We use tools like MLflow and Kubeflow to track every experiment, every parameter, and every dataset used in training. This creates an immutable audit trail. When the regulators knock, you don't scramble for spreadsheets; you point them to the version control history.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Explainability (XAI) as a Service</h3>
  <p class="mb-6">Black box models are becoming a liability. In sectors like finance and healthcare, you must be able to explain *why* the AI made a decision. We implement SHAP (SHapley Additive exPlanations) values and LIME (Local Interpretable Model-agnostic Explanations) to visualise the decision-making process. These tools generate human-readable reports that explain which features influenced the model's output.</p>

  <p class="mb-6">This transparency builds trust with end-users. If a loan application is denied, the system can explain that it was due to 'high credit utilisation' rather than a vague 'algorithm decision'. This empowers the user to take corrective action and protects the institution from accusations of bias.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Data Lineage and Privacy</h3>
  <p class="mb-6">Knowing where your data comes from is as important as knowing where it goes. We implement strict data lineage tracking to ensure that no PII (Personally Identifiable Information) leaks into the training sets without anonymisation. We use differential privacy techniques to add mathematical noise to datasets, ensuring that individual records cannot be reverse-engineered from the model's output.</p>

  <p class="mb-6">Compliance is a continuous process. We set up real-time monitoring dashboards that track model performance against regulatory KPIs. If a model starts exhibiting bias against a protected demographic, alerts are triggered immediately. This proactive stance is the only way to operate AI safely at scale.</p>
`;

const POST_CONTENT_10 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">EDTECH STRATEGY //</span> Engagement is the holy grail of online learning. Completion rates for MOOCs (Massive Open Online Courses) hover dismally around 5-15%. To fix this, we must look to the gaming industry. We explore how 'Gamification 2.0' goes beyond badges and leaderboards to create intrinsic motivation loops.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Hook Model in Learning</h3>
  <p class="mb-6">We apply Nir Eyal's 'Hook Model' to education. Trigger, Action, Variable Reward, Investment. The trigger might be a push notification reminding you of a streak. The action is a bite-sized lesson. The reward is not just points, but the satisfaction of mastering a concept (competence). The investment is the progress made, which increases the user's stake in the platform.</p>

  <p class="mb-6">We design 'Flow States' by dynamically adjusting the difficulty of content. If a user answers correctly too quickly, the system ramps up the challenge to prevent boredom. If they struggle, it offers scaffolding to prevent anxiety. This adaptive learning path keeps the user in the optimal zone of engagement.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Social Learning and Accountability</h3>
  <p class="mb-6">Learning is inherently social. We build cohort-based features where users progress together. Seeing a peer complete a module triggers a 'Fear of Missing Out' (FOMO) that drives action. We implement peer-review systems where students teach each other, reinforcing their own understanding through the Feynman Technique.</p>

  <p class="mb-6">Live feedback is crucial. We use AI to grade open-ended responses instantly, providing detailed feedback rather than a simple pass/fail. This immediacy mimics the presence of a tutor and keeps the momentum going. Waiting days for a grade is a sure way to kill motivation.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Micro-Learning Architecture</h3>
  <p class="mb-6">Attention spans are shrinking. We break complex curriculums down into 'atomic' units of knowledge—videos under 3 minutes, quizzes with 5 questions. This allows learning to fit into the 'in-between' moments of life: the commute, the coffee break. We design mobile-first interfaces that support this sporadic usage pattern without losing the thread of the larger narrative.</p>

  <p class="mb-6">Ultimately, the goal is to shift from 'have to learn' to 'want to learn'. By reducing friction and increasing the dopamine hits associated with progress, we can transform education from a chore into a habit.</p>
`;

const POST_CONTENT_11 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">PROPTECH VISUALISATION //</span> Real estate is a spatial industry, yet its data has traditionally been trapped in spreadsheets. We are liberating this data through geospatial visualisation. By layering market data onto interactive 3D maps, we enable investors and developers to see patterns that were previously invisible.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Power of the Mapbox Layer</h3>
  <p class="mb-6">We utilize high-performance mapping engines like Mapbox GL JS to render millions of data points in real-time. We can visualise price heatmaps, gentrification trends, and transport connectivity scores directly onto the city grid. This allows a user to instantly assess the 'vibe' and value of a neighbourhood without setting foot in it.</p>

  <p class="mb-6">We integrate 3D building models (digital twins) to allow users to evaluate sightlines, shadow studies, and zoning potential. For off-plan developments, this is a game-changer. A buyer can virtually stand on the balcony of a 20th-floor apartment that hasn't been built yet and see the actual view they will have.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Data storytelling for Investment</h3>
  <p class="mb-6">Data without context is noise. We build narrative dashboards that guide the investor through the deal. Instead of a raw list of comparables, we present a dynamic chart showing the 5-year growth trajectory of the postcode. We use AI to generate executive summaries that highlight the risks and opportunities of a specific asset class in plain English.</p>

  <p class="mb-6">We also visualise 'yield compression' and 'cap rate' scenarios. Users can adjust sliders for rental growth, interest rates, and occupancy to see how they impact the IRR (Internal Rate of Return) in real-time. This interactive modelling empowers the user to stress-test their investment thesis.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">AR for Property Management</h3>
  <p class="mb-6">PropTech extends beyond the transaction. We are building AR tools for facility managers. By holding an iPad up to a wall, a maintenance worker can see an overlay of the pipes and wiring behind it (BIM data). This 'X-Ray vision' reduces the cost of repairs and prevents accidental damage to infrastructure.</p>

  <p class="mb-6">The future of real estate is transparent and liquid. By making data visible and accessible, we reduce the information asymmetry that has historically plagued the market, leading to faster, fairer transactions.</p>
`;

const POST_CONTENT_12 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">ECOMMERCE PERFORMANCE //</span> The 'Buy' button is the end of the journey, but the friction begins much earlier. In a saturated e-commerce market, experience is the only differentiator. We explore 'Headless Commerce' architectures that decouple the frontend from the backend to deliver blisteringly fast, app-like shopping experiences.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Going Headless with Shopify Hydrogen</h3>
  <p class="mb-6">Traditional monolithic platforms like Shopify or Magento tightly couple the UI with the logic. This limits design freedom and performance. We advocate for a 'Headless' approach using Shopify Hydrogen or Next.js Commerce. This allows us to build a custom React frontend that loads instantly and behaves like a native app, while still using Shopify's robust backend for inventory and payments.</p>

  <p class="mb-6">This separation allows for 'Omnichannel' publishing. The same product data can be pushed to a website, a mobile app, a smart mirror in a retail store, or a social media feed. The content is central; the delivery is flexible. This future-proofs the brand against shifting consumer touchpoints.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Post-Purchase Experience</h3>
  <p class="mb-6">Retention is cheaper than acquisition. Yet, most brands ignore the customer once the credit card is charged. We design immersive post-purchase flows. Branded tracking pages, personalised unboxing videos, and AI-driven product care guides. We turn the anxiety of 'Where is my order?' into a moment of brand engagement.</p>

  <p class="mb-6">We use predictive analytics to trigger replenishment emails exactly when the customer is likely to run out of a consumable product. 'It looks like you're running low on coffee. One-click to restock.' This convenience drives Customer Lifetime Value (CLV) through the roof.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Visual Search and Discovery</h3>
  <p class="mb-6">Text search is limited. We implement visual search capabilities where a user can upload a photo of a style they like, and the AI finds similar products in the catalogue. We also use 'Social Proof' galleries where users can see how real people styled the item. This bridges the gap between the studio photo and reality, reducing return rates.</p>

  <p class="mb-6">E-commerce is no longer about catalogues; it's about curation. By using data to personalise the storefront for every visitor, we create a sense of boutique service at internet scale.</p>
`;

const POST_CONTENT_13 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">SECURITY ARCHITECTURE //</span> The castle-and-moat security model is dead. In a world of remote work and cloud services, the perimeter has dissolved. We adopt a 'Zero Trust' architecture: Never trust, always verify. Every request, whether from inside or outside the network, must be authenticated, authorised, and encrypted.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Identity as the New Perimeter</h3>
  <p class="mb-6">If the network is open, identity is the only gatekeeper. We implement robust IAM (Identity and Access Management) policies. Multi-Factor Authentication (MFA) is mandatory, not optional. We prefer hardware keys (YubiKeys) or biometric authenticators over SMS OTPs, which are vulnerable to SIM swapping attacks.</p>

  <p class="mb-6">We enforce 'Least Privilege Access'. A user should only have access to the specific data they need for their current task, and only for as long as they need it. We use ephemeral credentials that expire automatically, minimising the blast radius if a key is compromised.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Micro-Segmentation</h3>
  <p class="mb-6">If an attacker breaches one server, they shouldn't be able to roam freely across the network. We use micro-segmentation to isolate workloads. The web server talks to the app server, and the app server talks to the database, but the web server cannot talk directly to the database. These strict traffic rules contain breaches and prevent lateral movement.</p>

  <p class="mb-6">We treat infrastructure as immutable. If a server is compromised, we don't patch it; we kill it and spin up a fresh one. This prevents attackers from establishing persistence (APTs) within the environment.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Continuous Security Monitoring</h3>
  <p class="mb-6">Security is not a state; it is a process. We deploy SIEM (Security Information and Event Management) tools to ingest logs from every layer of the stack. AI models analyse these logs for anomalies—a login from an unusual IP, a spike in database reads. Alerts are triaged in real-time.</p>

  <p class="mb-6">We also conduct automated penetration testing in the CI/CD pipeline. Security scans run on every commit, catching vulnerabilities like SQL injection or cross-site scripting (XSS) before they reach production. Security is everyone's job, not just the InfoSec team.</p>
`;

const POST_CONTENT_14 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">HEALTHTECH UX //</span> In healthcare, bad design can be fatal. A confusing interface in an Electronic Health Record (EHR) system leads to medication errors. We apply rigorous 'Human Factors Engineering' to HealthTech. The goal is to reduce cognitive load for clinicians who are often overworked and operating under high stress.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The 10-Second Rule</h3>
  <p class="mb-6">A doctor should be able to grasp the patient's critical status within 10 seconds. We design 'at-a-glance' dashboards that prioritise vitals, allergies, and recent alerts. We use colour coding sparingly but consistently—red for critical, amber for warning. Non-essential data is tucked away in progressive disclosure layers, available on demand but not cluttering the primary view.</p>

  <p class="mb-6">We optimise for 'Click Reduction'. Every extra click is time taken away from patient care. We use smart defaults and predictive entry to speed up documentation. Voice-to-text dictation integration allows clinicians to take notes hands-free while examining the patient.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Patient-Centric Design</h3>
  <p class="mb-6">For patient-facing apps, accessibility is paramount. Users may be elderly, visually impaired, or lacking fine motor skills. We adhere to WCAG AAA standards. Large touch targets, high contrast text, and clear, jargon-free language. We visualise complex health data—blood pressure trends, lab results—in simple, friendly charts that empower patients to understand their own health.</p>

  <p class="mb-6">Telehealth interfaces need to feel personal. We design the video consultation view to maintain eye contact (simulated) and allow the doctor to share screens or annotate images without breaking the connection. The tech should dissolve, leaving just the human interaction.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Interoperability and Data Flow</h3>
  <p class="mb-6">Health data is notoriously siloed. We design systems that speak FHIR (Fast Healthcare Interoperability Resources). This standard allows data to flow freely between hospitals, labs, and apps. A comprehensive view of the patient's history improves diagnosis accuracy and prevents duplicate testing.</p>

  <p class="mb-6">Privacy is the bedrock. We design consent management flows that are granular and transparent. The patient decides exactly who sees their data and for what purpose. Trust is the prerequisite for digital health adoption.</p>
`;

const POST_CONTENT_15 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">DEV CULTURE //</span> The days of writing boilerplate code are over. AI coding assistants like GitHub Copilot and Cursor have democratised syntax. The role of the developer is shifting from 'Typist' to 'Conductor'. We embrace 'Vibe Coding'—rapid prototyping where the focus is on the logic, the flow, and the 'vibe' of the product, with AI handling the implementation details.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The End of Syntax Errors</h3>
  <p class="mb-6">We no longer memorise API signatures. We describe the intent: "Create a React component that fetches user data and displays a loading skeleton." The AI generates the code. Our job is to review, refine, and orchestrate. This shifts the skill ceiling. Senior engineers are defined not by their knowledge of obscure language features, but by their ability to architect complex systems and debug high-level logic flaws.</p>

  <p class="mb-6">This speed allows for 'Disposable Prototyping'. We can build three different versions of a feature in an afternoon, test them, and throw away two. We iterate faster, finding the right solution through experimentation rather than debate.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Prompt Engineering as a Core Skill</h3>
  <p class="mb-6">The quality of the code output depends on the quality of the prompt input. We train our engineers in 'Context Management'. Feeding the AI the right relevant files, the right design constraints, and the right persona. "Act as a Senior Security Engineer and review this code for vulnerabilities." This meta-programming is the new literacy.</p>

  <p class="mb-6">However, we remain vigilant against 'AI Hallucinations'. Code generated by AI can be subtly wrong or insecure. Code review processes are more rigorous than ever. We use automated test suites to verify that the AI's code actually does what it claims to do.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Focus on the Domain</h3>
  <p class="mb-6">With the grunt work automated, developers can focus on the 'Business Domain'. Understanding the intricacies of fintech regulations, or the physics of a supply chain. The engineer becomes a product partner. The gap between idea and execution is narrower than at any point in history.</p>

  <p class="mb-6">We are not replacing developers; we are supercharging them. A single 'Vibe Coder' can now output the work of a small team. This efficiency allows us to deliver enterprise-grade software at startup speeds.</p>
`;

const POST_CONTENT_16 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">UI INNOVATION //</span> Static dashboards are a relic of the print era. Why should a screen look the same every day? 'Generative UI' uses AI to construct interfaces on the fly, tailored to the user's immediate needs and context. The interface is no longer a fixed layout; it is a fluid stream of relevant components.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Context-Aware Components</h3>
  <p class="mb-6">Imagine a sales dashboard. On Monday morning, the AI generates a view focused on the week's pipeline and meetings. On Friday afternoon, it shifts to a summary view of closed deals and pending admin tasks. The components—charts, lists, buttons—are assembled in real-time based on the user's calendar, recent emails, and company goals.</p>

  <p class="mb-6">We use a library of 'Atomic UI' elements. The LLM acts as the layout engine. It receives a prompt: "Show me the risks for the Q3 project," and it selects the relevant risk widgets, arranges them in a priority grid, and renders the page. No hard-coded templates. Pure dynamic utility.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Natural Language Navigation</h3>
  <p class="mb-6">Menus are dying. Instead of clicking through five layers of navigation to find a setting, the user simply types or says: "Turn on dark mode and update my billing address." The AI executes the command and confirms. The interface becomes conversational. The UI acts as a visual aid to the conversation, popping up a form or a map only when needed.</p>

  <p class="mb-6">This reduces the learning curve to zero. There is no need to 'learn' the software. You just talk to it. This democratises access to complex tools. A junior analyst can perform advanced data queries simply by asking plain English questions.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Adaptive Accessibility</h3>
  <p class="mb-6">Generative UI is the ultimate accessibility tool. For a visually impaired user, the AI can render a text-heavy, high-contrast version of the interface. For a user with ADHD, it can strip away all non-essential elements to reduce distraction. The interface adapts to the user's biology, not the other way around.</p>

  <p class="mb-6">This is the end of 'One Size Fits All'. Every user gets a bespoke software experience, generated instantly, just for them. It is the future of personalisation.</p>
`;

const POST_CONTENT_17 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">CLOUD ARCHITECTURE //</span> The server closet is gone. Even the virtual machine (VM) is becoming a legacy concept. We build on 'Serverless' infrastructure—AWS Lambda, Vercel, Cloudflare Workers. We pay only for the milliseconds of compute we use. This architecture scales from zero to infinity automatically, handling sudden traffic spikes without manual intervention.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Event-Driven Paradigm</h3>
  <p class="mb-6">We architect systems around 'Events'. A user signs up (Event). This triggers a function to send a welcome email, another to create a Stripe customer, and another to log analytics. These functions run in parallel, independently. If the email service fails, the payment still processes. This decoupling creates highly resilient systems that degrade gracefully rather than crashing completely.</p>

  <p class="mb-6">We use message queues (Kafka, SQS) to buffer traffic. If 10,000 users hit the 'Buy' button at once, the requests are queued and processed in order. The server never gets overwhelmed; it just works through the backlog at its maximum efficient rate.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Global Edge Replication</h3>
  <p class="mb-6">Latency is determined by the speed of light. To make apps feel instant, the code must run close to the user. We deploy to the 'Edge'—a network of thousands of small data centres distributed globally. When a user in Tokyo requests data, they hit a server in Tokyo, not Virginia. This reduces round-trip times from 200ms to 20ms.</p>

  <p class="mb-6">We also replicate data globally using databases like DynamoDB Global Tables or Firestore. A write in London is instantly replicated to New York and Sydney. This ensures data consistency and high availability. If an entire region goes offline (e.g., AWS East outage), traffic is automatically routed to the next nearest healthy region.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Cost Optimisation (FinOps)</h3>
  <p class="mb-6">Serverless can be cheaper, but only if architected correctly. A memory leak in a Lambda function can lead to a massive bill. We implement strict 'FinOps' monitoring. We track the cost per transaction. We set up budget alarms. We optimise code execution time to shave milliseconds off the bill. Efficiency is profit.</p>

  <p class="mb-6">Serverless allows us to focus on business logic, not server patching. It is the infrastructure of the modern agile enterprise.</p>
`;

const POST_CONTENT_18 = `
  <p class="mb-6"><span class="text-neon-blue font-bold">ACCESSIBILITY REPORT //</span> Accessibility (a11y) is often treated as a compliance tax or a charitable add-on. We view it as a massive untapped market opportunity. In the UK alone, the 'Purple Pound' (spending power of disabled households) is valued at £274 billion. By designing for inclusion, we unlock revenue that competitors are ignoring.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Curb-Cut Effect</h3>
  <p class="mb-6">Features designed for disabilities often benefit everyone. This is the 'Curb-Cut Effect'. Captions were designed for the deaf, but now everyone uses them to watch videos on mute. High-contrast modes help the visually impaired, but they also help anyone looking at a screen in bright sunlight. By solving for the edge cases, we improve the core experience for the average user.</p>

  <p class="mb-6">We design for keyboard navigation first. Power users prefer keyboard shortcuts over the mouse. By making a site fully navigable via 'Tab' and 'Enter', we satisfy both the motor-impaired user and the high-velocity trader who demands speed.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Semantic HTML and SEO</h3>
  <p class="mb-6">Google is the world's biggest blind user. Its crawler parses code, not visuals. It relies on semantic HTML tags (<nav>, <article>, <button>) to understand the page structure. This is exactly how screen readers work. Therefore, an accessible site is an SEO-optimised site. Clean, semantic code ranks higher and loads faster.</p>

  <p class="mb-6">We enforce ARIA (Accessible Rich Internet Applications) labels only when necessary. The best accessibility is native HTML. A native <button> is accessible by default; a <div> with a click handler is not. We stick to the standards to ensure compatibility with all assistive technologies.</p>

  <h3 class="text-2xl font-bold text-white mb-4 mt-8">Cognitive Accessibility in Fintech</h3>
  <p class="mb-6">Finance is confusing. We design for neurodiversity (Dyslexia, ADHD, Autism). We avoid walls of text. We use clear headings, bullet points, and sans-serif fonts. We avoid flashing animations that can trigger seizures or distract focus. We provide 'Plain English' summaries of complex legal terms.</p>

  <p class="mb-6">Accessible design is simply good design. It is clear, robust, and usable. By removing barriers, we widen the funnel and invite more users to participate in the digital economy.</p>
`;


export const PROJECTS: Project[] = [
  {
    id: 'p-nexa',
    title: 'NexaFlow Banking',
    category: 'Fintech Infrastructure',
    metric: '+£42M Volume',
    description: 'Engineering the future of institutional capital flow with ultra-secure design patterns and sub-second latency.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Firebase', 'Cloud Functions', 'Fintech Logic']
  },
  {
    id: 'p-cloud',
    title: 'OmniDash SaaS',
    category: 'Enterprise Dashboard',
    metric: '-45% Churn',
    description: 'A cognitive-first interface designed for high-velocity data processing and decision making in real-time.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    techStack: ['React', 'Realtime DB', 'SaaS Logic']
  },
  {
    id: 'p-lex',
    title: 'Kryptos Vault',
    category: 'Web Security',
    metric: 'Zero Breach',
    description: 'Visualising complex cryptographic structures for global regulatory transparency and decentralised trust.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Google Cloud Identity', 'Encryption', 'Security Logic']
  },
  {
    id: 'p-vortex',
    title: 'Vortex AI',
    category: 'Machine Learning',
    metric: '3.2s Latency',
    description: 'Human-centric AI orchestration platforms for industrial-scale automation and predictive maintenance.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Gemini API', 'Vertex AI', 'Automation Logic']
  }
];

export const STEPS: Step[] = [
  {
    id: 'l-audit',
    number: '01',
    title: 'Audit',
    description: 'We begin with a detailed audit of the problem, the product, and the existing technical landscape. This stage focuses on validating viability, identifying risks, and uncovering constraints across user experience, systems, data, and infrastructure. The goal is to establish a clear understanding of what exists, what works, and what needs to change before any solution is designed or built.'
  },
  {
    id: 'l-architect',
    number: '02',
    title: 'Architect',
    description: 'With clarity in place, we design the structure of the solution. This includes defining strategic user flows, system architecture, and integration points that support both current needs and future growth. Decisions made at this stage ensure the product is logical, scalable, and aligned with business objectives before development begins.'
  },
  {
    id: 'l-build',
    number: '03',
    title: 'Build',
    description: 'We move into development with a focus on quality, scalability, and performance. Design, frontend, backend, and integrations come together to form a production-ready product. Our build phase prioritises clean implementation, reliable systems, and flexibility to evolve as the product grows.'
  },
  {
    id: 'l-optimise',
    number: '04',
    title: 'Optimise',
    description: 'Once live, we optimise through data, feedback, and continuous iteration. We analyse usage patterns, performance metrics, and user behaviour to refine features, improve conversion, and support sustainable growth. Optimisation is ongoing, ensuring the product continues to deliver value over time.'
  }
];

export const SECTORS: (Sector & { gradient: string })[] = [
  {
    id: 'sec-fin',
    title: 'Fintech',
    benefit: 'We design and build fintech platforms that prioritise security, performance, and regulatory awareness. From user-friendly financial interfaces to robust backend systems, we support products involving payments, open banking, data aggregation, and transaction workflows, with careful attention to compliance, scalability, and trust.',
    tag: 'Security & Trust',
    gridSpan: 'md:col-span-2',
    gradient: 'from-blue-600 via-indigo-600 to-violet-700'
  },
  {
    id: 'sec-saas',
    title: 'SaaS',
    benefit: 'Our SaaS solutions are built for growth from day one. We design intuitive user experiences and develop scalable architectures that support subscriptions, role-based access, dashboards, and integrations. Whether it’s an MVP or a mature platform, we focus on reliability, performance, and long-term maintainability.',
    tag: 'Scalability',
    gridSpan: 'md:col-span-1',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700'
  },
  {
    id: 'sec-health',
    title: 'Healthtech',
    benefit: 'We create healthtech products that balance usability with data sensitivity. Our work supports patient-centred experiences, clinician workflows, and secure data handling, with systems designed to meet privacy, accessibility, and compliance requirements while remaining simple and intuitive for everyday use.',
    tag: 'Privacy',
    gridSpan: 'md:col-span-1',
    gradient: 'from-rose-500 via-pink-600 to-red-700'
  },
  {
    id: 'sec-prop',
    title: 'Proptech',
    benefit: 'In proptech, clarity and data matter. We design and develop platforms that streamline property discovery, management, and decision-making, integrating mapping, dashboards, workflows, and automation to support landlords, agents, developers, and end users across the property lifecycle.',
    tag: 'Automation',
    gridSpan: 'md:col-span-2',
    gradient: 'from-amber-500 via-orange-600 to-red-700'
  },
  {
    id: 'sec-ed',
    title: 'Edtech',
    benefit: 'We build edtech solutions that support learning at scale. From course platforms and student dashboards to data-driven insights and personalised learning flows, our products are designed to be accessible, engaging, and technically robust, supporting both learners and educators effectively.',
    tag: 'Engagement',
    gridSpan: 'md:col-span-1',
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-700'
  },
  {
    id: 'sec-ecom',
    title: 'Ecomtech',
    benefit: 'Our ecomtech solutions focus on performance, conversion, and system integration. We design and develop platforms that handle product catalogues, payments, logistics, and analytics, optimised for speed, scalability, and seamless user journeys across web and mobile.',
    tag: 'Performance',
    gridSpan: 'md:col-span-1',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    title: 'Architecture of Silence',
    date: '14.03.2024',
    category: 'Design Theory',
    readTime: '12 MIN',
    excerpt: 'Why high-net-worth users are migrating towards low-light "Obsidian" interfaces and how deep contrast reduces cognitive load.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_1
  },
  {
    id: 'post-02',
    title: 'The Millisecond Economy',
    date: '22.08.2024',
    category: 'Engineering',
    readTime: '15 MIN',
    excerpt: 'A technical breakdown of how we convert reduced latency into revenue. Speed is not a feature; it is the infrastructure of trust.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_2
  },
  {
    id: 'post-03',
    title: 'Synthetic Intelligence',
    date: '10.11.2024',
    category: 'AI Strategy',
    readTime: '11 MIN',
    excerpt: 'Moving beyond the chatbot: How CreativeIyke integrates predictive LLM logic directly into enterprise dashboards.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_3
  },
  {
    id: 'post-04',
    title: 'The Death of Templates',
    date: '05.02.2025',
    category: 'Development',
    readTime: '13 MIN',
    excerpt: 'Why bespoke engineering is the only viable path for scaling brands. The hidden costs of "No-Code" ceilings.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_4
  },
  {
    id: 'post-05',
    title: 'Visualising the Chain',
    date: '18.05.2025',
    category: 'Web3 / Fintech',
    readTime: '14 MIN',
    excerpt: 'Making the blockchain palpable. How haptic feedback and physics-based UI build trust in decentralised finance.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_5
  },
  {
    id: 'post-06',
    title: 'Spatial Preparedness',
    date: '30.06.2025',
    category: 'Future Tech',
    readTime: '16 MIN',
    excerpt: 'Preparing your digital infrastructure for the Z-axis. From flat screens to volumetric spatial computing.',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_6
  },
  {
    id: 'post-07',
    title: 'Psychology of Trust',
    date: '15.07.2025',
    category: 'Fintech UX',
    readTime: '10 MIN',
    excerpt: 'Designing for the skeptical user. How colour, micro-interactions, and transparency build the trust required for financial transactions.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_7
  },
  {
    id: 'post-08',
    title: 'Scaling Database Logic',
    date: '02.08.2025',
    category: 'SaaS Engineering',
    readTime: '14 MIN',
    excerpt: 'Sharding, Caching, and Read Replicas. A deep dive into architecting databases that survive the transition from startup to enterprise.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_8
  },
  {
    id: 'post-09',
    title: 'AI Compliance Automation',
    date: '20.08.2025',
    category: 'AI Governance',
    readTime: '12 MIN',
    excerpt: 'Navigating the EU AI Act with automated CI/CD pipelines. Ensure your models are fair, explainable, and compliant by design.',
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_9
  },
  {
    id: 'post-10',
    title: 'The EdTech Loop',
    date: '10.09.2025',
    category: 'EdTech Strategy',
    readTime: '11 MIN',
    excerpt: 'Applying the "Hook Model" to education. How to use gamification and social accountability to drive completion rates beyond 15%.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_10
  },
  {
    id: 'post-11',
    title: 'Visualising Real Estate',
    date: '25.09.2025',
    category: 'PropTech',
    readTime: '13 MIN',
    excerpt: 'Liberating spatial data from spreadsheets. Using Mapbox and 3D digital twins to tell compelling investment stories.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_11
  },
  {
    id: 'post-12',
    title: 'Headless Commerce',
    date: '05.10.2025',
    category: 'E-Commerce',
    readTime: '12 MIN',
    excerpt: 'Decoupling the frontend to achieve sub-second load times. Why Shopify Hydrogen and Next.js are the future of retail.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_12
  },
  {
    id: 'post-13',
    title: 'Zero Trust Security',
    date: '18.10.2025',
    category: 'Security',
    readTime: '15 MIN',
    excerpt: 'The perimeter is dead. How to implement Identity-Based Security, Micro-Segmentation, and Continuous Monitoring.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_13
  },
  {
    id: 'post-14',
    title: 'HealthTech UX',
    date: '01.11.2025',
    category: 'HealthTech',
    readTime: '12 MIN',
    excerpt: 'Reducing cognitive load for clinicians. Designing interfaces that save lives by prioritising clarity and speed.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_14
  },
  {
    id: 'post-15',
    title: 'Vibe Coding Era',
    date: '15.11.2025',
    category: 'Dev Culture',
    readTime: '10 MIN',
    excerpt: 'The shift from syntax to intent. How AI coding assistants are turning developers into architects and vibe curators.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_15
  },
  {
    id: 'post-16',
    title: 'Generative UI',
    date: '30.11.2025',
    category: 'UI Innovation',
    readTime: '14 MIN',
    excerpt: 'Interfaces that build themselves. Using LLMs to generate context-aware dashboards in real-time for every user.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_16
  },
  {
    id: 'post-17',
    title: 'Serverless Scale',
    date: '10.12.2025',
    category: 'Cloud Arch',
    readTime: '13 MIN',
    excerpt: 'Scaling from zero to infinity. Leveraging Edge Functions and Global Replication for instant, resilient apps.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_17
  },
  {
    id: 'post-18',
    title: 'Accessibility ROI',
    date: '20.12.2025',
    category: 'Accessibility',
    readTime: '11 MIN',
    excerpt: 'The "Purple Pound" opportunity. Why accessible design is not just a compliance tax, but a massive revenue driver.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
    content: POST_CONTENT_18
  }
];

export const PERFORMANCE_METRICS = [
  "TOP 1% GLOBAL DESIGN PARTNER",
  "OVER £50M RAISED BY CLIENTS",
  "ZERO-DOWNTIME MIGRATIONS",
  "ENTERPRISE-GRADE RESILIENCE",
  "99.9% LOGIC COMPLIANCE",
  "HIGH-VELOCITY DEPLOYMENT",
  "SCALABLE SYSTEM",
  "VIABILITY AUDITS"
];
