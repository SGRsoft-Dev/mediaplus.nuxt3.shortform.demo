<template>
<!--	<div class="fixed bottom-0 left-0 p-2 bg-black text-white text-[12px]">
		 scrollRunLock:{{scrollRunLock}} / SLIDE_CHANGE:{{SLIDE_CHANGE}} / SHORTS_IDX:{{SHORTS_IDX}} / deltaY:{{deltaY}}
	</div>-->

	<div class="fixed top-0 left-0 z-[10] p-3 ">
		<a href="/">
			<img src="/image/logo_dark.svg" class="h-[24px]" alt="">
		</a>

		<div v-if="isMuted" class="mt-3" @click="toggleMuted">
			<button class="rounded-full  px-3 h-[30px] dark:bg-neutral-800/20 bg-gray-900/20 text-white flex items-center justify-center"  type="button">
				<i class="ph-fill ph-speaker-simple-slash text-xl mr-2"></i>
				<span class="text-[12px] ">터치해서 음소거 해제</span>
			</button>
		</div>

	</div>

	<div class="autoHeight bg-black" @click="shortsBodyFocus"  @mousewheel="mousewheelRun" @keydown="keydownRun" v-if="loading && windowState.height > 0">
		<div class="mx-auto w-full md:max-w-[50vw] xl:max-w-[480px] h-full md:pt-[20px] md:pb-[20px]   " id="shortsBody" tabindex="0" >
			<Swiper
				direction="vertical"
				effect="slide"
				:loop="false"
				:spaceBetween="20"

				@slideChange="slideChage"

				@slideChangeTransitionStart="slideChangeTransitionStart"
				@slideChangeTransitionEnd="slideChangeTransitionEnd"
				@sliderMove="sliderMove"


				:height="isMobile ?  windowState.height : windowState.height - 60"
			>
				<SwiperSlide v-for="(s,i) in SHORTS" class="w-full h-full relative md:rounded-md overflow-hidden" :key="i">

					<div class="absolute top-0 left-0 w-full h-full bg-gra-v z-[9]" @click="sufaceClick"></div>

					<Transition name="fade">
						<img :src="s.thumb_url" v-if="SHORTS_IDX != i" class="w-full h-full bg-black absolute top-0 left-0 z-[6]"  :class="isMobile ? 'object-contain' : 'object-cover'">
					</Transition>
					<Player
						:playUrl="s.hls_play_url"
						:poster="s.thumb_url"
						:id="s.video_id"
						v-if="SHORTS_IDX == i"

						class="w-full h-full absolute z-[3]  "
					/>

					<div class="absolute bottom-0  z-[10] flex text-white p-3 mb-2">
						<div>

							<div class="p-3  text-sm">
								{{$util.titleMake(s.title)}}
							</div>
							<div class="flex items-center ">
								<div class="pr-3 pl-2 w-18 ">

									<UAvatar :src="s.channel_profile_image_url" v-if="s.channel_profile_image_url" size="sm" :alt="s.channel_name" class="profileThumb" />
									<UAvatar src="/image/non-profile.png" v-else  :alt="s.channel_name" class="profileThumb object-contain" size="sm"/>

								</div>
								<div>
									<div>{{ s.channel_name }}</div>

								</div>
							</div>
						</div>
					</div>
					<div class="absolute right-[15px] bottom-[35px]  z-[11]" v-if="SHORTS_IDX == i">
						<ShortsBtns :video="s" />
					</div>

				</SwiperSlide>

				<SwiperControls ref="swiperControlsUp" arrowType="up" :size="28" class="fixed right-5 top-5" v-show="!isMobile && SHORTS_IDX>0"/>
				<SwiperControls ref="swiperControlsDown" arrowType="down" :size="28" class="fixed right-5 bottom-5" v-show="!isMobile"/>


			</Swiper>
		</div>
	</div>

</template>

<script setup>
import dayjs from "dayjs";
import _ from "lodash";

const {$util} = useNuxtApp();
const mpKey = useState('mpKey');
const SHORTS = useState('SHORTS');
const SHORTS_TOTAL = useState('SHORTS_TOTAL');
const SHORTS_IDX = useState('SHORTS_IDX');
const SLIDE_CHANGE = useState('SLIDE_CHANGE');
const PAGE_NO = useState('PAGE_NO');
const LIMIT = useState('LIMIT');
const isMuted = useState('isMuted');

const isMobile = useState('isMobile');
const isIOS = useState('isIOS');
const windowState = useState('windowState');
const isPlay = useState('isPlay');

const swiperControlsDown = ref(null);
const swiperControlsUp = ref(null);
const wheelRunLock = ref(false);
let wheelRunLockTimer = null;

