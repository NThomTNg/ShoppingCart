import featuredProducts from './featured';
import featuredDescription from './featuredLong';

const combinedProductData = featuredProducts.map(product => {
  const description = featuredDescription.find(desc => desc.id === product.id);
  return {
    ...product,
    long_description: description ? description.long_description : '',
    feature: description ? description.feature: '',
    performance: description ? description.performance: '',
    end: description ? description.end: '',
  };
});

export default combinedProductData;