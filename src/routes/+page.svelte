<script>
	import { invalidateAll } from '$app/navigation';
	export let data;
    const resetCookieAndRefresh = () => {
        document.cookie = `user=`;
		invalidateAll();
	};
</script>

<h1>Welcome to SvelteKit + Prisma ORM</h1>
<h3>You are logged in as <u>{data.user.fullName}</u>
<button on:click={(e) => resetCookieAndRefresh()}>Log out</button>
</h3>

<div>
	All members:
	<ul>
		{#each data.allMembers as member}
			<li>
				{member.name} - {member.fullName}
			</li>
		{/each}
	</ul>
</div>

<style>
	h1,
	h3 {
		text-align: center;
	}
	div {
		padding: 1rem;
	}
</style>