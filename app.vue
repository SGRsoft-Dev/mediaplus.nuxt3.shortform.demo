<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
	/* 기본 스타일 */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	* {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	*::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}

	html,body{
		padding:0 !important;
		width:100%;
		box-sizing: border-box;
		overflow:hidden;
		overscroll-behavior: none;
		background-color: #000;
	}

	body::-webkit-scrollbar {
		display: none !important;
	}

	#__nuxt , #__layout{
		padding:0;
	}
	#__nuxt{
		width: 100vw;
		-webkit-overflow-scrolling: touch;
		padding:0 !important;
	}
	#__nuxt::-webkit-scrollbar {
		display: none !important;
	}
</style>

<script setup>
import ua from "ua-parser-js";

const config = useRuntimeConfig();
const mpKey = useState('mpKey',()=>config.public.mediaPlusApiKey);
const SHORTS = useState('SHORTS',()=>[]);
const SHORTS_TOTAL = useState('SHORTS_TOTAL',()=>0);
const SHORTS_IDX = useState('SHORTS_IDX',()=>0);
const SLIDE_CHANGE = useState('SLIDE_CHANGE',()=>false);

const PAGE_NO = useState('PAGE_NO',()=>1);
const LIMIT = useState('LIMIT',()=>30);

const isPlay = useState('isPlay',()=>false);
const isMobile = useState('isMobile',()=>false);
const isIOS = useState('isIOS',()=>false);
const windowState = useState('windowState',()=>{return {width:0,height:0,scrollY:0}});
const colorMode = useColorMode();

const loading = useState('loading',()=>true);

const checkAgent = ()=>{
	try {
		let parser = ua(window.navigator.userAgent);
		if (parser.os.name == 'iOS') {
			isIOS.value = true;
		} else {
			isIOS.value = false;
		}

		if (parser.device.type == 'mobile' || parser.device.type == 'tablet' || windowState.value.width <= 720) {

			document.body.classList.add('isMobile');
			document.body.classList.remove('isPc');
			isMobile.value = true;
		} else {
			document.body.classList.add('isPc')
			document.body.classList.remove('isMobile');
			isMobile.value = false;
		}
	}catch (e) {

	}

}

const winSet = ()=>{
	windowState.value.width = window.innerWidth;
	windowState.value.height = window.innerHeight;
	windowState.value.scrollY = window.scrollY;

	let autos = document.querySelectorAll('.autoHeight');
	for(let i = 0; i < autos.length; i++){
		autos[i].style.height = windowState.value.height + 'px';
	}

}

onMounted(()=>{
	winSet();
	checkAgent();


	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}

	window.addEventListener('resize',()=>{
		winSet();
		checkAgent();
	});

	document.addEventListener('scroll',()=>{
		winSet();
	});


})

</script>
