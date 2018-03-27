<template :selected='selected'>
      <!-- <li v-for="name in hash.name" :key="name.id">{{name}}</li> -->
      <!-- <input type="number" placeholder="enter x-coord" v-model.number="xcoord"/>
      <input type="number" placeholder="enter y-coord" v-model.number="ycoord"/>
      <input type="number" placeholder="enter zoom value" v-model.number="zoomnew"/>
      <button @click="adjustMap">Enter</button> -->
      <!-- <multiselect class="select" v-model="selected" :options="options2"></multiselect> -->
      <div>
        <!-- {{play}}
        {{selected}} -->
        <v-map :zoom="zoom" :center="center" class="map" >
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-image-overlay :url="imageUrl" :bounds="bounds" :opacity= "options.opacity"></v-image-overlay>
        </v-map>
      </div>
</template>

<script>
import Vue from 'vue'
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'
import Multiselect from 'vue-multiselect'

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('v-image-overlay', Vue2Leaflet.ImageOverlay)
Vue.component('multiselect', Multiselect)

export default{
  name: 'Wami',
  props: ['play', 'selected', 'imageUrl'],
  data () {
    return {
      zoom: 4,
      center: [34, -106],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.218938, -1.553772),
      xcoord: null,
      ycoord: null,
      zoomnew: null,
      bounds: [[32, -130], [13, -100]],

      options: {
        opacity: 0.5
      },
      value: ''
    }
  }
}
</script>

<style>
@import '../../node_modules/leaflet/dist/leaflet.css';
@import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
.map {
    position: fixed;
    display: block !important;
    width: inherit !important;
}
.select {
  padding-bottom: 0px;
  padding-top: 0px !important;
}
</style>
