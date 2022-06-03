<template>
  <button class="fixed z-10 left-5 bottom-5 bg-indigo-500 hover:bg-indigo-600 text-white p-5 rounded-2xl text-xl " @click="regenerate">Regenerate</button>
  <template v-if="results.grandparent && results.grandparent !== null">
    <h2 class="text-4xl font-thin mb-3">Grandparent</h2>
    <div class="grid grid-flow-col auto-cols-auto items-center content-center justify-center gap-4">
      <div class="col-start-2 w-96">
        <generator-person :person="results.grandparent" :locked="this.locked.grandparent" @toggle-lock="toggleLock('grandparent', !this.locked.grandparent)" />
      </div>
    </div>
  </template>
  <template v-if="results.parents && !isEmpty(results.parents)">
    <h2 class="text-4xl font-thin mb-3">Parents</h2>
    <div class="grid xs:grid-cols-1 md:grid-flow-col auto-cols-auto items-center content-center justify-center gap-4" >
      <template v-for="(person, x) in results.parents" :key="x">
        <div v-if="person !== null" class="w-96">
          <generator-person v-if="person !== null" :person="person" :locked="this.locked[`parent${x+1}`]" @toggle-lock="toggleLock(`parent${x+1}`, !this.locked[`parent${x+1}`])" />
        </div>
      </template>
    </div>
  </template>
  <template v-if="results.kids && !isEmpty(results.kids)" >
    <h2 class="text-4xl font-thin mb-3">Children</h2>
    <div class="grid xs:grid-cols-1 md:grid-flow-col auto-cols-auto items-center content-center justify-center gap-4">
      <template v-for="(person, x) in results.kids" :key="x">
        <div v-if="person !== null">
          <generator-person v-if="person !== null" :person="person" :locked="this.locked[`child${x+1}`]" @toggle-lock="toggleLock(`child${x+1}`, !this.locked[`child${x+1}`])" />
        </div>
      </template>
    </div>
  </template>
  <template v-if="results.pet && results.pet !== null">
    <h2 class="text-4xl font-thin mb-3">Pet</h2>
    <div class="grid grid-flow-col auto-cols-auto items-center content-center justify-center gap-4">
      <div class="col-start-2">
        <generator-person :person="results.pet" :locked="this.locked.pet" @toggle-lock="toggleLock('pet', !this.locked.pet)" />
      </div>
    </div>
  </template>
  <template v-if="results.extra && results.extra !== null" >
    <h2 class="text-4xl font-thin mb-3">A little extra...</h2>
    <div class="grid grid-flow-col auto-cols-auto items-center content-center justify-center gap-4">
      <div class="col-start-2">
        <p>{{ results.extra }}</p>
      </div>
    </div>
  </template>


</template>

<script>

import generator from '@/lib/generator'
import GeneratorPerson from '@/components/Person.vue';

export default {
  components: {
    GeneratorPerson
  },
  data() {
    return {
      results: generator.run(),
      locked: {
        grandparent: false,
        parent1: false,
        parent2: false,
        child1: false,
        child2: false,
        child3: false,
        child4: false,
        child5: false,
        pet: false
      },
    }
    
  },
  methods: {
    toggleLock(lock, status) {
      this.locked[lock] = status;
    },
    regenerate() {
      let next = generator.run();
      if(this.locked.grandparent) {
        next.grandparent = this.results.grandparent;
      }
      for(let x = 0; x < 2; x++) {
        if(this.locked[`parent${x+1}`]) {
          next.parents[x] = this.results.parents[x];
        }
      }
      for(let x = 0; x < 5; x++) {
        if(this.locked[`child${x+1}`]) {
          next.kids[x] = this.results.kids[x];
        }
      }
      if(this.locked.pet) {
        next.pet = this.results.pet;
      }
      // make sure *everything* doesnt come back empty
      if(next.grandparent === null && this.isEmpty(next.parents) && this.isEmpty(next.kids)) {
        return this.regenerate();
      }
      this.results = next;
    },
    isEmpty(list) {
      return list.every(e => e === null)
    }
  },
}
</script>