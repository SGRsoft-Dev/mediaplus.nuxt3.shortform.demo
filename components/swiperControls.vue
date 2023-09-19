<script setup lang="ts">

const props = defineProps({
	arrowType: {
		type: String,
		default: ''
	},
	size: {
		type: Number,
		default: 28
	}
})

const swiper = useSwiper();

const nextSlide = () => {
	swiper.value.slideNext();
}

const prevSlide = () => {
	swiper.value.slidePrev();
}

defineExpose({
	nextSlide,
	prevSlide
})
</script>

<template>

	<div v-if="arrowType">
		<div v-if="arrowType == 'up'">
			<button type="button" @click="prevSlide" class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-700 dark:hover:bg-neutral-600 bg-gray-200/40 hover:bg-gray-300/50 flex items-center justify-center  ">
				<i class="ph ph-arrow-up text-xl"></i>
			</button>
		</div>
		<div v-if="arrowType == 'down'" @click="nextSlide" class="rounded-[100px] w-[40px] h-[40px] dark:bg-neutral-700 dark:hover:bg-neutral-600 bg-gray-200/40 hover:bg-gray-300/50 flex items-center justify-center ">
			<button type="button">
				<i class="ph ph-arrow-down text-xl"></i>
			</button>
		</div>
	</div>

</template>

<style scoped>

</style>
