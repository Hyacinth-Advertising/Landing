<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import SiteIcon from './components/SiteIcon.vue'
import { googleFormUrl, isGoogleFormUrl } from './siteConfig.js'

const baseUrl = import.meta.env.BASE_URL
const currentPage = ref('home')
const activeSection = ref('home')
const mobileMenuOpen = ref(false)
const contactEnabled = computed(() => isGoogleFormUrl(googleFormUrl))

const navItems = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'About Us', href: '#about', section: 'about' },
]

const platforms = [
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'TikTok', icon: 'tiktok' },
  { name: 'Google', icon: 'google' },
]

const services = [
  {
    title: 'Strategy',
    icon: 'target',
    text: 'We develop data-driven marketing strategies tailored to your business, audience, and goals.',
  },
  {
    title: 'Content Creation',
    icon: 'video',
    text: 'We create scroll-stopping content that showcases your work and builds trust with your ideal customers.',
  },
  {
    title: 'Social Media Services',
    icon: 'messages',
    text: 'We help you develop a social media strategy and put it into action with consistent, engaging content to grow your audience.',
  },
  {
    title: 'Paid Advertising',
    icon: 'trend',
    text: 'We plan, create, and manage high-performing ad campaigns that put your business in front of the right people.',
  },
  {
    title: 'Search Advertising',
    icon: 'search',
    text: 'We create and manage Google Search ads that capture high-intent leads when they’re searching for your services.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Strategy',
    text: 'We learn about your business, audience, competitors, and goals to build a data-driven strategy around what will actually move the needle.',
  },
  {
    number: '02',
    title: 'Create',
    text: 'We develop the content, creative, and campaigns designed to get your business in front of the right people.',
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    text: 'We launch your campaigns, monitor performance, and continuously optimize to improve results and drive more growth over time.',
  },
]

