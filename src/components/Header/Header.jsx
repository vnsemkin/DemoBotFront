import { useTelegram } from '../../hooks/useTelegram';
import { FiShoppingCart } from 'react-icons/fi'; // Импорт иконки корзины
import './Header.css';
import {FaHeart} from "react-icons/fa";
import {useState} from "react";

const Header = () => {
	const { user } = useTelegram();
	const [cartCount, setCartCount] = useState(0);
	const [favoritesCount, setFavoritesCount] = useState(0);

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
			<div className="icons-container">
				<div className="favorite-icon">
					<FaHeart size={22} color="black" />
					<span className="favorite-count">{favoritesCount}</span>
				</div>
				<div className="cart-icon">
					<FiShoppingCart size={24} />
					<span className="cart-count">{cartCount}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
