<script>
// @ts-nocheck
	import { supabase } from '../Supabase';
	import moment from "moment";
	import { toast } from '@zerodevx/svelte-toast'
	import { onMount } from 'svelte';
	import { getUser, setUser } from "../services/Storage"

	let loading = false;
	let naloge = [];
	let fileinput, file, naloga, user, todayDate;


	const getData = async () => {
		try {
			loading = true;

			const { data, error } = await supabase
			.from('naloge')
			.select()
			.order('datum', {ascending: true})

			if (data) {
				naloge = data;
				naloge.forEach(el => {
					el.datum = moment(el.datum, 'YYYY-MM-DD');
				})
			}

			console.log(naloge)
		} catch (error) {
			console.error(error);
		}
	}

	const onFileSelected = (e, el) => {
		if (e.target.files) {
			file = e.target.files[0];
			uploadImage(e);
		}
	}

	const uploadImage = async (e) => {
		if (!user) {
			// user is not logged in 
			toast.push('Najprej se moraš prijaviti!');
			return;
		}

		let index = naloga.id;
		let date = moment().format('DD-MM-YYYY:HH-mm-ss');
		let ime = user.name.replace('č', 'c').replace('š','s').replace('ž','z');
		let priimek = user.surname.replace('č', 'c').replace('š','s').replace('ž','z');
		const { data, error } = await supabase.storage
			.from('advetni-koledar-slike')
			.upload(`public/${index}_${ime}_${priimek}_${date}.jpg`, file)

		if (data) {
			console.log("Upload successful");
			toast.push('Slika naložena!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			})

			checkTask()
		} else if (error) {
			console.error("Upload failed")
		}
	}

	const checkTask = function() {
		user.tasks[naloga.id] = true;
		setUser(user);

		console.log(naloga)
	}

	onMount(async () => {
		user = getUser();
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

	<div class="grid container mt-5 mt-md-0">
		<div class="row">
			{#each naloge as el, index}
				<div class="{(el.datum).isAfter(todayDate) ? 'flip-card-disallowed' : 'flip-card-allowed'} flip-card">
					<div class="flip-card-inner red">
						<div class="flip-card-front">
							<h2>{index + 1}. naloga</h2>
							<p class="opis">{moment(el.datum, 'YYY-MM-DD').format("DD. MM. YYYY")}</p>

							{#if (el.datum).isAfter(todayDate)}
							<div class="kmalu-container">
								<span class="badge rounded-pill bg-secondary kmalu-badge">Kmalu...</span>
							</div>
							{/if}

							{#if user.tasks[el.id]}
								<i class="fa fa-check"></i>
							{/if}
						</div>
						<div class="flip-card-back">
							<h2>{index + 1}. naloga</h2>
							<p class="opis">{el.opis}</p>

							{#if el.slika}
							<div class="row fixed-bottom">
								{#if user.logged}
								<div class="col">
									<div class="row">
										<div class="col">
											<img class="upload" src="https://static.thenounproject.com/png/625182-200.png" height="30px" width="30px" alt="" on:click={()=>{fileinput.click(); naloga = el;}} />
										</div>
									</div>
									<div class="row">
										<div class="chan" on:click={()=>{fileinput.click();}}>Naloži sliko</div>
										<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
									</div>
								</div>
								{:else}
								<div class="col mb-2">
									<button class="btn btn-warning"><a class="no-decoration" href="/login"><i class="fa fa-sign-in"></i> Prijava</a></button>
								</div>
								{/if}
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
