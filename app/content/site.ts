/**
 * Deterministic source of truth for every piece of portfolio content.
 *
 * The public page renders from this file and nothing else, so a database
 * outage, a stale row, or a missing environment variable can never revert the
 * site to old ventures or render an empty section. Edit here to change the
 * site.
 */

export type Profile = {
  shortName: string;
  age: number;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  portrait: string;
};

export type Pillar = {
  id: string;
  name: string;
  role: string;
  url: string;
  urlLabel: string;
  secondary?: { label: string; url: string };
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Counter = {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type AchievementLine = {
  id: string;
  category: string;
  title: string;
  value: string;
  subtitle: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  skills: string[];
  active: boolean;
};

/** One run of hero subhead copy; `emphasis` is the bolded ink treatment. */
export type SubheadSegment = {
  text: string;
  emphasis?: boolean;
};

export type ProjectItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: "Shipped" | "Archived" | "Ongoing";
  award?: string;
  url?: string;
  github?: string;
  image: string;
  imageAlt: string;
};

/* ─────────────────────────── Identity ─────────────────────────── */

export const profile: Profile = {
  shortName: "Sai Amartya",
  age: 17,
  location: "Kitchener, Ontario",
  email: "saiamartya19@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/sai-amartya-balamurugan-lakshmipraba-537831371/",
  github: "https://github.com/SaiAmartya",
  portrait: "/Sai_Amartya.png",
};

export const hero = {
  badge: "Kitchener, Ontario · 17 · IB student and builder",
  headlineLead: "Building the",
  headlineAccent: "agentic",
  headlineTail: "future, one shipped system at a time.",
  subhead: [
    { text: "I am " },
    { text: profile.shortName, emphasis: true },
    { text: `, ${profile.age}. Software Engineer Intern at ` },
    { text: "Aside (YC F25)", emphasis: true },
    {
      text:
        ", an AI browser built to help people research and take action " +
        "across the web, and co-founder of ",
    },
    { text: "High Agency", emphasis: true },
    { text: ", where teens build what school does not teach." },
  ] as SubheadSegment[],
  primaryCta: { label: "See where I'm building", href: "#building" },
  secondaryCta: { label: "Say hello", href: `mailto:${profile.email}` },
  portraitAlt:
    "Portrait of Sai Amartya, a 17 year old software engineer from Kitchener, Ontario.",
  stats: [
    {
      value: "98/100",
      label: "IB average",
      position: "top-2 -left-4 md:-left-20",
      delay: "1.1s",
      float: "animate-float",
    },
    {
      value: "4th",
      label: "at FBLA nationals",
      position: "top-1/3 -right-2 md:-right-20",
      delay: "1.25s",
      float: "animate-float-slow",
    },
    {
      value: "5x",
      label: "hackathon winner",
      position: "bottom-8 -left-2 md:-left-16",
      delay: "1.4s",
      float: "animate-float-slow",
    },
    {
      value: "25M+",
      label: "organic impressions",
      position: "-bottom-4 right-0 md:-right-12",
      delay: "1.55s",
      float: "animate-float",
    },
  ],
};

/* ──────────────────── Where I'm building (now) ─────────────────── */

export const pillars: Pillar[] = [
  {
    id: "aside",
    name: "Aside",
    role: "Software Engineer Intern",
    url: "https://aside.com/",
    urlLabel: "Visit Aside",
    secondary: {
      label: "The bridge that got me in",
      url: "https://github.com/SaiAmartya/aside-telegram-bridge",
    },
    tagline:
      "An AI browser built to help people research and take action across the web, backed by Y Combinator (F25).",
    description:
      "I got the internship the long way around: I saw what the community kept asking for, built a Telegram bridge and Mini App for Aside on my own, and open sourced it. The work came first, the role came after.",
    image: "/ventures/aside-home.jpg",
    imageAlt:
      "The Aside homepage, headlined the most intelligent AI assistant, but it's a browser, with the Aside browser interface below it.",
    specs: [
      { label: "role", value: "SWE Intern" },
      { label: "backed by", value: "Y Combinator" },
      { label: "since", value: "Aug 2026" },
    ],
  },
  {
    id: "high-agency",
    name: "High Agency",
    role: "Co-Founder",
    url: "https://high-agency.io/",
    urlLabel: "Visit High Agency",
    tagline: "For teens who would rather build than wait.",
    description:
      "High Agency is a platform and intensive immersion program for ambitious teens aged 13 to 19. Accountability squads, real world milestones, and live mentors. You do not graduate by sitting through it, you prove it by shipping real things.",
    image: "/ventures/high-agency-home.jpg",
    imageAlt:
      "The High Agency homepage, headlined school is a waiting room, you weren't built to wait, with a request access form.",
    specs: [
      { label: "role", value: "Co-Founder" },
      { label: "built for", value: "Ages 13 to 19" },
      { label: "since", value: "Nov 2025" },
    ],
  },
];

/* ──────────────────────── FBLA NLC feature ─────────────────────── */

export const fbla = {
  label: "The headline win",
  headingLead: "Fourth in the nation,",
  headingAccent: "cast in glass.",
  body: [
    "At the 2026 FBLA National Leadership Conference in San Antonio I placed 4th in the nation in Organizational Leadership and walked off with FBLA glass.",
    "Getting there meant finishing top four in Canada at Canadian nationals first, then representing Canada on the NLC stage. It was also my first solo trip.",
  ],
  facts: [
    { label: "placement", value: "4th in the nation" },
    { label: "event", value: "Organizational Leadership" },
    { label: "stage", value: "FBLA NLC 2026, San Antonio" },
    { label: "representing", value: "Canada" },
  ],
  gallery: {
    lead: {
      src: "/fbla/fbla-glass-award-stage.jpg",
      alt: "Sai Amartya on stage at the 2026 FBLA National Leadership Conference, shaking hands and holding the Organizational Leadership glass award.",
      caption: "Receiving the glass on the NLC stage",
      width: 1600,
      height: 1067,
    } as GalleryImage,
    supporting: [
      {
        src: "/fbla/fbla-portrait-glass-trophy.jpg",
        alt: "Sai Amartya in a suit holding the FBLA National Leadership Conference glass award in front of a step and repeat FBLA backdrop.",
        caption: "The official portrait",
        width: 1600,
        height: 1067,
      },
      {
        src: "/fbla/fbla-nlc-venue-floor.jpg",
        alt: "Sai Amartya holding the FBLA glass award on the arena floor of the National Leadership Conference in San Antonio.",
        caption: "On the arena floor, San Antonio",
        width: 903,
        height: 1200,
      },
      {
        src: "/fbla/fbla-glass-flight-home.jpg",
        alt: "The FBLA glass award engraved 2026 FBLA High School Fourth Place Organizational Leadership, held against an aeroplane window above the clouds.",
        caption: "2026, Fourth Place, on the flight home",
        width: 963,
        height: 1280,
      },
    ] as GalleryImage[],
  },
};

/* ─────────────────────────── Proof of work ─────────────────────── */

export const counters: Counter[] = [
  { to: 4, suffix: "th", label: "in the nation at FBLA NLC" },
  { to: 5, suffix: "x", label: "hackathon wins" },
  { to: 98, suffix: "/100", label: "IB average" },
  { to: 25, suffix: "M+", label: "organic impressions" },
];

export const achievements: AchievementLine[] = [
  {
    id: "fbla-nlc-2026",
    category: "Leadership",
    title: "FBLA NLC 2026",
    value: "4th",
    subtitle: "Organizational Leadership, national glass",
  },
  {
    id: "fblc-2026",
    category: "Leadership",
    title: "Canadian nationals",
    value: "Top 4",
    subtitle: "Organizational Leadership, qualified for NLC",
  },
  {
    id: "steam-icac-2026",
    category: "Computing",
    title: "STEAM ICAC 2026",
    value: "2nd",
    subtitle: "Computer Sciences category",
  },
  {
    id: "mechmania",
    category: "Computing",
    title: "MechMania, U Waterloo",
    value: "1st",
    subtitle: "Cameron Robotics, wrote the control software",
  },
  {
    id: "hackathons",
    category: "Computing",
    title: "Hackathons",
    value: "5x wins",
    subtitle: "Weekend builds that placed",
  },
  {
    id: "ccc-2025",
    category: "Computing",
    title: "CCC 2025",
    value: "73/75",
    subtitle: "Canadian Computing Contest, 1st at school",
  },
  {
    id: "cimc-2024",
    category: "Mathematics",
    title: "CIMC 2024",
    value: "Top 500",
    subtitle: "Worldwide, 2nd at school",
  },
  {
    id: "pascal",
    category: "Mathematics",
    title: "Pascal",
    value: "Distinction",
    subtitle: "Top 25%, University of Waterloo",
  },
  {
    id: "shopify",
    category: "Entrepreneurship",
    title: "Shopify brands",
    value: "25M+",
    subtitle: "Organic impressions, profitable stores",
  },
  {
    id: "cycs-2025",
    category: "Entrepreneurship",
    title: "CYCS 2025",
    value: "Presenter",
    subtitle: "Canadian Youth Club Summit",
  },
  {
    id: "ib-average",
    category: "Academics",
    title: "IB average",
    value: "98/100",
    subtitle: "Cameron Heights C.I.",
  },
];

/* ────────────────────────── Track record ───────────────────────── */

export const experiences: ExperienceItem[] = [
  {
    id: "aside-intern",
    role: "Software Engineer Intern",
    organization: "Aside (YC F25)",
    location: "Remote",
    period: "Aug 2026 - Present",
    type: "startup",
    description:
      "Software engineering intern at Aside (YC F25), an AI browser built to help people research and take action across the web, backed by Y Combinator. I joined after independently building and open sourcing a Telegram bridge and Mini App for Aside.",
    skills: ["Software Engineering", "AI Agents", "TypeScript", "Product"],
    active: true,
  },
  {
    id: "high-agency-cofounder",
    role: "Co-Founder",
    organization: "High Agency",
    location: "Remote",
    period: "Nov 2025 - Present",
    type: "startup",
    description:
      "Co-founding a platform and intensive immersion program for ambitious teens aged 13 to 19. Accountability squads, live mentors, and real world milestones, where progress is demonstrated by shipping real things.",
    skills: ["Founding", "Community", "Program Design", "Growth"],
    active: true,
  },
  {
    id: "cameron-robotics",
    role: "Software Lead",
    organization: "Cameron Robotics",
    location: "Kitchener, ON",
    period: "2024 - Present",
    type: "extracurricular",
    description:
      "Leading software for a competitive robotics team. Wrote the robot control software and contributed to electrical work for the first place finish at MechMania, University of Waterloo.",
    skills: ["Robotics", "Control Software", "Team Leadership"],
    active: true,
  },
  {
    id: "fbla-nlc-2026-exp",
    role: "FBLA NLC 2026 Winner",
    organization: "Future Business Leaders of America",
    location: "San Antonio, Texas",
    period: "Mar 2026 - Jul 2026",
    type: "program",
    description:
      "Placed 4th in the nation in Organizational Leadership at the FBLA National Leadership Conference and earned FBLA glass, after qualifying top four at Canadian nationals and representing Canada at NLC.",
    skills: ["Organizational Leadership", "Public Speaking", "Case Analysis"],
    active: false,
  },
  {
    id: "tidaltasks",
    role: "Co-Founder",
    organization: "TidalTasks AI",
    location: "Kitchener, ON",
    period: "Mar 2025 - Jul 2026",
    type: "startup",
    description:
      "Co-founded an agentic AI productivity platform for students and launched it to hundreds of users. Led full stack development, technical architecture, and AI integration.",
    skills: ["Full-Stack Development", "AI/ML", "Product Strategy"],
    active: false,
  },
  {
    id: "canary-os",
    role: "Co-Founder",
    organization: "Canary OS",
    location: "Kitchener, ON",
    period: "Nov 2025 - Jun 2026",
    type: "startup",
    description:
      "Technical founder working on on-device ML scam detection. Integrated a MobileBERT classifier into React Native for real time, privacy first protection that runs offline.",
    skills: ["Mobile ML", "React Native", "Security"],
    active: false,
  },
  {
    id: "steam-ic",
    role: "STEAM IC winner",
    organization: "STEAM IC",
    location: "Global",
    period: "Oct 2025 - May 2026",
    type: "program",
    description:
      "Placed 2nd at STEAM ICAC 2026 in Computer Sciences for a saliency aware video compression pipeline reaching 4 to 6x improvement over H.265 on surveillance footage and 30x over raw footage.",
    skills: ["Computer Vision", "Video Compression", "Python"],
    active: false,
  },
  {
    id: "ecommerce",
    role: "Ecommerce Store Owner",
    organization: "Independent",
    location: "Kitchener, ON",
    period: "May 2024 - Jun 2026",
    type: "business",
    description:
      "Built and ran profitable Shopify brands end to end, from sourcing and supply chain to creative, generating tens of millions of organic social views.",
    skills: ["E-Commerce", "Social Media", "Supply Chain"],
    active: false,
  },
  {
    id: "start2finish",
    role: "Literacy & Fitness Coach",
    organization: "Start2Finish Online",
    location: "Remote",
    period: "Sep 2023 - Jun 2026",
    type: "volunteer",
    description:
      "Coached students in grades 1 to 3 in literacy and physical fitness, running weekly sessions and building simple frameworks young learners could stick with.",
    skills: ["Mentorship", "Education", "Communication"],
    active: false,
  },
  {
    id: "launch-waterloo",
    role: "STEAM Assistant Coach",
    organization: "LAUNCH Waterloo",
    location: "Waterloo, ON",
    period: "Sep 2023 - Mar 2024",
    type: "volunteer",
    description:
      "Mentored children in STEAM, guiding them through hardware and software programming fundamentals and their first working builds.",
    skills: ["Teaching", "Hardware/Software", "Youth Development"],
    active: false,
  },
];

/* ───────────────────────────── Archive ─────────────────────────── */

export const projects: ProjectItem[] = [
  {
    id: "aside-telegram-bridge",
    name: "Aside Telegram Bridge",
    tagline: "Your Mac's AI agent, in your pocket",
    description:
      "An open source bridge and Telegram Mini App giving two way access to an AI agent running on your Mac. Mobile interface, live messaging, and approval gates before the agent acts. Building it is how I ended up interning at Aside.",
    tech: ["TypeScript", "Telegram Bot API", "AI Agents"],
    status: "Shipped",
    award: "Open source",
    github: "https://github.com/SaiAmartya/aside-telegram-bridge",
    image: "/projects/aside-telegram-bridge.png",
    imageAlt:
      "Three screens of the Aside Telegram Mini App: the session history list, the chat composer, and the model picker.",
  },
  {
    id: "saliency-compression",
    name: "Saliency-Aware Video Compression",
    tagline: "4 to 6x better than H.265 on surveillance footage",
    description:
      "A perceptually guided compression pipeline that segments foreground from background so bits go where the eye actually looks. 4 to 6x improvement over H.265 on surveillance footage and 30x over raw.",
    tech: ["Computer Vision", "Python"],
    status: "Archived",
    award: "2nd @ STEAM ICAC 2026",
    url: "https://steaminnovationchallenge.org/",
    github: "https://github.com/SaiAmartya/steam-icac-2026",
    image: "/projects/steam-icac-saliency.png",
    imageAlt:
      "Visualization of the saliency aware video compression pipeline separating foreground subjects from background.",
  },
  {
    id: "tidaltasks-project",
    name: "TidalTasks AI",
    tagline: "Agentic productivity for students",
    description:
      "Agentic AI scheduling and time management built for students, launched to hundreds of users. Co-founded and led full stack development. Mar 2025 to Jul 2026.",
    tech: ["Next.js", "Vertex AI", "Firestore"],
    status: "Archived",
    url: "https://tidaltasks.app/",
    image: "/tidaltasks_agentic_workflow_3d_render.jpeg",
    imageAlt:
      "Abstract 3D render of the TidalTasks agentic workflow, showing linked nodes flowing into one another.",
  },
  {
    id: "canary-os-project",
    name: "Canary OS",
    tagline: "On-device realtime ML scam detection",
    description:
      "A MobileBERT text classifier running inside React Native for real time, offline scam detection, so nothing leaves the device. Nov 2025 to Jun 2026.",
    tech: ["Machine Learning", "React Native", "MobileBERT"],
    status: "Archived",
    url: "https://canary-os.vercel.app/",
    image: "/canary_os_on_device_protection.jpeg",
    imageAlt:
      "Stylized render of the Canary OS on-device protection concept, a golden canary guarding a circuit landscape.",
  },
  {
    id: "shurplus",
    name: "Shurplus",
    tagline: "Food rescue logistics",
    description:
      "Dual engine automated logistics platform for food rescue, with inventory agents that read barcodes and photos to triage stock and route volunteers.",
    tech: ["Python", "AI Agents", "Barcode API"],
    status: "Shipped",
    award: "3rd @ NeoDev Hackathon",
    url: "https://shurplus.vercel.app/",
    github: "https://github.com/SaiAmartya/sharingsurplus",
    image: "/projects/shurplus.jpg",
    imageAlt:
      "The Shurplus dashboard showing meals served, active drivers, incoming logistics, and an operations copilot.",
  },
  {
    id: "ecommerce-project",
    name: "E-Commerce Brands",
    tagline: "Operational excellence",
    description:
      "Profitable Shopify brands built and run solo since grade 9, from supply chain to creative, generating tens of millions of organic social views.",
    tech: ["Shopify", "Social Media", "Supply Chain"],
    status: "Archived",
    award: "25M+ organic impressions",
    image: "/projects/ecommerce.jpg",
    imageAlt:
      "Stylized render of a Shopify shopping bag with a green growth arrow rising through it.",
  },
  {
    id: "image-colourizer",
    name: "AI Image Colourizer",
    tagline: "CNN image processing",
    description:
      "A convolutional neural network that colourizes black and white photographs, built as a final project for an introductory computer science course.",
    tech: ["Python", "TensorFlow", "CNN"],
    status: "Archived",
    award: "CS final project",
    github: "https://github.com/SaiAmartya/Image-Colourizer",
    image: "/projects/image-colourizer.jpg",
    imageAlt:
      "Illustration of a black and white photograph being restored to full colour by a neural network.",
  },
  {
    id: "portfolio",
    name: "This Site",
    tagline: "Full-stack portfolio",
    description:
      "The page you are reading. Next.js and Tailwind, with a Golden Hour design system of liquid glass, drifting clouds, and a receipt that prints the proof.",
    tech: ["Next.js", "React", "Tailwind"],
    status: "Shipped",
    url: "https://saiamartya.vercel.app/",
    github: "https://github.com/SaiAmartya/brag_site",
    image: "/projects/portfolio-site.jpg",
    imageAlt:
      "The Sai Amartya portfolio homepage, a warm cream and orange page headlined building the agentic future.",
  },
];

/* ───────────────────────────── Chrome ──────────────────────────── */

export const navSections = [
  { id: "building", label: "Building" },
  { id: "fbla", label: "FBLA" },
  { id: "achievements", label: "Wins" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export const marqueeItems = [
  "Agentic AI",
  "High agency",
  "Full-stack ownership",
  "Ship first",
  "Competitive rigor",
  "Own it end to end",
];

export const footer = {
  status: "Shipping at Aside (YC F25)",
  version: "v2026.08",
};
