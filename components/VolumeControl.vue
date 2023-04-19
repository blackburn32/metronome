<template>
    <div class="flex flex-row justify-between items-center">
        <Icon
            v-show="volume <= 0"
            id="volume-off"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="material-symbols:volume-off"
            size="32"
            @click="volume = 0"
        />
        <Icon
            v-show="volume > 0"
            id="volume-off-outline"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="material-symbols:volume-off-outline"
            size="32"
            @click="volume = 0"
        />
        <input
            v-model="volume"
            class="range mx-4"
            max="1"
            min="0"
            step="0.01"
            type="range"
        />
        <Icon
            v-show="volume < 0.5"
            id="volume-down-outline"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="material-symbols:volume-down-outline"
            size="32"
            @click="volume = 1"
        />
        <Icon
            v-show="volume >= 0.5 && volume < 1"
            id="volume-up-outline"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="material-symbols:volume-up-outline-rounded"
            size="32"
            @click="volume = 1"
        />
        <Icon
            v-show="volume >= 1"
            id="volume-up"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="material-symbols:volume-up"
            size="32"
            @click="volume = 1"
        />
    </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';

const volume = ref(0.5);

const emits = defineEmits({
    updateVolume: (value: number) => true,
});

watch(volume, (newValue) => {
    emits('updateVolume', newValue);
});
</script>