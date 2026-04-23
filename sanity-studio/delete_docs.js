const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'c3139aap',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  // You need a token to delete documents, but wait, if it's a public dataset...
  // Public datasets can be read, but not written to without a token!
});

async function deleteAll() {
  const docs = await client.fetch('*[_type == "season"]{_id}');
  console.log('Found', docs.length, 'documents to delete');
  for (const doc of docs) {
    try {
      await client.delete(doc._id);
      console.log('Deleted', doc._id);
    } catch (e) {
      console.log('Failed to delete', doc._id, e.message);
    }
  }
}

deleteAll();
