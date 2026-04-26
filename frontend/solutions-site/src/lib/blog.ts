import type { Metadata } from 'next';
import { buildMetadata } from './seo';

/* ─────────────────────────── types ─────────────────────────── */

export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  listItems?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;     // ISO 8601, e.g. "2026-04-10"
  readTime: string; // e.g. "8 min read"
  category: string;
  tags: string[];
  content: ContentSection[];
}

/* ─────────────────────────── posts ─────────────────────────── */

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-the-right-lms',
    title: 'How to Choose the Right LMS for Your Business',
    excerpt:
      'With dozens of learning management systems on the market — from Moodle to bespoke platforms — choosing the right one for your organisation is a critical decision. This guide walks you through the key considerations.',
    author: 'HostingOcean Solutions',
    date: '2026-04-10',
    readTime: '9 min read',
    category: 'LMS Development',
    tags: ['LMS', 'Moodle', 'e-learning', 'custom LMS', 'learning platform', 'LMS comparison'],
    content: [
      {
        paragraphs: [
          'Choosing a learning management system is one of the most consequential technology decisions an L&D team, training company, or corporate HR department will make. The wrong choice means years of working around limitations; the right one means scalable, cost-effective delivery of learning at any volume.',
          'The challenge is that "best LMS" means something completely different depending on your organisation\'s size, content types, integration requirements, and long-term ambitions. This guide cuts through the noise.',
        ],
      },
      {
        heading: 'What Does an LMS Actually Do?',
        paragraphs: [
          'At its core, an LMS handles three things: storing and delivering learning content, tracking learner progress and completion, and reporting on outcomes. Beyond that core, modern platforms vary enormously — some include live virtual classrooms, some generate compliance certificates, some connect deeply with HR systems, and some support complex multi-tenant architectures where each client gets their own branded space.',
          'Before evaluating any platform, get clear on which of these capabilities you actually need versus which are nice-to-have. A list of 80 features means nothing if 70 of them will never be used.',
        ],
      },
      {
        heading: 'Key Considerations Before You Evaluate',
        paragraphs: [
          'Run through these questions before opening a single vendor demo:',
        ],
        listItems: [
          'Scale: How many learners now, and in three years? Will you ever need multi-tenancy?',
          'Content: SCORM, xAPI, video, live webinars, assessments — what formats do your courses use?',
          'Integrations: Does it need to connect to your HR system, CRM, SSO provider, or payment gateway?',
          'Administration: How technical is your admin team? Do you need a simple interface or fine-grained control?',
          'Compliance: Are you in a regulated sector? Do you need audit trails, expiry reminders, or certificate management?',
          'Budget: Licence fees, hosting, implementation, and ongoing support all factor in — not just the sticker price.',
        ],
      },
      {
        heading: 'Hosted SaaS vs Self-Hosted: The Core Trade-off',
        paragraphs: [
          'SaaS LMS platforms (TalentLMS, LearnDash, 360Learning) are faster to get started with and outsource hosting concerns. You pay a monthly or annual licence and get a managed system. The trade-off is that you are bound by their feature roadmap, their data residency policies, and their pricing as you scale.',
          'Self-hosted platforms — most commonly Moodle — give you full control over data, infrastructure, customisation, and cost at scale. The trade-off is that you need either in-house expertise or a development partner to manage installation, upgrades, plugins, and performance tuning.',
        ],
      },
      {
        heading: "Moodle: Still the World's Most Widely Used LMS",
        paragraphs: [
          'Moodle powers over 300 million learners globally and for good reason. It is open-source, endlessly extensible, and when hosted correctly, extremely cost-effective at scale. A well-configured Moodle installation with the right plugins can handle compliance training, certification programmes, blended learning, and multi-organisation deployments.',
          'Where Moodle falls short out of the box is modern UX. The default interface is functional but dated. The solution — one we implement regularly — is custom theming, a stripped-down interface configuration, and frontend development to make Moodle feel like a product your learners actually want to use.',
        ],
      },
      {
        heading: 'When a Custom LMS Makes Sense',
        paragraphs: [
          'Most organisations do not need a custom LMS. But for a few specific use cases it is clearly the right call: when you are building a commercial training product where the platform itself is part of your proposition, when your learning model is genuinely novel and no existing platform supports it, or when the total cost of licences and customisation on a third-party platform over five years exceeds what a bespoke build would cost.',
          'Custom does not mean starting from scratch. We often build custom LMS platforms on top of solid open-source foundations, adding the specific workflows, integrations, and front-end experience the client needs while standing on proven authentication, course delivery, and data layers.',
        ],
      },
      {
        heading: 'Questions to Ask Any LMS Vendor',
        listItems: [
          'What does the migration path look like if we outgrow this platform?',
          'Where is our data stored, and what are your data residency guarantees?',
          'What is the SLA for uptime, and what happens during an outage?',
          'Can we customise the interface, or are we limited to brand colours and a logo?',
          'What is the pricing model at 5×, 10×, and 50× our current learner volume?',
          'Do you have customers in our sector, and can we speak with them?',
        ],
      },
      {
        heading: 'Our Recommendation',
        paragraphs: [
          'For most small-to-mid-sized organisations running internal training or compliance programmes, a well-configured Moodle installation is the most cost-effective and flexible option. For commercial training products with strong branding requirements, a custom LMS built on solid foundations gives you the control you need.',
          'The worst outcome is choosing a SaaS platform at low volume, growing into it, and then discovering that migrating off is prohibitively expensive. Make the decision with your five-year plan in mind, not just your needs today.',
        ],
      },
    ],
  },
  {
    slug: 'rag-chatbots-for-business',
    title: 'RAG Chatbots for Business: Beyond Simple FAQ Bots',
    excerpt:
      'Retrieval-Augmented Generation (RAG) is the architecture behind genuinely useful AI chatbots — ones that answer questions from your actual documentation, not generic training data. Here is what every business leader needs to understand.',
    author: 'HostingOcean Solutions',
    date: '2026-03-25',
    readTime: '7 min read',
    category: 'AI Chatbots',
    tags: ['AI chatbot', 'RAG', 'OpenAI', 'vector database', 'chatbot development', 'GPT'],
    content: [
      {
        paragraphs: [
          'Most businesses that tried a chatbot in 2022 came away disappointed. The bot answered questions its training data knew, hallucinated answers it did not, and could not tell a customer anything specific about their account, their order, or your actual policies.',
          'RAG — Retrieval-Augmented Generation — is the architectural shift that changes that. It is why the AI chatbots being built in 2025 and 2026 are genuinely useful rather than frustrating, and why your competitors are investing in them.',
        ],
      },
      {
        heading: 'What Is RAG, and Why Does It Matter?',
        paragraphs: [
          'A traditional LLM (large language model) generates answers from patterns in its training data. It knows a lot, but it does not know your documentation, your product catalogue, your HR policies, or your customer data.',
          'RAG combines two systems: a retrieval system that fetches the most relevant pieces of your actual content, and a language model that uses that retrieved content to generate a grounded, accurate answer. The model is not guessing — it is summarising and synthesising real documents that have been fetched specifically for the question being asked.',
        ],
      },
      {
        heading: 'How It Works in Practice',
        listItems: [
          'Your documents (PDFs, web pages, knowledge base articles, manuals) are split into chunks and converted to vector embeddings — mathematical representations of meaning.',
          'Those embeddings are stored in a vector database (Pinecone, Weaviate, pgvector, etc.).',
          'When a user asks a question, the question is also converted to an embedding and used to find the most semantically similar document chunks.',
          'Those chunks are passed to the LLM as context, along with the user\'s question.',
          'The LLM generates a response grounded in those specific documents, reducing hallucination dramatically.',
        ],
      },
      {
        heading: 'Real Business Use Cases',
        listItems: [
          'Customer support: Answer common queries from your help documentation 24/7 without human intervention.',
          'Internal knowledge base: Let staff ask plain-English questions about HR policies, onboarding docs, or internal processes.',
          'Legal and compliance: Give trained staff quick access to complex regulatory guidance without reading entire documents.',
          'Product support: Guide customers through setup, troubleshooting, and configuration using your actual product manuals.',
          'Sales enablement: Help sales staff quickly find the right case study, pricing information, or product comparison.',
        ],
      },
      {
        heading: 'What Makes a Good RAG Implementation',
        paragraphs: [
          'The quality of a RAG chatbot is determined almost entirely by the quality of the underlying data and the retrieval system, not the choice of LLM. A well-chunked, well-indexed knowledge base with good metadata filtering will dramatically outperform a poorly prepared one, regardless of whether you use GPT-4o or Claude.',
          'Evaluation matters too. We build test suites of real questions the bot should answer correctly and measure accuracy before any chatbot goes to production. A chatbot that confidently gives wrong answers is worse than no chatbot at all.',
        ],
      },
      {
        heading: 'Key Technology Choices',
        paragraphs: ['The main components to decide on:'],
        listItems: [
          'LLM provider: OpenAI (GPT-4o), Anthropic (Claude), or open-source models like Llama 3',
          'Vector store: pgvector (Postgres) for simplicity, Pinecone for scale, Weaviate for hybrid search',
          'Orchestration: LangChain or LlamaIndex to manage retrieval pipelines, prompt management, and tool calling',
          'Interface: Embedded web widget, Slack integration, WhatsApp via Twilio, or full custom UI',
        ],
      },
      {
        heading: 'Common Mistakes to Avoid',
        listItems: [
          'Putting the bot live before testing it on real user questions — users will find every gap',
          'Not updating the knowledge base as your documentation changes',
          'Using chunk sizes that are too large (retrieves too much noise) or too small (loses context)',
          'Failing to implement a feedback loop so the bot can improve over time',
          'Not filtering retrieved documents by access level — returning confidential content to the wrong users',
        ],
      },
      {
        heading: 'Getting Started',
        paragraphs: [
          'The best way to evaluate RAG for your business is a focused proof-of-concept: pick one well-defined use case, prepare a clean knowledge base of 50–200 documents, and build a working prototype in two to four weeks. You will have a concrete answer to "does this work for us?" rather than a vendor promise.',
          'We build RAG chatbots for legal, healthcare, education, and e-commerce clients — always starting with a scoped proof of concept before moving to production. Get in touch if you want to understand what is possible for your use case.',
        ],
      },
    ],
  },
  {
    slug: 'fixed-price-vs-time-and-materials',
    title: 'Fixed-Price vs Time-and-Materials: The Honest Guide for Buyers',
    excerpt:
      'Most agencies push time-and-materials contracts because the risk sits entirely with you. Fixed-price projects are absolutely viable — if the scope is clear. Here is what you need to know before signing either.',
    author: 'HostingOcean Solutions',
    date: '2026-03-10',
    readTime: '6 min read',
    category: 'Project Management',
    tags: [
      'fixed price software',
      'software contracts',
      'project management',
      'software development pricing',
      'T&M contract',
    ],
    content: [
      {
        paragraphs: [
          'When you engage a software development agency, you will almost always be offered a choice of contract types: fixed-price or time-and-materials (T&M). Most agencies will steer you towards T&M. There is a reason for that — and it is not primarily in your interest.',
          'This article explains both models honestly, including when each is appropriate, and what you should insist on regardless of which you choose.',
        ],
      },
      {
        heading: 'How Time-and-Materials Works',
        paragraphs: [
          'In a T&M contract, you pay for the hours worked at an agreed day or hourly rate. The scope can change as the project progresses. If the project takes longer than estimated, you pay more.',
          'Agencies favour T&M because it eliminates their delivery risk. If requirements change, if the scope was underestimated, or if the project simply runs over — those costs transfer to you. For exploratory work or research spikes, this can be appropriate. For a defined deliverable with a clear outcome, it often is not.',
        ],
      },
      {
        heading: 'The Problems with T&M for Defined Projects',
        listItems: [
          'You carry all the financial risk — cost overruns come directly out of your budget',
          'There is less incentive for the agency to work efficiently; longer equals more revenue',
          'Budget planning is difficult when the final cost is unknown',
          'Scope creep is easy — small additions accumulate until the project doubles in cost',
          'It is hard to hold the agency accountable for delivery against a moving target',
        ],
      },
      {
        heading: 'How Fixed-Price Works',
        paragraphs: [
          'In a fixed-price project, the agency agrees to deliver a defined scope for an agreed price. The risk of overruns sits with the supplier, not the client. If the project takes more effort than estimated, that is the agency\'s problem to solve.',
          'The key requirement is a clear, agreed scope. Fixed-price contracts work when requirements are defined well enough that both parties understand exactly what will be built. This usually means a discovery phase before the quote — which any good agency should offer.',
        ],
      },
      {
        heading: 'Myths About Fixed-Price Projects',
        listItems: [
          '"Fixed-price means no flexibility" — Not true. Change requests can be handled as separate mini-scopes with their own pricing.',
          '"Agencies will cut corners to protect their margin" — A concern with low-quality agencies, but not how good shops operate. Reputation and repeat business matter more than short-term margin.',
          '"Only simple projects can be fixed-price" — Complex projects can absolutely be fixed-price if the discovery phase is thorough enough.',
          '"You get less attention on fixed-price" — Actually, good agencies focus more on efficiency and delivery under a fixed-price model.',
        ],
      },
      {
        heading: 'When T&M Is Appropriate',
        paragraphs: [
          'T&M is genuinely the right model for exploratory work where the outcome is not yet defined — research spikes, prototyping, or discovery phases where you are still figuring out what to build. It can also make sense for ongoing retainer work where the volume of requests is unpredictable.',
          'The mistake is using T&M for work that is well-defined. If you can describe the outcome clearly, you should be able to get a fixed price for it.',
        ],
      },
      {
        heading: 'What You Should Always Insist On',
        listItems: [
          'A detailed scope document that describes exactly what will be built',
          'A change control process with clear pricing for additions',
          'Milestone-based payments tied to deliverables, not time elapsed',
          'Code ownership and IP assignment to you on completion',
          'A handover plan including documentation and knowledge transfer',
        ],
      },
      {
        heading: 'Our Approach',
        paragraphs: [
          'We offer fixed-price projects for all well-defined work. We run a paid discovery phase first to produce the scope document and technical plan — this costs a few hundred pounds and means the main quote is accurate rather than padded with contingency.',
          'We also offer monthly retainers for ongoing development work where the volume varies. But for a defined project with a clear outcome, we will always quote a price and stand behind it.',
        ],
      },
    ],
  },
  {
    slug: 'automating-business-workflows',
    title: 'Automating Your Business Workflows: Where to Start',
    excerpt:
      'Automation is one of the highest-ROI investments a growing business can make — but most automation projects fail because they start in the wrong place. Here is a practical framework for getting it right.',
    author: 'HostingOcean Solutions',
    date: '2026-02-18',
    readTime: '8 min read',
    category: 'Automation',
    tags: [
      'business automation',
      'workflow automation',
      'n8n',
      'API integration',
      'process automation',
      'Zapier alternative',
    ],
    content: [
      {
        paragraphs: [
          'Every growing business reaches the point where the gap between what the team can manually process and what the business actually needs to process becomes a real constraint. Orders fall through the cracks. Reports take days to compile. New staff are onboarded with a 20-step checklist that lives in someone\'s head.',
          'Automation is the answer — but the approach matters enormously. This is a practical guide to starting well.',
        ],
      },
      {
        heading: 'Why Most Automation Projects Fail',
        paragraphs: [
          'The most common mistake is automating a broken process. If the underlying workflow is poorly defined, has manual exceptions everywhere, or relies on tribal knowledge, automating it just makes a mess faster. The second most common mistake is starting with the most complex, highest-visibility process — which maximises the risk of failure and minimises the learning you get from early wins.',
          'Good automation projects start small, deliver a clear result, and build institutional confidence in automation as a practice before tackling complex workflows.',
        ],
      },
      {
        heading: 'The Right Starting Point',
        paragraphs: ['Look for processes that meet these criteria:'],
        listItems: [
          'High frequency — the task happens dozens or hundreds of times per week',
          'Consistent inputs and outputs — it follows the same steps every time',
          'Low exception rate — less than 10–15% of cases need human judgment',
          'Clear trigger — there is an obvious event that starts the process',
          'Measurable — you can count the time or error rate before and after',
        ],
      },
      {
        heading: 'A Quick Audit',
        paragraphs: [
          'Spend 30 minutes with your team listing every recurring task that costs someone more than an hour per week. Rank them by frequency × manual effort. The top three items on that list are your starting point. Ignore the rest until you have shipped the first automation successfully.',
        ],
      },
      {
        heading: 'Tools Overview',
        paragraphs: [
          'For low-code automation between SaaS tools, Zapier and Make (formerly Integromat) work well. They have pre-built connectors to hundreds of services and are accessible to non-developers. The trade-off is cost at scale (pricing is per-task), limited control over error handling, and difficulty managing complex conditional logic.',
          'n8n is the open-source alternative that we use for most client projects. It is self-hosted (so no per-task pricing), has full code escape hatches for complex logic, and handles multi-step workflows with branching and error handling cleanly. For anything beyond simple two-step integrations, n8n is almost always the better choice.',
        ],
      },
      {
        heading: 'Connecting Your Tools with Custom APIs',
        paragraphs: [
          'Many automation requirements cannot be satisfied with pre-built connectors. Your CRM may have a proprietary API, your ERP may expose data via SFTP, or you may need to push data into a legacy system that has no integration ecosystem.',
          'This is where custom API development becomes part of the automation stack. We regularly build lightweight middleware services — small Node.js or Python applications — that sit between systems, handle authentication and transformation, and expose clean webhooks or REST endpoints that automation tools can call.',
        ],
      },
      {
        heading: 'A Real Example',
        paragraphs: [
          'One client received new training requests via a web form, which were manually copied into their LMS, their CRM, and an invoice spreadsheet — a process that took 15 minutes per request and introduced errors at each handoff.',
          'The automated version: form submission triggers an n8n workflow that creates the learner account in Moodle, creates a deal in HubSpot, generates a PDF invoice via their accounting API, and sends a welcome email — all in under 10 seconds. The team now handles 3× the volume with less staff time and zero data entry errors.',
        ],
      },
      {
        heading: 'What to Avoid',
        listItems: [
          'Automating before you have documented and validated the manual process',
          'Building a single automation that does too many things — keep each workflow focused',
          'Ignoring error handling — every automation needs a path for failures',
          'Not alerting anyone when something breaks — silent failures are worse than no automation',
          'Locking automation logic into a tool you do not control or cannot export from',
        ],
      },
      {
        heading: 'Getting Started',
        paragraphs: [
          'The best first automation is the one that solves a pain point your team mentions every week. Pick it, document the exact steps, build the automation, test it with real data, and monitor it for two weeks before moving on.',
          'If you want an outside perspective on where automation can help your business, we offer a free 30-minute consultation — no obligation, no sales pitch, just an honest assessment of where the highest-value opportunities are.',
        ],
      },
    ],
  },
];

/* ─────────────────────────── helpers ─────────────────────────── */

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, category: string, limit = 2): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function buildPostMetadata(post: BlogPost): Metadata {
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
  });
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
