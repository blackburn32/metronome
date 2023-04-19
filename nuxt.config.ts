// @ts-ignore
export default defineNuxtConfig({
    app: {
        baseURL: '/metronome/',
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/metronome/favicon.svg' }]
        }
    },
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
});
