import {error} from '@sveltejs/kit';
import type {LoadEvent} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load( { params }: LoadEvent ): object {
    // sample function will finish this later
    // todo modify the example function
    if (params.slug === 'japanese') {
        return {
            title: 'Japanese Foods',
            content: 'Something about japanese food here'
        };
    }

    throw error(404, 'Not found');
}