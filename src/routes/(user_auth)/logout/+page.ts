import { goto } from '$app/navigation';
import {logged_in} from "$lib/stores";

/** @type {import('./$types').PageLoad} */
export function load(): void{
    logged_in.update(() =>  false);
    goto('/', {replaceState: true})
}