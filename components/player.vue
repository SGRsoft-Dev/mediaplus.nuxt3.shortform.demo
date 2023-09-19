

<template>

	<div class="w-full h-full bg-black  text-white  duration-200"   @mouseover="isHover = true" @mouseout="isHover = false">
		<div class="shortsPlayer w-full h-full">
			<video :id="`shortsPlayer_${id}`"  :style="{objectFit: isMobile ? 'contain' : 'cover', background:`url(${poster})  ${isMobile ? 'contain' : 'cover'} / center` , backgroundColor:'#000' }"  playsinline class="w-full h-full  bg-black" object-cover="" :loop="loop ? true : false"></video>
		</div>

		<div class="absolute bottom-0 left-0 w-full h-full z-[9999] bg-neutral-900/10 flex justify-center items-center " v-if="uiStart && isInitPlay" @click="playStart" v-show="!isPlay">
			<button class="rounded-[100px] w-[60px] h-[60px]  flex items-center justify-center bg-neutral-900/50"  >
				<i class="ph-fill ph-play  text-3xl text-white" ></i>
			</button>
		</div>

		<div class="absolute bottom-0 left-0 w-full z-[9999] bg-neutral-400/30  duration-200  " v-if="!shortScrollStart">
			<div class="bg-red-600 h-[2px] md:h-[3px]" :style="{width:`${isPercent}%`}"></div>
		</div>

		<div class="absolute top-0 left-0 w-full z-[9999]   justify-between hidden md:inline-flex" v-show="isHover && isPlay || isMuted">
			<div class="p-4">
				<button type="button" @click="togglePlay"><i class="ph-fill text-2xl " :class="{'ph-pause' : isPlay , 'ph-play' : !isPlay}"></i></button>
			</div>
			<div class="p-4">
				<button type="button" @click="toggleMuted"><i class="ph-fill text-2xl" :class="{'ph-speaker-simple-slash' : isMuted , 'ph-speaker-high' : !isMuted}"></i></button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.shortsPlayer{
		position: absolute;
		width:100%;
		height:100%;
	}

	.shortsPlayer video{
		max-height:100%;
		width:100%;
	}

</style>

<script setup>
import Hls from 'hls.js';
import _ from "lodash";
const props = defineProps({
	playUrl: {
		type: String,
		required: true
	},
	poster: {
		type: String,
		default: ''
	},
	muted: {
		type: Boolean,
		default: false
	},
	aspectRatio: {
		type: String,
		default: '16/9'
	},

	loop: {
		type: Boolean,
		default: true
	},
	id: {
		type: String,
		default: ''
	},

})

window.shortsPlayer = null;
const isMuted = useState('isMuted',()=>false);

const shortScrollStart = useState('SLIDE_CHANGE');

const isPercent = ref(0);
const isPlay = useState('isPlay',()=>false);
const isMobile = useState('isMobile');

const isInitPlay = ref(false);
const uiStart = ref(false);
const isHover = ref(false);

if(props.muted){
	isMuted.value = true;
}

let video = null
let hls = null

const playStart = (muted)=>{
	try {
		if(muted){
			video.muted = true;
		}
		video.play();
	}catch (e) {
		console.log('!@!@! p1')
		video.muted = true;
		video.play();
	}
}

const togglePlay = ()=>{
	if(isPlay.value){
		video.pause();
	}else{
		video.play();
	}
}

const toggleMuted = ()=>{

	if(video.muted){
		video.muted = false;
	}else{
		video.muted = true;
	}

}

defineExpose({
	togglePlay,
	toggleMuted
})

const playStartEmit = _.debounce(()=>{
	//
},200);

const mounted = ()=>{


	if(Hls.isSupported()) {
		hls.loadSource(props.playUrl);
		hls.attachMedia(video);

		window.addEventListener("unhandledrejection", (event) => {
			playStart(true);
			playStartEmit();
		});


	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = props.playUrl;

	}

	playStart();

	video.addEventListener('play' , ()=>{
		isPlay.value = true;
		isInitPlay.value = true;

	});


	video.addEventListener('pause',()=>{
		isPlay.value = false;
	});


	video.addEventListener('timeupdate',(res)=>{
		if(!shortScrollStart.value) {
			try {

				isPercent.value = (window.shortsPlayer.currentTime / window.shortsPlayer.duration) * 100;
				isPlay.value = true;

				if (window.shortsPlayer.muted) {
					if(!isMuted.value) isMuted.value = true;
				} else {
					if(isMuted.value) isMuted.value = false;
				}


			} catch (e) {


			}
		}
	})


	video.addEventListener('canplay',()=>{
		playStart();
		playStartEmit();

		if (shortScrollStart.value ){
			console.log('canplay')
			shortScrollStart.value = false;


		}
	})
	video.addEventListener('volumechange',()=>{

		if(video.muted){
			isMuted.value = true;
		}else{
			isMuted.value = false;
		}
	});


	window.shortsPlayer = video;
}


onMounted(()=>{
	video = document.getElementById(`shortsPlayer_${props.id}`);
	hls = new Hls();
	mounted();

	window.addEventListener("unhandledrejection", (event) => {
		playStart(true);
		playStartEmit();
	});

	setTimeout(()=>{
		uiStart.value = true;
	},1000);

})

onUnmounted(()=>{
	window.removeEventListener("unhandledrejection", (event) => {
		playStart(true);
		playStartEmit();
	});
})
</script>
