document.getElementById('addBookForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('image').value;
    const status = document.getElementById('status').value;
    const pages = document.getElementById('pages').value;
    const category = document.getElementById('category').value;
  
    const book = {
      title,
      author,
      image,
      status,
      pages,
      category,
    };
  
    try {
      const response = await fetch('/api/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du livre');
      }
  
      const addedBook = await response.json();
      console.log('Livre ajouté avec succès:', addedBook);
    } catch (error) {
      console.error('Erreur:', error);
    }
  });
  