const benefits = [
  {
    icon: 'target',
    title: 'Strategy meets execution',
    text: 'Your strategy, content, and advertising aren’t created in separate silos. We make them work together to drive results.',
  },
  {
    icon: 'users',
    title: 'Built around your business',
    text: 'We don’t believe in cookie-cutter campaigns. Your messaging, creative, and strategy are built around your business and customers.',
  },
  {
    icon: 'puzzle',
    title: 'One team, end to end',
    text: 'Instead of coordinating multiple freelancers or agencies, you have one team handling the strategy, creative, content, and advertising.',
  },
  {
    icon: 'trend',
    title: 'Focused on what matters',
    text: 'We focus on the metrics that actually move your business forward—leads, customers, and growth.',
  },
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

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function isNavActive(item) {
  return currentPage.value === 'home' && activeSection.value === item.section
}

function handleContactClick(event) {
  closeMobileMenu()
  if (!contactEnabled.value) event.preventDefault()
}

function scrollToTarget(selector) {
  window.setTimeout(() => {
    document.querySelector(selector)?.scrollIntoView()
  }, 0)
}

function updateActiveSection() {
  if (currentPage.value !== 'home') return
  const about = document.getElementById('about')
  if (!about) return
  activeSection.value = window.scrollY >= about.offsetTop - window.innerHeight * 0.36 ? 'about' : 'home'
}

async function syncRoute() {
  const hash = window.location.hash
  currentPage.value = hash === '#/terms' ? 'terms' : hash === '#/privacy' ? 'privacy' : 'home'
  closeMobileMenu()
  await nextTick()

  if (currentPage.value !== 'home') {
    window.scrollTo({ top: 0 })
    return
  }

  if (hash === '#/about') {
    window.history.replaceState(null, '', '#about')
    scrollToTarget('#about')
  } else if (hash === '#/faq' || hash.startsWith('#/')) {
    window.history.replaceState(null, '', '#home')
    window.scrollTo({ top: 0 })
  } else if (hash === '#about' || hash === '#home') {
    scrollToTarget(hash)
  }

  window.setTimeout(updateActiveSection, 0)
}

onMounted(() => {
  syncRoute()
  window.addEventListener('hashchange', syncRoute)
  window.addEventListener('scroll', updateActiveSection, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncRoute)
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <a href="#home" class="brand" aria-label="Hyacinth Advertising home" @click="closeMobileMenu">
          Hyacinth Advertising
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            :class="{ active: isNavActive(item) }"
            :aria-current="isNavActive(item) ? 'location' : undefined"
          >
            {{ item.label }}
          </a>
        </nav>

        <a
          :href="contactEnabled ? googleFormUrl : '#'"
          class="contact-button contact-button--header"
          :class="{ 'is-disabled': !contactEnabled }"
          :target="contactEnabled ? '_blank' : undefined"
          :rel="contactEnabled ? 'noopener noreferrer' : undefined"
          :aria-disabled="contactEnabled ? undefined : 'true'"
          :title="contactEnabled ? 'Open our Google contact form' : 'Contact form coming soon'"
          @click="handleContactClick"
        >
          Get in touch
        </a>

        <button
          class="menu-button"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav v-show="mobileMenuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          :aria-current="isNavActive(item) ? 'location' : undefined"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>
        <a
          :href="contactEnabled ? googleFormUrl : '#'"
          :target="contactEnabled ? '_blank' : undefined"
          :rel="contactEnabled ? 'noopener noreferrer' : undefined"
          :aria-disabled="contactEnabled ? undefined : 'true'"
          :title="contactEnabled ? 'Open our Google contact form' : 'Contact form coming soon'"
          :class="{ 'is-disabled': !contactEnabled }"
          @click="handleContactClick"
        >
          Get in touch
        </a>
      </nav>
    </header>

    <main v-if="currentPage === 'home'">
      <section id="home" class="hero-section">
        <div class="container hero-content">
          <h1>We help businesses grow<br class="desktop-break" /> through digital marketing.</h1>
          <p>
            We provide strategy, content creation, social media services,<br class="desktop-break" />
            and paid advertising across Facebook, Instagram, Google, and TikTok.
          </p>
          <a
            :href="contactEnabled ? googleFormUrl : '#'"
            class="contact-button contact-button--hero"
            :class="{ 'is-disabled': !contactEnabled }"
            :target="contactEnabled ? '_blank' : undefined"
            :rel="contactEnabled ? 'noopener noreferrer' : undefined"
            :aria-disabled="contactEnabled ? undefined : 'true'"
            :title="contactEnabled ? 'Open our Google contact form' : 'Contact form coming soon'"
            @click="handleContactClick"
          >
            <span>Get in touch</span><span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section id="services" class="services-section">
        <div class="container">
          <div class="services-heading-row">
            <div class="section-intro">
              <h2>Our Services</h2>
              <p>We provide strategy, content creation, social media services, and paid advertising across Facebook, Instagram, Google, and TikTok.</p>
            </div>

            <div class="platforms" aria-label="Platforms we work with">
              <p class="platforms-label">Platforms we work with</p>
              <div class="platform-list">
                <div v-for="platform in platforms" :key="platform.name" class="platform-item">
                  <SiteIcon :name="platform.icon" />
                  <span>{{ platform.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="services-grid">
            <article v-for="service in services" :key="service.title" class="service-card">
              <SiteIcon :name="service.icon" class="service-icon" />
              <h3>{{ service.title }}</h3>
              <span class="accent-rule" aria-hidden="true"></span>
              <p>{{ service.text }}</p>
            </article>
          </div>

          <aside class="wide-callout partner-callout">
            <div class="callout-icon"><SiteIcon name="users" /></div>
            <div class="callout-copy">
              <h3>A Full-Service Partner</h3>
              <p>From strategy to execution, we handle everything so you can focus on running your business.</p>
              <p>Our goal is simple: deliver more qualified leads and more customers.</p>
            </div>
          </aside>
        </div>
      </section>

      <section class="works-section">
        <div class="container">
          <div class="works-heading section-intro">
            <p class="eyebrow">How it works</p>
            <h2>How It Works</h2>
            <p>Our process is simple and collaborative. <br />We handle the strategy, content, and advertising <br />so you can focus on running your business.</p>
          </div>

          <div class="process-flow">
            <article v-for="(step, index) in processSteps" :key="step.number" class="process-step">
              <div
                class="process-flower"
                :class="`process-flower--${index + 1}`"
                :style="{ backgroundImage: `url(${baseUrl}hyacinth-stages.png)` }"
                aria-hidden="true"
              ></div>
              <div class="process-copy">
                <span class="step-number">{{ step.number }}</span>
                <h3>{{ step.title }}</h3>
                <span class="accent-rule" aria-hidden="true"></span>
                <p>{{ step.text }}</p>
              </div>
              <span v-if="index < processSteps.length - 1" class="process-arrow" aria-hidden="true">→</span>
            </article>
          </div>

          <aside class="wide-callout partnership-callout">
            <div class="callout-icon"><SiteIcon name="users" /></div>
            <div class="callout-copy">
              <h3>A true partnership.</h3>
              <p>We keep you in the loop every step of the way with clear communication,<br class="desktop-break" /> transparent reporting, and a focus on the results that matter most.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="about" class="why-section">
        <div class="container">
          <div class="why-grid">
            <div class="why-intro section-intro">
              <p class="eyebrow">Why Hyacinth</p>
              <h2>Why work<br />with us?</h2>
              <span class="accent-rule" aria-hidden="true"></span>
              <p>We’re more than just another marketing agency. We become a growth partner invested in your success.</p>
            </div>

            <div class="benefit-list">
              <article v-for="benefit in benefits" :key="benefit.title" class="benefit-item">
                <div class="benefit-icon"><SiteIcon :name="benefit.icon" /></div>
                <div>
                  <h3>{{ benefit.title }}</h3>
                  <p>{{ benefit.text }}</p>
                </div>
              </article>
            </div>
          </div>

          <aside class="growth-callout">
            <div class="growth-icon"><SiteIcon name="hyacinth" /></div>
            <div>
              <h3>Our goal is your growth.</h3>
              <p>We’re here to simplify digital marketing and deliver the<br class="desktop-break" /> results that make a real impact on your business.</p>
            </div>
          </aside>
        </div>
      </section>

      <section class="contact-section">
        <div class="container contact-content">
          <h2>Let’s talk</h2>
          <p>Tell us a little about your business and we’ll be in touch<br class="desktop-break" /> to set up a time that works for you.</p>
          <a
            :href="contactEnabled ? googleFormUrl : '#'"
            class="contact-button contact-button--final"
            :class="{ 'is-disabled': !contactEnabled }"
            :target="contactEnabled ? '_blank' : undefined"
            :rel="contactEnabled ? 'noopener noreferrer' : undefined"
            :aria-disabled="contactEnabled ? undefined : 'true'"
            :title="contactEnabled ? 'Open our Google contact form' : 'Contact form coming soon'"
            @click="handleContactClick"
          >
            <span>Get in touch</span><span aria-hidden="true">→</span>
          </a>
          <p class="secure-note"><SiteIcon name="lock" /> Your information is secure and will never be shared.</p>
          <nav class="legal-links" aria-label="Legal">
            <a href="#/privacy">Privacy Policy</a>
            <span aria-hidden="true">•</span>
            <a href="#/terms">Terms of Service</a>
          </nav>
        </div>
      </section>
    </main>

    <main v-else class="legal-page container">
      <a href="#home" class="back-link">← Back to Home</a>
      <p class="eyebrow">Hyacinth Advertising</p>
      <h1>{{ legalContent.title }}</h1>
      <p class="legal-date">Last updated: June 26, 2026</p>
      <section v-for="section in legalContent.sections" :key="section[0]">
        <h2>{{ section[0] }}</h2>
        <p>{{ section[1] }}</p>
      </section>
    </main>
  </div>
</template>
