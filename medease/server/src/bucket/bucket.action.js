import { supabase } from './superbase.js';
import fs from 'fs';

export const uploadFile = async (file) => {
    try {
        console.log('file', file);
        const imagefile = file.filename + Math.random();

        const fileBuffer = fs.readFileSync(file.path);

        const { data, error } = await supabase.storage
            .from('documents')
            .upload(`prescription/${imagefile}`, fileBuffer, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Error uploading file:', error.message);
            throw error;
        }

        const publicURL = supabase.storage
            .from('documents')
            .getPublicUrl(`prescription/${imagefile}`);

        return { publicURL: publicURL.data.publicUrl, imagefile };
    } catch (error) {
        console.error('Error in uploadFile:', error);
        throw error;
    }
};

const downloadFile = async (fileName) => {
    const { data, error } = await supabase.storage
        .from("documents")
        .download(fileName);
    if (error) throw error;
    return data;
};