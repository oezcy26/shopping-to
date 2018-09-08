<template>
  <svg height="200" width="200">
    <circle :cx="face.mx" :cy="face.my" r="50" :stroke="stroke" :stroke-width="strokeW" fill="yellow"></circle>

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

//mittelpunkt des Kreises
let f = {mx: 100, my:100};

export default {
  name: 'LazySmiley',
  data () {
    return {
      stroke: 'black',
      strokeW: 3,
      face:{
        mx: f.mx,
        my: f.my
      },
      leftEye: {
        lx: f.mx - 25,
        ly: f.my - 15,
        mx: f.mx - 12,
        my: f.my - 20,
        rx: f.mx,
        ry: f.my - 15
      },
      rightEye: {
        lx: f.mx + 20,
        ly: f.my - 15,
        mx: f.mx + 33,
        my: f.my - 20,
        rx: f.mx + 45,
        ry: f.my - 15
      },
      mouth:{
        lx: f.mx - 12,
        ly: f.my + 20,
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
