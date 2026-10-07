export type ProjectFilterCategory =
  | 'All'
  | 'ERP & Business'
  | 'Web Applications'
  | 'Mobile Apps'
  | 'AI & SaaS'
  | 'Management Systems';

export interface ProjectScreenshot {
  id: string;
  label: string;
  url: string;
  caption: string;
  replacementPathHint: string;
}

export interface ProjectCaseStudy {
  attributionLabel: string;
  projectNature: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: {
    title: string;
    detail: string;
  }[];
  architectureSummary: string;
  workflowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  techStackByLayer: {
    layer: string;
    items: string[];
  }[];
  challenges: {
    challenge: string;
    resolution: string;
  }[];
  developmentApproach: string[];
  disclaimer?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  category: string;
  visualHierarchyLabel: string;
  ecosystemBadge?: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  technologies: string[]; // Curated 5-7 relevant technologies for cards
  allTechnologies: string[];
  features: string[];
  screenshots: ProjectScreenshot[];
  liveUrl?: string;
  secondaryLiveUrl?: {
    label: string;
    url: string;
  };
  githubUrl?: string;
  secondaryGithubUrl?: {
    label: string;
    url: string;
  };
  featured: boolean;
  homepageOrder?: number;
  filterCategories: Exclude<ProjectFilterCategory, 'All'>[];
  displaySections: ('featured' | 'ai-advanced' | 'web-business' | 'mobile')[];
  type: string;
  status: string;
  caseStudy: ProjectCaseStudy;
}

export const COMPANY_INFO = {
  name: 'PropushHub',
  tagline: 'We don’t just build landing pages. We build complete digital products.',
  githubProfile: 'https://github.com/syedmuhammadali-dev',
  developerPortfolio: 'https://ali-portfolio-nine.vercel.app/',
  whatsappUrl: 'https://wa.me/923190586822?text=Hello%20PropushHub%2C%20I%20would%20like%20to%20discuss%20a%20software%20project.',
  whatsappNumberDisplay: '+92 319 0586822',
  email: 'syeadmuhammedalimazhar@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/syed-muhammed-ali/',
};

export const PROJECT_FILTERS: ProjectFilterCategory[] = [
  'All',
  'ERP & Business',
  'Web Applications',
  'Mobile Apps',
  'AI & SaaS',
  'Management Systems',
];

