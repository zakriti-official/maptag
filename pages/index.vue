<template>
  <div class="bg-blue-300 h-screen flex flex-col p-8 justify-around">
    <div class="h-1/2">
      <img src="/public/homedraw.svg" class="h-full w-full"/>
    </div>
    <div class="gap-4 flex flex-col ">
      <h1 class="text-4xl leading-tight font-bold text-black">
        Explore the world with <span class="text-white">Maptag </span>
      </h1>
      <p class="text-black/70 font-semibold">
        
        
        We're a team of enthusiastic and young minds from Zakriti, dedicated to building user-valuable products. 
      </p>
      <button
        class="mt-3 p-3 rounded-full font-semibold text-xl border-2 border-[#6C63FF]"
        @click="handleNavigate"
      >
        Explore & view 
      </button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const handleNavigate = () => {
  router.push("/map");
};
</script>
