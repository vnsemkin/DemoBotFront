import { useTelegram } from '../../hooks/useTelegram';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Для перехода в избранное
import './Header.css';

const Header = ({ favoritesCount }) => {
	const { user } = useTelegram();
	const navigate = useNavigate();

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
				<div className="favorite-icon" onClick={() => navigate('/favorites')}>
					<FaHeart size={22} color="black" />
					<span className="favorite-count">{favoritesCount}</span>
				</div>
				<div className="cart-icon">
					<FiShoppingCart size={24} />
					<span className="cart-count">0</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
