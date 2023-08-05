import { StyleSheet ,View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { CameraType,Camera,FlashMode } from 'expo-camera';
import * as MediaType from 'expo-media-library';
import { shareAsync } from "expo-sharing";
import { MaterialIcons } from '@expo/vector-icons';
export default function TakePicture() {

     const cameraRef=React.useRef(null);
    const [type, setType] = React.useState(CameraType.back);
 
  const[openFlash,setOpenFlash]=React.useState(false)
   const [requestCamera, setRequestCamera] = React.useState(false);
  const [requestMedia,setRequestMedia]=React.useState(false);
const[cameraReady,setCameraReady]=React.useState(false)
const[pic,setPic]=React.useState({base64:'',uri:''})
  const requestingPermissions= async ()=>
{
   const askCamera= await  Camera.requestCameraPermissionsAsync();
   const askMicroPhone= await  Camera.requestMicrophonePermissionsAsync();
  const askMedia=await MediaType.requestPermissionsAsync()
  setRequestCamera(askCamera.status=='granted'  && askMicroPhone.status=='granted');
  setRequestMedia(askMedia.status=='granted');
}
const flipCam=()=>
{
   type==CameraType.back?setType(CameraType.front):setType(CameraType.back)
}
const toogleFlash=()=>
{
   setOpenFlash(!openFlash)
}
const takePic = async()=>
{
  let options={
    quality:1,
    base64:true,
    exif:false,
  }
     const {uri,base64,width,height}= await cameraRef.current.takePictureAsync(options)   
     setPic({uri:uri,base64:base64});
     
    
} 
{
  if(pic.uri!='')
  {
    return(
      <Image  style={{width:100,height:100}}
      source={{uri:'data:image/jpg:base64,'+pic.base64}} />
    )
  }
}
 

React.useEffect( ()=>{requestingPermissions()},[])
  return (
    <View style={{width:'100%',height:'100%',justifyContent:"center",alignItems:"center"}}>
    <View style={styles.cameraControls}> 
    <MaterialIcons name='flash-on' color='#fff' size={40} style={{ }} onPress={toogleFlash} />
         <TouchableOpacity style={styles.takePictureButton}    onPress={cameraReady&&takePic}   ></TouchableOpacity>
         <MaterialIcons name='flip-camera-android' color='#fff' size={40} style={{ }} onPress={flipCam} />
     </View>
     <Camera ref={cameraRef}
     flashMode={FlashMode.on}
      type={type}  
      style={{ width:'100%', height: "100%"}} onCameraReady={()=>setCameraReady(true)}  >

         
      </Camera>


</View> 
  )
}

const styles = StyleSheet.create({

  cameraControls:
  {
    backgroundColor:'transparent',
    width:'100%',
    paddingBottom:10,
    height:70,
    position:"absolute",
    bottom:0,
    zIndex:1,
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:'row',
  },
  takePictureButton:
  {
   borderRadius:100,
   backgroundColor:'#fff',
    width:70,
    height:70
  }


})