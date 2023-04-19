import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import VolumeControl from '../components/VolumeControl.vue';

describe('VolumeControl.vue', () => {
    it('renders the correct initial volume', () => {
        const wrapper = mount(VolumeControl);
        const volumeInput = wrapper.find<HTMLInputElement>('input[type="range"]');
        expect(volumeInput.element.value).toBe('0');
    });
    
    it('updates volume when the slider is moved', async () => {
        const wrapper = mount(VolumeControl);
        const volumeInput = wrapper.find<HTMLInputElement>('input[type="range"]');
        
        await volumeInput.setValue(0.5);
        
        expect(volumeInput.element.value).toBe('0.5');
    });
    
    it('emits updateVolume event when the volume is updated', async () => {
        const wrapper = mount(VolumeControl);
        const volumeInput = wrapper.find('input[type="range"]');
        
        await volumeInput.setValue(0.5);
        
        
        expect(wrapper.emitted('updateVolume')).toBeTruthy();
        expect(wrapper.emitted('updateVolume')![0]).toEqual(['0.5']);
    });
    
    it('sets volume to 0 when volume-off icon is clicked', async () => {
        const wrapper = mount(VolumeControl);
        const volumeOffIcon = wrapper.find('Icon#volume-off');
        
        await volumeOffIcon.trigger('click');
        
        expect(wrapper.vm.volume).toBe(0);
    });
    
    it('sets volume to 1 when volume-up icon is clicked', async () => {
        const wrapper = mount(VolumeControl);
        const volumeUpIcon = wrapper.find('Icon#volume-down-outline');
        
        await volumeUpIcon.trigger('click');
        
        expect(wrapper.vm.volume).toBe(1);
    });
});