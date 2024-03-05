<template>
    <div class="h-full w-full flex flex-col">
        <Menu :showMenu="showMenu" @close="showMenu = false" />
        <div class="p-2">
            <div class="flex items-center rounded-md gap-2 py-2 px-5 placeholder:text-green-900 border border-gray-200">
                <i class="fa-solid fa-bars text-gray-500 text-xl mt-1" @click="showMenu = true"></i>
                <input @input="handleSearch"
                    class="px-2 w-full outline-none placeholder:text-gray-500 placeholder:font-medium"
                    placeholder="Search tags" />
            </div>
            <div v-if="suggestions">
                <p class="w-full p-2 bg-white" v-for="item in suggestions" @click="async () => await updateHeatMap(item)">
                    {{ item }}
                </p>
            </div>
        </div>

        <div class="map h-full w-full grow-1" ref="mapContainer"></div>
    </div>
</template>
<script setup>
const mapContainer = shallowRef(null);
const map = shallowRef(null);
const suggestions = ref([]);
const showMenu = ref(false)

const handleSearch = async (event) => {
    const query = event?.target?.value;
    if (query.length == 0) {
        suggestions.value = ["Please type magne"];
        return;
    }
    const results = await getSuggestions(query);
    if (results.length == 0) {
        suggestions.value = ["Does not exist"];
        return;
    }
    const temp = [...new Set(results?.map((item) => item?.tag))];
    suggestions.value = temp;
};

const updateHeatMap = async (tagName) => {
    console.log("tagName: ", tagName);
    const tags = await getTags(tagName);

    console.log("tags: ", tags);
    const geojson = {
        type: "FeatureCollection",
        name: "my_data",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        features: [],
    };

    tags?.forEach((tag) => {
        geojson?.features?.push({
            type: "Feature",
            properties: {
                students: 908,
                name: "Albertville Middle School",
                photo: "some link",
                id: tag?.id,
            },
            geometry: {
                type: "Point",
                coordinates: [tag?.longitude, tag?.latitude],
            },
        });
    });

    addHeatMap(map.value, geojson, tags);
};

onUnmounted(() => {
    map.value?.remove();
});

onMounted(async () => {
    map.value = createMap(mapContainer.value);
});
</script>
