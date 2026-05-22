<template>
  <div class="relative flex h-full w-full justify-center">
    <div
      class="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-5"
      :class="widthClass"
      :style="{ top: top }"
    >
      <div
        class="h-16 w-16 rounded-2xl bg-surface-gray-2 flex items-center justify-center"
      >
        <Icon :icon="icon" class="size-7 text-ink-gray-6" />
      </div>
      <div class="flex flex-col items-center gap-2">
        <span class="text-lg font-semibold text-ink-gray-9 tracking-tight">
          {{ computedTitle }}
        </span>
        <span class="text-center text-sm text-ink-gray-6 leading-relaxed">
          {{ computedDescription }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import Icon from '@/components/Icon.vue'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: {
    type: [String, Object],
    default: 'file-text',
  },
  top: { type: String, default: '35%' },
  width: { type: String, default: 'md' },
})

const computedTitle = computed(() => {
  return props.title ? props.title : __('No {0} Found', [__(props.name)])
})

const computedDescription = computed(() => {
  return props.description
    ? props.description
    : __(
        'It appears that there are currently no {0} available. You can create more {0} by using the Create button.',
        [__(props.name)],
      )
})

const widthClass = computed(() => {
  switch (props.width) {
    case 'sm':
      return 'w-2/12'
    case 'lg':
      return 'w-8/12'
    default:
      return 'w-4/12'
  }
})
</script>
