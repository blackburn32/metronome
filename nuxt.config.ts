export default defineNuxtConfig({
    app: {
        baseURL: '/metronome/',
        cdnURL: '/metronome/',
    },
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
});
