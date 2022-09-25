<script lang="ts">
    type store = {
        store_id: number;
        name: string;
        address: string;
        description: string;
        avg_review: number;
        total_review: number;
        picture_url: string;
    }

    type choice = {
        choice: string
    }

    let randomCategory: choice = {choice:"Nothing Yet"};

    // todo possibilities should come from a database
    let categories: choice[] = [{choice:"Thai Food"}, {choice:"Japanese Food"}, {choice:"Western Food"}];
    let randomStore: store;

    function choose(choices: any[]): any {
        let index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    async function getStore(category: choice): Promise<store[]>{
        let stores: store[];
        console.log(category.choice) // this is a placeholder for the backend
        // await fetch("/get_random_store?category=" + category ).then(r => r.json()).then(data => store = data)
        stores = [{store_id: 1, name: "store1", address:"address1",description:"desc1", avg_review:100, picture_url:"store.png",total_review:500},
                  {store_id: 2, name: "store2", address:"address2",description:"desc2", avg_review:100, picture_url:"store.png", total_review:1000}]
        return stores
    }
    async function onClick(): Promise<void>{
        // temporary variable to get the variable first so the ui change doesn't trigger yet
        let temp =  choose(categories);
        let stores = await getStore(temp)
        // after waiting for the store to get its data using temp var we can assign the var to randomCategory
        // which will trigger the UI
        randomCategory = temp
        randomStore = choose(stores)
    }
</script>
<div class="flex flex-col justify-evenly">
    <p class="text-primary text-2xl text-center my-5">You Got: {randomCategory.choice}</p>
    {#if randomCategory.choice !== "Nothing Yet"}
        <div class="card w-96 bg-neutral shadow-xl my-5">
            <figure class="px-10 pt-10">
                <img src="/img/store/{randomStore.picture_url}" class="rounded-xl" alt="storefront"/>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{randomStore.name}</h2>
                <!--todo math for star showing-->
                <div class="rating rating-sm rating-half">
                    <input type="radio" name="rating-1" class="rating-hidden" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-1" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-2" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-1" disabled checked />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-2" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-1" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-2" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-1" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-2" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-1" disabled />
                    <input type="radio" name="rating-1" class="mask mask-star mask-half-2" disabled />
                    <p class="text-neutral-content text-sm pl-2">({randomStore.total_review})</p>
                </div>
                <p>{randomStore.description}</p>
                <p>{randomStore.address}</p>
                <div class="card-actions">
                    <a class="btn btn-primary" href="/store/{randomStore.store_id}">Check out the store</a>
                </div>
            </div>
        </div>
    {/if}
    <p class="btn btn-primary my-5" on:click={onClick}>Click To Get A Random Place</p>
</div>
