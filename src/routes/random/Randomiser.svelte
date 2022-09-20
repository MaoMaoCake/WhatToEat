<script lang="ts">

    let results = "Nothing Yet";
    // todo possibilities should come from a database
    let possibilities: string[] = ["Thai Food", "Japanese Food", "Western Food"];

    // choosing function
    function choose(choices: string[]): string {
        let index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    function onClick(): void{
        results = choose(possibilities);

    }
</script>

<p class="text-primary">You Got: {results}</p>
<p class="btn btn-primary" on:click={onClick}>Click To Get A Random Place</p>
