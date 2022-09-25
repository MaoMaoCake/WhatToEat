<script lang="ts">
    import {afterUpdate} from "svelte";
    import {jwt, logged_in} from "$lib/stores";
    import {goto} from "$app/navigation";
    import AlertError from "$lib/AlertError.svelte";
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
        if (password !== "" && password !== confirm && confirm !== ""){
            matched = false
        } else if (password === confirm){
            matched = true;
        }
        // show invalid email if email is not valid but not if email is empty
        valid_email = validateEmail(email) || email === "";
    })

    let email = "", username ="", password = "", confirm = "";
    let error_message = "";
    let show_error_var = false;

    // show error for 2 seconds
    async function showError(message: string): Promise<void>{
        error_message = message
        show_error_var = true;
        await new Promise(r => setTimeout(r, 2000));
        show_error_var= false;

    }
    async function signUp(){
        if (password == confirm && username !== "" && email !== "" && password !== "" && confirm !== ""){
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: `{"NS":"wte","DB":"wte","SC":"general_users","email":"${email}","pass":"${password}","username":"${email}"}`
            };
            // if auth is a success make it into a json too
            await fetch("http://localhost:8000/signup", options).then((response) => {
                if (response.ok) {
                    return {code: 200, details:"Authentication Success","access_code":response.text()}
                } else if (response.status === 403) {
                    return response.json()
                }
            }).then(res_data => {
                // if success update jwt to svelte store
                if (res_data.code === 200) {

                    logged_in.update(() => true);
                    jwt.update(() => res_data.access_code)
                    goto("/", {replaceState: true});
                } else if (res_data.code === 403) {
                    showError("Username or Email is already in use");
                }
            })
        } else {
            await showError("Please Check Your Inputs Again");
        }

    }

</script>
{#if show_error_var}
    <AlertError message="{error_message}"/>
{/if}
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