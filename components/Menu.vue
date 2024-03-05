<template>
    <div
        :class="['transition-[background] duration-100 w-full fixed inset-0  z-20', showMenu ? 'left-0 bg-black/20' : '-left-full bg-transparent']">
        <div
            :class="['fixed top-0 bottom-0 w-3/4 h-full bg-white border-r-2 border-gray-300 z-10 transition-all duration-500 flex flex-col', showMenu ? 'left-0' : '-left-full']">
            <i class="fa-solid fa-xmark mx-5 my-4 text-xl" @click="$emit('close')"></i>
            <div class="flex flex-col">
                <NuxtLink to="/add" active-class="font-medium bg-gray-200" class="px-5 py-3">Add Tag</NuxtLink>
                <NuxtLink to="/map" active-class="font-medium bg-gray-200" class="px-5 py-3">Tag Map</NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['showMenu'])
</script>