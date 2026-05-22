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
      class="h-full w-full rounded-md bg-surface-white shadow"
    >
      <AxisChart v-if="item.data" :config="item.data" />
    </div>
    <div
      v-else-if="item.type == 'donut_chart'"
      class="h-full w-full rounded-md bg-surface-white shadow overflow-hidden"
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
  'Total leads': { icon: LucideUsers, badge: 'bg-blue-50 text-blue-500' },
  'Ongoing deals': { icon: LucideTrendingUp, badge: 'bg-purple-50 text-purple-500' },
  'Won deals': { icon: LucideTrophy, badge: 'bg-green-50 text-green-600' },
  'Avg. won deal value': { icon: LucideDollarSign, badge: 'bg-emerald-50 text-emerald-600' },
  'Avg. deal value': { icon: LucideDollarSign, badge: 'bg-amber-50 text-amber-600' },
  'Avg. time to close a lead': { icon: LucideClock, badge: 'bg-sky-50 text-sky-500' },
  'Avg. time to close a deal': { icon: LucideClock, badge: 'bg-rose-50 text-rose-500' },
}
const FALLBACK = { icon: LucideBarChart3, badge: 'bg-gray-100 text-gray-500' }

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
    ? 'bg-green-50 text-green-600'
    : 'bg-red-50 text-red-600',
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
