import React from 'react';
import {useProducts} from '../utils';

export function Product() {
  const [product] = useProducts();

  return (
    <p>
      {product.title} - {product.variant.title}
    </p>
  );
}
