<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'UCG', href: '#ugc' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
]

const baseUrl = import.meta.env.BASE_URL
const bookCallHref = '#book-call'

const services = [
  {
    title: 'Creative Strategy',
    body: [
      'We identify what your audience actually responds to, not just what looks good.',
      'Every project starts with research into your competitors, your positioning, and the creative angles most likely to convert.',
    ],
  },
  {
    title: 'UGC Production',
    body: [
      'We source creators, write scripts, direct production, and deliver authentic creator-led ads built specifically for TikTok, Instagram, Meta, and other paid social platforms.',
    ],
  },
  {
    title: 'Direct-Response Advertising',
    body: [
      'Our creative is designed for one purpose: to drive measurable business results. Every hook, script, edit, and call-to-action is created with conversion in mind.',
    ],
  },
  {
    title: 'Creative Testing',
    body: [
      'Winning ads rarely come from a single idea. We develop multiple creative angles, hooks, and iterations so your team can continuously test and improve performance.',
    ],
  },
]

const stats = [
  {
    value: '86%',
    text: 'of consumers trust brands more when they use UGC',
  },
  {
    value: '90%',
    text: 'of consumers prefer to see content from actual customers.',
  },
  {
    value: '80%',
    text: 'of consumer look to non-brand experts as their first for brand info',
  },
]

const faqs = [
  {
    title: 'What is UGC?',
    body: [
      'User-Generated Content (UGC) is advertising that feels like content, not a commercial. It uses authentic creators, relatable storytelling, and native social media formats to build trust and encourage action.',
      'Consumers are far more likely to engage with content that feels genuine, making UGC one of the highest-performing creative formats for modern paid advertising.',
      "At Hyacinth Advertising, we combine creator-led content with performance marketing strategy to produce UGC that's built to do more than earn views. It helps brands acquire customers, improve conversion rates, and continuously test new creatives that drive growth.",
    ],
  },
  {
    title: 'Do you provide creators?',
    body: [
      'Yes. We source creators that align with your audience and manage the production process from concept to delivery.',
    ],
  },
  {
    title: 'What platforms do you create for?',
    body: ['TikTok, Instagram, Facebook, YouTube Shorts, LinkedIn'],
  },
  {
    title: 'Do you only create UGC?',
    body: [
      'No. We also produce founder-led content, product demonstrations, testimonials, paid social creatives, and creative strategy.',
    ],
  },
  {
    title: 'How quickly can projects begin?',
    body: ['Most engagements begin within one to two weeks following onboarding.'],
  },
]

const openServices = ref([])
const openFaqs = ref([])
const formSubmitted = ref(false)
const mobileMenuOpen = ref(false)
const currentPage = ref('home')

function toggleIndex(collection, index) {
  return collection.includes(index)
    ? collection.filter((item) => item !== index)
    : [...collection, index]
}

function toggleService(index) {
  openServices.value = toggleIndex(openServices.value, index)
}

function toggleFaq(index) {
  openFaqs.value = toggleIndex(openFaqs.value, index)
}

