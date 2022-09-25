<script lang="ts">
    import {logged_in} from "$lib/stores";
    import {goto} from "$app/navigation";

    let email = "", password = "";
    function login(){
        if (email == "admin" && password === "password"){
            logged_in.update(() =>  true);
            goto("/",{replaceState: true});
        } else {
            alert("Wrong Username or Password")
        }

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

            </div>
        </div>
    </div>
</div>