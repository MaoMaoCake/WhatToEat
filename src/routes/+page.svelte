<script lang="ts">
    let action_group_group = [[{title:"Goto Random", description:"Go To A Random Store", link:"/random"},
                                {title:"Add Store", description: "Add a Store to our Database", link:"/store/add"}],
                              // [{title:"Add Dish", description: "Add a menu item to a store", link:"/store/add_menu"}, // cannot specify slug
                              //   {title:"Add Review", description: "Add a Review to our store", link:"/store"}] // cannot specify slug
                              ]
</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col">
        <p class="text-primary text-4xl">Welcome</p>
        <p class="text-secondary text-2xl">What Should we do Today?</p>
        <div class="flex flex-col">
            {#each action_group_group as action_group}
                <div class="flex flex-row">
                    {#each action_group as action}
                        <div class="card w-96 bg-base-100 shadow-xl image-full m-5">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <div class="card-body">
                                <h2 class="card-title">{action.title}</h2>
                                <p>{action.description}</p>
                                <div class="card-actions justify-end">
                                    <a href="{action.link}" class="btn btn-primary">Go!</a>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>