<template>
  <div id="app">
    <div class="sidebar side">
      <div class='logobg'>
        <img class='logo' src="./assets/TSLogo.png">
      </div>
      <h3>WAMI Viewer</h3>
      <hr class="sidebreak">
      <h4>Please Select Image File to be Displayed</h4>
      <multiselect class="select selector" v-model="selected" :options="filename"></multiselect>
      <hr class="sidebreak">
      <h4>Select Option to Display Media Controls</h4>
      <div class='row button' v-show='selected !== null'>
        <div class='col-sm-3'><i class='fa fa-backward'></i></div>
        <div class='col-sm-3'>
          <i v-show='!play' @click='playPause' class='fa fa-play'></i>
          <i v-show='play' @click='playPause' class='fa fa-pause'></i>
        </div>
        <div class='col-sm-3'><i @click='stop' class='fa fa-stop'></i></div>
        <div class='col-sm-3'><i class='fa fa-forward'></i></div>
      </div>
      <hr class="sidebreak">
      <!-- <h4>Coordinates and Zoom</h4>
      <div class="select selector">
        <input type="number" placeholder="enter x-coord" />
        <input type="number" placeholder="enter y-coord" />
        <input type="number" placeholder="enter zoom value" />
        <button>Enter</button>
      </div> -->
      <!-- <a v-for="channel in channels" :key="channel.id">{{channel.name}}</a> -->
    </div>
    <div class="content">
      <router-view class="route" :play='play' :selected='selected' :imageUrl='imageUrl'/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)
// var selection = ''
export default {
  name: 'App',
  data () {
    return {
      selected: null,
      play: false,
      filename: [],
      hash: [],
      imageUrl: ''
    }
  },
  methods: {
    playPause () {
      if (this.play) {
        this.play = false
      } else {
        this.play = true
        // this.setSelection()
        this.displayImage()
      }
    },
    stop () {
      this.imageUrl = null
      this.selected = null
      this.play = false
    },
    setSelection () {
      // var selection = Vue.util.extend({}, this.selected)
      console.log(this.selected)
      // this.$socket.emit('image', this.selected)
      this.$socket.on('images', (temp) => {
        this.filename = temp
      })
      // if ((this.play && Boolean(this.selected)) === true) {
      //   var count = this.hash.name.length
      //   for (var i = 0; i < count; i++) {
      //     console.log(this.hash.name[i])
      //     console.log(this.selected)
      //     if (this.hash.name[i] === this.selected) {
      //       this.imageUrl = this.hash.bs64[i]
      //       return this.imageUrl
      //     }
      //     this.imageUrl = null
      //     // return this.imageUrl
      //   }
      // }
    },
    displayImage () {
      console.log(this.selected)
      this.$socket.emit('selected', this.selected)
      this.$socket.on('image', (image) => {
        if (image) {
          var img = 'data:image/jpeg;base64,' + image.buffer
          this.imageUrl = img
        }
      })
    }
  },
  created () {
    this.setSelection()
    // this.$socket.on('image', (image, temp) => {
    //   if (image) {
    //     var img = 'data:image/jpeg;base64,' + image.buffer
    //     this.imgurls.push(img)
    //     this.filename = temp
    //     this.hash = {name: this.filename, bs64: this.imgurls}
    //     console.log('image served')
    //   }
    // })
  }
}
</script>
