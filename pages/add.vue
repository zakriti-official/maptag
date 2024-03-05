<template>
  <div class="flex flex-col h-full">
    <Menu :showMenu="showMenu" @close="showMenu = false" />
    <div class="flex items-center gap-4 py-2 px-5 border-b border-gray-200">
      <i class="fa-solid fa-bars text-gray-500 text-xl mt-1" @click="showMenu = true"></i>
      <p class="">Add Tag</p>
    </div>

    <div class="h-full flex flex-col">
      <div class="px-5 my-3 relative w-full">
        <p class="text-xs font-medium">Tag Name</p>
        <input v-model="inputRef" @input="handleSearch"
          class="border border-gray-200 outline-none rounded-md w-full mt-1 py-2 px-3 text-sm placeholder:font-light"
          placeholder="Enter tag name " />
        <div v-if="suggestions.length || showOption" class="absolute h-full w-full z-10 left-0 right-0 px-5">
          <div class="rounded-b-xl overflow-hidden">
            <div v-for="item in suggestions"
              class="w-full flex justify-between items-center border-b border-gray-300 bg-gray-100 py-2 px-4 text-xs">
              <p class="" @click="async () => await updateHeatMap(item)">
                {{ item[0] }}
              </p>
              <p>{{ item[1] }}</p>
            </div>
            <div v-if="showOption"
              class="w-full flex justify-between items-center border-b border-gray-300 bg-gray-100 py-2 px-4 text-xs">
              Creating New Tag: "{{ inputRef }}"
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 h-full">
        <!-- <p class=" mb-1 text-xs font-medium">Tag Location</p> -->
        <div class="map h-full w-full grow-1 rounded-md " ref="mapContainer"></div>
      </div>

      <div class="pb-6 pt-2 px-5 ">
        <div class="py-1 flex gap-2 items-center text-gray-500 mb-2">
          <i class="fa-solid fa-circle-info"></i>
          <p class="w-full text-xs leading-4">
            Here your going to add new tag at your current location
          </p>
        </div>
        <button
          class="bg-black/90 text-white w-full py-3 font-medium rounded-sm active:scale-95 transition-all flex justify-center items-center gap-3">
          <p class="">Submit</p> <i class="fa-solid fa-paper-plane text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as maptilersdk from "@maptiler/sdk";

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const showMenu = ref(false);
const suggestions = ref([]);
const inputRef = ref("");
const showOption = ref(false);

const handleSearch = async (event) => {
  try {
    const query = event?.target?.value;

    console.log("event query", query)

    if (query.length == 0) {
      suggestions.value = [];
      return;
    }

    const results = await getSuggestions(query);
    if (results.length == 0) {
      suggestions.value = [];
    }

    console.log("results", results)

    const freq = {};

    for (const word of results) {
      freq[word.tag] = freq[word.tag] ? freq[word.tag] + 1 : 1;
    }

    const temp = Object.entries(freq);

    console.log("temp", temp)

    const matchFound = temp.some(item => {
      console.log("item", item);
      console.log("query", query);
      return item[0] == query;
    });

    console.log("matchFound", matchFound)

    showOption.value = !matchFound;

    suggestions.value = temp;
  } catch (err) {
    console.log("ERr", err)
  }
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    let coords = [position.coords.longitude, position.coords.latitude];
    map.value = createMap(mapContainer.value, {
      zoom: 16,
      center: coords,
    });

    new maptilersdk.Marker({
      color: "red",
    })
      .setLngLat(coords)
      .addTo(map.value);
  });
});
</script>
