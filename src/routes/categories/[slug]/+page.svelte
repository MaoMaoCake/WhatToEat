<script>
    import Nav from "$lib/Nav.svelte";
    export let data;

</script>

<Nav/>
<h1>{data.title}</h1>
<div>{@html data.content}</div>

