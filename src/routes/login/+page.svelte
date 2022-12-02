<script>
    import { onMount } from 'svelte';
    import { toast } from '@zerodevx/svelte-toast'
    import { getUser, setUser } from '../../services/Storage'

    let name = "", surname = "", parsedUser;

    let handleOnSubmit = function() {
        parsedUser = {
            name: name,
            surname: surname
        }
        
        localStorage.setItem('user', JSON.stringify(parsedUser))
        toast.push('Prijava uspešna!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			})
    }

	let photos = [];

	onMount(async () => {
		let user = getUser();
        name = user.name;
        surname = user.surname;
	});
</script>

<svelte:head>
	<title>Login</title>
	<meta name="login" content="Login to app" />
</svelte:head>

<div class="text-column">
	<h1><strong>Login</strong></h1>
    <div class="d-flex justify-content-center">
        <div>
            Za nalaganje slik se prijavi
            <i class="fa fa-user"></i>
        </div>
    </div>

    <div class="mt-4">
        <div>
            <div class="row">
                <label for="ime">Ime</label>
                <input type="text" name="ime" bind:value={name} />
            </div>
            <div class="row mt-3">
                <label for="priimek">Priimek</label>
                <input type="text" name="priimek" bind:value={surname} />
            </div>
            <div class="row mt-1 p-4">
                <!-- <input type="submit" class="btn btn-primary" > -->
                <button class="btn btn-primary" on:click={handleOnSubmit}>Submit <i class="fa fa-check"></i></button>
            </div>
        </div>
    </div>
</div>
