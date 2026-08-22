<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <svg
    class="site-icon"
    :class="`site-icon--${name}`"
    :viewBox="name === 'hyacinth' ? '0 0 72 152' : name === 'puzzle' ? '-1.5 -1.5 27 27' : '0 0 24 24'"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'target'">
      <path d="M10 5.5A8.5 8.5 0 1 0 18.5 14" />
      <path d="M10 9.5A4.5 4.5 0 1 0 14.5 14" />
      <circle cx="10" cy="14" r="1.55" />
      <path d="m10 14 7.4-7.4" />
      <path d="m17.4 6.6-.55-3.2L19 1.25l.65 2.2 2.2.65-2.15 2.15-3.3-.65Z" />
    </template>

    <template v-else-if="name === 'video'">
      <rect x="2.5" y="5.5" width="15" height="13" rx="2.5" />
      <path d="m17.5 10 4-2.25v8.5l-4-2.25" />
    </template>

    <template v-else-if="name === 'messages'">
      <path d="M4.5 5.5h10A2.5 2.5 0 0 1 17 8v5a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 3v-3A2.5 2.5 0 0 1 2 13V8a2.5 2.5 0 0 1 2.5-2.5Z" />
      <path d="M17 9h2.5a2.5 2.5 0 0 1 2.5 2.5V16a2.5 2.5 0 0 1-2.5 2.5v2l-3-2h-4a2.5 2.5 0 0 1-2.35-1.65M6.5 9.5h6M6.5 12h3.75" />
    </template>

    <template v-else-if="name === 'trend'">
      <path d="M3.5 18.5 9 13l3.5 3.5 7-9" />
      <path d="M15.5 7.5h4v4" />
    </template>

    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.25 15.25 5 5" />
    </template>

    <template v-else-if="name === 'facebook'">
      <path
        fill="currentColor"
        stroke="none"
        d="M13.8 21v-8h2.75l.42-3.12H13.8v-2c0-.9.26-1.52 1.58-1.52h1.7V3.58a22.7 22.7 0 0 0-2.47-.13c-2.45 0-4.13 1.5-4.13 4.24v2.19H7.7V13h2.78v8h3.32Z"
      />
    </template>

    <template v-else-if="name === 'instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke-width="2" />
      <circle cx="12" cy="12" r="4" stroke-width="2" />
      <circle cx="17.4" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </template>

    <template v-else-if="name === 'tiktok'">
      <path
        fill="currentColor"
        stroke="none"
        d="M15.08 3h2.73c.2 1.67 1.16 2.92 2.69 3.53v2.82a7.85 7.85 0 0 1-2.71-.68v6.15A5.18 5.18 0 1 1 13.3 9.7v2.86a2.44 2.44 0 1 0 1.78 2.35V3Z"
      />
    </template>

    <template v-else-if="name === 'google'">
      <path
        fill="currentColor"
        stroke="none"
        fill-rule="evenodd"
        d="M21 12.2c0-.66-.06-1.3-.17-1.91H12v3.62h5.05a4.32 4.32 0 0 1-1.87 2.83v2.35h3.03C19.98 17.46 21 15.05 21 12.2Zm-9 9c2.52 0 4.64-.83 6.18-2.27l-3.03-2.35c-.84.56-1.91.9-3.15.9-2.44 0-4.5-1.65-5.24-3.86H3.63v2.43A9.34 9.34 0 0 0 12 21.2Zm-5.24-7.58a5.62 5.62 0 0 1 0-3.57V7.62H3.63a9.34 9.34 0 0 0 0 8.43l3.13-2.43ZM12 6.2c1.37 0 2.59.47 3.55 1.38l2.7-2.7A9.05 9.05 0 0 0 12 2.48a9.34 9.34 0 0 0-8.37 5.14l3.13 2.43C7.5 7.84 9.56 6.2 12 6.2Z"
        clip-rule="evenodd"
      />
    </template>

    <template v-else-if="name === 'users'">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19M15.25 5.4A3 3 0 0 1 16 11.3M16.5 13a4.5 4.5 0 0 1 4 4.47V19" />
    </template>

    <template v-else-if="name === 'puzzle'">
      <path d="M13.5 3H20a1 1 0 0 1 1 1v6.3a2.75 2.75 0 1 0 0 5.4V20a1 1 0 0 1-1 1h-5.15a2.75 2.75 0 1 0-5.7 0H4a1 1 0 0 1-1-1v-5.15a2.75 2.75 0 1 0 0-5.7V4a1 1 0 0 1 1-1h4.3a2.75 2.75 0 1 1 5.2 0Z" />
    </template>

    <template v-else-if="name === 'hyacinth'">
      <g stroke-width="3.4">
        <path d="M36 76v75M36 151C16 143 2 116 2 83c20 10 32 42 34 68ZM36 151c20-8 34-35 34-68-20 10-32 42-34 68Z" />
        <ellipse cx="36" cy="8" rx="6.5" ry="7.5" />
        <ellipse cx="27.5" cy="18.5" rx="7" ry="8" />
        <ellipse cx="44.5" cy="18.5" rx="7" ry="8" />
        <ellipse cx="20" cy="31" rx="7.5" ry="8.5" />
        <ellipse cx="34.5" cy="31" rx="7" ry="8.5" />
        <ellipse cx="50.5" cy="31" rx="7.5" ry="8.5" />
        <ellipse cx="18.5" cy="43.5" rx="7.5" ry="8.5" />
        <ellipse cx="31" cy="43.5" rx="6.5" ry="8.5" />
        <ellipse cx="43.5" cy="43.5" rx="6.5" ry="8.5" />
        <ellipse cx="54" cy="43.5" rx="7.5" ry="8.5" />
        <ellipse cx="20" cy="56" rx="8" ry="8.5" />
        <ellipse cx="35" cy="56" rx="7" ry="8.5" />
        <ellipse cx="51" cy="56" rx="8" ry="8.5" />
        <ellipse cx="27" cy="69" rx="7.5" ry="8.5" />
        <ellipse cx="45" cy="69" rx="7.5" ry="8.5" />
      </g>
    </template>

    <template v-else-if="name === 'lock'">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10M12 14.25v2.5" />
    </template>

    <template v-else-if="name === 'arrow'">
      <path d="M5 19 19 5M9 5h10v10" />
    </template>
  </svg>
</template>

<style scoped>
.site-icon {
  display: block;
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
}
</style>