const loading = useState('loading');

const shortsPrev = async ()=>{
	if(!scrollRunLock.value) {
		console.log('shortsPrev')
		await swiperControlsUp.value.prevSlide();
	}
};

const shortsNext = async ()=>{
	if(!scrollRunLock.value) {
		console.log('shortsNext')
		await swiperControlsDown.value.nextSlide();
	}
};

const sliderMove = (sw , e)=>{
	SLIDE_CHANGE.value = true;
}
const slideChage = (e)=>{
	console.log('slideChage')
	SHORTS_IDX.value = e.activeIndex;
	SLIDE_CHANGE.value = false;
}

const slideChangeTransitionStart = ()=>{
	console.log('slideChangeTransitionStart');

	SLIDE_CHANGE.value = true;
	clearTimeout(wheelRunLockTimer);
}

const slideChangeTransitionEnd = ()=>{
	console.log('slideChangeTransitionEnd');
	SLIDE_CHANGE.value = false;
}

const deltaY = ref(0);
const scrollRunLock = ref(false);
const mousewheelRun = async (e)=>{
	if(e.deltaY % 3 ==0){
		if (e.deltaY > 0) {
			deltaY.value = deltaY.value + 1;
		} else {
			deltaY.value = deltaY.value - 1;
		}
	}

	if (deltaY.value < 2 && deltaY.value > -2) {
		if (e.deltaY > 0) {
			await shortsNext();
		} else {
			await shortsPrev();
		}
		scrollRunLock.value = true;
		kbAndMouseEnd();
	}
};

const keydownRun = _.debounce((e)=>{
	if (e.key == 'ArrowDown') {
		shortsNext();
	} else if (e.key == 'ArrowUp') {
		shortsPrev();
	} else if (e.key == ' ') {
		let videos = document.querySelectorAll('video');
		for (let i = 0; i < videos.length; i++) {
			if (isPlay.value) {
				videos[i].pause();
			} else {
				videos[i].play();
			}
		}
	}
	kbAndMouseEnd();

},200);

let kbAndMouseEndTimer = null;
const kbAndMouseEnd = _.debounce(()=>{
	if(scrollRunLock.value) {
		clearTimeout(kbAndMouseEndTimer);
		kbAndMouseEndTimer = setTimeout(()=>{
			scrollRunLock.value = false;
		},500);
	}
	deltaY.value = 0;
},200);

const toggleMuted = ()=>{
	let videos = document.querySelectorAll('video');
	for (let i = 0; i < videos.length; i++) {
		videos[i].muted = isMuted.value ? false : true;
	}
}

const togglePlay = ()=>{
	let videos = document.querySelectorAll('video');
	for (let i = 0; i < videos.length; i++) {
		if(isPlay.value){
			videos[i].pause();
		}else{
			videos[i].play();
		}
	}
}

const sufaceClick = ()=>{
	if(isMuted.value){
		toggleMuted();
	}else{
		togglePlay();
	}
}


watch(()=>deltaY.value ,(to,from)=>{
	kbAndMouseEnd();
});




const { data, pending, error, refresh } = await useAsyncData(
	'shortsList',
	() => $fetch('https://mediaplus.co.kr/openApi/v1/content',{
		headers:{
			'Authorization':mpKey.value
		},
		params:{
			type:'vod',
			pageNo:PAGE_NO.value,
			limit:LIMIT.value,
			portrait:true,
			randkey:dayjs().format('YYYYMMDDHHmm')
		},
	})
)

if(data.value.code == 200) {
	SHORTS_TOTAL.value = data.value.result.totalCnt;
	for (let i = 0; i < data.value.result.data.length; i++) {
		let v = data.value.result.data[i];

		v.created_at = $util.dateFormat2(v.created_at);
		v.view_cnt = $util.numberToKorean(v.view_cnt);
		SHORTS.value.push(v);
	}
}

const shortsBodyFocus = ()=>{
	try{
		document.getElementById("shortsBody").focus();
	}catch (e) {

	}
}

onMounted(()=>{
	setTimeout(()=>{
		loading.value = true;
		shortsBodyFocus();
	},200)

})
</script>

<style scoped>
	#shortsBody:focus{
		outline: none;
	}
	.fade-enter-active, .fade-leave-active {

		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}

	.bg-gra-v{
		background: rgb(0,0,0);
		background: linear-gradient(180deg, rgba(0,0,0,0.1435968137254902) 0%, rgba(0,0,0,0) 6%, rgba(0,0,0,0) 86%, rgba(0,0,0,0.24555759803921573) 94%, rgba(0,0,0,0.3424763655462185) 100%);
	}
</style>
