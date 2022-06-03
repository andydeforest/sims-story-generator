<template>
  <Navbar />
  <main>
    <div class="max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <RouterView />
    </div>
  </main>
</template>

<script>
import '@/assets/base.css'
import { Navbar } from '@/components/UI';

export default {
  components: {
    Navbar
  }
}
</script>