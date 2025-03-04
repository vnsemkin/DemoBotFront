import { useTelegram } from '../../hooks/useTelegram';
import { FiShoppingCart } from 'react-icons/fi'; // Импорт иконки корзины
import './Header.css';

const Header = () => {
	const { onClose, user } = useTelegram();

	return (
		<div className="header">
			<div className="user-info">
				{user?.photo_url && (
					<img className="user-avatar" src={user.photo_url} alt="User" />
				)}
				<div className="user-text">
					<span className="greeting">Hi, </span>
					<span className="username">{user?.first_name || 'Guest'}</span>
				</div>
			</div>

			<div className="cart-icon">
				<FiShoppingCart size={24} />
				<span className="cart-count">2</span> {/* Количество товаров в корзине */}
			</div>
		</div>
	);
};

export default Header;
