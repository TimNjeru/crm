<template>
  <div class="h-full w-full">
    <div
      v-if="item.type == 'number_chart'"
      class="frappe-number-chart h-full w-full p-5 flex flex-col gap-3"
    >
      <Tooltip :text="__(item.data?.tooltip || '')">
        <div class="flex flex-col gap-3 h-full">
          <div class="flex items-center gap-3">
            <div
              class="h-9 w-9 shrink-0 rounded-full flex items-center justify-center"
              :class="iconStyle.badge"
            >
              <component :is="iconStyle.icon" class="h-[18px] w-[18px]" />
            </div>
            <div class="text-sm font-medium text-ink-gray-7 truncate">
              {{ __(item.data?.title || '') }}
            </div>
          </div>
          <div class="flex items-baseline gap-2 flex-wrap">
            <div class="text-3xl font-semibold text-ink-gray-9 tracking-tight">
              {{ formattedValue }}
            </div>
            <div
              v-if="hasDelta"
              class="text-xs font-medium px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5"
              :class="deltaStyle"
            >
              <component :is="deltaIcon" class="h-3 w-3" />
              <span>{{ formattedDelta }}</span>
            </div>
          </div>
          <div class="text-xs text-ink-gray-5 mt-auto line-clamp-2">
            {{ __(item.data?.tooltip || '') }}
          </div>
        </div>
      </Tooltip>
    </div>
    <div
      v-else-if="item.type == 'spacer'"
      class="rounded bg-surface-white h-full overflow-hidden text-ink-gray-5 flex items-center justify-center"
      :class="editing ? 'border border-dashed border-outline-gray-2' : ''"
    >
      {{ editing ? __('Spacer') : '' }}
    </div>
    <div
      v-else-if="item.type == 'axis_chart'"
      class="frappe-card h-full w-full overflow-hidden"
    >
      <AxisChart v-if="item.data" :config="item.data" />
    </div>
    <div
      v-else-if="item.type == 'donut_chart'"
      class="frappe-card h-full w-full overflow-hidden"
    >
      <DonutChart v-if="item.data" :config="item.data" />
    </div>
  </div>
</template>
<script setup>
import { AxisChart, DonutChart, Tooltip } from 'frappe-ui'
import { computed } from 'vue'
import LucideUsers from '~icons/lucide/users'
import LucideTrendingUp from '~icons/lucide/trending-up'
import LucideTrendingDown from '~icons/lucide/trending-down'
import LucideTrophy from '~icons/lucide/trophy'
import LucideDollarSign from '~icons/lucide/dollar-sign'
import LucideClock from '~icons/lucide/clock'
import LucideBarChart3 from '~icons/lucide/bar-chart-3'

const props = defineProps({
  index: { type: Number, required: true },
  item: { type: Object, required: true },
  editing: { type: Boolean, default: false },
})

const ICON_MAP = {
  'Total leads': {
    icon: LucideUsers,
    badge: 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300',
  },
  'Ongoing deals': {
    icon: LucideTrendingUp,
    badge: 'bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300',
  },
  'Won deals': {
    icon: LucideTrophy,
    badge: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300',
  },
  'Avg. won deal value': {
    icon: LucideDollarSign,
    badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300',
  },
  'Avg. deal value': {
    icon: LucideDollarSign,
    badge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300',
  },
  'Avg. time to close a lead': {
    icon: LucideClock,
    badge: 'bg-sky-50 dark:bg-sky-900/30 text-sky-500 dark:text-sky-300',
  },
  'Avg. time to close a deal': {
    icon: LucideClock,
    badge: 'bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300',
  },
}
const FALLBACK = {
  icon: LucideBarChart3,
  badge: 'bg-surface-gray-2 text-ink-gray-7',
}

const iconStyle = computed(() => ICON_MAP[props.item.data?.title] || FALLBACK)

const formattedValue = computed(() => {
  const data = props.item.data
  if (!data) return ''
  const raw = data.value ?? 0
  const number =
    typeof raw === 'number'
      ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(raw)
      : raw
  return `${data.prefix ? data.prefix + ' ' : ''}${number}${data.suffix || ''}`
})

const hasDelta = computed(() => {
  const d = props.item.data?.delta
  return d !== undefined && d !== null && d !== 0
})

const deltaStyle = computed(() =>
  props.item.data.delta > 0
    ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300'
    : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300',
)

const deltaIcon = computed(() =>
  props.item.data.delta > 0 ? LucideTrendingUp : LucideTrendingDown,
)

const formattedDelta = computed(() => {
  const d = props.item.data.delta
  const sign = d > 0 ? '+' : '-'
  const value =
    typeof d === 'number' ? Math.abs(d).toFixed(1) : Math.abs(Number(d) || 0).toFixed(1)
  return `${sign}${value}${props.item.data.deltaSuffix || ''}`
})
</script>
