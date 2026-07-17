<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const currentPage = ref('home')
const mobileMenuOpen = ref(false)
const activeStage = ref(0)
const slideDirection = ref('forward')
const formSubmitted = ref(false)
const flowerPositions = [15, 50, 82]

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#/about' },
  { label: 'FAQs', href: '#/faq' },
]

const processStages = [
  {
    number: '01',
    title: 'Strategy',
    summary: 'We identify what your audience actually responds to, not just what looks good. Every project starts with research into your brand, your positioning, your content, your competitors and their paid media, and the creative angles most likely to convert.',
    items: [
      { title: 'Competitor Analysis', icon: 'CompetitorAnalysisIcon.png', text: 'We analyze top competitors to identify what’s working, what’s missing, and where the opportunities are.' },
      { title: 'Audience Research', icon: 'AudienceResearchIcon.png', text: 'We dig into your audience’s pain points, desires, and behaviors to inform the creative direction.' },
      { title: 'Paid Ad Audit', icon: 'PaidAdAuditIcon.png', text: 'We review your existing ads to find what’s underperforming and what can be improved.' },
      { title: 'Messaging Insights', icon: 'MessagingInsightsIcon.png', text: 'We identify the angles, hooks, and messaging themes most likely to convert.' },
    ],
  },
  {
    number: '02',
    title: 'Production',
    summary: 'We produce performance creative designed to drive measurable business results, owning every stage of the creative process from strategy and scripting to production.',
    items: [
      { title: 'Creative Direction', icon: 'CreativeDirectionIcon.png', text: 'We develop the core concept, visual approach, and message that will resonate with your audience.' },
      { title: 'Script & Messaging', icon: 'ScriptIcon.png', text: 'We write hooks, scripts, and CTAs that stop the scroll and drive action.' },
      { title: 'Production', icon: 'ProductionIcon.png', text: 'We handle filming, talent, props, and everything needed to bring the concept to life.' },
      { title: 'Editing & Finishing', icon: 'EditingIcon.png', text: 'We edit, add captions, sound design, and final polish to create thumb-stopping ads.' },
    ],
  },
  {
    number: '03',
    title: 'Optimization',
    summary: 'Winning ads aren’t built once, they’re refined over time. We keep your creative pipeline full of fresh concepts so your team can continuously test, learn, and improve performance.',
    items: [
      { title: 'Performance Analysis', icon: 'PerformanceIcon.png', text: 'We break down the data to find what’s working, what’s not, and why.' },
      { title: 'Creative Testing', icon: 'CreativeTestingIcon.png', text: 'We continuously test new hooks, angles, and formats to uncover winning ads.' },
      { title: 'Iteration', icon: 'IterationIcon.png', text: 'We refine, iterate, and evolve top performers to push results even further.' },
      { title: 'Scaling Winners', icon: 'ScalingIcon.png', text: 'We double down on what works, scaling the creative that drives the best business outcomes.' },
    ],
  },
]

const stats = [
  { value: '60%', icon: '60_Icon.png', text: 'of US adults are less likely to buy products or services from companies that show the same ad repeatedly' },
  { value: '88%', icon: '88_Icon.png', text: 'say overly repetitive ads make them pay less attention' },
  { value: '76%', icon: '76_Icon.png', text: 'say overly repetitive ads makes them less favorable toward the brand.' },
]

