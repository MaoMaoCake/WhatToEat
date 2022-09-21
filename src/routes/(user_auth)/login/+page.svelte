<script lang="ts">
    import {logged_in} from "$lib/stores";
    import {goto} from "$app/navigation";

    function login(){
        logged_in.update(() =>  true);
        goto("/",{replaceState: true});
    }
</script>
<p class="btn btn-primary" on:click={login}>Login Here</p>