function handleBookingSubmit() {
  formSubmitted.value = true
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function scrollToHash(hash) {
  if (!hash || hash.startsWith('#/')) {
    window.scrollTo({ top: 0 })
    return
  }

  window.setTimeout(() => {
    document.querySelector(hash)?.scrollIntoView()
  }, 0)
}

async function syncRoute() {
  const hash = window.location.hash

  if (hash === '#/terms') {
    currentPage.value = 'terms'
  } else if (hash === '#/privacy') {
    currentPage.value = 'privacy'
  } else {
    currentPage.value = 'home'
  }

  closeMobileMenu()
  await nextTick()

  if (currentPage.value === 'home') {
    scrollToHash(hash)
  } else {
    window.scrollTo({ top: 0 })
  }
}

onMounted(() => {
  syncRoute()
  window.addEventListener('hashchange', syncRoute)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', syncRoute)
})
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-950">
    <header
      class="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur"
    >
      <div
        class="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center justify-between gap-x-5 gap-y-3 px-5 py-4 sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:px-10"
      >
        <a
          href="#home"
          aria-label="Hyacinth Advertising home"
          class="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
          @click="closeMobileMenu"
        >
          <img
            :src="`${baseUrl}logo.png`"
            alt="Hyacinth Advertising"
            class="h-8 w-40 object-cover object-center sm:h-10 sm:w-56"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          class="hidden items-center justify-center gap-x-8 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-neutral-700 lg:flex"
        >
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="transition hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
          >
            {{ item.label }}
          </a>
        </nav>

        <a
          :href="bookCallHref"
          class="hidden min-h-11 items-center justify-center justify-self-end border border-neutral-950 bg-neutral-950 px-5 text-xs font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 lg:inline-flex"
        >
          Book a Call
        </a>

        <button
          type="button"
          class="grid h-11 w-11 place-items-center justify-self-end border border-neutral-950 text-neutral-950 transition hover:bg-neutral-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 lg:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <span class="grid gap-1.5" aria-hidden="true">
            <span
              class="block h-0.5 w-5 bg-current transition"
              :class="{ 'translate-y-2 rotate-45': mobileMenuOpen }"
            ></span>
            <span
              class="block h-0.5 w-5 bg-current transition"
              :class="{ 'opacity-0': mobileMenuOpen }"
            ></span>
            <span
              class="block h-0.5 w-5 bg-current transition"
              :class="{ '-translate-y-2 -rotate-45': mobileMenuOpen }"
            ></span>
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        v-show="mobileMenuOpen"
        aria-label="Mobile navigation"
        class="border-t border-neutral-200 px-5 pb-5 pt-2 sm:px-8 lg:hidden"
      >
        <div class="mx-auto grid max-w-7xl gap-1">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="border-b border-neutral-200 py-3 text-sm font-black uppercase tracking-[0.24em] text-neutral-800 transition hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </a>

          <a
            :href="bookCallHref"
            class="mt-4 inline-flex min-h-12 w-fit items-center justify-center border border-neutral-950 bg-neutral-950 px-6 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
            @click="closeMobileMenu"
          >
            Book a Call
          </a>
        </div>
      </nav>
    </header>

    <main v-if="currentPage === 'home'">
      <section
        id="home"
        class="mx-auto max-w-7xl scroll-mt-24 px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7 lg:px-10"
      >
        <div class="mx-auto max-w-6xl text-center">
          <h1
            class="text-[clamp(2.35rem,5vw,4.9rem)] font-black uppercase leading-[0.95] tracking-normal"
          >
            We create Ads that convert
          </h1>
        </div>

        <div class="mx-auto mt-7 max-w-3xl overflow-hidden border border-neutral-200 bg-neutral-100 sm:mt-9">
          <img
            :src="`${baseUrl}home.png`"
            alt="Production crew filming creator-led advertising content"
            class="aspect-[1400/700] w-full object-cover"
          />
        </div>

        <div class="mt-8 flex justify-center">
          <a
            :href="bookCallHref"
            class="inline-flex min-h-12 items-center justify-center border border-neutral-950 bg-neutral-950 px-7 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
          >
            Book a Call
          </a>
        </div>
      </section>

      <section
        id="services"
        class="border-b border-neutral-200 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 class="text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
              What We Do
            </h2>
          </div>

          <div class="border-t border-neutral-950">
            <div
              v-for="(item, index) in services"
              :key="item.title"
              class="border-b border-neutral-300"
            >
              <button
                type="button"
                class="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
                :aria-expanded="openServices.includes(index)"
                :aria-controls="`service-panel-${index}`"
                @click="toggleService(index)"
              >
                <span class="text-2xl font-black uppercase leading-none sm:text-3xl">
                  {{ item.title }}
                </span>
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center border border-neutral-950 text-2xl leading-none"
                  aria-hidden="true"
                >
                  <span class="relative h-4 w-4 -translate-y-px">
                    <span
                      class="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current"
                    ></span>
                    <span
                      class="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current transition duration-200"
                      :class="openServices.includes(index) ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
                    ></span>
                  </span>
                </span>
              </button>

              <div
                v-show="openServices.includes(index)"
                :id="`service-panel-${index}`"
                class="max-w-3xl pb-8 text-lg leading-8 text-neutral-700"
              >
                <p v-for="paragraph in item.body" :key="paragraph" class="mb-4 last:mb-0">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ugc" class="bg-neutral-950 px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10">
        <div class="mx-auto max-w-7xl">
          <h2 class="max-w-4xl text-5xl font-black uppercase leading-none sm:text-7xl">
            The Numbers Are In
          </h2>

          <div class="mt-12 grid gap-4 md:grid-cols-3">
            <article
              v-for="stat in stats"
              :key="stat.value"
              class="border border-white/25 p-7 sm:p-8"
            >
              <p class="text-6xl font-black leading-none sm:text-7xl">{{ stat.value }}</p>
              <p class="mt-6 text-xl leading-8 text-neutral-200">{{ stat.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="faq"
        class="border-t border-neutral-200 bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 class="text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
              FAQs
            </h2>
          </div>

          <div class="border-t border-neutral-950">
            <div
              v-for="(item, index) in faqs"
              :key="item.title"
              class="border-b border-neutral-300"
            >
              <button
                type="button"
                class="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
                :aria-expanded="openFaqs.includes(index)"
                :aria-controls="`faq-panel-${index}`"
                @click="toggleFaq(index)"
              >
                <span class="text-2xl font-black uppercase leading-none sm:text-3xl">
                  {{ item.title }}
                </span>
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center border border-neutral-950 text-2xl leading-none"
                  aria-hidden="true"
                >
                  <span class="relative h-4 w-4 -translate-y-px">
                    <span
                      class="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current"
                    ></span>
                    <span
                      class="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current transition duration-200"
                      :class="openFaqs.includes(index) ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'"
                    ></span>
                  </span>
                </span>
              </button>

              <div
                v-show="openFaqs.includes(index)"
                :id="`faq-panel-${index}`"
                class="max-w-3xl pb-8 text-lg leading-8 text-neutral-700"
              >
                <p v-for="paragraph in item.body" :key="paragraph" class="mb-4 last:mb-0">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="bg-neutral-950 px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 class="text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
              About Hyacinth
            </h2>
          </div>

          <div class="max-w-4xl text-xl leading-9 text-neutral-200">
            <p class="mb-6">
              After years of creating commercial-quality video content, we noticed something:
              the ads that consistently perform best don't look like ads at all. They feel
              authentic, relatable, and built for the platforms people actually use every day.
            </p>
            <p class="mb-6 font-semibold text-white">That's why we started Hyacinth.</p>
            <p class="mb-6">
              We partner with brands to produce high-performing UGC-style advertising by managing
              every step of the creative process, from strategy and scripting to creator sourcing,
              filming, editing, and delivery. Instead of chasing one-off viral videos, we help
              brands build a consistent pipeline of fresh creative they can confidently use across
              TikTok, Instagram, Facebook, and beyond.
            </p>
            <p>
              Our goal is simple: create content that earns attention, builds trust, and drives
              results.
            </p>
          </div>
        </div>
      </section>
    </main>

    <main v-else class="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <section v-if="currentPage === 'terms'" class="mx-auto max-w-4xl">
        <a
          href="#home"
          class="mb-10 inline-flex text-sm font-black uppercase tracking-[0.22em] text-neutral-600 transition hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
        >
          Back to Home
        </a>

        <h1 class="text-5xl font-black uppercase leading-none sm:text-7xl">
          Terms and Conditions
        </h1>
        <p class="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Last updated: June 26, 2026
        </p>

        <div class="mt-12 grid gap-9 text-lg leading-8 text-neutral-700">
          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Agreement to Terms
            </h2>
            <p>
              By accessing this website or contacting Hyacinth Advertising, you agree to these
              Terms and Conditions. If you do not agree with these terms, do not use this website.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Services
            </h2>
            <p>
              Hyacinth Advertising provides creative strategy, creator-led content production,
              direct-response advertising creative, and related marketing services. Specific
              deliverables, timelines, and pricing are defined in written proposals, statements of
              work, or other agreements between Hyacinth Advertising and each client.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Client Materials and Approvals
            </h2>
            <p>
              Clients are responsible for providing accurate product information, brand guidelines,
              usage rights, and other materials needed for production. Clients are also responsible
              for reviewing and approving final content before publication or paid distribution.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Intellectual Property
            </h2>
            <p>
              Ownership and usage rights for creative work are governed by the applicable client
              agreement. Unless otherwise agreed in writing, Hyacinth Advertising retains rights to
              its pre-existing materials, processes, templates, and know-how.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              No Guaranteed Results
            </h2>
            <p>
              Hyacinth Advertising creates content intended to improve advertising performance, but
              does not guarantee specific sales, revenue, engagement, conversion rates, platform
              approvals, or campaign outcomes.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Third-Party Platforms
            </h2>
            <p>
              Social media, advertising, analytics, payment, scheduling, and creator platforms are
              operated by third parties. Hyacinth Advertising is not responsible for changes,
              outages, policy decisions, or actions taken by those platforms.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Hyacinth Advertising is not liable for
              indirect, incidental, consequential, special, or punitive damages arising from use of
              this website or services.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Contact
            </h2>
            <p>
              Questions about these terms can be sent through the Book a Call form on this website.
            </p>
          </section>
        </div>
      </section>

      <section v-else class="mx-auto max-w-4xl">
        <a
          href="#home"
          class="mb-10 inline-flex text-sm font-black uppercase tracking-[0.22em] text-neutral-600 transition hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
        >
          Back to Home
        </a>

        <h1 class="text-5xl font-black uppercase leading-none sm:text-7xl">
          Privacy Policy
        </h1>
        <p class="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Last updated: June 26, 2026
        </p>

        <div class="mt-12 grid gap-9 text-lg leading-8 text-neutral-700">
          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Information We Collect
            </h2>
            <p>
              We may collect information you submit through this website, including your first name,
              last name, business name, email address, and any additional information you choose to
              provide. We may also collect basic website usage information such as device, browser,
              pages visited, and referral source.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              How We Use Information
            </h2>
            <p>
              We use collected information to respond to inquiries, schedule calls, provide and
              improve services, understand website performance, and communicate about Hyacinth
              Advertising.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Sharing Information
            </h2>
            <p>
              We do not sell personal information. We may share information with service providers
              that help operate the website, schedule calls, manage communications, or deliver
              services, and when required by law or necessary to protect our rights.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Cookies and Analytics
            </h2>
            <p>
              This website may use cookies or analytics tools to understand traffic and improve the
              website experience. You can adjust browser settings to block or delete cookies.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Data Retention and Security
            </h2>
            <p>
              We keep information only as long as reasonably needed for business, legal, and
              operational purposes. We use reasonable safeguards, but no website or electronic
              transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Your Choices
            </h2>
            <p>
              You may request that we update, correct, or delete information you have provided by
              contacting us through the Book a Call form. Some information may be retained when
              required for legal or legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Children's Privacy
            </h2>
            <p>
              This website is not intended for children under 13, and we do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-black uppercase leading-none text-neutral-950">
              Contact
            </h2>
            <p>
              Questions about this Privacy Policy can be sent through the Book a Call form on this
              website.
            </p>
          </section>
        </div>
      </section>
    </main>

    <footer
      v-if="currentPage === 'home'"
      id="book-call"
      class="scroll-mt-32 border-t border-neutral-200 px-5 pb-10 pt-16 sm:px-8 sm:pb-8 sm:pt-24 lg:px-10"
    >
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <h2 class="text-5xl font-black uppercase leading-none sm:text-6xl lg:text-7xl">
            Book a Call
          </h2>
        </div>

        <form class="grid gap-5" @submit.prevent="handleBookingSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="grid gap-2 text-xs font-black uppercase tracking-[0.22em]">
              First Name
              <input
                type="text"
                name="firstName"
                autocomplete="given-name"
                required
                class="min-h-12 border border-neutral-300 px-4 text-base font-medium normal-case tracking-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20"
              />
            </label>

            <label class="grid gap-2 text-xs font-black uppercase tracking-[0.22em]">
              Last Name
              <input
                type="text"
                name="lastName"
                autocomplete="family-name"
                required
                class="min-h-12 border border-neutral-300 px-4 text-base font-medium normal-case tracking-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20"
              />
            </label>
          </div>

          <label class="grid gap-2 text-xs font-black uppercase tracking-[0.22em]">
            Business Name
            <input
              type="text"
              name="businessName"
              autocomplete="organization"
              required
              class="min-h-12 border border-neutral-300 px-4 text-base font-medium normal-case tracking-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20"
            />
          </label>

          <label class="grid gap-2 text-xs font-black uppercase tracking-[0.22em]">
            Email Address
            <input
              type="email"
              name="email"
              autocomplete="email"
              required
              class="min-h-12 border border-neutral-300 px-4 text-base font-medium normal-case tracking-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20"
            />
          </label>

          <label class="grid gap-2 text-xs font-black uppercase tracking-[0.22em]">
            Additional Info <span class="text-neutral-500">(Optional)</span>
            <textarea
              name="additionalInfo"
              rows="5"
              class="resize-y border border-neutral-300 px-4 py-3 text-base font-medium normal-case tracking-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20"
            ></textarea>
          </label>

          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              class="inline-flex min-h-12 w-fit items-center justify-center border border-neutral-950 bg-neutral-950 px-7 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4"
            >
              Book a Call
            </button>

            <p v-if="formSubmitted" class="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-600">
              Thanks. We'll be in touch.
            </p>
          </div>
        </form>
      </div>

      <div
        class="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-neutral-200 pt-8 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>Hyacinth Advertising, LLC</span>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href="#/terms" class="transition hover:text-neutral-950">Terms</a>
          <a href="#/privacy" class="transition hover:text-neutral-950">Privacy</a>
          <span>Ads that convert</span>
        </div>
      </div>
    </footer>

    <footer
      v-else
      class="border-t border-neutral-200 px-5 py-8 sm:px-8 lg:px-10"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <a href="#home" class="transition hover:text-neutral-950">Hyacinth Advertising, LLC</a>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href="#/terms" class="transition hover:text-neutral-950">Terms</a>
          <a href="#/privacy" class="transition hover:text-neutral-950">Privacy</a>
        </div>
      </div>
    </footer>
  </div>
</template>
