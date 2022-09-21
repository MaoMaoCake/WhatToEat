<script>
    import Nav from "$lib/Nav.svelte";
</script>
<Nav/>

<slot>
    <p>Nothing is here</p>
</slot>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>