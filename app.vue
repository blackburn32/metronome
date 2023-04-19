<template>
    <div class="flex flex-col w-screen h-screen justify-center items-center" data-theme="dark">
        <ClientOnly>
            <Metronome/>
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
useHead({
    title: 'Metronome',
    meta: [
        { name: 'description', content: 'A simple metronome component built with Nuxt and Tailwind CSS.' }
    ],
})
</script>