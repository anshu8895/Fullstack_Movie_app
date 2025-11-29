import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Check if environment variables are properly loaded
const isConfigValid = PROJECT_ID && DATABASE_ID && COLLECTION_ID;

// Output a warning if configuration is missing
if (!isConfigValid) {
    console.warn('Warning: Appwrite configuration is incomplete. Please check your .env file.');
}

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID || '');

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // Skip if configuration is invalid
    if (!isConfigValid) {
        console.warn('Skipping updateSearchCount: Appwrite configuration is incomplete');
        return;
    }

    // 1. Use Appwrite SDK to check if the search term exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        // 2. If it does, update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
            // 3. If it doesn't, create a new document with the search term and count as 1
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                title: movie.title || searchTerm,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const getTrendingMovies = async () => {
    // Return empty array if configuration is invalid
    if (!isConfigValid) {
        console.warn('Skipping getTrendingMovies: Appwrite configuration is incomplete');
        return [];
    }

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ]);

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
};