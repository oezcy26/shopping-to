<template>
  <svg height="400" width="400">
    <circle cx="200" cy="200" r="50" :stroke="stroke" :stroke-width="strokeW" fill="yellow"></circle>

    <!-- Auge l -->
    <line :x1="leftEye.lx" :y1="leftEye.ly" :x2="leftEye.mx" :y2="leftEye.my" style="stroke:black;stroke-width:3" />
    <line :x1="leftEye.mx" :y1="leftEye.my" :x2="leftEye.rx" :y2="leftEye.ry" style="stroke:black;stroke-width:3" />
    <circle :cx="leftEye.mx" :cy="leftEye.my + 17" r="10" :stroke="stroke"></circle>
    <circle :cx="leftEye.mx + 1" :cy="leftEye.my + 17" r="4" :stroke="stroke" fill="white"></circle>

    <!-- Auge r -->
    <line :x1="rightEye.lx" :y1="rightEye.ly" :x2="rightEye.mx" :y2="rightEye.my" style="stroke:black;stroke-width:3" />
    <line :x1="rightEye.mx" :y1="rightEye.my" :x2="rightEye.rx" :y2="rightEye.ry" style="stroke:black;stroke-width:3" />
    <circle :cx="rightEye.mx" :cy="rightEye.my + 17" r="10" :stroke="stroke"></circle>
    <circle :cx="rightEye.mx + 1" :cy="rightEye.my + 17" r="4" :stroke="stroke" fill="white"></circle>

    <!--Maul-->
    <path :d="mouth.string()" :stroke="stroke" :stroke-width="strokeW" fill="none" />

  </svg>
</template>

<script>
export default {
  name: 'LazySmiley',
  data () {
    return {
      stroke: 'black',
      strokeW: 3,
      leftEye: {
        lx: 175,
        ly: 185,
        mx: 188,
        my: 180,
        rx: 200,
        ry: 185
      },
      rightEye: {
        lx: 220,
        ly: 185,
        mx: 233,
        my: 180,
        rx: 245,
        ry: 185
      },
      mouth:{
        lx: 188,
        ly: 220,
        rxO: 50,
        ryO: 0,
        mxO: 25,
        myO: 15,
        string: function(){
          return "M "+this.lx+" "+this.ly+" q "+this.mxO+" "+this.myO+" "+this.rxO+" "+this.ryO;
        }
      }

    }
  },
  methods: {


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
