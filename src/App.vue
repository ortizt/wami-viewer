<template>
  <div id="app">
    <div class="sidebar side">
      <div class='logobg'>
        <img class='logo' src="./assets/TSLogo.png">
      </div>
      <h3>WAMI Viewer</h3>
      <hr class="sidebreak">
      <h4>Please Select Image File to be Displayed</h4>
      <multiselect class="select selector" v-model="selected" @input="returnImages()" :options="filename"></multiselect>
      <hr class="sidebreak">
      <h4>Select Option to Display Media Controls</h4>
      <div class='row button' v-show='selected !== null'>
        <div class='col-sm-3'>
          <i v-show='!rewind' @click="rewindImages(index)" class='fa fa-backward'></i>
          <i v-show='rewind' @click="rewindImages(index)" class='fa fa-pause'></i>
        </div>
        <div class='col-sm-3'>
          <i v-show='!play' @click='playPause()' class='fa fa-play'></i>
          <i v-show='play' @click='playPause()' class='fa fa-pause'></i>
        </div>
        <div class='col-sm-3'><i @click='stop' class='fa fa-stop'></i></div>
        <div class='col-sm-3'>
          <i v-show='!fast' @click="fastForwardImages(index)" class='fa fa-forward'></i>
          <i v-show='fast' @click="fastForwardImages(index)" class='fa fa-pause'></i>
        </div>
      </div>
      <hr class="sidebreak">
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
export default {
  name: 'App',
  data () {
    return {
      selected: null, // selection of data set
      play: false,
      rewind: false,
      fast: false,
      filename: [],
      imagesArray: [], // stores binary urls of images from server
      imageUrl: '', // used to display image on map
      timer: null, // timer for play
      timerR: null, // timer for rewind
      timerF: null, // timer for fastford
      index: 0
    }
  },
  methods: {
    playPause () { // play pause function
      if (this.play) { // clicked pause
        this.play = false // show play button
        clearInterval(this.timer) // clear play timer
      } else { // clicked play
        this.play = true // show pause button
        this.fast = false // when play is clicked reset fastforward and rewind buttons
        this.rewind = false
        clearInterval(this.timerR) // clear timers
        clearInterval(this.timerF)
        this.displayImages(this.index) // display image function
      }
    },
    stop () { // reset all values to starting values
      clearInterval(this.timerR)
      clearInterval(this.timer)
      clearInterval(this.timerF)
      this.imagesArray = []
      this.timer = null
      this.timerR = null
      this.timerF = null
      this.imageUrl = null
      this.selected = null
      this.play = false
      this.rewind = false
      this.fast = false
      this.index = 0
    },
    rewindImages (i) { // rewind function
      if (this.play) { // if currently playing and rewind clicked
        clearInterval(this.timer) // clear play timer
        this.play = false // show play button
      }
      if (this.fast) { // if currently fast forwarding and rewind clicked
        clearInterval(this.timerF) // clear fastforward timer
        this.fast = false // show fast forward button
      }
      if (this.rewind) { // if rewind clicked more than once
        clearInterval(this.timer) // clear play timer
        this.rewind = false // pause rewind
        clearInterval(this.timerR)
        clearInterval(this.timerF)
      } else { // else rewind clicked for first time
        this.rewind = true
        var count = this.imagesArray.length
        this.timerR = setInterval(() => { // display images in reverse order
          this.imageUrl = this.imagesArray[i]
          i === 0 ? i = count - 1 : i--
          this.index = i
        }, 250)
      }
    },
    fastForwardImages (i) { // fast forward function
      if (this.play) { // if currently playing and fast forward clicked
        clearInterval(this.timer) // clear play timer
        this.play = false // show play button
      }
      if (this.rewind) { // if currently rewinding and fast forward clicked
        clearInterval(this.timerR) // clear fastforward timer
        this.rewind = false // show rewind button
      }
      if (this.fast) { // if fast forward clicked more than once
        clearInterval(this.timer) // clear play timer
        this.fast = false // pause fast forward
        clearInterval(this.timerR)
        clearInterval(this.timerF)
      } else { // else fast forward clicked for first time
        this.fast = true
        var count = this.imagesArray.length
        this.timerF = setInterval(() => { // display images faster than play
          this.imageUrl = this.imagesArray[i]
          i === (count - 1) ? i = 0 : i++
          this.index = i
        }, 250)
      }
    },
    setSelection () { // when page is created load in data sets names from server
      this.$socket.on('images', (temp) => {
        this.filename = temp
      })
    },
    returnImages () { // once data set is selected retrieve data set from server
      if (this.selected != null) {
        this.$socket.emit('selected', this.selected)
      }
    },
    displayImages (i) { // if play clicked display images
      var count = this.imagesArray.length
      this.timer = setInterval(() => {
        this.imageUrl = this.imagesArray[i]
        i === (count - 1) ? i = 0 : i++
        this.index = i
      }, 500)
    }
  },
  created () { // page creating call setSelection() function
    this.setSelection()
  },
  mounted () { // if a change is detected in selection of data set retrieve new data
    this.$socket.on('image', (image, count) => {
      if (image) {
        var img = 'data:image/jpeg;base64,' + image.buffer
        if (this.imagesArray.length === count) {
          this.imagesArray = []
        }
        this.imagesArray.push(img)
      }
    })
  }

}
</script>
