<template>
    <div class="flex flex-row items-center justify-center">
        <Icon
            id="minus"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="ic:baseline-minus"
            size="32"
            @click="increaseBpm(-1)"
        />
        <input
            ref="bpmDisplay"
            v-model="bpm"
            class="max-w-[80px] text-4xl bg-base-300 text-accent-content outline-none p-2 text-right"
            maxlength="3"
            type="text"
        />
        <div class="text-4xl text-accent-content select-none cursor-default">BPM</div>
        <Icon
            id="plus"
            class="text-base-content hover:text-accent-content cursor-pointer"
            name="ic:baseline-plus"
            size="32"
            @click="increaseBpm(1)"
        />
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';

const bpm = ref(120);

const increaseBpm = (amount: number) => {
    bpm.value = Math.min(999, Number.parseInt(bpm.value) + amount);
    bpm.value = Math.max(1, bpm.value);
};

const digitRegex = new RegExp('^[0-9]+$');
const bpmDisplay = ref<HTMLInputElement | null>(null);
onMounted(() => {
    if(bpmDisplay.value){
        bpmDisplay.value.addEventListener('beforeinput', (event) => {
            if(event.data && !digitRegex.test(event.data)){
                event.preventDefault();
            }
        });
    }
});

const emits = defineEmits({
    updateBpm: (value: number) => true,
});

watch(bpm, (newValue) => {
    const maybeBpm = Number.parseInt(newValue.toString());
    if(maybeBpm){
        emits('updateBpm', Number.parseInt(newValue.toString()));
    }
});
</script>