export const PROJECTS: Project[] = [
  {
    id: 'barakah-erp',
    slug: 'barakah-erp',
    title: 'Barakah ERP',
    displayTitle: 'Barakah ERP',
    category: 'ERP / Business Management / SaaS',
    visualHierarchyLabel: 'Enterprise / ERP / Business Software',
    shortDescription:
      'A complete business management and ERP platform designed around inventory, sales, purchases, business operations, reporting, and role-based workflows.',
    description:
      'A complete business management and ERP platform designed around inventory, sales, purchases, business operations, reporting and other management workflows.',
    longDescription:
      'Barakah ERP unifies core commercial operations into a single production-oriented web application. Built with Next.js, React, Redux Toolkit, and a REST backend proxy architecture, it covers multi-item sales billing with PDF invoice downloads, inventory management with client-side bulk bill OCR (Tesseract.js and PDF.js), repair-shop mechanic job cards, supplier purchase bills, financial reporting, Zakat valuation, and bilingual English/Urdu (RTL) layouts.',
    technologies: [
      'Next.js',
      'React',
      'Node.js',
      'MongoDB / PostgreSQL',
      'Tailwind CSS',
      'Redux Toolkit',
    ],
    allTechnologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB / PostgreSQL',
      'Tailwind CSS',
      'Redux Toolkit',
      'Tesseract.js (Client OCR)',
      'pdfjs-dist',
      'i18n (English / Urdu RTL)',
    ],
    features: [
      'ERP architecture',
      'Inventory management with bulk bill OCR',
      'Sales management & PDF invoice export',
      'Purchase & supplier bill management',
      'Business dashboards & financial reports',
      'Role-based access & subscription state guard',
      'Bilingual English & Urdu (automatic RTL flip)',
      'Responsive production-oriented web application',
    ],
    screenshots: [
      {
        id: 'barakah-dashboard',
        label: 'ERP Operations Dashboard',
        url: '/projects/barakah-erp/dashboard-overview.svg',
        caption:
          'Main ERP workspace connecting Inventory, Multi-Item Sales, Mechanic Job Cards, Purchase Bills, Reports, and Bilingual English/Urdu (RTL) navigation.',
        replacementPathHint: '/public/projects/barakah-erp/dashboard-overview.svg',
      },
      {
        id: 'barakah-ocr',
        label: 'Inventory & Client-Side Bill OCR',
        url: '/projects/barakah-erp/inventory-ocr.svg',
        caption:
          'Client-side optical character recognition pipeline (src/lib/bill-ocr.ts) using Tesseract.js and PDF.js to extract line items from supplier bills without external OCR API dependencies.',
        replacementPathHint: '/public/projects/barakah-erp/inventory-ocr.svg',
      },
    ],
    liveUrl: 'https://barakah-erp.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Barakah-ERP-Frontend',
    featured: true,
    homepageOrder: 1,
    filterCategories: ['ERP & Business', 'Web Applications', 'AI & SaaS', 'Management Systems'],
    displaySections: ['featured', 'web-business'],
    type: 'Full-Stack Enterprise ERP Application',
    status: 'Live Production Deployment',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team',
      projectNature: 'Production-Oriented ERP & Business Management Platform',
      overview:
        'Barakah ERP was engineered to address fragmented record-keeping in retail, trading, and workshop businesses. Rather than forcing operators to switch between disconnected spreadsheets for inventory, sales invoices, mechanic job cards, and supplier ledgers, Barakah ERP consolidates every daily business workflow into a unified, responsive web application.',
      problem:
        'Businesses managing physical stock, multi-item counter sales, repair job cards, and supplier procurement frequently struggle with manual data entry bottlenecks, language barriers across operational staff, and lack of structured access control when subscriptions or user permissions change.',
      solution:
        'We architected a modular ERP frontend in Next.js paired with a backend API rewrite layer (/api/*), structured state management, client-side document OCR for rapid invoice ingestion, downloadable PDF sales bills, and full English/Urdu bidirectional (LTR/RTL) support.',
      keyFeatures: [
        {
          title: 'Multi-Module Commercial Operations',
          detail:
            'Dedicated operational views for Dashboard, Inventory, Sales (multi-item cart with editable totals and PDF invoice download), Mechanic Bills (repair-shop job cards), Supplier Purchase Bills, Salesmen, Suppliers, Zakat calculation, Notes, and Data Viewer.',
        },
        {
          title: 'In-Browser Bulk Bill OCR Pipeline',
          detail:
            'Executes optical character recognition directly in the browser using Tesseract.js for images and pdfjs-dist for PDF supplier bills, parsing line items into inventory records without requiring paid third-party OCR API keys.',
        },
        {
          title: 'Bilingual English & Urdu (RTL) Interface',
          detail:
            'Built-in internationalization (src/lib/i18n.tsx) that dynamically flips the sidebar, typography, and table flow between Left-to-Right (English) and Right-to-Left (Urdu).',
        },
        {
          title: 'Tenant Subscription Guard & Role Access',
          detail:
            'Implements a subscription state guard (components/subscription-guard.tsx) that transitions restricted or paused tenant accounts into a safe read-only mode while preserving data visibility.',
        },
        {
          title: 'Tool-Calling ERP Search Assistant',
          detail:
            'Includes a draggable bilingual assistant widget capable of navigating ERP routes and querying the signed-in user’s own records via backend tool-calling.',
        },
      ],
      architectureSummary:
        'The frontend is structured around Next.js App Router entrypoints, shared UI modules, a generated React API client (lib/api-client-react/), and Next.js /api/* rewrites that proxy authenticated requests to the backend service.',
      workflowSteps: [
        {
          step: '01',
          title: 'Authentication & Tenant Context',
          description:
            'Users authenticate via POST /api/auth/login. The session initializes tenant permissions, subscription status (active vs. read-only guard), and preferred locale (English or Urdu RTL).',
        },
        {
          step: '02',
          title: 'Procurement & OCR Stock Ingestion',
          description:
            'Supplier bills are logged manually or parsed through the client-side Tesseract.js / PDF.js OCR pipeline to update SKU quantities and supplier balances.',
        },
        {
          step: '03',
          title: 'Sales, Job Cards & PDF Invoicing',
          description:
            'Counter sales and mechanic job cards compute multi-item totals, deduct stock, and generate formatted PDF bills for immediate printing or customer sharing.',
        },
        {
          step: '04',
          title: 'Reporting & Financial Review',
          description:
            'Management reviews consolidated sales, supplier payables, inventory valuation, and Zakat calculations from the central reporting suite.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Frontend & UI Architecture',
          items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Bilingual i18n (LTR/RTL)'],
        },
        {
          layer: 'State & Data Client',
          items: ['Redux Toolkit', 'Generated React API Client', 'Next.js API Rewrites (/api/*)'],
        },
        {
          layer: 'Document & OCR Processing',
          items: ['Tesseract.js (Image OCR)', 'pdfjs-dist (PDF Parsing)', 'PDF Bill Generation'],
        },
        {
          layer: 'Backend & Persistence',
          items: ['Node.js REST API', 'MongoDB / PostgreSQL Data Layer', 'Role & Subscription Guards'],
        },
      ],
      challenges: [
        {
          challenge: 'Digitizing paper and PDF supplier invoices without recurring cloud OCR costs',
          resolution:
            'Engineered a client-side OCR module combining Tesseract.js and pdfjs-dist so users can upload bills and parse structured stock entries directly in the browser.',
        },
        {
          challenge: 'Supporting both English and Urdu operators without maintaining two separate codebases',
          resolution:
            'Implemented a centralized i18n provider that flips document direction (LTR/RTL) and sidebar positioning automatically while keeping all business logic shared.',
        },
      ],
      developmentApproach: [
        'Designed around real retail, wholesale, and workshop billing workflows rather than generic CRUD templates.',
        'Separated API client generation and authentication helpers into dedicated internal libraries for type safety.',
        'Included an interactive spotlight product tour (localStorage-tracked) so first-time evaluators and demo users can inspect every ERP module immediately.',
      ],
    },
  },
  {
    id: 'corestock',
    slug: 'corestock',
    title: 'CoreStock',
    displayTitle: 'CoreStock — Inventory & Warehouse Management Platform',
    category: 'Inventory & Warehouse Management',
    visualHierarchyLabel: 'Enterprise Inventory System',
    shortDescription:
      'An enterprise-style inventory and stock management platform designed for managing warehouse operations, stock tracking, multiple sites, and administrative workflows.',
    description:
      'An enterprise-style inventory and stock management platform designed for managing warehouse operations, stock tracking, multiple sites and administrative workflows.',
    longDescription:
      'CoreStock is a dual-application warehouse and inventory management ecosystem comprising a dedicated User Operations Panel and an Enterprise Admin Dashboard. Built with Next.js, TypeScript, Redux, Mantine UI, Material UI, and Tailwind CSS, it enables organizations to coordinate stock across multiple warehouse sites, enforce role-based permissions, track inbound/outbound inventory movements, and generate operational reports.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Mantine UI',
      'Material UI',
      'Redux',
      'REST APIs',
    ],
    allTechnologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Mantine UI',
      'Material UI',
      'Redux',
      'REST APIs',
      'Vercel',
    ],
    features: [
      'Inventory management across multiple warehouse sites',
      'Multi-site management & location scoping',
      'Real-time stock tracking & movement logs',
      'Warehouse inbound/outbound operations',
      'Dedicated Admin dashboard & User operations portal',
      'Role-based permissions (RBAC)',
      'Operational reporting dashboards',
      'REST API integration with Redux state architecture',
    ],
    screenshots: [
      {
        id: 'corestock-user-dashboard',
        label: 'User Dashboard',
        url: '/projects/corestock/user-dashboard.svg',
        caption:
          'User-facing operational dashboard (corestock-webapp) showing assigned warehouse site status, active SKU catalog, and recent site stock transfers.',
        replacementPathHint: '/public/projects/corestock/user-dashboard.svg',
      },
      {
        id: 'corestock-inventory',
        label: 'Inventory',
        url: '/projects/corestock/inventory.svg',
        caption:
          'Multi-site SKU inventory directory with search, site filtering, category segmentation, and stock availability indicators.',
        replacementPathHint: '/public/projects/corestock/inventory.svg',
      },
      {
        id: 'corestock-stock-management',
        label: 'Stock Management',
        url: '/projects/corestock/stock-management.svg',
        caption:
          'Warehouse stock movement interface for logging inbound receipts, outbound dispatches, and inter-site stock allocations.',
        replacementPathHint: '/public/projects/corestock/stock-management.svg',
      },
      {
        id: 'corestock-admin-dashboard',
        label: 'Admin Dashboard',
        url: '/projects/corestock/admin-dashboard.svg',
        caption:
          'Enterprise Admin Panel (corestock-adminapp) governing multi-site provisioning, role-based access control, and global inventory oversight.',
        replacementPathHint: '/public/projects/corestock/admin-dashboard.svg',
      },
      {
        id: 'corestock-reports',
        label: 'Reports',
        url: '/projects/corestock/reports.svg',
        caption:
          'Warehouse reporting view providing site-by-site stock distribution, movement summaries, and audit visibility.',
        replacementPathHint: '/public/projects/corestock/reports.svg',
      },
    ],
    liveUrl: 'https://corestock-webapp.vercel.app/',
    secondaryLiveUrl: {
      label: 'Live Admin Panel',
      url: 'https://corestock-adminapp.vercel.app/',
    },
    featured: true,
    homepageOrder: 2,
    filterCategories: ['ERP & Business', 'Web Applications', 'Management Systems'],
    displaySections: ['featured', 'web-business'],
    type: 'Unified User & Admin Enterprise Web Platform',
    status: 'Live Production Deployment (User + Admin Apps)',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team',
      projectNature: 'Enterprise Inventory & Multi-Site Warehouse Management System',
      overview:
        'CoreStock was built as a unified product with two specialized web interfaces: a User Panel for daily warehouse operators and site staff, and an Admin Panel for executive governance, multi-site configuration, and role-based permissions. Presenting both interfaces as a cohesive ecosystem ensures warehouse floor teams have a fast, focused workspace while administrators retain centralized oversight.',
      problem:
        'Multi-site warehouse operations require strict separation between day-to-day stock logging and high-level administrative configuration. Combining both into a single cluttered screen slows down warehouse operators, while disconnected tools cause stock discrepancies across sites.',
      solution:
        'We engineered CoreStock with two synchronized Next.js + TypeScript applications backed by Redux state management and REST APIs—combining Mantine UI and Material UI data components for dense tabular inventory workflows.',
      keyFeatures: [
        {
          title: 'Dual-Portal Ecosystem (User Panel + Admin Panel)',
          detail:
            'Separates operational warehouse tasks (corestock-webapp.vercel.app) from administrative governance and role management (corestock-adminapp.vercel.app) within one product architecture.',
        },
        {
          title: 'Multi-Site Warehouse Management',
          detail:
            'Supports multiple physical warehouse locations, allowing stock to be tracked per site and transferred with clear audit visibility.',
        },
        {
          title: 'Role-Based Permissions',
          detail:
            'Granular access control ensuring operators only modify stock within their authorized warehouse sites while administrators oversee all locations.',
        },
        {
          title: 'Enterprise Data Tables & Reporting',
          detail:
            'Uses Mantine UI, Material UI, and Tailwind CSS to deliver high-density inventory tables, filtering, and stock movement reports.',
        },
      ],
      architectureSummary:
        'Built on Next.js and TypeScript using a strongly-typed Redux architecture (typed AppDispatch thunks and slices) communicating with REST API endpoints across both the User and Admin web deployments.',
      workflowSteps: [
        {
          step: '01',
          title: 'Site & Role Provisioning (Admin Panel)',
          description:
            'Administrators configure warehouse sites, SKU categories, and role-based user permissions from the Admin Dashboard.',
        },
        {
          step: '02',
          title: 'Inbound & Outbound Stock Logging (User Panel)',
          description:
            'Warehouse staff log incoming deliveries, stock adjustments, and outbound dispatches through the User Dashboard.',
        },
        {
          step: '03',
          title: 'Multi-Site Stock Tracking',
          description:
            'Inventory levels update across sites via REST API synchronization, flagging low-stock items for replenishment.',
        },
        {
          step: '04',
          title: 'Cross-Site Reporting & Audit',
          description:
            'Managers review consolidated reports across all warehouse locations to verify stock distribution and movement history.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Frontend Applications',
          items: ['Next.js (User Web App)', 'Next.js (Admin Web App)', 'TypeScript'],
        },
        {
          layer: 'Enterprise UI Component Systems',
          items: ['Mantine UI', 'Material UI', 'Tailwind CSS'],
        },
        {
          layer: 'State & API Integration',
          items: ['Redux', 'Typed Async Thunks', 'REST APIs'],
        },
        {
          layer: 'Deployment',
          items: ['Vercel Multi-App Deployment'],
        },
      ],
      challenges: [
        {
          challenge: 'Keeping complex inventory tables responsive and usable for both floor staff and administrators',
          resolution:
            'Combined Mantine UI and Material UI table primitives with Tailwind CSS layout discipline and predictable Redux state slices.',
        },
        {
          challenge: 'Coordinating user permissions across multiple warehouse sites',
          resolution:
            'Structured role-based permissions in the Admin Panel that scope which warehouse locations and actions appear in the User Panel.',
        },
      ],
      developmentApproach: [
        'Treated the User Panel and Admin Panel as two views of a single unified warehouse product.',
        'Established a strict Redux action/reducer pattern (later reused across other enterprise projects by the team) avoiding untyped state.',
      ],
    },
  },
  {
    id: 'roadhelper',
    slug: 'roadhelper',
    title: 'RoadHelper',
    displayTitle: 'RoadHelper',
    category: 'Web + Mobile Application',
    visualHierarchyLabel: 'Web + Mobile Application',
    ecosystemBadge: 'Web + Mobile Solutions',
    shortDescription:
      'A smart road assistance platform connecting users with roadside helpers for puncture assistance, fuel delivery, battery assistance, and breakdown support.',
    description:
      'A smart road assistance platform connecting users with roadside helpers for services such as puncture assistance, fuel delivery, battery assistance and breakdown support.',
    longDescription:
      'RoadHelper demonstrates end-to-end Web + Mobile ecosystem engineering. It connects stranded motorists with nearby roadside helpers across Customer, Helper, and Admin workflows. Built with Next.js and TypeScript on the web, React Native for mobile workflows, Firebase Authentication, Firestore real-time synchronization, Firebase Storage, and interactive Leaflet/Maps location tracking, it supports on-demand requests for puncture repair, fuel delivery, battery jumpstarts, and breakdown recovery with direct WhatsApp and phone call integration.',
    technologies: [
      'Next.js',
      'TypeScript',
      'React Native',
      'Firebase',
      'Firestore',
      'Leaflet / Maps',
      'Tailwind CSS',
    ],
    allTechnologies: [
      'Next.js',
      'TypeScript',
      'React Native',
      'Firebase Auth',
      'Firebase Firestore',
      'Firebase Storage',
      'Leaflet / Maps',
      'Tailwind CSS',
      'Redux',
      'i18n Multilingual Support',
    ],
    features: [
      'Customer application workflow',
      'Roadside Helper application workflow',
      'Admin management & dispatch system',
      'Location-based map functionality (Leaflet / Maps)',
      'On-demand roadside assistance requests (puncture, fuel, battery, breakdown)',
      'Helper ratings & service verification',
      'Service catalog & status management',
      'Direct WhatsApp & phone call integration',
      'Synchronized Web + Mobile application architecture',
    ],
    screenshots: [
      {
        id: 'roadhelper-ecosystem',
        label: 'Web + Mobile Ecosystem View',
        url: '/projects/roadhelper/ecosystem-overview.svg',
        caption:
          'Unified Customer, Helper, and Admin ecosystem showing real-time map location pins, roadside service categories, and mobile helper coordination.',
        replacementPathHint: '/public/projects/roadhelper/ecosystem-overview.svg',
      },
    ],
    liveUrl: 'https://roadhelper.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Road-Helper',
    featured: true,
    homepageOrder: 3,
    filterCategories: ['Web Applications', 'Mobile Apps', 'Management Systems'],
    displaySections: ['featured', 'mobile'],
    type: 'Multi-Role Web + Mobile Application Ecosystem',
    status: 'Live Web Platform + Mobile Suite',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team',
      projectNature: 'Multi-Role Web & Mobile Roadside Assistance Ecosystem',
      overview:
        'RoadHelper was designed to solve real-time coordination between stranded drivers and nearby roadside service providers. Rather than building a static directory website, the team engineered a three-role platform (Customer, Helper, and Admin) spanning responsive web dashboards and mobile workflows backed by Firebase and live map services.',
      problem:
        'Drivers experiencing flat tires, dead batteries, empty fuel tanks, or mechanical breakdowns need immediate, location-aware connection to nearby helpers, clear service status updates, and direct communication channels via phone or WhatsApp.',
      solution:
        'We built a synchronized Web + Mobile platform using Next.js, React Native, Firebase Firestore, and Leaflet/Maps. Customers broadcast location-pinned assistance requests, nearby helpers accept and navigate to the breakdown point, and administrators oversee service categories, users, and ratings.',
      keyFeatures: [
        {
          title: 'Three Distinct Role Dashboards (Customer, Helper, Admin)',
          detail:
            'Role-secured routes and dashboards tailored for stranded motorists requesting help, service providers fulfilling jobs, and administrators governing the platform.',
        },
        {
          title: 'Interactive Map & Geolocation Tracking',
          detail:
            'Integrates Leaflet and map location services to pinpoint breakdown coordinates and connect users with nearby helpers.',
        },
        {
          title: 'Direct WhatsApp & Call Handoff',
          detail:
            'Provides one-tap WhatsApp messaging and phone call triggers so customers and helpers can coordinate exact roadside landmarks immediately.',
        },
        {
          title: 'Ratings & Service Management',
          detail:
            'Tracks service completion across puncture assistance, fuel delivery, battery support, and towing, followed by customer rating submissions.',
        },
      ],
      architectureSummary:
        'Uses Firebase Authentication, Firestore real-time collections, and Firebase Storage as the shared backend spine connecting the Next.js multi-role web platform and React Native mobile client workflows.',
      workflowSteps: [
        {
          step: '01',
          title: 'Location Capture & Service Selection',
          description:
            'The customer selects the required assistance type (puncture, fuel, battery, or breakdown) and pins their live location on the map.',
        },
        {
          step: '02',
          title: 'Helper Notification & Acceptance',
          description:
            'Available roadside helpers view incoming requests in their area, inspect the distance and service type, and accept the assignment.',
        },
        {
          step: '03',
          title: 'Direct Communication & Fulfillment',
          description:
            'Customer and helper coordinate arrival via live status updates and integrated WhatsApp/phone call actions.',
        },
        {
          step: '04',
          title: 'Completion, Rating & Admin Oversight',
          description:
            'Once resolved, the request is marked complete, the customer submits a rating, and the record is logged in the Admin dashboard.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Web Application',
          items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Mantine UI / Material UI', 'i18n'],
        },
        {
          layer: 'Mobile Application',
          items: ['React Native', 'TypeScript', 'Mobile Navigation & Geolocation'],
        },
        {
          layer: 'Maps & Communication',
          items: ['Leaflet / Maps Integration', 'WhatsApp Deep-Linking', 'Direct Call Triggers'],
        },
        {
          layer: 'Backend & Real-Time Sync',
          items: ['Firebase Authentication', 'Firebase Firestore', 'Firebase Storage', 'Redux'],
        },
      ],
      challenges: [
        {
          challenge: 'Synchronizing request state across three different user roles in real time',
          resolution:
            'Structured Firestore collections with role-aware security boundaries and Redux state synchronization so status changes propagate immediately.',
        },
        {
          challenge: 'Supporting multilingual users in stressful roadside situations',
          resolution:
            'Added i18n localization and clear iconographic service selectors alongside direct WhatsApp communication.',
        },
      ],
      developmentApproach: [
        'Architected as a complete digital product ecosystem (Customer + Helper + Admin) rather than an isolated single-user app.',
        'Prioritized fast location pinning and direct communication channels to minimize friction during roadside emergencies.',
      ],
    },
  },
  {
    id: 'ai-clinic-management',
    slug: 'ai-clinic-management',
    title: 'AI Clinic Management System',
    displayTitle: 'AI Clinic Management System',
    category: 'Healthcare Software / AI',
    visualHierarchyLabel: 'Multi-role Business Platform',
    shortDescription:
      'A multi-role clinic management platform designed for Admin, Doctor, Receptionist, and Patient workflows with digital prescriptions and AI-powered plain-language explanations.',
    description:
      'A multi-role clinic management platform designed for Admin, Doctor, Receptionist and Patient workflows.',
    longDescription:
      'AI Clinic Management System is a full-stack clinic operations web application built with Next.js 16, Firebase (Auth, Firestore, Storage, Admin SDK), Redux Toolkit, pdf-lib, and Google Gemini. It provides four role-specific dashboards (Admin, Doctor, Receptionist, and Patient) covering patient registration, appointment scheduling, patient history timelines, PDF prescription generation, and an AI Explain feature that translates structured prescription entries into readable plain-language summaries.',
    technologies: [
      'Next.js',
      'Firebase',
      'Redux Toolkit',
      'Tailwind CSS',
      'Google Gemini',
      'pdf-lib',
    ],
    allTechnologies: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'Firebase Firestore',
      'Firebase Authentication',
      'Firebase Storage',
      'firebase-admin',
      'Redux Toolkit',
      'Tailwind CSS v4',
      'Google Gemini API',
      'pdf-lib',
      'Zod',
    ],
    features: [
      'Role-based dashboards (Admin, Doctor, Receptionist, Patient)',
      'Appointment booking & status management',
      'Patient registration, search & history timeline',
      'Doctor consultation & prescription workflows',
      'Receptionist front-desk scheduling workflows',
      'Automated PDF prescription generation via pdf-lib',
      'AI-powered plain-language prescription explanations',
      'Firebase Authentication (Email/Password + Google Sign-In)',
    ],
    screenshots: [
      {
        id: 'clinic-multi-role',
        label: 'Multi-Role Dashboards & Prescription PDF / AI View',
        url: '/projects/clinic/multi-role-dashboard.svg',
        caption:
          'Role-segmented clinic management interface showing Admin, Doctor, Receptionist, and Patient views alongside pdf-lib document generation and Gemini prescription summaries.',
        replacementPathHint: '/public/projects/clinic/multi-role-dashboard.svg',
      },
    ],
    liveUrl: 'https://clinic-management-hackathon.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Clinic-Management-Web',
    featured: true,
    homepageOrder: 4,
    filterCategories: ['AI & SaaS', 'Web Applications', 'Management Systems'],
    displaySections: ['featured', 'ai-advanced'],
    type: 'Multi-Role Healthcare Workflow Software (Hackathon / Full-Stack Project)',
    status: 'Live Demo & Public Repository',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team (Full-Stack Hackathon Project)',
      projectNature: 'Multi-Role Clinic Workflow & Administrative Software Project',
      disclaimer:
        'Note: This project is presented strictly as a software engineering showcase and clinic workflow management system. It does not make medical claims, provide clinical diagnoses, or replace professional medical advice.',
      overview:
        'AI Clinic Management System was engineered to demonstrate how multi-role administrative software can streamline front-desk scheduling, doctor consultation records, and patient communication within a single Next.js 16 and Firebase application.',
      problem:
        'Small and mid-sized clinics often rely on disconnected paper registers for reception booking, manual prescription writing, and scattered patient histories—making it difficult for doctors to view chronological visit histories or for patients to access clear digital copies of their prescriptions.',
      solution:
        'We implemented a strict four-role software architecture backed by Firebase Auth and Firestore (`users/{uid}.role`), typed Redux Toolkit slices, automated server-side PDF prescription generation with `pdf-lib`, and an `/api/ai/explain` endpoint using Google Gemini to provide plain-language readability for prescription records.',
      keyFeatures: [
        {
          title: 'Four Scoped Role Dashboards',
          detail:
            'Dedicated interfaces under /dashboard/admin, /dashboard/doctor, /dashboard/receptionist, and /dashboard/patient enforced by a custom useRequireAuth role guard hook.',
        },
        {
          title: 'Patient History Timeline & Appointment Scheduling',
          detail:
            'Receptionists and admins register patients and manage appointment slots, while doctors inspect chronological appointment timelines (/patients/[id]/history) with status filters.',
        },
        {
          title: 'Digital Prescriptions & PDF Generation (pdf-lib)',
          detail:
            'Doctors create structured prescriptions with medication and dosage entries; the server route (/api/prescriptions) generates a formatted PDF via pdf-lib and uploads it to Firebase Storage.',
        },
        {
          title: 'AI Prescription Explanation (/api/ai/explain)',
          detail:
            'Integrates Google Gemini to generate a clear, plain-language explanation of a prescription record so patients can review structured medication instructions easily.',
        },
      ],
      architectureSummary:
        'Built on Next.js 16 App Router combining Firebase Client SDK for real-time auth state, Firebase Admin SDK on server routes, Zod validation, and a strongly typed Redux Toolkit store (auth, user, patient, appointment, and prescription slices).',
      workflowSteps: [
        {
          step: '01',
          title: 'Role Authentication & Guarding',
          description:
            'Users sign in via Firebase Auth; AuthStateListener synchronizes the user’s Firestore role (admin, doctor, receptionist, or patient) into Redux state.',
        },
        {
          step: '02',
          title: 'Patient Registration & Appointment Booking',
          description:
            'Receptionists register patient profiles and schedule appointments assigned to specific doctors.',
        },
        {
          step: '03',
          title: 'Consultation & PDF Prescription Generation',
          description:
            'Doctors review the patient’s history timeline and issue a prescription, triggering pdf-lib document creation and Firebase Storage archiving.',
        },
        {
          step: '04',
          title: 'Patient Portal & Plain-Language Summary',
          description:
            'Patients log into their portal to download the prescription PDF and view an AI-generated plain-language summary via the /api/ai/explain endpoint.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Application Framework',
          items: ['Next.js 16 (App Router)', 'React', 'TypeScript', 'Tailwind CSS v4', 'Zod'],
        },
        {
          layer: 'State Management',
          items: ['Redux Toolkit (createSlice, typed AppDispatch)', 'React-Redux'],
        },
        {
          layer: 'Backend & Cloud Infrastructure',
          items: ['Firebase Authentication', 'Firebase Firestore', 'Firebase Storage', 'firebase-admin'],
        },
        {
          layer: 'Document & AI Services',
          items: ['pdf-lib (Server PDF Generation)', 'Google Gemini API (/api/ai/explain)'],
        },
      ],
      challenges: [
        {
          challenge: 'Enforcing strict role boundaries across four distinct user personas in a single web app',
          resolution:
            'Combined Firestore user role documents with a reusable useRequireAuth hook and role-aware Sidebar component so each role only accesses authorized routes.',
        },
        {
          challenge: 'Generating reliable downloadable prescription documents on serverless routes',
          resolution:
            'Used pdf-lib inside the Next.js API route to programmatically construct PDF documents in memory and persist them to Firebase Storage.',
        },
      ],
      developmentApproach: [
        'Followed the team’s strict CoreStock Redux pattern: zero `any` types, explicit TypeScript interfaces in `app/types/`, and typed async thunks.',
        'Scoped AI integration to a practical, assistive text-explanation endpoint rather than autonomous clinical decision-making.',
      ],
    },
  },
  {
    id: 'helplytics',
    slug: 'helplytics',
    title: 'Helplytics',
    displayTitle: 'Helplytics',
    category: 'Helpdesk / Analytics / AI',
    visualHierarchyLabel: 'SaaS / Helpdesk / Analytics',
    shortDescription:
      'A modern helpdesk and analytics platform with AI-oriented features, notifications, messaging, request management, and interactive dashboard experiences.',
    description:
      'A modern helpdesk and analytics platform with AI-oriented features, notifications, messaging and dashboard experiences.',
    longDescription:
      'Helplytics is a modern SaaS helpdesk and analytics frontend engineered with Next.js 16 (App Router), React 19, TypeScript 5, Redux Toolkit 2, Tailwind CSS v4, and Framer Motion 12. It provides middleware-protected routes for analytics dashboards, helpdesk request creation and tracking, a dedicated AI Center, built-in user messaging, real-time notifications, an activity explore feed, and an engagement leaderboard.',
    technologies: [
      'Next.js 16',
      'React 19',
      'Redux Toolkit',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    allTechnologies: [
      'Next.js 16.2.4 (App Router)',
      'React 19',
      'TypeScript 5',
      'Redux Toolkit 2',
      'Tailwind CSS v4',
      'Framer Motion 12',
      'Axios',
      'cookies-next (Session Auth)',
      'Lucide React',
    ],
    features: [
      'Helpdesk request creation & management workflows',
      'Central analytics & user activity dashboard',
      'Dedicated AI Center module (/ai-center)',
      'Real-time notification center (/notifications)',
      'Built-in messaging interface (/messages)',
      'Explore feed & user engagement leaderboard',
      'Middleware route protection (proxy.ts) & cookie sessions',
      'Responsive SaaS UI with Framer Motion transitions',
    ],
    screenshots: [
      {
        id: 'helplytics-dashboard',
        label: 'Helpdesk, AI Center & Analytics Workspace',
        url: '/projects/helplytics/analytics-dashboard.svg',
        caption:
          'Helplytics SaaS interface featuring the analytics dashboard, helpdesk request queue, AI Center navigation, and built-in messaging modules.',
        replacementPathHint: '/public/projects/helplytics/analytics-dashboard.svg',
      },
    ],
    liveUrl: 'https://helplytics-frontend.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Helplytics-Frontend',
    featured: true,
    homepageOrder: 5,
    filterCategories: ['AI & SaaS', 'Web Applications'],
    displaySections: ['ai-advanced'],
    type: 'Modern SaaS Helpdesk & Analytics Web Application',
    status: 'Live Frontend Deployment & Public Repository',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team',
      projectNature: 'Modern SaaS Helpdesk, Messaging & Analytics Platform',
      overview:
        'Helplytics was built to showcase modern SaaS product architecture using the latest Next.js 16 and React 19 stack. It combines support ticket workflows, internal messaging, analytics views, and an AI Center into a cohesive, animated workspace.',
      problem:
        'Support and operations teams often juggle separate tools for ticket intake, internal chat, user onboarding, and activity tracking, resulting in fragmented user experiences and inconsistent state across views.',
      solution:
        'We created a unified Next.js 16 application with centralized Redux Toolkit state management, middleware-enforced authentication guards (`proxy.ts`), and dedicated functional modules for `/dashboard`, `/requests`, `/create-request`, `/messages`, `/ai-center`, `/explore`, `/leaderboard`, and `/notifications`.',
      keyFeatures: [
        {
          title: 'Helpdesk Request Lifecycle (/requests & /create-request)',
          detail:
            'Structured interfaces for submitting, browsing, and managing support requests alongside an Explore view for platform-wide activity.',
        },
        {
          title: 'Central Analytics Dashboard & Leaderboard',
          detail:
            'Displays operational activity metrics and a user engagement leaderboard (/leaderboard) in a clean SaaS layout.',
        },
        {
          title: 'Dedicated AI Center & Built-in Messaging',
          detail:
            'Provides dedicated routes for AI-assisted support workflows (/ai-center), direct messaging (/messages), and real-time notifications (/notifications).',
        },
        {
          title: 'Middleware Authentication & Onboarding Flow',
          detail:
            'Uses cookie-based session tokens (`cookies-next`) and Next.js route middleware (`proxy.ts`) to protect private workspaces and guide new users through `/onboarding`.',
        },
      ],
      architectureSummary:
        'Engineered on Next.js 16 App Router and React 19, utilizing a modular Redux store (`redux/store.ts`, `reducers/`, `actions/`), Axios REST client integration, and Framer Motion 12 layout transitions.',
      workflowSteps: [
        {
          step: '01',
          title: 'Session Authentication & Onboarding',
          description:
            'Users sign in via /login or /signup; middleware validates cookie tokens and routes authenticated users through onboarding or directly to the dashboard.',
        },
        {
          step: '02',
          title: 'Request Creation & Triage',
          description:
            'Users create helpdesk requests and explore active threads while receiving updates in the notification center.',
        },
        {
          step: '03',
          title: 'Messaging & AI Center Workflows',
          description:
            'Support interactions continue inside the built-in messaging view and the dedicated AI Center module.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Core Framework',
          items: ['Next.js 16.2.4 (App Router)', 'React 19', 'TypeScript 5'],
        },
        {
          layer: 'State & Networking',
          items: ['Redux Toolkit 2', 'React-Redux', 'Axios', 'cookies-next'],
        },
        {
          layer: 'UI & Motion Design',
          items: ['Tailwind CSS v4', 'Framer Motion 12', 'Lucide React', 'React Toastify'],
        },
      ],
      challenges: [
        {
          challenge: 'Protecting 10+ private SaaS routes cleanly without flash-of-unauthenticated-content',
          resolution:
            'Implemented centralized Next.js middleware (`proxy.ts`) paired with cookie-based auth tokens to intercept unauthenticated requests at the edge.',
        },
      ],
      developmentApproach: [
        'Adopted Next.js 16, React 19, and Tailwind CSS v4 to ensure forward-compatible SaaS frontend architecture.',
        'Included a complete Postman API collection in the repository for transparent backend endpoint verification.',
      ],
    },
  },
  {
    id: 'ai-qa-agent',
    slug: 'ai-qa-agent',
    title: 'AI QA Agent',
    displayTitle: 'AI QA Agent',
    category: 'AI Developer Tool / Automated QA',
    visualHierarchyLabel: 'AI / Developer Tool',
    shortDescription:
      'An AI-powered software testing and production-readiness platform that connects a repository, frontend URL, and backend URL to inspect software and produce evidence-backed findings.',
    description:
      'An AI-powered software testing and production-readiness platform that connects a repository, frontend URL and backend URL to inspect software and produce evidence-backed findings.',
    longDescription:
      'AI QA Agent is a multi-package monorepo engineering platform combining a Next.js + TypeScript web dashboard with an isolated Local Agent CLI (`@syedmuhammadali-dev/ai-qa-agent`). It connects a GitHub repository, frontend URL, and backend URL to execute real test suites, Playwright headless-browser smoke/accessibility (`axe-core`)/visual regression checks, API endpoint probing, static security scanning (XSS, CORS, exposed secrets), and command-policy gated auto-fix workflows—producing weighted production-readiness reports and SHA-256 verified exports.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Playwright',
      'Node.js CLI',
      'Firebase',
      'Google Gemini / BYOK AI',
    ],
    allTechnologies: [
      'Next.js (Web Dashboard)',
      'TypeScript Monorepo (pnpm)',
      'Node.js Local Agent CLI',
      'Playwright (E2E & Visual Regression)',
      'axe-core (Accessibility)',
      'Vitest',
      'GitHub OAuth & REST API',
      'Firebase Firestore & Storage',
      'OpenRouter / Gemini / OpenAI BYOK',
    ],
    features: [
      'GitHub repository & PR integration',
      'Automated project stack & architecture analysis',
      'Real test suite execution via isolated Local Agent CLI',
      'Static security scanning (XSS, CORS, exposed secrets)',
      'Playwright headless-browser E2E & visual regression testing',
      'Command policy engine (READ → BLOCKED risk gating)',
      'Evidence-backed production-readiness reports',
      'Export functionality (JSON, Markdown, HTML & SHA-256 ZIP)',
      'AI-assisted failure diagnosis & classified patch proposals',
    ],
    screenshots: [
      {
        id: 'ai-qa-agent-overview',
        label: 'Readiness Audit & Local Agent CLI Architecture',
        url: '/projects/ai-qa-agent/readiness-audit.svg',
        caption:
          'AI QA Agent dashboard and Local Agent CLI workflow showing the 11 modular inspection packages, command policy risk classification, and multi-format report exports.',
        replacementPathHint: '/public/projects/ai-qa-agent/readiness-audit.svg',
      },
    ],
    liveUrl: 'https://ai-qa-agent-web.vercel.app',
    githubUrl: 'https://github.com/syedmuhammadali-dev/ai-qa-agent',
    secondaryGithubUrl: {
      label: 'CLI Package on npm',
      url: 'https://www.npmjs.com/package/@syedmuhammadali-dev/ai-qa-agent',
    },
    featured: true,
    homepageOrder: 6,
    filterCategories: ['AI & SaaS', 'Web Applications'],
    displaySections: ['ai-advanced'],
    type: 'AI Developer Tool & Automated QA Monorepo',
    status: 'Live Web Dashboard + Published npm CLI Agent',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team (Independent Engineering Project)',
      projectNature: 'Automated QA, Code Inspection & Developer Tooling Platform',
      disclaimer:
        'Note: AI QA Agent is an automated developer inspection and QA assistance platform. It assists engineering teams with automated checks and readiness reporting, and does not replace formal manual security audits or certified third-party penetration testing.',
      overview:
        'AI QA Agent was architected to bridge the gap between cloud dashboards and real local test execution. Instead of simulating test passes in a browser, the platform pairs a Next.js web dashboard with a local CLI agent (`agents/local-agent`) that runs real test suites, Playwright browser checks, API probes, and static security scans on the developer’s machine, reporting actual exit codes and command-audit trails.',
      problem:
        'Evaluating whether a web application is ready for production involves running unit tests, E2E browser checks, accessibility audits, API health probes, and secret/XSS scans—tasks that are tedious to coordinate manually and risky to hand over to unrestricted shell agents.',
      solution:
        'We engineered a 13-workspace TypeScript monorepo (`apps/web`, `agents/local-agent`, and 11 specialized `packages/*`) governed by a strict Command Policy Engine that classifies every command by risk (`READ` → `BLOCKED`), refuses direct pushes to `main`/`master`, and requires human approval before opening a GitHub pull request.',
      keyFeatures: [
        {
          title: 'Isolated Local Agent CLI (`agents/local-agent`)',
          detail:
            'Pairs with the web dashboard so shell commands, filesystem checks, and headless Playwright browsers execute safely in an isolated local environment rather than on a shared serverless runtime.',
        },
        {
          title: 'Command Policy & Patch Risk Classification',
          detail:
            'Every command and AI-proposed patch is classified (`SAFE`, `REVIEW REQUIRED`, `DANGEROUS`). Dangerous patches cannot be auto-applied, and `git push origin main` is blocked at the policy layer.',
        },
        {
          title: 'Multi-Engine QA & Static Security Scanning',
          detail:
            'Dedicated monorepo packages for `qa-engine`, `browser-agent` (Playwright smoke, axe-core accessibility, visual regression), `api-tester`, `code-analyzer` (circular dependencies, oversized files), and `security-engine` (static secret, injection, XSS, and CORS scanning).',
        },
        {
          title: 'Transparent Readiness Reports & Verified ZIP Export',
          detail:
            'Computes a weighted production-readiness breakdown directly from real command-audit history, exportable as JSON, Markdown, HTML, or a cleaned ZIP archive with SHA-256 integrity verification.',
        },
      ],
      architectureSummary:
        'Structured as a pnpm TypeScript monorepo with `apps/web` (Next.js dashboard), `agents/local-agent` (CLI runner), and 11 modular packages (`ai`, `github`, `command-policy`, `qa-engine`, `browser-agent`, `api-tester`, `code-analyzer`, `security-engine`, `report-generator`, `project-analyzer`, `agent-core`), backed by Vitest unit/integration suites and Playwright E2E/visual tests.',
      workflowSteps: [
        {
          step: '01',
          title: 'Connect Repository, URLs & Local Agent',
          description:
            'The developer links a GitHub repository, frontend/backend URLs, and pairs the local CLI agent from their terminal.',
        },
        {
          step: '02',
          title: 'Policy-Gated Inspection & Testing',
          description:
            'The local agent executes the project’s test suite, Playwright browser checks, API probes, and static security analyzers under the user’s selected permission mode.',
        },
        {
          step: '03',
          title: 'Evidence-Backed Diagnosis & Safe Patch Review',
          description:
            'Failures are analyzed using the user’s BYOK AI key; approved safe patches are written locally and verified against the regression suite.',
        },
        {
          step: '04',
          title: 'Report Export or Human-Confirmed PR',
          description:
            'Users export the readiness report (JSON/MD/HTML/ZIP) or review the diff plan to open a branch and pull request on GitHub.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Dashboard & Monorepo',
          items: ['Next.js', 'TypeScript', 'pnpm Workspaces', 'Command Palette (Cmd/Ctrl+K)'],
        },
        {
          layer: 'QA & Analysis Packages',
          items: ['Playwright', 'axe-core', 'Vitest', 'Custom AST/Static Analyzers'],
        },
        {
          layer: 'Security & Governance',
          items: ['Command Policy Engine', 'Secret / XSS / CORS Scanner', 'SHA-256 ZIP Pipeline'],
        },
        {
          layer: 'Integrations',
          items: ['GitHub OAuth & REST Client', 'Firebase Emulator & Cloud', 'OpenRouter / Gemini / OpenAI'],
        },
      ],
      challenges: [
        {
          challenge: 'Allowing automated test execution and patch verification without risking destructive shell commands',
          resolution:
            'Built `packages/command-policy` to gate every command against risk tiers and enforce server-side blocks on dangerous operations and direct main-branch pushes.',
        },
        {
          challenge: 'Ensuring exported project archives never leak local credentials',
          resolution:
            'Created a multi-stage export pipeline that scans for secrets, cleans artifacts, validates structure, and computes a SHA-256 checksum.',
        },
      ],
      developmentApproach: [
        'Designed with a strict "evidence-only" philosophy: every finding and readiness metric is derived from actual command exit codes and audit logs.',
        'Tested against real fixture projects with intentionally seeded bugs (`fixtures/sample-projects`) to verify detection accuracy.',
      ],
    },
  },
  {
    id: 'student-portal',
    slug: 'student-portal',
    title: 'Student Portal',
    displayTitle: 'Student Portal',
    category: 'Education / Management Software',
    visualHierarchyLabel: 'Education / Management Software',
    shortDescription:
      'A student management portal designed around educational workflows including course tracking, attendance, grades, and campus announcements.',
    description:
      'A student management portal designed around educational workflows including course tracking, attendance, grades and announcements.',
    longDescription:
      'Student Portal is an educational management web application developed during the ILMA University Hackathon. Built with React, TypeScript, Node.js, MongoDB, Tailwind CSS, Material UI, and Framer Motion, it provides students and academic staff with a structured portal for tracking enrolled courses, session attendance, assessment grades, and institutional announcements.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Tailwind CSS',
    ],
    allTechnologies: [
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Tailwind CSS',
      'Material UI',
      'Framer Motion',
    ],
    features: [
      'Centralized student dashboard',
      'Enrolled course tracking & schedules',
      'Attendance monitoring logs',
      'Academic grades & assessment view',
      'Campus & course announcements',
      'Backend integration & authentication',
      'Responsive UI for desktop and mobile devices',
    ],
    screenshots: [
      {
        id: 'student-portal-dashboard',
        label: 'Student Dashboard & Academic Modules',
        url: '/projects/student-portal/portal-dashboard.svg',
        caption:
          'Student Portal interface displaying enrolled courses, attendance status, grade progression, and campus announcements.',
        replacementPathHint: '/public/projects/student-portal/portal-dashboard.svg',
      },
    ],
    liveUrl: 'https://studentportal-silk.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/ILMA-Hackathon-Event',
    featured: false,
    filterCategories: ['Web Applications', 'Management Systems'],
    displaySections: ['web-business'],
    type: 'Educational Management Web Application (Hackathon Project)',
    status: 'Live Deployment & Public Repository',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team (Team Hackathon Project — ILMA University)',
      projectNature: 'Academic & Student Workflow Portal (Hackathon Project)',
      overview:
        'Originated as a team-based hackathon project at ILMA University, Student Portal was built to centralize everyday student workflows—courses, attendance, grades, and announcements—into a clean, responsive web interface.',
      problem:
        'Students frequently have to check multiple notice boards, spreadsheets, or disconnected portals to track their course schedules, attendance standing, and semester announcements.',
      solution:
        'We developed a centralized React and TypeScript portal backed by Node.js and MongoDB that organizes course tracking, attendance records, grade summaries, and announcements in a single dashboard.',
      keyFeatures: [
        {
          title: 'Unified Student Dashboard',
          detail:
            'Presents an immediate overview of active courses, upcoming academic events, and recent announcements.',
        },
        {
          title: 'Course & Attendance Tracking',
          detail:
            'Allows students to inspect enrolled subjects and monitor session attendance records.',
        },
        {
          title: 'Grades & Announcements Feed',
          detail:
            'Organizes academic evaluation results alongside real-time campus announcements in a responsive layout.',
        },
      ],
      architectureSummary:
        'Built as a responsive React + TypeScript single-page application styled with Tailwind CSS and Material UI, paired with a Node.js and MongoDB backend for authentication and academic record persistence.',
      workflowSteps: [
        {
          step: '01',
          title: 'Student Authentication',
          description:
            'Students sign in to load their personalized academic profile and semester enrollment.',
        },
        {
          step: '02',
          title: 'Course & Attendance Review',
          description:
            'Users navigate between enrolled course modules, attendance logs, and grade summaries.',
        },
        {
          step: '03',
          title: 'Announcement Updates',
          description:
            'Departmental and event announcements are surfaced directly on the portal dashboard.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Frontend Interface',
          items: ['React', 'TypeScript', 'Tailwind CSS', 'Material UI', 'Framer Motion'],
        },
        {
          layer: 'Backend & Database',
          items: ['Node.js', 'MongoDB', 'Authentication API'],
        },
      ],
      challenges: [
        {
          challenge: 'Delivering a complete, multi-module academic portal under tight hackathon time constraints',
          resolution:
            'Modularized the UI into reusable React + TypeScript components with Tailwind CSS and Material UI to ship a cohesive, responsive experience rapidly.',
        },
      ],
      developmentApproach: [
        'Focused on clear information hierarchy so students can check attendance, courses, and announcements in seconds.',
      ],
    },
  },
  {
    id: 'field-capture',
    slug: 'field-capture',
    title: 'Field Capture',
    displayTitle: 'Field Capture',
    category: 'Business / Field Data Application',
    visualHierarchyLabel: 'Offline-First Field Data System',
    shortDescription:
      'An offline-first field data capture application for logging material deliveries, ticket photos, supplier records, and idempotent PostgreSQL synchronization.',
    description:
      'A focused real-world application for capturing and managing field information through a modern offline-capable interface with local SQLite persistence and PostgreSQL sync.',
    longDescription:
      'Field Capture (FieldCapture) is an offline-first field data capture application engineered for construction job sites and field environments with intermittent or zero cellular connectivity. It enables field personnel and foremen to photograph physical delivery tickets, enter supplier and purchase order data, log delivery notes, and persist everything locally in SQLite and sandboxed storage before automatically syncing to a Node.js + Express + TypeScript backend and PostgreSQL database with UUIDv4 idempotency protection.',
    technologies: [
      'React Native / Mobile',
      'TypeScript',
      'SQLite (Local Persistence)',
      'Node.js & Express',
      'PostgreSQL',
      'Offline Sync Manager',
    ],
    allTechnologies: [
      'React Native / Mobile Client',
      'TypeScript',
      'Local SQLite Persistence',
      'Sandboxed File Storage',
      'Node.js',
      'Express.js',
      'PostgreSQL (UNIQUE idempotency_key)',
      'Vercel Blob (Ticket Images)',
    ],
    features: [
      'Genuine offline-first local SQLite persistence',
      'Permanent local photo storage for physical delivery tickets',
      'Automatic Sync Manager (QUEUED → UPLOADING → SYNCED / FAILED)',
      'Interrupted upload & app-restart crash recovery',
      'UUIDv4 idempotency key & PostgreSQL duplicate prevention',
      'Supplier, purchase order & delivery note logging',
      'Filterable sync queue with one-tap retry & error diagnostics',
      'Built-in resilience testing suite (forced offline/online & simulated 500 outage)',
    ],
    screenshots: [
      {
        id: 'field-capture-sync',
        label: 'Offline Queue & Idempotent Sync Architecture',
        url: '/projects/field-capture/offline-queue-sync.svg',
        caption:
          'FieldCapture offline-first workflow illustrating local SQLite storage, QUEUED/UPLOADING/SYNCED state transitions, and PostgreSQL idempotency protection.',
        replacementPathHint: '/public/projects/field-capture/offline-queue-sync.svg',
      },
    ],
    liveUrl: 'https://drive.google.com/file/d/1I6V72ydhaE8eLhWVGp3xBEwO8UkDqda9/view?usp=drive_link',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Field-Capture',
    featured: false,
    filterCategories: ['ERP & Business', 'Web Applications', 'Mobile Apps'],
    displaySections: ['web-business'],
    type: 'Offline-First Field Data Capture & Sync Application',
    status: 'Public Repository & Functional Prototype',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team (Engineering Prototype)',
      projectNature: 'Offline-First Construction Material Delivery Field-Capture System',
      overview:
        'Based directly on the Field-Capture repository architecture, FieldCapture was engineered to solve a critical reliability problem in field operations: capturing material deliveries (rebar, structural steel, ready-mix concrete, lumber) in deep excavations, basements, or remote job sites where cellular connectivity drops to zero.',
      problem:
        'Standard cloud-only forms fail when field workers lose signal mid-submission, leading to lost delivery ticket photos, missing purchase order logs, or duplicate database records when workers repeatedly tap "Submit" on flaky networks.',
      solution:
        'We built an offline-first architecture where the local SQLite database is the single source of truth on the device. Every delivery record and physical ticket photo is written to local storage first, queued with a cryptographic UUIDv4 `idempotencyKey`, and transmitted by an automatic Sync Manager to a Node.js + Express + TypeScript API and PostgreSQL database (`UNIQUE(idempotency_key)`) once connectivity returns.',
      keyFeatures: [
        {
          title: 'Local SQLite Source of Truth & Sandboxed Photo Storage',
          detail:
            'Writes supplier, PO, and delivery notes to local SQLite and copies ticket photos into persistent application storage so records render reliably even in airplane mode.',
        },
        {
          title: 'Automatic Connectivity Sync Manager',
          detail:
            'Listens for network restoration and transitions records through explicit states (`QUEUED`, `UPLOADING`, `SYNCED`, `FAILED`) with multipart upload of photos and metadata.',
        },
        {
          title: 'Interrupted Upload & App-Restart Recovery',
          detail:
            'If the app is terminated while a record is in the `UPLOADING` state, initialization automatically recovers the record back to `QUEUED` with an audit note so no delivery is stranded.',
        },
        {
          title: 'End-to-End Idempotency & Deduplication',
          detail:
            'Combines UI submission throttling, client-generated UUIDv4 `idempotencyKey` values, and a PostgreSQL `UNIQUE(idempotency_key)` constraint so network retries return the existing record instead of creating duplicates.',
        },
        {
          title: 'Interactive Resilience Testing Suite',
          detail:
            'Includes built-in developer controls to toggle Forced Offline Mode, Forced Online Mode, Simulated HTTP 500 Outages, and App-Restart Crash Recovery during live evaluations.',
        },
      ],
      architectureSummary:
        'Mobile client with local SQLite persistence and connectivity-driven Sync Manager communicating via multipart POST requests to a Node.js + Express + TypeScript backend, Vercel Blob photo storage, and a PostgreSQL database.',
      workflowSteps: [
        {
          step: '01',
          title: 'On-Site Ticket Capture (Offline or Online)',
          description:
            'The foreman photographs the physical delivery ticket, logs supplier and PO details, and saves the record immediately to local SQLite with status QUEUED.',
        },
        {
          step: '02',
          title: 'Network Detection & Queue Dispatch',
          description:
            'When connectivity is available, the Sync Manager transitions queued items to UPLOADING and sends a multipart payload containing the UUIDv4 idempotencyKey.',
        },
        {
          step: '03',
          title: 'Idempotent Backend Persistence',
          description:
            'The Node.js/Express API stores the ticket photo in Vercel Blob and inserts the delivery into PostgreSQL, enforcing UNIQUE(idempotency_key) to prevent duplicates.',
        },
        {
          step: '04',
          title: 'Sync Confirmation or Retry Diagnostics',
          description:
            'Confirmed records transition to SYNCED; if a network drop or 500 outage occurs, the record is marked FAILED with diagnostic details and one-tap retry.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Client & Offline Persistence',
          items: ['Mobile Client UI', 'Local SQLite Database', 'Sandboxed Local File URIs', 'Offline Sync Manager'],
        },
        {
          layer: 'Backend API Service',
          items: ['Node.js', 'Express.js', 'TypeScript', 'Multipart Upload Pipeline'],
        },
        {
          layer: 'Cloud Storage & Database',
          items: ['PostgreSQL (UNIQUE idempotency_key)', 'Vercel Blob (Delivery Ticket Images)'],
        },
      ],
      challenges: [
        {
          challenge: 'Preventing duplicate delivery logs when field connections drop after the server receives a request but before the client receives the HTTP 200 response',
          resolution:
            'Generated a UUIDv4 idempotencyKey on the client at creation time and enforced a UNIQUE constraint in PostgreSQL so repeat transmissions safely resolve to the original record.',
        },
        {
          challenge: 'Handling app crashes or OS kills mid-upload',
          resolution:
            'Implemented a startup recovery routine that inspects any record stuck in UPLOADING state and resets it to QUEUED with an audit log.',
        },
      ],
      developmentApproach: [
        'Engineered around real distributed-systems reliability primitives (local-first storage, state machines, idempotency keys, and crash recovery).',
        'Embedded a chaos/resilience testing toolbar directly in the UI so evaluators can verify offline and failure handling firsthand.',
      ],
    },
  },
  {
    id: 'talkbridge',
    slug: 'talkbridge',
    title: 'TalkBridge',
    displayTitle: 'TalkBridge',
    category: 'Mobile Application',
    visualHierarchyLabel: 'Cross-Platform Mobile Chat App',
    shortDescription:
      'A cross-platform mobile chat application built with React Native and TypeScript, paired with the TalkBridge real-time messaging ecosystem.',
    description:
      'A cross-platform mobile chat application built with React Native and TypeScript.',
    longDescription:
      'TalkBridge Mobile App is a cross-platform mobile chat application built with React Native (0.83) and TypeScript (5.8) configured for Android and iOS builds. It forms the mobile client layer of the broader TalkBridge messaging project alongside the companion TalkBridge Node.js, Express, Socket.io, and MongoDB backend and React + Vite web client.',
    technologies: [
      'React Native',
      'TypeScript',
      'Android / iOS CLI',
      'Socket.io Ecosystem',
      'Node.js Backend',
    ],
    allTechnologies: [
      'React Native 0.83',
      'React 19.2',
      'TypeScript 5.8',
      'react-native-safe-area-context',
      'Android & iOS Native CLI',
      'Companion Backend: Node.js, Express, Socket.io, MongoDB, JWT',
    ],
    features: [
      'React Native cross-platform mobile architecture',
      'TypeScript strict typing & component structure',
      'Mobile chat UI & conversation layout',
      'Android & iOS build configuration (Metro, Gradle, CocoaPods)',
      'Part of the TalkBridge real-time messaging suite (Socket.io + Node.js backend)',
    ],
    screenshots: [
      {
        id: 'talkbridge-mobile',
        label: 'Cross-Platform Mobile Chat Architecture',
        url: '/projects/talkbridge/mobile-chat-ui.svg',
        caption:
          'TalkBridge mobile client layout and companion real-time messaging stack (React Native + TypeScript mobile client paired with Node.js/Socket.io backend).',
        replacementPathHint: '/public/projects/talkbridge/mobile-chat-ui.svg',
      },
    ],
    liveUrl: 'https://talkbridge-chatapp.vercel.app/',
    githubUrl: 'https://github.com/syedmuhammadali-dev/Talkbridge-Mobile-App',
    secondaryGithubUrl: {
      label: 'Backend Repository',
      url: 'https://github.com/syedmuhammadali-dev/Talkbridge-ChatApp-Backend',
    },
    featured: false,
    filterCategories: ['Mobile Apps'],
    displaySections: ['mobile'],
    type: 'Cross-Platform React Native Mobile Application',
    status: 'Public Mobile, Frontend & Backend Repositories',
    caseStudy: {
      attributionLabel: 'Built by the PropushHub development team (Independent Mobile & Real-Time Project)',
      projectNature: 'Cross-Platform Mobile Chat Client & Real-Time Messaging Architecture',
      overview:
        'TalkBridge was developed to explore cross-platform mobile chat architecture using React Native and TypeScript alongside a dedicated real-time messaging backend (`Talkbridge-ChatApp-Backend` built with Node.js, Express, Socket.io, MongoDB, and JWT authentication) and web frontend (`Talkbridge-ChatApp-Frontend`).',
      problem:
        'Delivering messaging experiences across mobile and web requires a clean separation between native mobile UI ergonomics (safe areas, touch navigation, cross-platform builds for Android and iOS) and the underlying real-time WebSocket/REST backend.',
      solution:
        'We structured TalkBridge across dedicated repositories: a React Native 0.83 + TypeScript 5.8 mobile project targeting Android and iOS, a React + TypeScript + Vite web client, and a Node.js + Express + Socket.io + MongoDB backend service.',
      keyFeatures: [
        {
          title: 'React Native 0.83 & TypeScript 5.8 Foundation',
          detail:
            'Configured with the React Native CLI toolchain for both Android (Gradle) and iOS (CocoaPods) native compilation and safe-area screen handling.',
        },
        {
          title: 'Mobile Chat UI Experience',
          detail:
            'Designed around clean mobile messaging layouts and responsive safe-area viewports.',
        },
        {
          title: 'Companion Real-Time Backend & Web Ecosystem',
          detail:
            'Supported by the companion TalkBridge backend (Node.js, Express, Socket.io, MongoDB, JWT auth) and web client deployed on Vercel.',
        },
      ],
      architectureSummary:
        'Multi-repository messaging architecture separating the React Native mobile client (`Talkbridge-Mobile-App`), the React + Vite web client (`Talkbridge-ChatApp-Frontend`), and the Socket.io + Express + MongoDB backend (`Talkbridge-ChatApp-Backend`).',
      workflowSteps: [
        {
          step: '01',
          title: 'Cross-Platform Mobile Build Setup',
          description:
            'Metro bundler and native Android/iOS targets compile the TypeScript React Native source code.',
        },
        {
          step: '02',
          title: 'Authentication & Session Context',
          description:
            'The companion backend handles JWT-based user authentication and MongoDB persistence.',
        },
        {
          step: '03',
          title: 'Real-Time Messaging Channel',
          description:
            'Socket.io event channels facilitate direct and group messaging across connected clients.',
        },
      ],
      techStackByLayer: [
        {
          layer: 'Mobile Application',
          items: ['React Native 0.83', 'React 19.2', 'TypeScript 5.8', 'react-native-safe-area-context'],
        },
        {
          layer: 'Native Tooling',
          items: ['React Native CLI', 'Metro Bundler', 'Android Gradle / iOS CocoaPods'],
        },
        {
          layer: 'Companion Backend & Web Suite',
          items: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'JWT Authentication', 'React + Vite Web App'],
        },
      ],
      challenges: [
        {
          challenge: 'Maintaining consistent TypeScript types and clean repository separation across mobile, web, and backend layers',
          resolution:
            'Organized TalkBridge into dedicated mobile, frontend, and backend repositories with explicit TypeScript configurations.',
        },
      ],
      developmentApproach: [
        'Built using the React Native CLI workflow (rather than a locked wrapper) so native Android and iOS build pipelines remain fully accessible.',
      ],
    },
  },
];

export const getHomepageFeaturedProjects = (): Project[] => {
  return [...PROJECTS]
    .filter((p) => p.homepageOrder !== undefined)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return PROJECTS.find((p) => p.slug === slug);
};

export const getProjectsByDisplaySection = (
  section: 'featured' | 'ai-advanced' | 'web-business' | 'mobile'
): Project[] => {
  return PROJECTS.filter((p) => p.displaySections.includes(section));
};
