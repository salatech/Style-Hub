import { faker } from '@faker-js/faker';

interface ProductSpecification {
  category: string;
  value: string;
}

interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export const generateSpecifications = (category: string): ProductSpecification[] => {
  const specs: ProductSpecification[] = [
    {
      category: 'Material',
      value: faker.helpers.arrayElement([
        'Solid Wood',
        'Engineered Wood',
        'Metal',
        'Glass',
        'Leather',
        'Fabric',
        'Plastic',
        'Mixed Materials'
      ])
    },
    {
      category: 'Color',
      value: faker.color.human()
    },
    {
      category: 'Dimensions',
      value: `${faker.number.int({ min: 30, max: 200 })} x ${faker.number.int({ min: 30, max: 200 })} x ${faker.number.int({ min: 30, max: 200 })} cm`
    },
    {
      category: 'Weight',
      value: `${faker.number.int({ min: 1, max: 50 })} kg`
    },
    {
      category: 'Assembly Required',
      value: faker.datatype.boolean() ? 'Yes' : 'No'
    },
    {
      category: 'Warranty',
      value: `${faker.number.int({ min: 1, max: 5 })} years`
    }
  ];

  // Add category-specific specifications
  switch (category.toLowerCase()) {
    case 'electronics':
      specs.push(
        {
          category: 'Power Source',
          value: faker.helpers.arrayElement(['Battery', 'AC/DC', 'USB'])
        },
        {
          category: 'Battery Life',
          value: `${faker.number.int({ min: 4, max: 24 })} hours`
        }
      );
      break;
    case 'clothing':
      specs.push(
        {
          category: 'Size',
          value: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
        },
        {
          category: 'Care Instructions',
          value: faker.helpers.arrayElement(['Machine Wash', 'Dry Clean Only', 'Hand Wash'])
        }
      );
      break;
    case 'furniture':
      specs.push(
        {
          category: 'Style',
          value: faker.helpers.arrayElement(['Modern', 'Traditional', 'Contemporary', 'Industrial', 'Scandinavian'])
        },
        {
          category: 'Room Type',
          value: faker.helpers.arrayElement(['Living Room', 'Bedroom', 'Office', 'Kitchen', 'Outdoor'])
        }
      );
      break;
  }

  return specs;
};

export const generateReviews = (count: number = 5): ProductReview[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    userName: faker.internet.userName(),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.5 }),
    date: faker.date.past({ years: 1 }).toLocaleDateString(),
    comment: faker.lorem.paragraphs(1),
    helpful: faker.number.int({ min: 0, max: 100 })
  }));
}; 