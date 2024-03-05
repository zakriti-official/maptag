import { Map, MapStyle, config } from '@maptiler/sdk';
import { markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import * as turf from "turf/turf";


export function createMap(mapContainerRef,options={}) {
    config.apiKey = '0DbRa2IseapNJ5ABIel1';
    const initialState = { lng: 76.22, lat: 12.67, zoom: 0.3 };

    return markRaw(new Map({
        container: mapContainerRef,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
        ...options
    }));
}

export function addHeatMap(map, geoJsonData, tags) {
    try {
        map?.removeLayer('tag_heat');
        map?.removeSource('tag_data');
    } catch (e) {
        // console.log("e", e)
    }
    // add a clustered GeoJSON source for a sample set of earthquakes
    map?.addSource('tag_data', {
        type: 'geojson',
        data: geoJsonData
    });

    // console.log("geoJsonData", geoJsonData);

    map?.addLayer({
        id: 'tag_heat',
        type: 'heatmap',
        source: 'tag_data',
        paint: {

            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                12,
                3
            ],

            // Color ramp for heatmap.value?.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, "rgba(68, 1, 84, 0)",
                0.01, "rgba(68, 1, 84, 0.2)",
                0.13, "rgba(71, 44, 122, 1)",
                0.25, "rgba(59, 81, 139, 1)",
                0.38, "rgba(44, 113, 142, 1)",
                0.5, "rgba(33, 144, 141, 1)",
                0.63, "rgba(39, 173, 129, 1)",
                0.75, "rgba(92, 200, 99, 1)",
                0.88, "rgba(170, 220, 50, 1)",
                1, "rgba(253, 231, 37, 1)",
            ],

            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                9,
                20
            ],
        }
    });

    // var bboxPolygon = turf.bboxPolygon(geoJsonData);

    // console.log("bboxPolygon", bboxPolygon)

    // const bounds = map?.getBounds(geoJsonData);

    // const boundsArr = Object.values(bounds).map(item => {
    //     return [item?.lat.toFixed(4), item?.lng]
    // });

    // console.log("boundsArr", boundsArr);

    // const tempArr = [
    //     [32.958984, -5.353521],
    //     [43.50585, 5.615985]
    // ];

    // console.log("tempArr", tempArr);

    // console.log("bounds", bounds)

    // console.log("map bbox", bounds);

    // setTimeout(() => {
    //     map?.fitBounds(boundsArr)
    // }, 2_000);

    // let collection = turf.featureCollection(geoJsonData)
    let bbox = turf.bbox(geoJsonData)
    map.fitBounds(bbox,{
        padding:80
    });

    // console.log("tag_heat", map.getLayer("tag_heat"));
}