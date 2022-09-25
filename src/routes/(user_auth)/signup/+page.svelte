<script lang="ts">
    import {afterUpdate} from "svelte";
    let matched = false;
    let valid_email = false;

    // email validator
    function validateEmail(email: string): boolean
    {
        if (/^\w+(.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            return (true)
        }
        return (false)
    }

    // check for errors in form
    afterUpdate(() => {
        //password part
        if (password !== "" && password !== confirm){
            matched = false
        } else if (password === confirm){
            matched = true;
        }
        // show invalid email if email is not valid but not if email is empty
        valid_email = validateEmail(email) || email === "";
    })

    let email = "", username ="", password = "", confirm = "";

    function signUp(){
        console.log("pass")
    }

</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input id="email" type="text" placeholder="Email" class="input input-bordered" bind:value={email}/>
                    {#if !valid_email}
                        <p class="text-error text-sm">This email is invalid</p>
                    {/if}
                </div>
                <div class="form-control">
                    <label class="label" for="username">
                        <span class="label-text">Username</span>
                    </label>
                    <input id="username" type="text" placeholder="Username" class="input input-bordered" bind:value={username}/>
                </div>
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input id="password" type="password" placeholder="Password" class="input input-bordered" bind:value={password}/>
                </div>
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Confirm Password</span>
                    </label>
                    <input id="confirm" type="password" placeholder="Confirm Password" class="input input-bordered" bind:value={confirm}/>
                </div>
                {#if !matched}
                    <div>
                        <p class="text-error text-sm">Passwords do not match</p>
                    </div>
                {/if}
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click|preventDefault={signUp}>Sign Up</button>
                </div>

            </div>
        </div>
    </div>
</div>