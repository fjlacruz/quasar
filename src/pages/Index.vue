<template>
  <q-page class="flex flex-center">
   <div id="my_camera"></div>

<q-btn color="secondary" label="Take Snapshot" onClick="take_snapshot()"/>
 
<div id="results" ></div>
  </q-page>
</template>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webcamjs/1.0.25/webcam.min.js"></script>


<script>

export default {
  name: 'PageIndex',
  data(){
  	return{
  		Weeebcam:''
  	}
  }
}
Webcam.set({
  width: 320,
  height: 240,
  image_format: 'jpeg',
  jpeg_quality: 90
 });
 Webcam.attach( '#my_camera' );


function take_snapshot() {
 
 // take snapshot and get image data
 Webcam.snap( function(data_uri) {
  // display results in page
  document.getElementById('results').innerHTML = 
  '<img src="'+data_uri+'"/>';
  } );
}
</script>


<style>
#my_camera{
 width: 320px;
 height: 240px;
 border: 1px solid black;
}
</style>