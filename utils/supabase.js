import { createClient } from '@supabase/supabase-js';

// important (mostly project password): vJvsAAmF9mArOqvk 

const supabase = createClient(
    'https://ugwyxgeprswoubxgdakk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnd3l4Z2VwcnN3b3VieGdkYWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTI1OTAsImV4cCI6MjAyMzE2ODU5MH0.stFrLVp5o-WcfTPEtInoons0OBHNf2o54YoW410PeaM'
);

export async function getTags(tagName) {
    const { data, error } = await supabase.from('tags').select('*').eq('tag', tagName);

    return data;
}

export async function getSuggestions(searchText) {
    const { data, error } = await supabase.from('tags').select('tag').like('tag', `%${searchText}%`);

    console.log("supabase error", error);
    console.log("supabase data", data);

    return data;
}

export default supabase;

// blossom
// blade
// blader

// bl 