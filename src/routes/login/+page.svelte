<script lang="ts">
	import { goto } from "$app/navigation";
    const submit = async (e: SubmitEvent) => {
		e.preventDefault();
		const response = await fetch(`/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({name, password}),
		})
        if (response.ok) await goto(`/`, { replaceState: true });
        else if (response.status == 401) {
            status = "Invalid credentials"
            name = ""
            password = ""
        }
	}
    let status = " ";
	let name = "";
	let password = "";
</script>

<section>
    <form on:submit={submit}>
        <label for="name">Name</label>
        <input name="name" type="text" bind:value={name}>
        <label for="password">Password</label>
        <input name="password" type="password" bind:value={password}>
        <br>
        <button>Login</button>
    </form>
    <div>{status}</div>
</section>

<style>
    section {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2rem;
        position: absolute;
        width: 100%;
        height: 100%;
    }
    form {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
    }
    label {
        text-align: end;
    }
    div {
        white-space: pre;
    }
</style>