<template>
  <Menu as="div" class="relative inline-block text-left w-full md:w-auto">
    <div>
      <MenuButton
        class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {{ title }}

        <EllipsisVerticalIcon class="h-5 w-5 ml-2 text-black dark:text-white" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
      >
        <div class="px-2 py-1">
          <MenuItem v-for="link in links" :key="link.baru" :href="link.href" v-slot="{ active }">
            <button
              @click="link.function"
              :class="[
                active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                'group flex w-full items-center rounded-sm px-2 py-2 text-sm',
              ]"
            >
              <component :is="link.icon" class="w-5 h-5 mr-3" />
              {{ link.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { DocumentIcon, DocumentTextIcon, EllipsisVerticalIcon, FunnelIcon, PlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  title: {
    type: String,
    default: "Action",
  },
  links: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default() {
      return [
        {
          function: function wow() {
            alert("it work");
          },
          label: "Baru",
          icon: PlusIcon,
        },
      ];
    },
  },
});
</script>
