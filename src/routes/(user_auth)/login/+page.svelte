<script lang="ts">
    import {logged_in, jwt} from "$lib/stores";
    import {goto} from "$app/navigation";
    import AlertError from "$lib/AlertError.svelte";

    let error_message = "";
    let show_error_var = false;

    // show error for 2 seconds
    async function showError(message: string): Promise<void>{
        error_message = message
        show_error_var = true;
        await new Promise(r => setTimeout(r, 2000));
        show_error_var= false;

    }

    let email = "", password = "";
    async function login(){
        if (email !== "" && password !== ""){
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: `{"NS":"wte","DB":"wte","SC":"general_users","email":"${email}","pass":"${password}","username":"${email}"}`
            };
            // if auth is a success make it into a json too
            await fetch("http://localhost:8000/signin", options).then((response) => {
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
                    email = "";
                    password = ""
                    showError("Username/Email or password Incorrect")
                }
            })
        } else {
            await showError("Please Check Your Inputs");
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
                    <label class="label" for="email_uname">
                        <span class="label-text">Email/Username</span>
                    </label>
                    <input id="email_uname" type="text" placeholder="Email/Username" class="input input-bordered" bind:value={email}/>
                </div>
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input id="password" type="password" placeholder="Password" class="input input-bordered" bind:value={password}/>
                    <label class="label" for="reset_pw">
                        <a id="reset_pw" href="/reset_password" class="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click|preventDefault={login}>Login</button>
                </div>
                <a href="/signup" class="text-primary text-xs">Need an account?</a>
            </div>
        </div>
    </div>
</div>