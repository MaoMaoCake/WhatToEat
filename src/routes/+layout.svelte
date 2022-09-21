<script>
    import Nav from "$lib/Nav.svelte";
    import Footer from "$lib/Footer.svelte";
</script>
<Nav/>

<slot>
    <p>Nothing is here</p>
</slot>

<Footer/>
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>