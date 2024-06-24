<script setup>
	const NFTs = ref([
		{ image: "/assets/media/fx/forex-14-2651231641.jpg" },
		{
			image: "/assets/media/banking/business-people-analyzing-stock-market_53876-96070.jpg",
		},
		{
			name: "Again",
			floor: "20.23 ETH",
			volume: "12,21",
			image: "/assets/media/banking/flat-lay-business-concept_53876-24738.jpg",
		},
		{
			name: "Maldiva",
			floor: "1.23 Matic",
			volume: "11,420",
			image: "/assets/media/banking/green-arrow-is-going-up-stacks-coins-arranged-bar-graph_35913-3151.jpg",
		},
		{
			name: "Greener",
			floor: "91.23 Matic",
			volume: "11,420",
			image: "/assets/media/banking/man-hand-holding-virtual-world-with-internet-connection-metaverse-global-business-marketing-banking-financial-pass-thru-application-technology-concept_616485-32.jpg",
		},
	]);
</script>

<template>
	<div class="w-100">
		<Swiper
			:modules="[SwiperAutoplay]"
			:space-between="10"
			:loop="true"
			:autoplay="{
				delay: 3000,
				disableOnInteraction: true,
			}"
			class="rounded-3 bg-transparent"
		>
			<SwiperSlide
				v-for="(nft, i) in NFTs"
				:key="i"
				class="rounded-3 bg-transparent"
			>
				<img
					:src="nft.image"
					alt=""
					class="h-250px h-md-100 w-md-900 h-lg-450px w-500px w-lg-900px rounded-3"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped></style>
<!-- Banking made simple, secure, and seamless. That's the Bancopt promise. -->
