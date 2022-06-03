<template>
    <div class="relative border p-2 border-gray-300">
        <div class="px-6">
            <img :src="`/images/${this.person.image}`" class="max-w-full h-24 mx-auto" :alt="`${this.person.name} - ${this.person.title}`" />
        </div>
        <div class="text-center">
            <h2 class="text-2xl leading-normal font-bold mb-1">{{ this.person.name }}</h2>
            <h3 class="text-xl text-gray-500 leading-relaxed font-light">{{ this.person.title }}</h3>
            <ul role="list" class="text-left">
                <li v-if="this.person.age !== undefined" class="flex">
                    <div class="ml-3">
                        <p class="font-bold text-xs text-gray-500">Age</p>
                        <p class="font-light text-gray-900">{{ this.person.age }}</p>
                    </div>
                </li>
                <li v-if="this.person.job !== undefined" class="flex">
                    <div class="ml-3">
                        <p class="font-bold text-xs text-gray-500">Job</p>
                        <p class="font-light text-gray-900">{{ this.person.job }}</p>
                    </div>
                </li>
                <li v-if="this.person.likes !== undefined" class="flex">
                    <div class="ml-3">
                        <p class="font-bold text-xs text-gray-500">Likes</p>
                        <p class="font-light text-gray-900">{{ this.person.likes }}</p>
                    </div>
                </li>
                <li v-if="this.person.aspirations !== undefined" class="flex">
                    <div class="ml-3">
                        <p class="font-bold text-xs text-gray-500">Aspirations</p>
                        <p class="font-light text-gray-900">{{ this.person.aspirations }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <LockClosedIcon v-if="this.locked" class="absolute top-1 right-1 text-red-500 h-5 w-5 cursor-pointer" @click="$emit('toggleLock')" />
        <LockOpenIcon v-else class="absolute top-1 right-1 text-gray-300 h-5 w-5 cursor-pointer" @click="$emit('toggleLock')" />

    </div>
</template>

<script>

import { LockOpenIcon, LockClosedIcon } from '@heroicons/vue/solid'

export default {
    name: 'generator-person',
    components: {
        LockOpenIcon,
        LockClosedIcon
    },
    props: {
        person: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            default: null
        },
        locked: {
            type: Boolean,
            default: false
        }
    }
}
</script>