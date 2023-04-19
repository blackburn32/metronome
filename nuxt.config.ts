export default defineNuxtConfig({
    app: {
        baseURL: '/metronome/',
    },
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
});
