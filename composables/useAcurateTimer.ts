import {ref, Ref} from 'vue';

export default function useAccurateTimer(execute: () => void, millisecondsBetweenExecutions: Ref<number>) {
    const expected = ref<number | null>(null);
    const timeout = ref<number | null>(null);
    
    const start = () => {
        expected.value = Date.now() + millisecondsBetweenExecutions.value;
        timeout.value = window.setTimeout(step, millisecondsBetweenExecutions.value);
    };
    
    const stop = () => {
        timeout.value && window.clearTimeout(timeout.value);
    };
    
    const step = () => {
        const drift = Date.now() - (expected.value ?? Date.now());
        execute();
        expected.value = (expected.value ?? 0) + millisecondsBetweenExecutions.value;
        timeout.value = window.setTimeout(step, Math.max(0, millisecondsBetweenExecutions.value - drift));
    };
    
    return {
        start,
        stop,
    };
}