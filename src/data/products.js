import tshirtWhite from '../images/tshirt_white.jpg';
import tshirtPrint from '../images/tshirt_picture.jpg';
import shirt from '../images/shirt.jpg';
import jeans_1 from '../images/jeans_1.jpg';
import jeans_2 from '../images/jeans_2.jpg';
import jeans_3 from '../images/jeans_3.jpg';
import hoodie_red from '../images/hoddie_red.jpg';
import hoodie_black from '../images/hoddie_black.jpg'

const products = [
    {
        id: '1',
        category: 'Футболки',
        title: 'Футболка Oversize',
        price: 2500,
        description: 'Комфортная футболка из 100% хлопка',
        colors: [
            { name: 'Белый', hex: '#ffffff', image: tshirtWhite },
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '2',
        category: 'Футболки',
        title: 'Футболка мужская',
        price: 2500,
        description: 'Комфортная футболка из 100% хлопка',
        colors: [
            { name: 'Белый', hex: '#fbf4f4', image: tshirtPrint },
        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '3',
        category: 'Джинсы',
        title: 'Джинсы Slim Fit',
        price: 5000,
        description: 'Прямые джинсы синего цвета',
        colors: [
            {
                name: 'Синий',
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
        category: 'Рубашки',
        title: 'Классическая рубашка',
        price: 4000,
        description: 'Рубашка приталенного кроя',
        colors: [
            { name: 'Голубой', hex: '#256597', image: shirt },

        ],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '4',
        category: 'Толстовки',
        title: 'Худи с капюшоном',
        price: 6000,
        description: 'Тёплая и уютная толстовка',
        colors: [
            { name: 'Красный', hex: '#5e2424', image: hoodie_red },
            { name: 'Черный', hex: '#000000', image: hoodie_black },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
];

export default products;
