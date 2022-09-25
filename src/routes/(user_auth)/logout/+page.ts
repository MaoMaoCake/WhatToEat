import { goto } from '$app/navigation';
import {jwt, logged_in} from "$lib/stores";

/** @type {import('./$types').PageLoad} */
export function load(): void{
    logged_in.update(() =>  false);
    jwt.update(() => "");
    goto('/', {replaceState: true})
}