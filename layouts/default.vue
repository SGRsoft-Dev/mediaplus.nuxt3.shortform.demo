<template>
	<slot/>

</template>

<script setup>
const colorMode = useColorMode();
watch(colorMode,()=>{
	if(colorMode.value == 'dark'){
		document.body.classList.add('bg-neutral-900')
	}else{
		document.body.classList.remove('bg-neutral-900')
	}
})
</script>

<style scoped>


</style>
