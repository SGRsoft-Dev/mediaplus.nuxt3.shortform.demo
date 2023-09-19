
<template>
	<div class="flex flex-col-reverse h-full items-end text-center gap-5 text-center text-white" :class="{'text-white' : isMobile}">
		<div class="space-y-1">
			<button class=""  type="button">
				<img :src="video.channel_profile_image_url" class="w-[40px] h-[40px] rounded object-cover" alt="">
			</button>
		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px]  flex items-center justify-center" :class="{ '  min-[460px]:bg-neutral-800/20 ' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }"  type="button">
				<i class="ph-fill ph-dots-three-outline"></i>
			</button>

		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px] flex items-center justify-center"  :class="{ ' min-[460px]:bg-neutral-800/20' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }" type="button">
				<i class="ph-fill ph-share-fat"></i>
			</button>
			<div class="text-[12px]">공유</div>
		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px]  flex items-center justify-center"  :class="{ ' min-[460px]:bg-neutral-800/20' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }" type="button">
				<i class="ph-fill ph-chat-text"></i>
			</button>
			<div class="text-[12px]">291</div>
		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px]  flex items-center justify-center" :class="{ ' min-[460px]:bg-neutral-800/20' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }"  type="button">
				<i class="ph-fill ph-thumbs-down"></i>
			</button>
			<div class="text-[12px]">싫어요</div>
		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px]  flex items-center justify-center"  :class="{ ' min-[460px]:bg-neutral-800/20' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }" type="button">
				<i class="ph-fill ph-thumbs-up"></i>
			</button>
			<div class="text-[12px]">1.0천</div>
		</div>

		<div class="space-y-1">
			<button class="rounded-[100px] w-[40px] h-[40px]  flex items-center justify-center"  :class="{ ' min-[460px]:bg-neutral-800/20' : isMobile , 'dark:bg-neutral-800 bg-gray-200/30' : !isMobile  }" type="button"  @click="toggleMuted()">
				<i class="ph-fill  text-xl " :class="{'ph-speaker-simple-slash' : isMuted , 'ph-speaker-high' : !isMuted}"></i>
			</button>
			<div class="text-[12px]">{{isMuted ? '음소거' : '켜짐'}}</div>
		</div>
	</div>

</template>

<script setup>
defineProps({
	video: {
		type: Object,
		required: true
	},
	isMobile: {
		type: Boolean,
		default: false
	}
});

const isMuted = useState('isMuted');

const toggleMuted = ()=>{


	let videos = document.querySelectorAll('video');
	for (let i = 0; i < videos.length; i++) {
		videos[i].muted = isMuted.value ? false : true;
	}

}
</script>


<style scoped>

</style>
