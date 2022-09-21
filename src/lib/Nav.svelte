<script lang="ts">
  import { page } from '$app/stores';
  import {logged_in} from "$lib/stores";

  let logged_in_nav;

  logged_in.subscribe(value => {
    logged_in_nav = value;
  })

  let app_name = "WhatDoIEat?";

  let menus = [{name:'Home', link:'/', type:'link'},
               {name:"About", link: '/about',type:"link"},
               {name:"Pick For Me", link:'/random',type:'link'},
              // The categories should be pulled from the db (maybe top 5 ?) idk yet
              // todo decide what to do with the menu items
               {name:"Categories", link: '/categories',type:'dropdown',dropdown_data: [{name:"Japanese",link:'japanese'},
                                                                                     {name:"Western",link:'western'},
                                                                                     {name:"Thai",link:'thai'}]},
               // store user avatar + handle login
              {name:"users", type:"user", user_dropdown: {logged_in:[{name:"Profile", link: "profile"},
                                                                    {name:"Settings", link:"settings"},
                                                                    {name:"Log Out", link: "logout"}],
                                                        }
              }
              ];
</script>


<div class="navbar bg-base-100">
  <div class="navbar">
    <div class="dropdown">
      <p tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </p>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {#each menus as menu}
          {#if menu.type === "dropdown"}
            <li tabindex="0">
                <a href={menu.link} class:text-secondary={$page.url.pathname === menu.link || $page.url.pathname.includes(menu.link)}>
                {menu.name}
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
              </a>
              <ul class="p-2 bg-base-100">
                {#each menu.dropdown_data as data}
                  <li><a href='{menu.link}/{data.link}'>{data.name}</a></li>
                {/each}
              </ul>
            </li>
          {:else if menu.type === "user"}
            <li tabindex="0">
              {#if logged_in_nav}
                <div class="avatar">
                  <div class="max-w-xs max-h-7 rounded-full" >
                    <img src="img/default_avatar.webp" alt="login"/>
                  </div>
                </div>
                <ul class="p-2 bg-base-100">
                  {#each menu.user_dropdown.logged_in as data}
                    <li><a href='/{data.link}'>{data.name}</a></li>
                  {/each}
                </ul>
              {:else}
                <a href="/login" class="text-primary">login</a>
              {/if}
            </li>
          {:else}
            <li><a href="{menu.link}" class:text-secondary={$page.url.pathname === menu.link}>{menu.name}</a></li>
          {/if}
        {/each}
      </ul>
    </div>
    <a class="btn btn-ghost normal-case text-xl" href="/">{app_name}</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
      {#each menus as menu}
        {#if menu.type === "dropdown"}
          <li tabindex="0">
            <a href={menu.link} class:text-secondary={$page.url.pathname === menu.link || $page.url.pathname.includes(menu.link)}>
              {menu.name}
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul class="p-2 bg-base-100">
              {#each menu.dropdown_data as data}
                <li><a href='{menu.link}/{data.link}'>{data.name}</a></li>
              {/each}
            </ul>
          </li>
        {:else if menu.type === "user"}
              {#if logged_in_nav}
                <div class="dropdown dropdown-end">
                  <div tabindex="0" class="btn btn-ghost">
                  <div class="avatar">
                    <div class="max-w-xs max-h-7 rounded-full" >
                      <img src="img/default_avatar.webp" alt="login"/>
                    </div>
                  </div>
                  </div>
                  <ul class="dropdown-content menu shadow p-2 bg-base-100">
                    {#each menu.user_dropdown.logged_in as data}
                      <li><a href='/{data.link}'>{data.name}</a></li>
                    {/each}
                  </ul>
                </div>
              {:else}
                  <a href="/login" class="btn btn-ghost text-primary">login</a>
              {/if}
        {:else}
          <li><a href="{menu.link}" class:text-secondary={$page.url.pathname === menu.link}>{menu.name}</a></li>
        {/if}
      {/each}
    </ul>
  </div>
</div>

<style>

</style>