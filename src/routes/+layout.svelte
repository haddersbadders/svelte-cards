<script>
	import favicon from '$lib/assets/favicon.svg';
	import 'bulma/css/bulma.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