const faqs = [
  { title: 'What kind of companies do you work with?', paragraphs: ['We work with growing SaaS companies that rely on paid social advertising to acquire customers. Our best-fit clients are typically scaling their ad spend but don’t have the time or resources to build a dedicated in-house performance creative team.'] },
  { title: 'Do you provide the creators?', paragraphs: ['Yes.', 'We source creators who match your target audience and manage the production process from start to finish. Whether your ads call for founders, customers, professionals, or lifestyle creators, we handle the recruiting, coordination, and creative direction.'] },
  { title: 'What platforms do you create for?', paragraphs: ['We create paid social creative for:'], list: ['Meta (Facebook & Instagram)', 'TikTok', 'YouTube Shorts', 'LinkedIn'], after: 'Every creative is tailored to the platform it’s intended to run on.' },
  { title: 'How is this different from hiring freelancers?', paragraphs: ['Hiring individual freelancers means managing strategy, scripting, creator sourcing, revisions, and production yourself.', 'We provide a complete creative system. Instead of coordinating multiple people, you work with one team that owns the entire process and continuously delivers fresh creative for testing.'] },
  { title: 'How do you measure success?', paragraphs: ['Our goal isn’t simply to produce videos—it’s to create creative that improves business results. We work alongside your marketing team to build a repeatable testing process, helping you continuously introduce new concepts, combat creative fatigue, and improve paid advertising performance over time.'] },
  { title: 'How quickly can we get started?', paragraphs: ['Most projects begin within one to two weeks after onboarding.', 'Once strategy is complete, we begin sourcing creators, developing concepts, and producing your first batch of creatives.'] },
]

const legalContent = computed(() => currentPage.value === 'terms' ? {
  title: 'Terms and Conditions',
  sections: [
    ['Agreement to Terms', 'By accessing this website or contacting Hyacinth Advertising, you agree to these Terms and Conditions. If you do not agree, do not use this website.'],
    ['Services', 'Hyacinth Advertising provides creative strategy, creator-led content production, direct-response advertising creative, and related marketing services. Deliverables, timelines, and pricing are defined in written client agreements.'],
    ['Intellectual Property', 'Ownership and usage rights for creative work are governed by the applicable client agreement. Hyacinth Advertising retains rights to its pre-existing materials, processes, templates, and know-how.'],
    ['No Guaranteed Results', 'We create content intended to improve advertising performance, but do not guarantee specific sales, revenue, engagement, conversion rates, platform approvals, or campaign outcomes.'],
    ['Contact', 'Questions about these terms can be sent to hello@hyacinthadvertising.com.'],
  ],
} : {
  title: 'Privacy Policy',
  sections: [
    ['Information We Collect', 'We may collect information you submit through this website, including your name, business name, email address, and any additional information you provide.'],
    ['How We Use Information', 'We use collected information to respond to inquiries, schedule calls, provide and improve services, and understand website performance.'],
    ['Sharing Information', 'We do not sell personal information. We may share information with service providers that help us operate the website and deliver services, or when required by law.'],
    ['Data Retention and Security', 'We retain information only as long as reasonably needed and use reasonable safeguards, though no electronic transmission is completely secure.'],
    ['Contact', 'Questions about this policy can be sent to hello@hyacinthadvertising.com.'],
  ],
})

function selectStage(index) {
  if (index === activeStage.value) return
  slideDirection.value = index > activeStage.value ? 'forward' : 'backward'
  activeStage.value = index
}

function isNavActive(href) {
  return (href === '#home' && currentPage.value === 'home') || href === `#/${currentPage.value}`
}

function handleStageKeydown(event, index) {
  let next = index
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % processStages.length
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + processStages.length) % processStages.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = processStages.length - 1
  else return
  event.preventDefault()
  selectStage(next)
  nextTick(() => document.getElementById(`process-tab-${next}`)?.focus())
}

async function syncRoute() {
  const hash = window.location.hash
  currentPage.value = hash === '#/terms' ? 'terms' : hash === '#/privacy' ? 'privacy' : hash === '#/about' ? 'about' : hash === '#/faq' ? 'faq' : 'home'
  mobileMenuOpen.value = false
  await nextTick()
  if (currentPage.value !== 'home') window.scrollTo({ top: 0 })
  else if (hash && !hash.startsWith('#/')) setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 0)
}

