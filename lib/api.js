export async function fetchProduct(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch product');
    }
    
    return res.json();
  }