import tshirtWhite from '../images/tshirt_white.jpg';
import tshirtPrint from '../images/tshirt_picture.jpg';
import shirt from '../images/shirt.jpg';
import jeans_1 from '../images/jeans_1.jpg';
import jeans_2 from '../images/jeans_2.jpg';
import jeans_3 from '../images/jeans_3.jpg';
import hoodie_red from '../images/hoddie_red.jpg';
import hoodie_black from '../images/hoddie_black.jpg';

const products = [
    {
        id: '1',
        category: 'T-Shirts',
        title: 'Oversize T-Shirt',
        price: 25.00,
        description: 'Comfortable 100% cotton T-shirt',
        colors: [
            { name: 'White', hex: '#ffffff', image: tshirtWhite },
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '2',
        category: 'T-Shirts',
        title: 'Men\'s T-Shirt',
        price: 35.00,
        description: 'Comfortable 100% cotton T-shirt',
        colors: [
            { name: 'White', hex: '#fbf4f4', image: tshirtPrint },
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '3',
        category: 'Jeans',
        title: 'Slim Fit Jeans',
        price: 50.00,
        description: 'Straight blue jeans',
        colors: [
            {
                name: 'Blue',
                hex: '#222c8f',
                images: [
                    jeans_1,
                    jeans_2,
                    jeans_3
                ]
            }
        ],
        sizes: ['28', '30', '32', '34', '36']
    },
    {
        id: '5',
        category: 'Shirts',
        title: 'Classic Shirt',
        price: 40.00,
        description: 'Slim-fit shirt',
        colors: [
            { name: 'Blue', hex: '#256597', image: shirt },
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '4',
        category: 'Hoodies',
        title: 'Hoodie',
        price: 60.00,
        description: 'Warm and cozy hoodie',
        colors: [
            { name: 'Red', hex: '#5e2424', image: hoodie_red },
            { name: 'Black', hex: '#000000', image: hoodie_black },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
];

export default products;
