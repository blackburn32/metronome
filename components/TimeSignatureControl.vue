<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-row items-center justify-center">
            <Icon
                id="beats-per-measure-minus"
                class="text-base-content hover:text-accent-content cursor-pointer"
                name="ic:baseline-minus"
                size="16"
                @click="decreaseBeatsPerMeasure"
            />
            <input
                id="beats-per-measure"
                ref="beatsPerMeasureDisplay"
                v-model="beatsPerMeasure"
                class="py-2 mx-1 text-4xl text-accent-content border-b-accent-content border-b-2 select-none w-[40px] text-center bg-base-300"
                type="text"
            />
            <Icon
                id="beats-per-measure-plus"
                class="text-base-content hover:text-accent-content cursor-pointer"
                name="ic:baseline-plus"
                size="16"
                @click="increaseBeatsPerMeasure"
            />
        </div>
        <div class="flex flex-row items-center justify-center">
            <Icon
                id="beat-value-minus"
                class="text-base-content hover:text-accent-content cursor-pointer"
                name="ic:baseline-minus"
                size="16"
                @click="decreaseSubdivisionValue"
            />
            <div
                id="beat-value"
                class="py-2 mx-1 text-4xl text-accent-content min-w-[40px] text-center cursor-default select-none"
                type="text"
            >
                {{ beatSubdivisionValues[currentBeatValue] }}
            </div>
            <Icon
                id="beat-value-plus"
                class="text-base-content hover:text-accent-content cursor-pointer"
                name="ic:baseline-plus"
                size="16"
                @click="increaseSubdivisionValue"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, watch, onMounted} from 'vue';

const beatsPerMeasure = ref<number>(4);
const increaseBeatsPerMeasure = () => {
    beatsPerMeasure.value = beatsPerMeasure.value + 1;
};
const decreaseBeatsPerMeasure = () => {
    beatsPerMeasure.value = Math.max(beatsPerMeasure.value - 1, 1);
};

const beatSubdivisionValues = ref<number[]>([1, 2, 4, 8, 16, 32, 64]);
const increaseSubdivisionValue = () => {
    currentBeatValue.value = Math.min(beatSubdivisionValues.value.length - 1, currentBeatValue.value + 1);
};
const decreaseSubdivisionValue = () => {
    currentBeatValue.value = Math.max(0, currentBeatValue.value - 1);
};

const currentBeatValue = ref(2);

const emits = defineEmits({
    updateBeatsPerMeasure: (value: number) => true,
    updateBeatSubdivision: (value: number) => true,
});

watch(beatsPerMeasure, (newValue) => {
    emits('updateBeatsPerMeasure', newValue);
});

watch(currentBeatValue, (newValue) => {
    emits('updateBeatSubdivision', beatSubdivisionValues.value[newValue]);
});

const beatsPerMeasureDisplay = ref<HTMLInputElement | null>(null);
onMounted(() => {
    if(beatsPerMeasureDisplay.value){
        beatsPerMeasureDisplay.value.addEventListener('beforeinput', (event) => {
            if(event.data && !/^[0-9]+$/.test(event.data)){
                event.preventDefault();
            }
        });
    }
});
</script>