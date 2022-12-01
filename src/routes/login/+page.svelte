<script>
    let user = {
        name: "",
        surname: ""
    }

    let handleOnSubmit = function() {
        // TODO: remove special characters
        localStorage.setItem('user', JSON.stringify(user))
    }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="login" content="Login to app" />
</svelte:head>

<div class="text-column">
	<h1><strong>Login</strong></h1>
    <div class="d-flex justify-content-center">
        <div>
            Za nalaganje slik se prijavi.
        </div>
    </div>

    <div class="mt-4">
        <form on:submit={handleOnSubmit}>
            <div class="row">
                <label for="ime">Ime</label>
                <input type="text" name="ime" bind:value={user.name} />
            </div>
            <div class="row mt-3">
                <label for="priimek">Priimek</label>
                <input type="text" name="priimek" bind:value={user.surname} />
            </div>
            <div class="row mt-1 p-4">
                <input type="submit" class="btn btn-primary">
            </div>
        </form>
    </div>
</div>
