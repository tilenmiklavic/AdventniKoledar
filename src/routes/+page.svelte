<script>
// @ts-nocheck
	import { supabase } from '../Supabase';
	import moment from "moment";
	import { SvelteToast, toast } from '@zerodevx/svelte-toast'
	import { onMount } from 'svelte';

	let loading = false;
	let naloge = [];
	let fileinput, file, naloga, user;
	const options = {
		duration: 4000,       // duration of progress bar tween to the `next` value
		initial: 1,           // initial progress bar value
		next: 0,              // next progress value
		pausable: false,      // pause progress bar tween on mouse hover
		dismissable: true,    // allow dismiss with close button
		reversed: false,      // insert new toast to bottom of stack
		intro: { x: 256 },    // toast intro fly animation settings
	}

	const getData = async () => {
		try {
			loading = true;

			const { data, error } = await supabase
			.from('naloge')
			.select()
			.order('datum', {ascending: true})

			if (data) {
				naloge = data;
				console.log(naloge);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const onFileSelected = (e, el) => {
		if (e.target.files) {
			file = e.target.files[0];
			uploadImage();
		}
	}

	const uploadImage = async () => {
		let user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			// user is not logged in 
			toast.push('Najprej se moraš prijaviti!');
			return;
		}

		let index = naloga.id;
		let date = moment().format('DD-MM-YYYY:HH-mm-ss');
		let ime = user.ime.replace('č', 'c').replace('š','s').replace('ž','z');
		let priimek = user.priimek.replace('č', 'c').replace('š','s').replace('ž','z');
		const { data, error } = await supabase.storage
			.from('advetni-koledar-slike')
			.upload(`public/${index}_${ime}_${priimek}_${date}.jpg`, file)

		if (data) {
			console.log("Upload successful");
			toast.push('Success!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			})
		} else if (error) {
			console.error("Upload failed")
		}
	}

	onMount(async () => {
		user = JSON.parse(localStorage.getItem("user"));
		console.log(user)
	});

	getData();
</script>

<svelte:head>
	<title>Adventni koledar</title>
	<meta name="description" content="Adventni koledar" />
</svelte:head>

<section>
	<span class="welcome">
		<h1><strong>Adventni koledar</strong></h1>
		{#if user}
		<h5>Živjo {user.name} {user.surname} 👋</h5>
		{/if}
	</span>

	<div class="grid container">
		<div class="row">
			{#each naloge as el, index}

				<div class="flip-card">
					<div class="flip-card-inner red">
						<div class="flip-card-front">
							<h2>{index + 1}. naloga</h2>
							<p class="opis">{el.datum}</p>
						</div>
						<div class="flip-card-back">
							<h2>{index + 1}. naloga</h2>
							<p class="opis">{el.opis}</p>

							{#if el.slika}
							<div class="row fixed-bottom">
								<div class="col">
									<div class="row">
										<div class="col">
											<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" height="30px" width="30px" alt="" on:click={()=>{fileinput.click(); naloga = el}} />
										</div>
									</div>
									<div class="row">
										<div class="chan" on:click={()=>{fileinput.click();}}>Nalozi sliko</div>
										<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
									</div>
								</div>
							</div>
							{:else}
							<div>
								<span class="badge bg-success">Brez slikce, samo naloga 😉</span>
							</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<SvelteToast {options} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
