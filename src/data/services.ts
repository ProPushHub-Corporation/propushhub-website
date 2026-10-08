import { ImageSlot, serviceImage } from './images';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** One line for cards and lists. */
  summary: string;
  /** <title> without the brand suffix. */
  seoTitle: string;
  /** Meta description, 150–158 characters. */
  metaDescription: string;
  h1: string;
  intro: string;
  forWho: string[];
  deliverables: { title: string; detail: string }[];
  stack: string[];
  faqs: ServiceFaq[];
  /** Slugs from PROJECTS that prove this capability. Leave empty when there is no relevant project. */
  relatedProjects: string[];
  relatedServices: string[];
  keywords: string[];
  image: ImageSlot;
}

type ServiceInput = Omit<Service, 'image'>;

const define = (items: ServiceInput[]): Service[] =>
  items.map((s) => ({ ...s, image: serviceImage(s.slug, s.name) }));

export const SERVICES: Service[] = define([
  {
    slug: 'website-development',
    name: 'Website Development',
    summary: 'Fast, search-friendly business websites that turn visitors into enquiries.',
    seoTitle: 'Website Development Company',
    metaDescription:
      'Custom website development for businesses: fast, responsive, SEO-ready sites built with React and Next.js. Get a free quote from PropushHub.',
    h1: 'Website development that brings in customers',
    intro:
      'Your website is usually the first thing a customer sees. We design and build business websites that load fast, work on every screen and are structured so search engines can understand them, then connect them to the forms, analytics and tools you already use.',
    forWho: [
      'Businesses launching or replacing their website',
      'Companies whose current site is slow, dated or hard to update',
      'Startups that need a credible launch site quickly',
    ],
    deliverables: [
      {
        title: 'Custom design and responsive build',
        detail: 'Layouts designed for your brand and tested on phones, tablets and desktops.',
      },
      {
        title: 'Technical SEO foundations',
        detail: 'Semantic HTML, metadata, structured data, sitemap and clean URLs from day one.',
      },
      {
        title: 'Performance tuning',
        detail: 'Optimised images and lean code, checked against Core Web Vitals so pages load quickly.',
      },
      {
        title: 'Lead capture',
        detail: 'Contact forms, WhatsApp and email routing, plus analytics to show what converts.',
      },
      {
        title: 'Launch and handover',
        detail: 'Domain, hosting and SSL setup, with documentation so your team can manage the site.',
      },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel'],
    faqs: [
      {
        q: 'How long does a website take to build?',
        a: 'A focused business website usually takes two to six weeks from approved design to launch. Larger sites with many pages, integrations or custom features take longer. You get a written timeline before we start.',
      },
      {
        q: 'Will my new website rank on Google?',
        a: 'We build in the technical foundations: fast loading, clean structure, metadata and schema markup. Rankings also depend on your content, your competitors and time, and we will tell you plainly what to expect.',
      },
      {
        q: 'Can I update the content myself?',
        a: 'Yes. If you want to edit pages without a developer, we pair the site with a content management system. See our CMS development service.',
      },
      {
        q: 'Can you redesign my existing website?',
        a: 'Yes. We can rebuild a site while keeping the URLs and content that already earn traffic, so you do not lose rankings during the move.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['cms-development', 'ecommerce-development', 'ui-ux-design'],
    keywords: ['website development', 'business website', 'custom website design', 'Next.js development'],
  },
  {
    slug: 'cms-development',
    name: 'CMS Development',
    summary: 'Content management systems your team can run without a developer.',
    seoTitle: 'CMS Development Services',
    metaDescription:
      'CMS development with WordPress, headless CMS and custom admin panels. Let your team publish and update content without writing code. Free quote.',
    h1: 'CMS development your team can actually use',
    intro:
      'A good CMS lets marketing, sales and operations publish without waiting on a developer. We build and customise content management systems, from WordPress to headless platforms and fully custom admin panels, shaped around how your team really works.',
    forWho: [
      'Teams that update their site often and rely on developers for every change',
      'Businesses outgrowing a template-based or page-builder website',
      'Companies publishing the same content to a website and an app',
    ],
    deliverables: [
      {
        title: 'Platform recommendation',
        detail: 'An honest choice between WordPress, a headless CMS or a custom build, based on your content, team and budget.',
      },
      {
        title: 'Custom content models',
        detail: 'Page types, fields and components that match your content, so editors fill in forms instead of fighting layouts.',
      },
      {
        title: 'Roles and workflows',
        detail: 'Editor, reviewer and admin permissions, drafts, scheduled publishing and revision history.',
      },
      {
        title: 'Headless delivery',
        detail: 'Content served over an API to your website, mobile app or any other channel.',
      },
      {
        title: 'Content migration',
        detail: 'Existing pages, posts and media moved into the new system without breaking URLs.',
      },
      {
        title: 'Training and documentation',
        detail: 'A walkthrough for your editors and a written guide they can come back to.',
      },
    ],
    stack: ['WordPress', 'Strapi', 'Sanity', 'Contentful', 'Next.js', 'Node.js', 'PostgreSQL'],
    faqs: [
      {
        q: 'Should I choose WordPress or a headless CMS?',
        a: 'WordPress is quick to launch and has a large plugin ecosystem, which suits many business sites. A headless CMS gives more design freedom and better performance, and lets the same content feed several channels. We recommend based on your needs, not our preference.',
      },
      {
        q: 'Can you move our existing site into a CMS?',
        a: 'Yes. We map your current pages and media into the new content structure and set up redirects so existing search rankings carry over.',
      },
      {
        q: 'Can the CMS include a custom approval workflow?',
        a: 'Yes. Approval steps, scheduled publishing and role-based permissions can be built into either a headless or a custom CMS.',
      },
      {
        q: 'Who controls the admin accounts and the content?',
        a: 'You do. Admin access, hosting accounts and content are set up in your name.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['website-development', 'web-application-development', 'api-backend-development'],
    keywords: ['CMS development', 'WordPress development', 'headless CMS', 'custom admin panel'],
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce Development',
    summary: 'Online stores with secure checkout, live inventory and payments that suit your market.',
    seoTitle: 'E-commerce Development Services',
    metaDescription:
      'E-commerce development for Shopify, WooCommerce and custom online stores. Secure payments, inventory sync and fast checkout. Get a free quote.',
    h1: 'E-commerce development that sells',
    intro:
      'An online store has to do three things well: show products clearly, make checkout effortless and keep stock and orders accurate behind the scenes. We build stores on Shopify and WooCommerce, or custom storefronts when your catalogue or workflow does not fit a template.',
    forWho: [
      'Retailers and brands launching their first online store',
      'Sellers moving from marketplaces or social selling to their own site',
      'Businesses that need online orders tied to inventory or ERP',
    ],
    deliverables: [
      {
        title: 'Storefront design and build',
        detail: 'Product pages, search, filters and cart designed to remove friction at every step.',
      },
      {
        title: 'Payment and shipping setup',
        detail: 'Local and international gateways, courier rates, tax rules and cash on delivery where relevant.',
      },
      {
        title: 'Inventory and order management',
        detail: 'Stock levels, order status and customer notifications kept in sync.',
      },
      {
        title: 'Admin dashboard',
        detail: 'Manage products, orders, discounts and customers without touching code.',
      },
      {
        title: 'Search-friendly product pages',
        detail: 'Structured product data, clean URLs and fast load times.',
      },
      {
        title: 'Backend integration',
        detail: 'Connect the store to your ERP, accounting or warehouse system.',
      },
    ],
    stack: ['Shopify', 'WooCommerce', 'Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
    faqs: [
      {
        q: 'Shopify, WooCommerce or a custom store?',
        a: 'Shopify suits most stores that want to launch quickly with low maintenance. WooCommerce fits teams already on WordPress. A custom build makes sense for unusual catalogues, B2B pricing or tight ERP integration. We recommend the simplest option that meets your needs.',
      },
      {
        q: 'Can you integrate local payment methods?',
        a: 'Yes. We integrate card gateways and regional payment providers, and can set up cash-on-delivery workflows. Tell us your market and we will confirm the options.',
      },
      {
        q: 'Can the store connect to my inventory system?',
        a: 'Yes. We can sync stock and orders with an existing inventory or ERP system, or build the connection into a new one.',
      },
      {
        q: 'Can you migrate my existing store?',
        a: 'Yes. We move products, customers and order history, and keep existing product URLs working with redirects.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['website-development', 'erp-custom-software', 'api-backend-development'],
    keywords: ['ecommerce development', 'Shopify development', 'WooCommerce development', 'online store'],
  },
  {
    slug: 'web-application-development',
    name: 'Web Application Development',
    summary: 'Dashboards, portals and SaaS platforms built to handle real workloads.',
    seoTitle: 'Web Application Development Company',
    metaDescription:
      'Custom web application development: SaaS platforms, customer portals, dashboards and internal tools. Scalable, secure and built to last. Free quote.',
    h1: 'Web application development for real business workflows',
    intro:
      'When a spreadsheet or an off-the-shelf tool stops fitting how you work, a custom web application takes over. We build SaaS products, customer portals, admin dashboards and internal tools with clean architecture, role-based access and interfaces people pick up without training.',
    forWho: [
      'Founders building a SaaS product or MVP',
      'Companies replacing spreadsheets and manual processes',
      'Teams that need a customer or partner portal',
    ],
    deliverables: [
      {
        title: 'Product scoping',
        detail: 'User roles, workflows and a prioritised feature list before any code is written.',
      },
      {
        title: 'Full-stack build',
        detail: 'A responsive front end, secure API and database designed to grow with your usage.',
      },
      {
        title: 'Authentication and permissions',
        detail: 'Sign-in, role-based access and activity tracking.',
      },
      {
        title: 'Dashboards and reporting',
        detail: 'Charts, tables, exports and filters that answer the questions your team asks every day.',
      },
      {
        title: 'Third-party integrations',
        detail: 'Payments, email, SMS, maps and the tools you already use.',
      },
      {
        title: 'Deployment and monitoring',
        detail: 'Production hosting, automated deploys and error tracking.',
      },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Firebase'],
    faqs: [
      {
        q: 'What is the difference between a web app and a website?',
        a: 'A website mainly presents information. A web application lets users log in and do things: manage orders, track tasks, view reports. Many projects combine both.',
      },
      {
        q: 'Can we start with an MVP?',
        a: 'Yes, and we usually recommend it. We build the smallest version that proves the idea, launch it, and extend it based on real usage.',
      },
      {
        q: 'Will the application scale as we grow?',
        a: 'We design the data model and infrastructure for your expected growth and plan the next stage, so you are not forced into a rebuild after your first wave of users.',
      },
      {
        q: 'Can you take over an application someone else built?',
        a: 'Yes. We start with a code review, then fix, refactor or extend what is already there.',
      },
    ],
    relatedProjects: ['corestock', 'helplytics', 'ai-clinic-management', 'student-portal'],
    relatedServices: ['api-backend-development', 'ui-ux-design', 'erp-custom-software'],
    keywords: ['web application development', 'SaaS development', 'custom web app', 'dashboard development'],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    summary: 'iOS and Android apps from one codebase, with offline support and push notifications.',
    seoTitle: 'Mobile App Development (iOS & Android)',
    metaDescription:
      'iOS and Android mobile app development with React Native: offline-first, real-time and push notifications. From idea to app store. Free quote.',
    h1: 'Mobile app development for iOS and Android',
    intro:
      'We design and build mobile apps that feel native on both iPhone and Android, from a single shared codebase where that makes sense. That means faster delivery and lower maintenance cost, without cutting the features people expect: push notifications, maps, offline use and smooth performance.',
    forWho: [
      'Businesses launching a customer-facing app',
      'Operations teams whose field staff work from their phones',
      'Startups validating a mobile-first product',
    ],
    deliverables: [
      {
        title: 'App design',
        detail: 'User flows and screens designed for thumbs, small displays and real-world use.',
      },
      {
        title: 'Cross-platform build',
        detail: 'One React Native codebase delivering both iOS and Android apps.',
      },
      {
        title: 'Device features',
        detail: 'GPS and maps, camera, push notifications, biometrics and file uploads.',
      },
      {
        title: 'Offline-first sync',
        detail: 'Local storage and background sync for users with unreliable connectivity.',
      },
      {
        title: 'Backend and admin panel',
        detail: 'The API and web dashboard that power the app.',
      },
      {
        title: 'Store release',
        detail: 'Build signing, store listings and submission to Google Play and the App Store.',
      },
    ],
    stack: ['React Native', 'TypeScript', 'Firebase', 'Node.js', 'REST APIs', 'SQLite'],
    faqs: [
      {
        q: 'Native or cross-platform?',
        a: 'Cross-platform with React Native covers most business apps at lower cost and with faster releases. We recommend fully native development only when you need deep platform-specific features or maximum graphics performance.',
      },
      {
        q: 'Do you publish the app to the App Store and Google Play?',
        a: 'Yes. We prepare the builds, screenshots and store listings and handle submission, while the developer accounts stay in your name.',
      },
      {
        q: 'Can the app work offline?',
        a: 'Yes. Data can be stored on the device and synced automatically when connectivity returns, which is common for field and delivery apps.',
      },
      {
        q: 'Do I need a backend for my app?',
        a: 'Almost always. Accounts, data, payments and notifications need a server. We build the API and an admin dashboard alongside the app.',
      },
    ],
    relatedProjects: ['roadhelper', 'talkbridge', 'field-capture'],
    relatedServices: ['api-backend-development', 'ui-ux-design', 'cloud-devops-support'],
    keywords: ['mobile app development', 'React Native development', 'iOS app development', 'Android app development'],
  },
  {
    slug: 'desktop-software-development',
    name: 'Desktop Software Development',
    summary: 'Windows, macOS and Linux applications for offline work, hardware and heavy workloads.',
    seoTitle: 'Desktop Software Development Services',
    metaDescription:
      'Desktop software development for Windows, macOS and Linux: POS, inventory and offline business apps with printer, scanner and device integration.',
    h1: 'Desktop software development for Windows, macOS and Linux',
    intro:
      'Some jobs belong on the desktop: point-of-sale counters, warehouse stations, data-heavy tools and anything that must keep running without a reliable internet connection. We build desktop applications that are fast, stable and integrated with the hardware your business uses.',
    forWho: [
      'Shops, clinics and warehouses that need software that runs offline',
      'Businesses connecting software to printers, barcode scanners or other devices',
      'Teams replacing outdated desktop tools',
    ],
    deliverables: [
      {
        title: 'Windows, macOS and Linux builds',
        detail: 'Installers and automatic updates for the systems your staff use.',
      },
      {
        title: 'Offline-first data',
        detail: 'A local database with optional sync to the cloud when a connection is available.',
      },
      {
        title: 'Hardware integration',
        detail: 'Receipt printers, barcode scanners, cash drawers, scales and label printers.',
      },
      {
        title: 'Reports and exports',
        detail: 'Printable reports, PDF invoices and Excel or CSV exports.',
      },
      {
        title: 'Data migration',
        detail: 'Records moved from legacy software or spreadsheets.',
      },
      {
        title: 'Licensing and updates',
        detail: 'Activation, user accounts and a safe way to ship new versions.',
      },
    ],
    stack: ['Electron', 'Tauri', '.NET', 'TypeScript', 'SQLite', 'PostgreSQL'],
    faqs: [
      {
        q: 'Why choose desktop software over a web app?',
        a: 'Desktop software is the better fit when you need reliable offline use, direct access to hardware, or performance with large local data. If none of these apply, a web app is usually easier to deploy and maintain.',
      },
      {
        q: 'Can a desktop application sync with the cloud?',
        a: 'Yes. The app works locally and syncs to a central database or web dashboard whenever it is online.',
      },
      {
        q: 'Which operating systems do you support?',
        a: 'Windows, macOS and Linux. We build for the systems your team actually uses, and a single codebase can often cover all three.',
      },
      {
        q: 'Can you rebuild our old desktop software?',
        a: 'Yes. We review the existing tool, document how it works, and rebuild it on a modern stack while migrating your data.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['erp-custom-software', 'api-backend-development', 'web-application-development'],
    keywords: ['desktop software development', 'Windows application development', 'Electron development', 'POS software'],
  },
  {
    slug: 'erp-custom-software',
    name: 'ERP & Custom Software',
    summary: 'Inventory, sales, billing and reporting in one system built around your operations.',
    seoTitle: 'Custom ERP Software Development',
    metaDescription:
      'Custom ERP and business software development: inventory, sales, purchasing, billing and reporting in one system tailored to how you operate.',
    h1: 'Custom ERP and business software, built around how you operate',
    intro:
      'Off-the-shelf ERP makes your business fit its structure. We do the opposite: study your operations, then build a system covering inventory, sales, purchasing, accounting and reporting the way your team works, starting with the modules that matter most and growing from there.',
    forWho: [
      'Retail, trading and distribution businesses outgrowing spreadsheets',
      'Multi-branch companies that need one view of stock and sales',
      'Workshops, clinics and service businesses with unique workflows',
    ],
    deliverables: [
      {
        title: 'Process mapping',
        detail: 'We document your current workflow and design the system around it.',
      },
      {
        title: 'Core modules',
        detail: 'Inventory, sales and invoicing, purchasing and suppliers, expenses and reports.',
      },
      {
        title: 'Multi-branch and multi-user',
        detail: 'Roles, permissions and per-location stock control.',
      },
      {
        title: 'Documents and printing',
        detail: 'PDF invoices, receipts, statements and barcode labels.',
      },
      {
        title: 'Data import',
        detail: 'Existing products, customers and balances brought in from spreadsheets or old software.',
      },
      {
        title: 'Staged rollout',
        detail: 'Launch module by module with training, so daily operations are never put at risk.',
      },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redux Toolkit'],
    faqs: [
      {
        q: 'Why not buy off-the-shelf ERP?',
        a: 'Packaged ERP works if your processes match its assumptions. If they do not, you pay for features you never use and workarounds for the ones you need. Custom software costs more to start but fits your operation exactly.',
      },
      {
        q: 'Can you build the system in stages?',
        a: 'Yes. We usually start with the area that causes the most pain, often inventory and sales, and add modules over time.',
      },
      {
        q: 'Can the system support more than one language?',
        a: 'Yes. We have built bilingual interfaces, including right-to-left layouts such as Urdu.',
      },
      {
        q: 'Can it connect to the tools we already use?',
        a: 'Yes. We can integrate accounting software, payment gateways, online stores and hardware such as barcode scanners and printers.',
      },
    ],
    relatedProjects: ['barakah-erp', 'corestock'],
    relatedServices: ['web-application-development', 'desktop-software-development', 'ai-automation'],
    keywords: ['custom ERP software', 'inventory management software', 'business software development', 'billing software'],
  },
  {
    slug: 'api-backend-development',
    name: 'API & Backend Development',
    summary: 'Secure APIs, databases and integrations that power your web and mobile products.',
    seoTitle: 'API & Backend Development Services',
    metaDescription:
      'API and backend development: secure REST and GraphQL APIs, database design and third-party integrations for web and mobile products.',
    h1: 'API and backend development that scales with you',
    intro:
      'Behind every good app is a backend that is fast, secure and easy to extend. We design and build the APIs, databases and integrations your web and mobile products depend on, documented clearly so other developers can build on them.',
    forWho: [
      'Teams whose front end is ready but whose backend is not',
      'Companies connecting separate systems that do not talk to each other',
      'Products that have outgrown a quick prototype backend',
    ],
    deliverables: [
      {
        title: 'API design',
        detail: 'REST or GraphQL endpoints with consistent naming, validation and versioning.',
      },
      {
        title: 'Database architecture',
        detail: 'Schemas, indexes and migrations in PostgreSQL, MongoDB or Firebase.',
      },
      {
        title: 'Authentication and security',
        detail: 'Token-based sign-in, role-based access, rate limiting and input validation.',
      },
      {
        title: 'Third-party integrations',
        detail: 'Payment gateways, email and SMS providers, maps, and accounting or CRM tools.',
      },
      {
        title: 'Real-time features',
        detail: 'Live updates, chat and notifications using WebSockets or managed services.',
      },
      {
        title: 'Documentation and tests',
        detail: 'API docs and automated tests, so changes ship with confidence.',
      },
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'Socket.io', 'REST', 'GraphQL'],
    faqs: [
      {
        q: 'REST or GraphQL?',
        a: 'REST is simpler and fits most projects. GraphQL helps when many clients need different slices of the same data. We pick based on your use case.',
      },
      {
        q: 'Can you fix or refactor our existing backend?',
        a: 'Yes. We audit the code and database, fix security and performance problems, and refactor in stages without taking your product offline.',
      },
      {
        q: 'How do you handle security?',
        a: 'Authentication, authorisation, input validation, rate limiting and secret management are part of every build, not an optional extra.',
      },
      {
        q: 'What if a third-party system has poor documentation?',
        a: 'We test the integration early, so any limitation is clear before it affects your timeline.',
      },
    ],
    relatedProjects: ['field-capture', 'talkbridge', 'roadhelper'],
    relatedServices: ['web-application-development', 'mobile-app-development', 'cloud-devops-support'],
    keywords: ['API development', 'backend development', 'Node.js development', 'REST API', 'system integration'],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    summary: 'Interface design that makes products easy to use and easy to buy from.',
    seoTitle: 'UI/UX Design Services',
    metaDescription:
      'UI/UX design services for websites, web apps and mobile apps: user flows, wireframes, clickable prototypes and design systems built in Figma.',
    h1: 'UI/UX design that makes products easy to use',
    intro:
      'Good design removes friction. We map how people move through your product, design clear interfaces for every screen, and hand developers a precise specification, so what gets built matches what was designed.',
    forWho: [
      'Founders who need a clickable prototype before they build',
      'Teams whose existing product confuses users or converts poorly',
      'Companies that want one consistent design across web and mobile',
    ],
    deliverables: [
      {
        title: 'User flows and wireframes',
        detail: 'The structure of your product, tested on paper before visual design begins.',
      },
      {
        title: 'Visual design',
        detail: 'High-fidelity screens for desktop, tablet and mobile.',
      },
      {
        title: 'Clickable prototypes',
        detail: 'Interactive Figma prototypes you can test with real users and stakeholders.',
      },
      {
        title: 'Design system',
        detail: 'Reusable components, colours and typography, so products stay consistent as they grow.',
      },
      {
        title: 'Accessibility review',
        detail: 'Contrast, keyboard and screen-reader considerations built in.',
      },
      {
        title: 'Developer handoff',
        detail: 'Organised files and specifications so the build matches the design.',
      },
    ],
    stack: ['Figma', 'Design systems', 'Prototyping', 'WCAG accessibility'],
    faqs: [
      {
        q: 'Do you only design, or design and build?',
        a: 'Both. You can hire us for design alone and give it to your own developers, or have us carry it through to a finished product.',
      },
      {
        q: 'Can you redesign an existing product?',
        a: 'Yes. We review the current experience, identify where users struggle, and redesign the flows that matter most.',
      },
      {
        q: 'What do you need from us to start?',
        a: 'A short brief covering your goals, your users and any existing material such as brand guidelines. We fill the gaps in a kickoff session.',
      },
      {
        q: 'Will the design work on mobile?',
        a: 'Yes. Every design is mobile-first and shown at phone, tablet and desktop sizes.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['website-development', 'web-application-development', 'mobile-app-development'],
    keywords: ['UI UX design', 'product design', 'Figma design', 'design system'],
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    summary: 'Practical AI features and workflow automation that give your team hours back every week.',
    seoTitle: 'AI Integration & Automation Services',
    metaDescription:
      'AI integration and workflow automation: chatbots, document OCR, AI assistants and automated reporting built into your existing software.',
    h1: 'AI integration and automation for your business',
    intro:
      'AI is most useful when it solves one specific, repetitive problem. We add practical AI features to your software, such as reading invoices, answering support questions, summarising records and automating reports, and connect them to the systems you already use.',
    forWho: [
      'Teams spending hours on manual data entry or repetitive reporting',
      'Products that want an AI assistant or smarter search',
      'Businesses automating handoffs between tools',
    ],
    deliverables: [
      {
        title: 'Use-case assessment',
        detail: 'We identify where AI saves real time and where a simpler automation is enough.',
      },
      {
        title: 'Document processing',
        detail: 'Data extracted from invoices, bills and forms with OCR and AI parsing.',
      },
      {
        title: 'AI assistants',
        detail: 'Chat and search features grounded in your own data, with sensible guardrails.',
      },
      {
        title: 'Workflow automation',
        detail: 'Scheduled jobs, triggers and integrations that remove manual copy-and-paste.',
      },
      {
        title: 'Automated QA tooling',
        detail: 'Browser testing and review pipelines for software teams.',
      },
      {
        title: 'Evaluation and monitoring',
        detail: 'Checks on accuracy, cost and failures, so the feature stays reliable after launch.',
      },
    ],
    stack: ['Gemini API', 'OpenAI API', 'Node.js', 'Tesseract.js', 'Playwright', 'REST APIs'],
    faqs: [
      {
        q: 'Is my data safe when AI is involved?',
        a: 'We design with privacy in mind: send only the data a feature needs, keep secrets on the server, and choose providers whose data terms fit your requirements. We discuss this before building.',
      },
      {
        q: 'Will AI replace my staff?',
        a: 'The aim is to remove repetitive tasks, not people. We focus on features that give your team time back for work that needs judgement.',
      },
      {
        q: 'Can you add AI to our existing software?',
        a: 'Usually yes. We can add features through your existing backend or as a separate service your software calls.',
      },
      {
        q: 'How accurate is AI?',
        a: 'It depends on the task, and it is never perfect. We build review steps for important decisions and measure accuracy during testing, so you know what to expect.',
      },
    ],
    relatedProjects: ['ai-qa-agent', 'ai-clinic-management', 'barakah-erp'],
    relatedServices: ['web-application-development', 'erp-custom-software', 'api-backend-development'],
    keywords: ['AI integration', 'business automation', 'OCR software', 'AI chatbot development'],
  },
  {
    slug: 'cloud-devops-support',
    name: 'Cloud, DevOps & Support',
    summary: 'Reliable hosting, automated releases and ongoing maintenance for the software you have built.',
    seoTitle: 'Cloud, DevOps & Software Maintenance',
    metaDescription:
      'Cloud deployment, DevOps and software maintenance: CI/CD pipelines, hosting, monitoring, security updates and ongoing support for your applications.',
    h1: 'Cloud, DevOps and ongoing support for your software',
    intro:
      'Launching is only the start. We deploy applications to reliable cloud infrastructure, automate releases so updates ship safely, and stay on after launch to monitor, patch and improve what we have built together.',
    forWho: [
      'Teams whose software is hard to deploy or breaks after updates',
      'Businesses without in-house engineers to maintain their application',
      'Products preparing to handle more traffic',
    ],
    deliverables: [
      {
        title: 'Cloud deployment',
        detail: 'Hosting, domains, SSL and separate staging and production environments.',
      },
      {
        title: 'CI/CD pipelines',
        detail: 'Automated testing and deployment, so releases are repeatable and low-risk.',
      },
      {
        title: 'Monitoring and alerts',
        detail: 'Uptime checks, error tracking and performance dashboards.',
      },
      {
        title: 'Backups and security',
        detail: 'Scheduled backups, dependency updates and access hardening.',
      },
      {
        title: 'Performance tuning',
        detail: 'Slow pages, queries and API calls found and fixed.',
      },
      {
        title: 'Maintenance plans',
        detail: 'Bug fixes, small improvements and priority support on a monthly basis.',
      },
    ],
    stack: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Linux', 'Nginx'],
    faqs: [
      {
        q: 'Do you offer ongoing maintenance?',
        a: 'Yes. Maintenance plans cover bug fixes, updates, backups and monitoring, with the scope and response expectations agreed in writing.',
      },
      {
        q: 'Can you maintain software someone else built?',
        a: 'Yes, after a short code and infrastructure review so we know exactly what we are taking on.',
      },
      {
        q: 'Which cloud providers do you work with?',
        a: 'We deploy on Vercel, AWS and standard VPS hosting, and choose based on cost, performance and your team’s familiarity.',
      },
      {
        q: 'Can you help if our site or app is down right now?',
        a: 'Message us on WhatsApp with what is happening and we will tell you what we can do.',
      },
    ],
    relatedProjects: [],
    relatedServices: ['web-application-development', 'api-backend-development', 'mobile-app-development'],
    keywords: ['DevOps services', 'cloud deployment', 'software maintenance', 'CI/CD'],
  },
]);

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const getServicesForProject = (projectSlug: string): Service[] =>
  SERVICES.filter((s) => s.relatedProjects.includes(projectSlug));