onMounted(() => {
  syncRoute()
  window.addEventListener('hashchange', syncRoute)
})
onUnmounted(() => window.removeEventListener('hashchange', syncRoute))
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <a href="#home" class="brand" aria-label="Hyacinth Advertising home">
          <span>Hyacinth Advertising</span>
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          <a v-for="item in navItems" :key="item.href" :href="item.href" :class="{ active: isNavActive(item.href) }" :aria-current="isNavActive(item.href) ? 'page' : undefined">{{ item.label }}</a>
        </nav>
        <a href="#book-call" class="button header-cta">Book a Call</a>
        <button class="menu-button" type="button" :aria-expanded="mobileMenuOpen" aria-controls="mobile-menu" aria-label="Toggle navigation" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav v-show="mobileMenuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation">
        <a v-for="item in navItems" :key="item.href" :href="item.href" :aria-current="isNavActive(item.href) ? 'page' : undefined" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <a href="#book-call" @click="mobileMenuOpen = false">Book a Call</a>
      </nav>
    </header>

    <main v-if="currentPage === 'home'">
      <section id="home" class="container hero">
        <div class="hero-copy">
          <h1>We create ads<br />that convert.</h1>
          <p>We help AI &amp; SaaS companies scale paid advertising by becoming their external performance creative team.</p>
          <a href="#book-call" class="button">Book a Call <span aria-hidden="true">→</span></a>
        </div>
        <div class="hero-image"><img :src="`${baseUrl}hero-team.png`" alt="The Hyacinth Advertising founders" /></div>
      </section>

      <section id="process" class="process-section">
        <div class="container process-intro">
          <div>
            <h2>Our Process</h2>
            <p>Every month we introduce fresh hooks, messaging angles, creators, and concepts so your team can continuously fight creative fatigue.</p>
          </div>
          <div class="stage-tabs" role="tablist" aria-label="Our process stages">
            <button v-for="(stage, index) in processStages" :id="`process-tab-${index}`" :key="stage.title" class="stage-tab" :class="{ active: activeStage === index }" type="button" role="tab" :aria-selected="activeStage === index" :aria-controls="`process-panel-${index}`" :tabindex="activeStage === index ? 0 : -1" @click="selectStage(index)" @keydown="handleStageKeydown($event, index)">
              <span class="flower-window"><span class="flower-strip" :style="{ backgroundImage: `url(${baseUrl}hyacinth-stages.png)`, backgroundPosition: `${flowerPositions[index]}% top` }"></span></span>
              <span class="stage-number">{{ stage.number }}</span>
              <span class="stage-dot" aria-hidden="true"></span>
              <span class="stage-name">{{ stage.title }}</span>
            </button>
          </div>
        </div>

        <div class="container process-card-wrap">
          <Transition :name="slideDirection === 'forward' ? 'slide-forward' : 'slide-backward'" mode="out-in">
            <article :id="`process-panel-${activeStage}`" :key="activeStage" class="process-card" :class="{ 'strategy-stage': activeStage === 0 }" role="tabpanel" :aria-labelledby="`process-tab-${activeStage}`">
              <div class="stage-summary">
                <span>{{ processStages[activeStage].number }}</span>
                <h3>{{ processStages[activeStage].title }}</h3>
                <p>{{ processStages[activeStage].summary }}</p>
              </div>
              <div class="process-items">
                <div v-for="item in processStages[activeStage].items" :key="item.title" class="process-item">
                  <img :src="`${baseUrl}Icons/${item.icon}`" alt="" />
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </article>
          </Transition>
          <p class="process-hint"><img :src="`${baseUrl}Icons/InfoIcon.png`" alt="" /> Click any stage above to explore our process</p>
        </div>
      </section>

      <section class="stats-section">
        <div class="container">
          <h2>Winning paid advertising is<br />about consistently testing new creative.</h2>
          <div class="stats-card">
            <article v-for="stat in stats" :key="stat.value">
              <span class="icon-tile"><img :src="`${baseUrl}Icons/${stat.icon}`" alt="" /></span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.text }}</p>
            </article>
          </div>
          <p class="source"><img :src="`${baseUrl}Icons/InfoIcon.png`" alt="" /> <strong>Source:</strong> EMARKETER, citing Clutch Consumer Advertising Survey (2025)</p>
        </div>
      </section>

      <section id="book-call" class="booking-section">
        <div class="container booking-grid">
          <div class="booking-copy">
            <h2>Book a call</h2>
            <p>Let’s talk about your goals and how we can help you scale with better creative.</p>
            <ul>
              <li><img :src="`${baseUrl}Icons/BookACallIcon1.png`" alt="" /><span><strong>30 minute call</strong>Online via Google Meet</span></li>
              <li><img :src="`${baseUrl}Icons/BookACallIcon2.png`" alt="" /><span><strong>Quick &amp; easy</strong>Pick a time that works for you</span></li>
              <li><img :src="`${baseUrl}Icons/BookACallIcon3.png`" alt="" /><span><strong>No commitment</strong>Just a conversation</span></li>
            </ul>
          </div>
          <form class="booking-form" @submit.prevent="formSubmitted = true">
            <div class="form-row">
              <label>First Name<input required name="firstName" autocomplete="given-name" /></label>
              <label>Last Name<input required name="lastName" autocomplete="family-name" /></label>
            </div>
            <label>Business Name<input required name="businessName" autocomplete="organization" /></label>
            <label>Email Address<input required type="email" name="email" autocomplete="email" /></label>
            <label>Additional Info (Optional)<textarea name="additionalInfo" rows="5"></textarea></label>
            <button class="button" type="submit">Book a Call <span aria-hidden="true">→</span></button>
            <p v-if="formSubmitted" class="form-success" role="status">Thanks! We’ll be in touch.</p>
            <p class="secure-note"><img :src="`${baseUrl}Icons/SecureIcon.png`" alt="" /> Your information is secure and will never be shared.</p>
          </form>
        </div>
      </section>
    </main>

    <main v-else-if="currentPage === 'about'" class="inner-page container">
      <section class="about-page-grid">
        <div class="inner-page-title">
          <span>About Us</span>
          <h1>About<br />Hyacinth</h1>
        </div>
        <div class="about-page-copy">
          <p>After years of creating commercial-quality video content, we noticed something: the ads that consistently perform best don’t look like ads at all. They feel authentic, relatable, and built for the platforms people actually use every day.</p>
          <p><strong>That’s why we started Hyacinth.</strong></p>
          <p>We partner with brands to produce high-performing paid ad creative by managing every step of the creative process, from strategy and scripting to creator sourcing, filming, editing, and delivery. Instead of chasing one-off viral videos, we help brands build a consistent pipeline of fresh creative they can confidently use across TikTok, Instagram, Facebook, and beyond.</p>
          <p>Our goal is simple: create content that earns attention, builds trust, and drives results.</p>
        </div>
      </section>
    </main>

    <main v-else-if="currentPage === 'faq'" class="inner-page faq-page container">
      <section class="faq-page-grid">
        <div class="inner-page-title">
          <span>FAQs</span>
          <h1>Frequently<br />Asked Questions</h1>
        </div>
        <ol class="faq-list">
          <li v-for="(faq, index) in faqs" :key="faq.title">
            <span class="faq-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h2>{{ faq.title }}</h2>
              <p v-for="paragraph in faq.paragraphs" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="faq.list"><li v-for="item in faq.list" :key="item">{{ item }}</li></ul>
              <p v-if="faq.after">{{ faq.after }}</p>
            </div>
          </li>
        </ol>
      </section>
    </main>

    <main v-else class="legal-page container">
      <a href="#home" class="back-link">← Back to Home</a>
      <h1>{{ legalContent.title }}</h1>
      <p class="legal-date">Last updated: June 26, 2026</p>
      <section v-for="section in legalContent.sections" :key="section[0]">
        <h2>{{ section[0] }}</h2><p>{{ section[1] }}</p>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <h2>Hyacinth Advertising LLC</h2>
        <a href="mailto:hello@hyacinthadvertising.com"><img :src="`${baseUrl}Icons/EmailIcon.png`" alt="" /> hello@hyacinthadvertising.com</a>
        <p>© 2026 Hyacinth Advertising LLC</p>
        <nav aria-label="Legal"><a href="#/privacy">Privacy Policy</a><span>•</span><a href="#/terms">Terms of Service</a></nav>
      </div>
    </footer>
  </div>
</template>
