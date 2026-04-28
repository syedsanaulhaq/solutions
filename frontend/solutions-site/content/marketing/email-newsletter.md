# Email Newsletter — HostingOcean Solutions Platform Launch

## Subject Line Options

1. **"We built the studio we always wanted to work with"** (personal/story)
2. **"HostingOcean Solutions is live — AI Chatbots, LMS, and Automation"** (direct/announcement)
3. **"Custom software without the guesswork"** (benefit-led)
4. **"Your shortlist for 2025/2026 tech projects"** (relevance framing)
5. **"The pricing calculator that replaces 'contact us for pricing'"** (feature-led)

**Recommended:** Option 2 for cold/warm list; Option 1 for engaged/personal list.

---

## HTML Email Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HostingOcean Solutions is live</title>
  <style>
    body { margin: 0; padding: 0; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: #0F172A; padding: 40px 40px 32px; }
    .header h1 { color: #38BDF8; font-size: 22px; font-weight: 700; margin: 0 0 8px; }
    .header p { color: #94A3B8; font-size: 14px; margin: 0; }
    .content { padding: 40px; }
    .intro { font-size: 16px; line-height: 1.7; color: #1E293B; margin-bottom: 32px; }
    .service-block { background: #F1F5F9; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
    .service-block h3 { font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 8px; }
    .service-block p { font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 12px; }
    .service-link { color: #2563EB; font-size: 14px; font-weight: 600; text-decoration: none; }
    .cta-section { background: #2563EB; border-radius: 8px; padding: 32px; text-align: center; margin: 32px 0; }
    .cta-section h2 { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0 0 12px; }
    .cta-section p { color: #BFDBFE; font-size: 14px; margin: 0 0 24px; }
    .cta-button { display: inline-block; background: #ffffff; color: #2563EB; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 8px; }
    .secondary-cta { text-align: center; margin: 8px 0 32px; }
    .secondary-link { color: #2563EB; font-size: 14px; font-weight: 500; text-decoration: none; }
    .blog-section { border-top: 1px solid #E2E8F0; padding-top: 32px; }
    .blog-section h3 { font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 16px; }
    .blog-item { padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
    .blog-item a { color: #2563EB; font-size: 14px; font-weight: 600; text-decoration: none; display: block; margin-bottom: 4px; }
    .blog-item span { color: #94A3B8; font-size: 12px; }
    .footer { background: #F8FAFC; padding: 32px 40px; border-top: 1px solid #E2E8F0; }
    .footer p { font-size: 12px; color: #94A3B8; line-height: 1.6; margin: 0 0 8px; }
    .footer a { color: #64748B; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>HostingOcean Solutions</h1>
      <p>Custom AI, LMS & Automation for growing businesses</p>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="intro">
        <p>Hi [First Name],</p>
        <p>We've just launched <strong>HostingOcean Solutions</strong> — a custom software studio for businesses that have outgrown off-the-shelf tools and need something built exactly right.</p>
        <p>Three service areas. One team. Transparent pricing.</p>
      </div>

      <!-- Service: AI Chatbot -->
      <div class="service-block">
        <h3>🤖 AI Chatbot Development</h3>
        <p>RAG-powered chatbots built around your knowledge base. Enterprise security, SSO, source citations, and human escalation built in. Deployed in 8–14 weeks.</p>
        <a href="https://solutions.hostingocean.co.uk/solutions/chatbot" class="service-link">Explore AI Chatbot →</a>
      </div>

      <!-- Service: LMS -->
      <div class="service-block">
        <h3>🎓 LMS Builder</h3>
        <p>Custom learning management platforms for training providers, enterprises, and commercial e-learning products. SCORM, xAPI, multi-tenant, white-label. When Moodle isn't enough.</p>
        <a href="https://solutions.hostingocean.co.uk/solutions/lms-builder" class="service-link">Explore LMS Builder →</a>
      </div>

      <!-- Service: Automation -->
      <div class="service-block">
        <h3>⚡ Automation & Integrations</h3>
        <p>We map your manual processes, encode the business rules, and connect the systems. Average payback period: 12–18 months. Most automations built in under 4 weeks.</p>
        <a href="https://solutions.hostingocean.co.uk/solutions/automation" class="service-link">Explore Automation →</a>
      </div>

      <!-- Primary CTA -->
      <div class="cta-section">
        <h2>Get an instant price estimate</h2>
        <p>Our pricing calculator gives you a ballpark for your project based on type, complexity, timeline, and add-ons. No "contact us for pricing" black box.</p>
        <a href="https://solutions.hostingocean.co.uk/pricing-calculator" class="cta-button">Try the Pricing Calculator</a>
      </div>

      <div class="secondary-cta">
        <a href="https://solutions.hostingocean.co.uk/get-a-quote" class="secondary-link">Or submit a detailed project brief →</a>
      </div>

      <!-- Blog highlights -->
      <div class="blog-section">
        <h3>From our blog</h3>

        <div class="blog-item">
          <a href="https://solutions.hostingocean.co.uk/blog/complete-guide-building-custom-lms-from-scratch">The Complete Guide to Building a Custom LMS from Scratch</a>
          <span>14 min read · LMS Development</span>
        </div>

        <div class="blog-item">
          <a href="https://solutions.hostingocean.co.uk/blog/enterprise-ai-chatbot-implementation-guide">Enterprise AI Chatbot Implementation: The Complete Playbook</a>
          <span>16 min read · AI Chatbots</span>
        </div>

        <div class="blog-item">
          <a href="https://solutions.hostingocean.co.uk/blog/complete-guide-business-automation-roi">The Business Owner's Complete Guide to Automation ROI</a>
          <span>13 min read · Automation</span>
        </div>

        <div class="blog-item">
          <a href="https://solutions.hostingocean.co.uk/blog/api-first-development-scalable-backend-systems">API-First Development: Building Backend Systems That Scale</a>
          <span>12 min read · Node.js</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>You're receiving this because you subscribed to HostingOcean Solutions updates. <a href="{unsubscribe_link}">Unsubscribe</a></p>
      <p>HostingOcean Solutions · <a href="https://solutions.hostingocean.co.uk">solutions.hostingocean.co.uk</a></p>
      <p>© 2025 HostingOcean Solutions. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

---

## Plain Text Version

```
HOSTINGOCEAN SOLUTIONS IS LIVE

Hi [First Name],

We've just launched HostingOcean Solutions — a custom software studio for businesses that have outgrown off-the-shelf tools.

Three service areas. One team. Transparent pricing.

---

🤖 AI CHATBOT DEVELOPMENT
RAG-powered chatbots built around your knowledge base. Enterprise security, SSO, source citations, and human escalation built in. Deployed in 8–14 weeks.
→ solutions.hostingocean.co.uk/solutions/chatbot

🎓 LMS BUILDER
Custom learning management platforms for training providers, enterprises, and commercial e-learning products. SCORM, xAPI, multi-tenant, white-label.
→ solutions.hostingocean.co.uk/solutions/lms-builder

⚡ AUTOMATION & INTEGRATIONS
We map your manual processes, encode the business rules, and connect the systems. Average payback: 12–18 months.
→ solutions.hostingocean.co.uk/solutions/automation

---

GET AN INSTANT PRICE ESTIMATE

Our pricing calculator gives you a ballpark for your project based on type, complexity, timeline, and add-ons. No black box pricing.
→ solutions.hostingocean.co.uk/pricing-calculator

Or submit a detailed brief: solutions.hostingocean.co.uk/get-a-quote

---

FROM OUR BLOG

The Complete Guide to Building a Custom LMS (14 min)
→ solutions.hostingocean.co.uk/blog/complete-guide-building-custom-lms-from-scratch

Enterprise AI Chatbot Implementation Playbook (16 min)
→ solutions.hostingocean.co.uk/blog/enterprise-ai-chatbot-implementation-guide

Complete Guide to Automation ROI (13 min)
→ solutions.hostingocean.co.uk/blog/complete-guide-business-automation-roi

---

You're receiving this because you subscribed to HostingOcean Solutions updates.
Unsubscribe: {unsubscribe_link}

HostingOcean Solutions · solutions.hostingocean.co.uk
```

---

## Sending Notes

- **Segment:** Send to full warm list on launch day
- **Follow-up:** Resend to non-openers 4 days later with subject line variant (Option 3 or 5)
- **AB test:** Subject lines 1 vs 2 on launch send (50/50 split)
- **From name:** "HostingOcean Solutions" or "Team at HostingOcean Solutions"
- **Preview text:** "AI Chatbots, LMS platforms, and Automation systems — built for businesses that need more than off-the-shelf."
